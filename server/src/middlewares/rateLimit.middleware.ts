import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5, // because max is deprecated
  message: {
    message:
      "Too many OTP requests from this IP, please try again after 5 minutes.",
  },
});
