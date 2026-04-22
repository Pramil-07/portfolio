import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const PLACEHOLDER_GEMINI_KEY = "replace_with_your_server_key";
const ROOT_ENV_PATH = path.resolve(__dirname, "../../../.env");
const SERVER_ENV_PATH = path.resolve(__dirname, "../../.env");

const ENV_SCHEMA = z.object({
    NODE_ENV: z.string().optional(),
    PORT: z.coerce.number().int().positive().default(3000),
    GEMINI_API_KEY: z.string().trim().min(1, "GEMINI_API_KEY is required"),
    GEMINI_MODEL: z.string().trim().min(1).default("gemini-2.5-flash-lite"),
    AI_SYSTEM_PROMPT: z.string().trim().min(1, "AI_SYSTEM_PROMPT is required"),
    AI_PROFILE_CONTEXT: z.string().trim().min(1, "AI_PROFILE_CONTEXT is required"),
    AI_MAX_INPUT_CHARS: z.coerce.number().int().min(50).max(4000).default(1000),
    AI_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().min(1000).default(60000),
    AI_RATE_LIMIT_MAX: z.coerce.number().int().min(1).max(300).default(20),
});

function loadEnvData() {
    dotenv.config({ path: ROOT_ENV_PATH, override: true });
    dotenv.config({ path: SERVER_ENV_PATH, override: false });

    const parsed = ENV_SCHEMA.safeParse(process.env);

    if (!parsed.success) {
        const details = parsed.error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join("; ");
        throw new Error(`Invalid server environment: ${details}`);
    }

    return parsed.data;
}

export function getEnv() {
    return loadEnvData();
}

export const env = getEnv();

export function hasConfiguredGeminiKey(): boolean {
    return getEnv().GEMINI_API_KEY.trim() !== PLACEHOLDER_GEMINI_KEY;
}
