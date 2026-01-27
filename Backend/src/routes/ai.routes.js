import express from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { postIssue } from "../controllers/ai.controllers.js";

const router = express.Router()
router.post('/analyze-complaint',isLoggedIn,postIssue)

export default router;