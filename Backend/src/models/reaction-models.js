import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
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

    type: {
      type: String,
      enum: ["like", "love", "angry", "sad", "fire"],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

reactionSchema.index({ parentId: 1, createdBy: 1 }, { unique: true });

export default mongoose.model("Reaction", reactionSchema);
