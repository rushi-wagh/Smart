import express from 'express';

import { approveClaim, claimItem, createFoundItem, createLostItem, getLostFoundItemById, getLostFoundItems, rejectClaim } from '../controllers/lost-found.controllers.js';
import upload from '../utils/multer.js';
import { isAllowed, isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/lost',isLoggedIn,upload.single('images'), createLostItem);
router.post('/found',isLoggedIn,upload.single('images'), createFoundItem);
router.get('/',isLoggedIn, getLostFoundItems);
router.post('/claim/:id',isLoggedIn,upload.single('proof'), claimItem);
router.post('/claim/approve/:id',isLoggedIn,isAllowed("admin"), approveClaim);
router.post('/claim/reject/:id',isLoggedIn,isAllowed("admin"), rejectClaim);
router.get("/:id", isLoggedIn, getLostFoundItemById);


export default router;