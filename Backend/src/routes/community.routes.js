import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import {
  postComment,
  toggleReaction,
  getComments,
  getReactions
} from "../controllers/community.controllers.js";

const router = express.Router();

router.post("/comment", isLoggedIn, postComment);
router.post("/reaction", isLoggedIn, toggleReaction);
router.get("/comments/:parentId", isLoggedIn, getComments);
router.get("/reactions/:parentId", isLoggedIn, getReactions);

export default router;
