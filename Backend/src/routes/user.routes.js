import express from 'express';
import { getUserProfile, updateProfile } from '../controllers/user.controllers.js';
import {isLoggedIn} from "../middleware/auth.middleware.js";


const router = express.Router();

router.put('/update-profile',isLoggedIn, updateProfile);
router.get('/profile', isLoggedIn, getUserProfile);

export default router;