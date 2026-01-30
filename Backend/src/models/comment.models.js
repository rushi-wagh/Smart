import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    parentType: {
      type: String,
      enum: ["Issue", "Announcement"],
      required: true,
      index: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
