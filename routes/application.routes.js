const express = require('express');
const { appJob, viewApplicants, updateApplicationStatus, listAppliedJobs } = require('../controllers/application.controller.js');
const upload = require('../configs/upload.js');
const authMiddleware = require('../middlewares/auth.js');
const checkAuth = require('../middlewares/role');
const { applyJobLimiter } = require('../middlewares/rateLimiter.js');

const router = express.Router();

router.post('/apply/:jobId',authMiddleware,checkAuth('student'),upload.single("resume"),applyJobLimiter,appJob);
router.get('/appliedJobs',authMiddleware,checkAuth('student'),listAppliedJobs);

router.get('/viewApplicants/:jobId',authMiddleware,checkAuth('recruiter'),viewApplicants);
router.patch('/updateApplicantStatus/:id',authMiddleware,checkAuth('recruiter'),updateApplicationStatus);


module.exports = router;