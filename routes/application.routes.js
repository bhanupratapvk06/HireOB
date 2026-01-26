const express = require('express');
const { appJob, viewApplicants, updateStatus, listAppliedJobs } = require('../controllers/application.controller.js');
const upload = require('../configs/upload.js');
const authMiddleware = require('../middlewares/auth.js');
const checkAuth = require('../middlewares/role');

const router = express.Router();

router.post('/apply/:jobId',authMiddleware,checkAuth('student'),upload.single("resume"),appJob);
router.get('/appliedJobs',authMiddleware,checkAuth('student'),listAppliedJobs);

router.get('/viewApplicants/:jobId',authMiddleware,checkAuth('recruiter'),viewApplicants);
router.patch('/updateStatus/:id',authMiddleware,checkAuth('recruiter'),updateStatus);


module.exports = router;