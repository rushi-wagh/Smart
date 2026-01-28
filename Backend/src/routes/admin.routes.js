import express from "express";
import { getCountOfIssues } from "../controllers/admin.controllers";


const router = express.Router();
router.get('/count',isLoggedIn,isAllowed("admin"), getCountOfIssues);

export default router