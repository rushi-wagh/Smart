import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Auth Middleware Token")

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const isAllowed = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "User role not found" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "You are not allowed to access this resource",
      });
    }

    next();
  };
};
