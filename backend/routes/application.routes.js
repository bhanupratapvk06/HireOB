import {
  appJob,
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

router.post('/apply/:jobId',authMiddleware,checkAuth('student'),upload.single("resume"),applyJobLimiter,appJob);
router.get('/appliedJobs',authMiddleware,checkAuth('student'),listAppliedJobs);

router.get('/viewApplicants/:jobId',authMiddleware,checkAuth('recruiter'),viewApplicants);
router.patch('/updateApplicantStatus/:id',authMiddleware,checkAuth('recruiter'),updateApplicationStatus);


export default router;