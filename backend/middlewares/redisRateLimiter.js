import redis from "../configs/redis.js";

export const redisRateLimiter = ({ windowSec, maxRequests, keyPrefix }) => {
  return async (req, res, next) => {
    try {
      const ip = req.ip;

      if (!windowSec || !maxRequests || !keyPrefix) {
        throw new Error("Rate limiter configuration missing");
      }

      const key = `${keyPrefix}:${ip}`;

      const current = await redis.incr(key);

      if (current === 1) {
        await redis.expire(key, windowSec);
      }

      if (current > maxRequests) {
        return res.status(429).json({
          message: "Too many requests. Please try again later."
        });
      }

      next();
    } catch (error) {
      console.error("Rate limit error:", error.message);
      next();
    }
  };
};
