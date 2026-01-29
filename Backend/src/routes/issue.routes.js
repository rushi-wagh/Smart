import express from "express";
import { deleteIssue, getAllIssues, getCategoryHeatmap, myIssues, postIssue, updateIssueStatus } from "../controllers/issue.controllers.js";
import {isLoggedIn} from "../middleware/auth.middleware.js"
import upload from "../utils/multer.js"

const router = express.Router()

router.post('/create',isLoggedIn,upload.single('image'),postIssue)
router.get('/my-issues',isLoggedIn,myIssues)
router.patch('/update-status/:issueId',isLoggedIn,updateIssueStatus)
router.get('/all-issues',isLoggedIn,getAllIssues)
router.delete('/delete/:issueId',isLoggedIn,deleteIssue)
router.get("/heatmap", isLoggedIn, getCategoryHeatmap);



export default router;