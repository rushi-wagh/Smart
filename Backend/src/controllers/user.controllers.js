import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        data: user,
      });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const obj = user.toObject();
    const totalFields = 10;
    const filledCount = Object.values(obj).filter(
      (val) => val !== null && val !== undefined && val !== "",
    ).length;
    const percentage = Math.round((filledCount / totalFields) * 100);

    res.status(200).json({ success: true, data: {user, percentage} });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
