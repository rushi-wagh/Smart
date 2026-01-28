import express from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { autoDetectCategory, postIssue } from "../controllers/ai.controllers.js";

const router = express.Router()
router.post('/analyze-complaint',isLoggedIn,postIssue)
router.post('/category-detect',isLoggedIn,autoDetectCategory)

export default router;