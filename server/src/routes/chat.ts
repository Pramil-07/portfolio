import { Router } from "express";
import { getEnv, hasConfiguredGeminiKey } from "../config/env";
import { aiRateLimiter } from "../middleware/rateLimit";
import { type RequestWithValidatedBody, validateBody } from "../middleware/validate";
import { GeminiProviderError, generatePortfolioReply } from "../services/geminiClient";
import { CHAT_REQUEST_SCHEMA, type ChatRequest, type ChatResponse } from "../types/chat";

const chatRouter = Router();

chatRouter.post(
    "/",
    aiRateLimiter,
    validateBody(CHAT_REQUEST_SCHEMA),
    async (req: RequestWithValidatedBody<ChatRequest>, res) => {
        const env = getEnv();
        const payload = req.validatedBody;
        if (!payload) {
            res.status(400).json({ error: "Invalid request payload" });
            return;
        }
        if (!hasConfiguredGeminiKey()) {
            res.status(503).json({ error: "AI server not configured. Set a valid GEMINI_API_KEY." });
            return;
        }

        try {
            const message = payload.message.slice(0, env.AI_MAX_INPUT_CHARS);
            const history = (payload.history ?? []).slice(-12);
            const generated = await generatePortfolioReply({ message, history });

            const response: ChatResponse = {
                reply: generated.reply,
                meta: {
                    model: generated.model,
                    provider: "gemini",
                },
            };

            res.status(200).json(response);
        } catch (error) {
            if (error instanceof GeminiProviderError) {
                res.status(502).json({ error: "AI provider unavailable. Please try again." });
                return;
            }

            res.status(500).json({ error: "Unexpected server error. Please try again." });
        }
    }
);

export default chatRouter;
