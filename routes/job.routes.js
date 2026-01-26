const express = require('express');
const checkAuth = require('../middlewares/role.js');
const authMiddleware = require('../middlewares/auth.js');
const { createJob, getJobs } = require('../controllers/job.controller.js');
const router = express.Router();

router.get('/getjobs',getJobs);
router.post('/createjob',authMiddleware,checkAuth("recruiter"),createJob);

module.exports = router;
