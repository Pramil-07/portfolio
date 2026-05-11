import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
    {
        label: "Tech stack",
        prompt: "What is Pramil's tech stack across frontend, backend, databases, infrastructure, and testing?",
    },
    {
        label: "Projects",
        prompt: "Which portfolio projects best show Pramil's work, and what did he build in each one?",
    },
    {
        label: "Experience",
        prompt: "Summarize Pramil's recent experience, employers, and the kinds of products he has shipped.",
    },
    {
        label: "Availability",
        prompt: "Is Pramil available for freelance, contract, and remote work right now? How can someone hire or contact him?",
    },
] as const;

type Message = { role: "user" | "ai"; text: string };

const SendIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" style={{ fill: "var(--c-indigo)" }}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

const TypingDots = () => (
    <div className="flex justify-start pl-1">
        <span className="inline-flex gap-1 items-center py-2">
            {[0, 150, 300].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "var(--c-text-4)", animationDelay: `${d}ms` }} />
            ))}
        </span>
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
                    <div
                        className="text-xs leading-relaxed max-w-[82%]"
                        style={
                            m.role === "user"
                                ? {
                                    padding: "8px 14px",
                                    borderRadius: "16px 16px 4px 16px",
                                    background: "rgba(99,102,241,0.14)",
                                    color: "var(--c-indigo)",
                                    border: "1px solid rgba(99,102,241,0.22)",
                                }
                                : {
                                    padding: "2px 4px",
                                    color: "var(--c-text-2)",
                                }
                        }
                    >
                        {m.text}
                    </div>
                </div>
            ))}
            {loading && <TypingDots />}
            <div ref={endRef} />
        </>
    );
}

export default function HeroChat({ card = false, onThinking }: { card?: boolean; onThinking?: (v: boolean) => void }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onThinking?.(loading);
    }, [loading, onThinking]);
    const [aiReady, setAiReady] = useState(true);
    const [aiStatusMessage, setAiStatusMessage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatCardRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

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
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        }
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

    const scrollToChat = () => {
        if (!chatCardRef.current) return;
        const rect = chatCardRef.current.getBoundingClientRect();
        const isOutOfView = rect.bottom > window.innerHeight || rect.top < 0;
        if (isOutOfView) {
            chatCardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    };

    const ask = async (question: string) => {
        if (!question.trim() || loading) return;
        scrollToChat();
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
        <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{
                background: "var(--c-icon-subtle-bg)",
                border: "1px solid var(--c-border)",
            }}
        >
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask(input)}
                disabled={!aiReady}
                placeholder="Ask about skills, projects, or availability…"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--c-text)", caretColor: "var(--c-indigo)" }}
            />
            <button
                onClick={() => ask(input)}
                disabled={loading || !input.trim() || !aiReady}
                className="flex-none p-1.5 rounded-md cursor-pointer"
                style={{
                    background: "rgba(99,102,241,0.18)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    opacity: loading || !input.trim() || !aiReady ? 0.35 : 1,
                    transition: "opacity 0.2s",
                }}
                aria-label="Send"
            >
                <SendIcon />
            </button>
        </div>
    );

    if (card) {
        return (
            <div
                ref={chatCardRef}
                className="w-full flex flex-col"
                style={{ flex: 1, minHeight: 0 }}
            >
                {/* Message area */}
                <div className="flex-1 overflow-hidden flex flex-col px-7 pt-4 pb-2" style={{ minHeight: 0 }}>
                    {messages.length === 0 ? (
                        <div className="flex flex-col gap-5 justify-center flex-1">
                            {/* Greeting */}
                            <div>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "var(--c-text-2)" }}
                                >
                                    {`Hi — I can walk you through ${PROFILE_NAME}'s work, skills, and how to work together. What would you like to explore?`}
                                </p>
                            </div>

                            {/* Suggestion chips */}
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTIONS.map((suggestion) => (
                                    <button
                                        key={suggestion.label}
                                        onClick={() => ask(suggestion.prompt)}
                                        className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all duration-150"
                                        style={{
                                            background: "var(--c-card-bg)",
                                            border: "1px solid var(--c-border)",
                                            color: "var(--c-text-3)",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border-strong)";
                                            (e.currentTarget as HTMLButtonElement).style.color = "var(--c-text-2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)";
                                            (e.currentTarget as HTMLButtonElement).style.color = "var(--c-text-3)";
                                        }}
                                    >
                                        {suggestion.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div
                            ref={messagesContainerRef}
                            className="space-y-3 overflow-y-auto flex-1"
                            style={{ scrollbarWidth: "none" }}
                        >
                            <MessageList messages={messages} loading={loading} endRef={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className="px-6 pb-5 pt-3 flex flex-col gap-2">
                    {inputBar}
                    {!aiReady && (
                        <p className="text-[10px]" style={{ color: "rgba(248,113,113,0.9)" }}>
                            {aiStatusMessage ?? "AI is currently unavailable."}
                        </p>
                    )}
                    <p
                        className="text-[10px] text-right"
                        style={{ color: "var(--c-text-4)", letterSpacing: "0.3px" }}
                    >
                        Powered by Gemini
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--c-green)" }} />
                <p className="text-xs" style={{ color: "var(--c-text-3)" }}>Ask anything about me</p>
                <span
                    className="ml-auto text-[9px] px-2 py-0.5 rounded font-semibold tracking-wide"
                    style={{ background: "var(--c-indigo-bg)", color: "var(--c-indigo)", border: "1px solid var(--c-indigo-border)" }}
                >
                    AI
                </span>
            </div>
            {messages.length === 0 ? (
                <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                        <button
                            key={suggestion.label}
                            onClick={() => ask(suggestion.prompt)}
                            className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all duration-150"
                            style={{ background: "var(--c-card-bg)", border: "1px solid var(--c-border)", color: "var(--c-text-3)" }}
                        >
                            {suggestion.label}
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
