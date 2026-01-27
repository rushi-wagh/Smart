import mongoose from "mongoose";

const lostFoundSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["electronics", "documents", "accessories", "clothing", "others"],
      default: "others",
    },

    images: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      enum: ["LOST", "FOUND"],
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "AVAILABLE", "CLAIM_REQUESTED", "CLAIMED"],
      default: "OPEN",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    claim: {
      requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      proof: {
        type: String,
      },

      proofImages: [
        {
          type: String,
        },
      ],

      requestedAt: {
        type: Date,
      },

      approvedAt: {
        type: Date,
      },
    },

    location:{
        type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const LostFound = mongoose.model("LostFound", lostFoundSchema);

export default LostFound;