const express = require('express');
const checkAuth = require('../middlewares/role.js');
const authMiddleware = require('../middlewares/auth.js');
const {
    createJob,
    getJobsForStudent,
    editJob,
    deleteJob
} = require('../controllers/job.controller.js');
const { getRecruiterPostedJobs } = require('../controllers/job.controller.js');
const { getJobsLimiter } = require('../middlewares/rateLimiter.js');

const router = express.Router();

router.post('/createjob',authMiddleware,checkAuth("recruiter"),createJob);

router.patch('/editJob/:jobId',authMiddleware,checkAuth("recruiter"),editJob);

router.delete('/deleteJob/:jobId',authMiddleware,checkAuth("recruiter"),deleteJob);

router.get('/getPostedJobs',authMiddleware,checkAuth('recruiter'),getRecruiterPostedJobs);

router.get('/getStudentJobs',getJobsLimiter,getJobsForStudent);

module.exports = router;
