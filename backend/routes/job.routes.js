import express from "express";

import { checkAuth } from "../middlewares/role.js";
import { authMiddleware } from "../middlewares/auth.js";

import {
  createJob,
  getJobsForStudent,
  editJob,
  deleteJob,
  getRecruiterPostedJobs,
} from "../controllers/job.controller.js";

import { getJobsLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post('/', authMiddleware, checkAuth("recruiter"), createJob);

router.patch('/:jobId', authMiddleware, checkAuth("recruiter"), editJob);

router.delete('/:jobId', authMiddleware, checkAuth("recruiter"), deleteJob);

router.get('/my-jobs', authMiddleware, checkAuth("recruiter"), getRecruiterPostedJobs);

router.get('/', getJobsLimiter, getJobsForStudent);

export default router;