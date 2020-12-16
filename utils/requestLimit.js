const rateLimit = require("express-rate-limit");

const productLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

const orderLimiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 15 minutes
  max: 100,
});

const stripeLimiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 15 minutes
  max: 100,
});

const adminAccessLimiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 15 minutes
  max: 10,
});

module.exports = {
  productLimiter,
  orderLimiter,
  stripeLimiter,
  adminAccessLimiter,
};
