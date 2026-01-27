import express from "express"
import { createAnnouncement, getAnnouncements } from "../controllers/announcement.controllers.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/post',isLoggedIn,createAnnouncement)
router.get('/',isLoggedIn,getAnnouncements)

export default router;