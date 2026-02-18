import express from 'express';
import { authMiddleware } from "../middlewares/auth.js";
import {createProfile,getProfile,editProfile,deleteProfile,uploadResume} from "../controllers/profile.controller.js";
import upload from '../configs/upload.js';
const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.get('/', authMiddleware, getProfile);
router.patch('/', authMiddleware, editProfile);
router.delete('/', authMiddleware, deleteProfile);

router.patch('/resume',authMiddleware,upload.single("resume"),uploadResume);

export default router;