import User from '../models/user.model.js';

export const updateProfile = async(req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(200).json({ success: true, message: "Profile updated successfully", data: user });
    } catch (error) {
        console.error("Error updating profile:",error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getUserProfile = async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }   
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}