import Issue from "../models/issue.models.js";
import User from "../models/user.model.js";
import { assignStaffAuto } from "../utils/bestStaff.js";
import { uploadImage } from "../utils/cloudinary.js";
import { computeSimilarity } from "../utils/smartMerge.js";

const SIMILARITY_THRESHOLD = 0.25;

const normalizeEnum = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value;

const keywordFallbackMatch = (a, b) => {
  const important = [
    "leak",
    "leaking",
    "leakage",
    "pipe",
    "bathroom",
    "washroom",
    "toilet",
    "water",
    "dripping",
    "overflow",
  ];

  const t1 = a.toLowerCase();
  const t2 = b.toLowerCase();

  let count = 0;

  for (const word of important) {
    if (t1.includes(word) && t2.includes(word)) count++;
  }

  return count >= 3;
};

export const postIssue = async (req, res) => {
  try {
    let { title, description, category, priority, issueType } = req.body;

    if (!title || !description || !priority || !req.user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    category = normalizeEnum(category);
    priority = normalizeEnum(priority);
    issueType = normalizeEnum(issueType);

    let imageUrl;
    if (req.file) {
      const resp = await uploadImage(req.file.path);
      imageUrl = resp.secure_url;
    }

    const user = req.user;

    const recentIssues = await Issue.find({
      hostel: user.hostel,
      block: user.block,
      status: { $in: ["OPEN", "IN_PROGRESS"] },
      createdAt: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) },
    })
      .select("title description priority duplicateCount reporters")
      .limit(25);

    let bestMatch = null;
    let bestScore = 0;
    let bestFallback = false;

    const textA = `${title} ${description}`;

    for (const issue of recentIssues) {
      const textB = `${issue.title || ""} ${issue.description || ""}`;

      const score = computeSimilarity(textA, textB);
      const fallback = keywordFallbackMatch(textA, textB);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = issue;
        bestFallback = fallback;
      }
    }

    if (bestMatch && (bestScore > SIMILARITY_THRESHOLD || bestFallback)) {
      const nextPriority = {
        Low: "Medium",
        Medium: "High",
        High: "Emergency",
        Emergency: "Emergency",
      };

      const updatedIssue = await Issue.findByIdAndUpdate(
        bestMatch._id,
        {
          $inc: { duplicateCount: 1 },
          $addToSet: { reporters: user._id },
          $set: { priority: nextPriority[bestMatch.priority] },
          $push: {
            mergedReports: {
              user: user._id,
              description,
            },
          },
        },
        { new: true }
      );

      if (updatedIssue.duplicateCount >= 3) {
        updatedIssue.priority = "Emergency";
        await updatedIssue.save();
      }

      return res.status(200).json({
        merged: true,
        message: "Similar issue already exists. Your report has been merged.",
        parentIssue: updatedIssue,
        duplicateCount: updatedIssue.duplicateCount,
        similarityScore: bestScore.toFixed(3),
      });
    }

    const assignedStaff = await assignStaffAuto(category);

    const newIssue = await Issue.create({
      title,
      description,
      category,
      priority,
      issueType,
      hostel: user.hostel,
      block: user.block,
      roomNumber: user.room || req.body.roomNumber,
      createdBy: user._id,
      assignedTo: assignedStaff?._id || null,
      image: imageUrl,
      reporters: [user._id],
      duplicateCount: 0,
    });

    return res.status(201).json({
      message: "Issue reported successfully",
      issue: newIssue,
      duplicateCount: 0,
      assignedStaff,
    });
  } catch (error) {
    console.error("postIssue error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const myIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    if (!issues) {
      return res.status(404).json({ message: "No issues found" });
    }
    res.status(200).json({ issues: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { status } = req.body;
    if (!issueId || !status) {
      return res
        .status(400)
        .json({ message: "Issue ID and status are required" });
    }
    const validStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    issue.status = status;
    await issue.save({ validateBeforeSave: false });
    res
      .status(200)
      .json({ message: "Issue status updated successfully", issue: issue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    let filter = {};
    const { issueType, hostel, block } = req.query;
    if (issueType) {
      filter.issueType = issueType;
    }
    if (hostel) {
      filter.hostel = hostel;
    }
    if (block) {
      filter.block = block;
    }
    const issues = await Issue.find(filter)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");

    if (!issues) {
      return res.status(404).json({ message: "No issues found" });
    }
    res.status(200).json({ issues: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    if (!issueId) {
      return res.status(400).json({ message: "Issue ID is required" });
    }
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    await issue.deleteOne();
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategoryHeatmap = async (req, res) => {
  try {
    const data = await Issue.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ heatmap: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load heatmap data" });
  }
};
