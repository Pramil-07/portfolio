import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
    "Tech stack",
    "Projects",
    "Experience",
    "Availability",
];

type Message = { role: "user" | "ai"; text: string };

const SendIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" style={{ fill: "#a5b4fc" }}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

const TypingDots = () => (
    <div className="flex justify-start">
        <div className="px-3 py-2.5 rounded-2xl rounded-bl-sm"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)" }}>
            <span className="inline-flex gap-1 items-center">
                {[0, 150, 300].map((d) => (
                    <span key={d} className="w-1 h-1 rounded-full animate-bounce"
                        style={{ background: "rgba(255,255,255,0.4)", animationDelay: `${d}ms` }} />
                ))}
            </span>
        </div>
    </div>
);

function MessageList({ messages, loading, endRef }: {
    messages: Message[];
    loading: boolean;
    endRef: React.RefObject<HTMLDivElement | null>;
}) {
    return (
        <>
            {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="text-xs leading-relaxed px-3 py-2 rounded-2xl max-w-[80%]"
                        style={{
                            background: m.role === "user" ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.05)",
                            color: m.role === "user" ? "#c7d2fe" : "#eef6ff",
                            border: m.role === "user" ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.14)",
                            borderBottomRightRadius: m.role === "user" ? 4 : undefined,
                            borderBottomLeftRadius: m.role === "ai" ? 4 : undefined,
                        }}>
                        {m.text}
                    </div>
                </div>
            ))}
            {loading && <TypingDots />}
            <div ref={endRef} />
        </>
    );
}

export default function HeroChat({ card = false }: { card?: boolean }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [aiReady, setAiReady] = useState(true);
    const [aiStatusMessage, setAiStatusMessage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const rawApiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
    const API_BASE_URL = rawApiBaseUrl ? rawApiBaseUrl.replace(/\/+$/, "") : "";
    const PROFILE_NAME = (import.meta.env.VITE_PROFILE_NAME as string | undefined) ?? "Portfolio Owner";
    const PROFILE_TITLE = (import.meta.env.VITE_PROFILE_TITLE as string | undefined) ?? "Full Stack Developer";
    const PROFILE_INITIALS =
        (import.meta.env.VITE_PROFILE_INITIALS as string | undefined) ??
        PROFILE_NAME.split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0]?.toUpperCase() ?? "")
            .join("");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        let mounted = true;

        const checkAiHealth = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/ai/health`);
                const data = await res.json().catch(() => ({}));

                if (!mounted) return;

                if (!res.ok || data?.aiReady === false) {
                    setAiReady(false);
                    setAiStatusMessage(data?.message ?? "AI is temporarily unavailable.");
                    return;
                }

                setAiReady(true);
                setAiStatusMessage(null);
            } catch {
                if (!mounted) return;
                setAiReady(false);
                setAiStatusMessage("AI server is unreachable right now.");
            }
        };

        void checkAiHealth();

        return () => {
            mounted = false;
        };
    }, [API_BASE_URL]);

    const ask = async (question: string) => {
        if (!question.trim() || loading) return;
        if (!aiReady) {
            setMessages((prev) => [
                ...prev,
                { role: "ai", text: aiStatusMessage ?? "AI is temporarily unavailable. Please try again later." },
            ]);
            return;
        }
        const newMessages: Message[] = [...messages, { role: "user", text: question }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: question,
                    history: messages,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error ?? "AI request failed");
            }
            const aiText = data.reply ?? "Sorry, I couldn't get a response right now.";
            setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
        } catch {
            setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const inputBar = (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask(input)}
                disabled={!aiReady}
                placeholder="Ask about skills, projects, or availability…"
                className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-white/45"
            />
            <button onClick={() => ask(input)} disabled={loading || !input.trim() || !aiReady}
                className="flex-none p-1.5 rounded cursor-pointer"
                style={{
                    background: "rgba(99,102,241,0.24)",
                    opacity: loading || !input.trim() || !aiReady ? 0.35 : 1,
                    transition: "opacity 0.2s",
                }}
                aria-label="Send">
                <SendIcon />
            </button>
        </div>
    );

    if (card) {
        return (
            <div className="w-full flex flex-col rounded-2xl overflow-hidden"
                style={{ background: "#121216", border: "1px solid rgba(255,255,255,0.14)", flex: 1 }}>

                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                    <div className="size-9 rounded-full flex-none flex items-center justify-center text-[11px] font-medium"
                        style={{
                            background: "#161625",
                            border: "1px solid rgba(99,102,241,0.35)",
                            color: "#c7d2fe",
                            letterSpacing: "0.3px",
                        }}>
                        {PROFILE_INITIALS || "PO"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white leading-tight">{PROFILE_NAME}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.62)" }}>
                            {PROFILE_TITLE}
                        </p>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wide flex-none"
                        style={{
                            background: "rgba(99,102,241,0.14)",
                            color: "rgba(199,210,254,0.95)",
                            border: "1px solid rgba(99,102,241,0.28)",
                            letterSpacing: "0.5px",
                        }}>
                        AI
                    </span>
                </div>

                {/* Body */}
                <div className="px-5 pt-5 pb-3 flex-1 overflow-hidden flex flex-col">
                    {messages.length === 0 ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full flex-none animate-pulse"
                                    style={{ background: "#4ade80" }} />
                                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.58)" }}>
                                    Ask me anything
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {SUGGESTIONS.map((s) => (
                                    <button key={s} onClick={() => ask(s)}
                                        className="text-[11px] px-3 py-1.5 rounded cursor-pointer transition-colors duration-150"
                                        style={{
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            color: "rgba(255,255,255,0.78)",
                                        }}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div className="rounded-xl p-4"
                                style={{
                                    background: "rgba(99,102,241,0.14)",
                                    border: "1px solid rgba(99,102,241,0.24)",
                                }}>
                                <p className="text-[9px] uppercase tracking-widest mb-2"
                                    style={{ color: "rgba(199,210,254,0.85)" }}>
                                    Assistant
                                </p>
                                <p className="text-xs leading-relaxed font-light"
                                    style={{ color: "rgba(255,255,255,0.9)" }}>
                                    {`Hi — I can walk you through ${PROFILE_NAME}'s work, skills, and how to work together. What would you like to explore?`}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2 overflow-y-auto flex-1"
                            style={{ scrollbarWidth: "none" }}>
                            <MessageList messages={messages} loading={loading} endRef={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="px-5 pb-4 pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                    {inputBar}
                    {!aiReady && (
                        <p className="text-[10px] mt-2" style={{ color: "rgba(248,113,113,0.92)" }}>
                            {aiStatusMessage ?? "AI is currently unavailable."}
                        </p>
                    )}
                    <p className="text-[9px] mt-1.5 text-right"
                        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.3px" }}>
                        Powered by Gemini
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c7d2fe" }} />
                <p className="text-xs text-white-50">Ask anything about me</p>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded font-semibold"
                    style={{ background: "rgba(99,102,241,0.18)", color: "#c7d2fe", border: "1px solid rgba(99,102,241,0.3)" }}>
                    AI
                </span>
            </div>
            {messages.length === 0 ? (
                <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                        <button key={s} onClick={() => ask(s)}
                            className="text-xs px-3 py-1.5 rounded-full cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#eef6ff" }}>
                            {s}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="space-y-2 mb-3 overflow-y-auto" style={{ maxHeight: 180, scrollbarWidth: "none" }}>
                    <MessageList messages={messages} loading={loading} endRef={messagesEndRef} />
                </div>
            )}
            <div className="mt-3">{inputBar}</div>
        </div>
    );
}
