import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const aiRateLimiter = rateLimit({
    windowMs: env.AI_RATE_LIMIT_WINDOW_MS,
    limit: env.AI_RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests. Please try again shortly." },
});
