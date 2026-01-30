import Issue from "../models/issue.models.js";
import Comment from "../models/comment.models.js";
import Reaction from "../models/reaction-models.js";


export const postComment = async (req, res) => {
  const { parentType, parentId, message, parentComment } = req.body;

  if (!message || !parentType || !parentId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const comment = await Comment.create({
    parentType,
    parentId,
    message,
    parentComment: parentComment || null,
    createdBy: req.user._id,
  });

  await updateIssueHeat(parentType, parentId);

  res.status(201).json({ message: "Comment added", comment });
};


export const toggleReaction = async (req, res) => {
  const { parentType, parentId, type } = req.body;

  const existing = await Reaction.findOne({
    parentType,
    parentId,
    createdBy: req.user._id,
  });

  if (existing) {
    await existing.deleteOne();
  } else {
    await Reaction.create({
      parentType,
      parentId,
      type,
      createdBy: req.user._id,
    });
  }

  await updateIssueHeat(parentType, parentId);

  res.status(200).json({ success: true });
};


export const getComments = async (req, res) => {
  const { parentId } = req.params;

  const comments = await Comment.find({ parentId })
    .populate("createdBy", "name")
    .sort({ createdAt: 1 });

  res.status(200).json({ comments });
};


export const getReactions = async (req, res) => {
  const { parentId } = req.params;

  const reactions = await Reaction.aggregate([
    { $match: { parentId: parentId } },
    { $group: { _id: "$type", count: { $sum: 1 } } }
  ]);

  res.status(200).json({ reactions });
};


const updateIssueHeat = async (parentType, parentId) => {
  if (parentType !== "Issue") return;

  const reactions = await Reaction.countDocuments({ parentId });
  const comments = await Comment.countDocuments({ parentId });

  let escalation = 0;

  if (reactions > 10) escalation++;
  if (comments > 6) escalation++;
  if (reactions > 25) escalation++;

  const issue = await Issue.findById(parentId);
  if (!issue) return;

  issue.escalationLevel = escalation;

  if (escalation >= 2 && issue.priority !== "Emergency") {
    issue.priority = "Emergency";
  }

  await issue.save();
};
