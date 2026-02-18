import {
  applyJob,
  viewApplicants,
  updateApplicationStatus,
  listAppliedJobs,
} from "../controllers/application.controller.js";
import express from "express";
import upload from "../configs/upload.js";
import {authMiddleware} from "../middlewares/auth.js";
import {checkAuth} from "../middlewares/role.js";
import { applyJobLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post('/:jobId/applications',authMiddleware,checkAuth('student'),upload.single("resume"),applyJobLimiter,applyJob);
router.get('/applications/me',authMiddleware,checkAuth('student'),listAppliedJobs);

router.get('/:jobId/applications',authMiddleware,checkAuth('recruiter'),viewApplicants);
router.patch('/applications/:applicationId',authMiddleware,checkAuth('recruiter'),updateApplicationStatus);


export default router;