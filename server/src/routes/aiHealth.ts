import { Router } from "express";
import { getEnv, hasConfiguredGeminiKey } from "../config/env";

const aiHealthRouter = Router();

aiHealthRouter.get("/", (_req, res) => {
    const env = getEnv();

    if (!hasConfiguredGeminiKey()) {
        res.status(503).json({
            status: "degraded",
            aiReady: false,
            provider: "gemini",
            model: env.GEMINI_MODEL,
            message: "AI server not configured. Set a valid GEMINI_API_KEY.",
        });
        return;
    }

    res.status(200).json({
        status: "ok",
        aiReady: true,
        provider: "gemini",
        model: env.GEMINI_MODEL,
    });
});

export default aiHealthRouter;
