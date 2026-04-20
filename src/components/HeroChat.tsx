import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
    "Tech stack",
    "Projects",
    "Experience",
    "Availability",
];

const SYSTEM_PROMPT = `You are a friendly AI assistant embedded in Pramil Dhungana's portfolio website. Answer visitor questions about Pramil concisely (2–4 sentences max). Stay on-topic — if asked about anything unrelated to Pramil or his work, politely redirect.

About Pramil Dhungana:
- Full Stack Developer based in Kathmandu, Nepal
- 1.5+ years professional experience, 8+ projects delivered

Experience:
- NepaWorks (Jan 2026 – Present): Building full-stack features for NepaStore and SellrClub using React, TypeScript, FastAPI, PostgreSQL, Redis, Docker
- CAGTU Nepal — Full Stack Developer (Nov 2024 – Jan 2026): Built Homaale, Buzz, Merchant Dashboard, CAGTU CMS, Mitho Sweets using Next.js, React, Django, PostgreSQL, REST APIs. Integrated Khalti/eSewa payments, Google OAuth
- CAGTU Nepal — Full Stack Intern (Aug 2024 – Nov 2024): UI components, API connections, responsive design

Tech Stack: React, Next.js, TypeScript, Tailwind CSS, FastAPI, Django, Node.js, PostgreSQL, Redis, Docker, Git

Projects:
- NepaStore: E-commerce with auth, cart, orders, admin panel
- SellrClub: Workspace management with notifications, time-tracking, SMTP
- Homaale: Service booking with merchant management and map integration
- Buzz: API platform
- Mitho Sweets: E-commerce for confectionery
- CAGTU CMS: Internal content management system

Contact:
- Email: pramildhungana7@gmail.com
- LinkedIn: linkedin.com/in/pramil-dhungana
- GitHub: github.com/Pramil-07`;

type Message = { role: "user" | "ai"; text: string };

const SendIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" style={{ fill: "#818cf8" }}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

const TypingDots = () => (
    <div className="flex justify-start">
        <div className="px-3 py-2.5 rounded-2xl rounded-bl-sm"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
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
                            color: m.role === "user" ? "#818cf8" : "#d9ecff",
                            border: m.role === "user" ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(255,255,255,0.07)",
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const ask = async (question: string) => {
        if (!question.trim() || loading || !API_KEY) return;
        const newMessages: Message[] = [...messages, { role: "user", text: question }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                        contents: newMessages.map((m) => ({
                            role: m.role === "user" ? "user" : "model",
                            parts: [{ text: m.text }],
                        })),
                    }),
                }
            );
            const data = await res.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't get a response right now.";
            setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
        } catch {
            setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    if (!API_KEY) return null;

    const inputBar = (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask(input)}
                placeholder="Ask about skills, projects, or availability…"
                className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-white/20"
            />
            <button onClick={() => ask(input)} disabled={loading || !input.trim()}
                className="flex-none p-1.5 rounded cursor-pointer"
                style={{
                    background: "rgba(99,102,241,0.15)",
                    opacity: loading || !input.trim() ? 0.35 : 1,
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
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", flex: 1 }}>

                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="size-9 rounded-full flex-none flex items-center justify-center text-[11px] font-medium"
                        style={{
                            background: "#161625",
                            border: "1px solid rgba(99,102,241,0.2)",
                            color: "#818cf8",
                            letterSpacing: "0.3px",
                        }}>
                        PD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white leading-tight">Pramil Dhungana</p>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>
                            Full Stack Developer
                        </p>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wide flex-none"
                        style={{
                            background: "rgba(99,102,241,0.06)",
                            color: "rgba(99,102,241,0.6)",
                            border: "1px solid rgba(99,102,241,0.15)",
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
                                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                                    Ask me anything
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {SUGGESTIONS.map((s) => (
                                    <button key={s} onClick={() => ask(s)}
                                        className="text-[11px] px-3 py-1.5 rounded cursor-pointer transition-colors duration-150"
                                        style={{
                                            background: "rgba(255,255,255,0.025)",
                                            border: "1px solid rgba(255,255,255,0.07)",
                                            color: "rgba(255,255,255,0.38)",
                                        }}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div className="rounded-xl p-4"
                                style={{
                                    background: "rgba(99,102,241,0.06)",
                                    border: "1px solid rgba(99,102,241,0.1)",
                                }}>
                                <p className="text-[9px] uppercase tracking-widest mb-2"
                                    style={{ color: "rgba(99,102,241,0.5)" }}>
                                    Assistant
                                </p>
                                <p className="text-xs leading-relaxed font-light"
                                    style={{ color: "rgba(255,255,255,0.45)" }}>
                                    Hi — I can walk you through Pramil's work, skills, and how to work together. What would you like to explore?
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
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {inputBar}
                    <p className="text-[9px] mt-1.5 text-right"
                        style={{ color: "rgba(255,255,255,0.1)", letterSpacing: "0.3px" }}>
                        Powered by Gemini
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#818cf8" }} />
                <p className="text-xs text-white-50">Ask anything about me</p>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded font-semibold"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
                    AI
                </span>
            </div>
            {messages.length === 0 ? (
                <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                        <button key={s} onClick={() => ask(s)}
                            className="text-xs px-3 py-1.5 rounded-full cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#d9ecff" }}>
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
