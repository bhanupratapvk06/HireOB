import express from "express";

import {checkAuth} from "../middlewares/role.js";
import {authMiddleware} from "../middlewares/auth.js";

import {
  createJob,
  getJobsForStudent,
  editJob,
  deleteJob,
  getRecruiterPostedJobs,
} from "../controllers/job.controller.js";

import { getJobsLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();


router.post('/createjob',authMiddleware,checkAuth("recruiter"),createJob);

router.patch('/editJob/:jobId',authMiddleware,checkAuth("recruiter"),editJob);

router.delete('/deleteJob/:jobId',authMiddleware,checkAuth("recruiter"),deleteJob);

router.get('/getPostedJobs',authMiddleware,checkAuth('recruiter'),getRecruiterPostedJobs);

router.get('/getStudentJobs',getJobsLimiter,getJobsForStudent);

export default router;