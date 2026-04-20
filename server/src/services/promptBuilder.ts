import { env } from "../config/env";

export const UNKNOWN_FACT_REPLY = "I don't have that in this portfolio yet.";

export function buildSystemInstruction(): string {
    const rules = [
        env.AI_SYSTEM_PROMPT,
        "",
        "Rules:",
        "- Use only facts from PROFILE_CONTEXT.",
        "- Do not invent companies, dates, projects, technologies, achievements, or contact details.",
        `- If information is missing from PROFILE_CONTEXT, reply with exactly: "${UNKNOWN_FACT_REPLY}"`,
        "- Keep responses concise (1-3 sentences).",
        "",
        "PROFILE_CONTEXT:",
        env.AI_PROFILE_CONTEXT,
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
