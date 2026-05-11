import { getEnv } from "../config/env";

export const UNKNOWN_FACT_REPLY = "I don't have that in this portfolio yet.";
const DEFAULT_SYSTEM_PROMPT =
    "You are a concise AI assistant for this portfolio website. Answer only with information grounded in the provided profile context.";
const DEFAULT_PROFILE_CONTEXT =
    "Profile context is not configured yet. Reply only with the unknown-fact fallback when asked for portfolio-specific details.";

export function buildSystemInstruction(): string {
    const env = getEnv();
    const systemPrompt = env.AI_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;
    const profileContext = env.AI_PROFILE_CONTEXT || DEFAULT_PROFILE_CONTEXT;
    const rules = [
        systemPrompt,
        "",
        "Rules:",
        "- Use only facts from PROFILE_CONTEXT.",
        "- Do not invent companies, dates, projects, technologies, achievements, or contact details.",
        `- If information is missing from PROFILE_CONTEXT, reply with exactly: "${UNKNOWN_FACT_REPLY}"`,
        "- Keep responses concise (1-4 sentences). For product or service questions, lead with what can be built and the tech stack, then mention relevant proof from past projects.",
        "",
        "PROFILE_CONTEXT:",
        profileContext,
    ];

    return rules.join("\n");
}

export function normalizeReply(text: string | undefined): string {
    const normalized = (text ?? "").trim();
    if (!normalized) return UNKNOWN_FACT_REPLY;

    if (/i\s+(do not|don't)\s+have\s+that\s+in\s+this\s+portfolio\s+yet\.?/i.test(normalized)) {
        return UNKNOWN_FACT_REPLY;
    }

    return normalized;
}
