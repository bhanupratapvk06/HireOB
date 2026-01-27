const redisRateLimiter = require("./redisRateLimiter");

const loginLimiter = redisRateLimiter({
  windowSec: 60,
  maxRequests: 5,
  keyPrefix: "login"
});

const registerLimiter = redisRateLimiter({
  windowSec: 60,
  maxRequests: 5,
  keyPrefix: "register"
});

const applyJobLimiter = redisRateLimiter({
  windowSec: 60 * 60,
  maxRequests: 10,
  keyPrefix: "apply-job"
});

const getJobsLimiter = redisRateLimiter({
  windowSec: 15 * 60,
  maxRequests: 100,
  keyPrefix: "get-jobs"
});

module.exports = {
  loginLimiter,
  registerLimiter,
  applyJobLimiter,
  getJobsLimiter
};
