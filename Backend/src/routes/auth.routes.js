import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  logOut,
} from "../controllers/auth.controller.js";
import { isAllowed, isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isLoggedIn, getMe);
router.get("/", isLoggedIn, isAllowed("ADMIN"), getAllUsers);
router.all("/logout", isLoggedIn, logOut);

export default router;
