import LostFound from "../models/lost-found.models.js";
import User from "../models/user.model.js";
import { uploadImage } from "../utils/cloudinary.js";


export const createLostItem = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;

    if (!title || !description || !location || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const resp = await uploadImage(req.file.path);
    const images = [resp.secure_url];

    const lostItem = await LostFound.create({
      title,
      description,
      location,
      date,
      type: "LOST",
      status: "OPEN",
      images,
      reportedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Lost item reported successfully",
      data: lostItem,
    });
  } catch (error) {
    console.error("Create Lost Item Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to report lost item",
      error: error.message,
    });
  }
};

export const createFoundItem = async (req, res) => {
  try {
    const { title, description, location, date, submittedAt } = req.body;
    let imageUrls 
    if(req.file){
        const respp = await uploadImage(req.file.path);
        imageUrls = [respp.secure_url];
    }

    const foundItem = await LostFound.create({
      title,
      description,
      location,
      date,
      submittedAt,
      images: imageUrls || [],
      type: "FOUND",
      status: "AVAILABLE",
      reportedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Found item posted successfully",
      data: foundItem,
    });
  } catch (error) {
    console.log("Create Found Item Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to post found item",
      error: error.message,
    });
  }
};
export const getLostFoundItems = async (req, res) => {
  try {
    const { status, type } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;

    const items = await LostFound.find(filter)
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.log("Get Items Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      error: error.message,
    });
  }
};
export const claimItem = async (req, res) => {
  try {
    const proofResp = await uploadImage(req.file.path);
    const proof = proofResp.secure_url;
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.status !== "AVAILABLE") {
      return res.status(400).json({
        success: false,
        message: "Item not available for claim",
      });
    }

    item.status = "CLAIM_REQUESTED";
    item.claim = {
      claimedBy: req.user._id,
      proof,
      claimedAt: new Date(),
    };

    await item.save();

    res.status(200).json({
      success: true,
      message: "Claim request submitted",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Claim failed",
      error: error.message,
    });
  }
};
export const matchItem = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const oppositeType = item.type === "LOST" ? "FOUND" : "LOST";

    const candidates = await LostFound.find({
      type: oppositeType,
      status: item.type === "LOST" ? "AVAILABLE" : "OPEN",
    });

    const keywords = item.title.toLowerCase().split(" ");

    const matches = candidates.filter((c) => {
      const titleMatch = keywords.some((w) =>
        c.title.toLowerCase().includes(w)
      );

      const locationMatch =
        c.location.toLowerCase().includes(item.location.toLowerCase()) ||
        item.location.toLowerCase().includes(c.location.toLowerCase());

      return titleMatch || locationMatch;
    });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Matching failed",
      error: error.message,
    });
  }
};
export const getLostFoundItemById = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id)
      .populate("reportedBy", "name email");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch item",
      error: error.message,
    });
  }
};


export const rejectClaim = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.status !== "CLAIM_REQUESTED") {
      return res.status(400).json({
        success: false,
        message: "Invalid claim state",
      });
    }

    item.status = "AVAILABLE";
    item.claim = null;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Claim rejected",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reject failed",
      error: error.message,
    });
  }
};
export const approveClaim = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.status !== "CLAIM_REQUESTED") {
      return res.status(400).json({
        success: false,
        message: "Invalid claim state",
      });
    }

    item.status = "CLAIMED";
    item.claim.approvedAt = new Date();

    await item.save();

    // Trust Score Update
    await User.findByIdAndUpdate(item.createdBy, {
      $inc: { trustScore: 10 },
    });

    await User.findByIdAndUpdate(item.claim.claimedBy, {
      $inc: { trustScore: 5 },
    });

    res.status(200).json({
      success: true,
      message: "Claim approved successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Approval failed",
      error: error.message,
    });
  }
};
