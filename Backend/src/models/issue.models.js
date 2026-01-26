import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    category: {
      type: String,
      enum: ["electricity", "plumbing", "cleaning", "security", "other"],
      default: "other",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    aiCategory: String,
    aiPriority: String,
    aiConfidence: Number,

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
      default: "OPEN",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    roomNumber: {
      type: String,  
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
