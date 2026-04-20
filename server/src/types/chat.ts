import { z } from "zod";

export const HISTORY_ROLE = z.enum(["user", "ai"]);

export const CHAT_HISTORY_ITEM_SCHEMA = z.object({
    role: HISTORY_ROLE,
    text: z.string().trim().min(1).max(1200),
});

export const CHAT_REQUEST_SCHEMA = z.object({
    message: z.string().trim().min(1),
    history: z.array(CHAT_HISTORY_ITEM_SCHEMA).max(12).optional(),
});

export type ChatHistoryItem = z.infer<typeof CHAT_HISTORY_ITEM_SCHEMA>;
export type ChatRequest = z.infer<typeof CHAT_REQUEST_SCHEMA>;

export type ChatResponse = {
    reply: string;
    meta: {
        model: string;
        provider: "gemini";
    };
};
