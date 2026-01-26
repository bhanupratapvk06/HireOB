const express = require('express');
const { appJob, viewApplication } = require('../controllers/application.controller.js');
const upload = require('../configs/upload.js');
const authMiddleware = require('../middlewares/auth.js');
const checkAuth = require('../middlewares/role');

const router = express.Router();

router.post('/apply/:jobId',authMiddleware,checkAuth('student'),upload.single("resume"),appJob);
router.get('/viewApplications',authMiddleware,checkAuth('recruiter'),viewApplication);


module.exports = router;