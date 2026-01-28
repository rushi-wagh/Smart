import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issueType:{
      type: String,
      enum: ["Public","Private"],
      default: "Public",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Electricity", "Plumbing", "Cleaning", "Security", "Internet","Mess", "Other"],
      default: "Other",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
      required: true,
      index: true,
    },

    userPriority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "EMERGENCY"],
    },

    aiPriority: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
    },

    aiCategory: String,

    aiUrgency: {
      type: Number,
      min: 1,
      max: 10,
    },

    aiTags: [String],

    sentiment: {
      type: String,
      enum: ["POSITIVE", "NEUTRAL", "NEGATIVE"],
      default: "NEUTRAL",
    },

    emergency: {
      type: Boolean,
      default: false,
      index: true,
    },

    emergencyType: {
      type: String,
      enum: [
        "fire",
        "gas",
        "water_leak",
        "electric_short",
        "medical",
        "security_threat",
        "other",
      ],
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "ESCALATED"],
      default: "OPEN",
      index: true,
    },

    image: {
      type: String,
    },

    hostel: {
      type: String,
      index: true,
    },

    block: {
      type: String,
      index: true,
    },

    roomNumber: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    escalationLevel: {
      type: Number,
      default: 0,
    },

    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

issueSchema.index({
  hostel: 1,
  block: 1,
  priority: -1,
  emergency: -1,
  createdAt: -1,
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
