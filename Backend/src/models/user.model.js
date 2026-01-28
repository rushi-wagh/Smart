import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin", "staff"],
      default: "student",
    },
    department: {
      type: String,
      enum: [
        "plumbing",
        "electrical",
        "cleaning",
        "internet",
        "carpentry",
        "mess",
        "general",
      ],
      default: "general",
    },

    hostelId: {
      type: String,
    },
    block: {
      type: String,
    },
    hostel: {
      type: String,
    },

    room: {
      type: Number,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
