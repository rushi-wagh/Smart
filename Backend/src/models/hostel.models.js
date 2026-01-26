import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    totalRooms: { type: Number },
  },
  { timestamps: true },
);

export default mongoose.model("Hostel", hostelSchema);
