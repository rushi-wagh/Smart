import express from "express"
import { getStaffTasks, staffUpdateStatus } from "../controllers/staff.controllers.js"
import { isLoggedIn,isAllowed } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get('/tasks',isLoggedIn,isAllowed("staff","admin"), getStaffTasks)
router.patch('/tasks/:issueId/status',isLoggedIn,isAllowed("staff","admin"), staffUpdateStatus)

export default router