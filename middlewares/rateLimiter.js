import {redisRateLimiter} from "./redisRateLimiter.js";

export const loginLimiter = redisRateLimiter({
  windowSec: 60,
  maxRequests: 5,
  keyPrefix: "login"
});

export const registerLimiter = redisRateLimiter({
  windowSec: 60,
  maxRequests: 5,
  keyPrefix: "register"
});

export const applyJobLimiter = redisRateLimiter({
  windowSec: 60 * 60,
  maxRequests: 10,
  keyPrefix: "apply-job"
});

export const getJobsLimiter = redisRateLimiter({
  windowSec: 15 * 60,
  maxRequests: 100,
  keyPrefix: "get-jobs"
});