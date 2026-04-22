import { getEnv } from "../config/env";
import type { ChatHistoryItem } from "../types/chat";
import { buildSystemInstruction, normalizeReply } from "./promptBuilder";

type GeminiContent = {
    role: "user" | "model";
    parts: Array<{ text: string }>;
};

type GeminiGenerateResponse = {
    candidates?: Array<{
        content?: {
            parts?: Array<{ text?: string }>;
        };
    }>;
    error?: {
        message?: string;
    };
};

export class GeminiProviderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GeminiProviderError";
    }
}

function mapHistoryToGemini(history: ChatHistoryItem[]): GeminiContent[] {
    return history.map((item) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }],
    }));
}

export async function generatePortfolioReply(params: {
    message: string;
    history: ChatHistoryItem[];
}): Promise<{ reply: string; model: string }> {
    const { message, history } = params;
    const env = getEnv();

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;
    const contents: GeminiContent[] = [...mapHistoryToGemini(history), { role: "user", parts: [{ text: message }] }];

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: buildSystemInstruction() }],
                },
                generationConfig: {
                    temperature: 0.2,
                    topP: 0.8,
                    maxOutputTokens: 220,
                },
                contents,
            }),
        });

        const rawBody = await response.text();
        const data = (rawBody ? JSON.parse(rawBody) : {}) as GeminiGenerateResponse;

        if (!response.ok) {
            throw new GeminiProviderError(data?.error?.message ?? `Gemini request failed with status ${response.status}`);
        }

        const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawReply || !rawReply.trim()) {
            throw new GeminiProviderError("Gemini returned an empty response");
        }

        return {
            reply: normalizeReply(rawReply),
            model: env.GEMINI_MODEL,
        };
    } catch (error) {
        if (error instanceof GeminiProviderError) {
            throw error;
        }

        throw new GeminiProviderError("Failed to reach AI provider");
    }
}
