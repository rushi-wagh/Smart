import express from 'express';
import { getStaffByDepartment, getUserProfile, updateProfile } from '../controllers/user.controllers.js';
import {isAllowed, isLoggedIn} from "../middleware/auth.middleware.js";


const router = express.Router();

router.put('/update-profile',isLoggedIn, updateProfile);
router.get('/profile', isLoggedIn, getUserProfile);
router.get('/staff-by-department', isLoggedIn,isAllowed('admin'), getStaffByDepartment);

export default router;