import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
    "What tech stack do you use?",
    "Tell me about your projects",
    "How can I contact you?",
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M22 2L11 13" stroke="#62e0ff" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#62e0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                            background: m.role === "user" ? "rgba(98,224,255,0.12)" : "rgba(255,255,255,0.05)",
                            color: m.role === "user" ? "#62e0ff" : "#d9ecff",
                            border: m.role === "user" ? "1px solid rgba(98,224,255,0.25)" : "1px solid rgba(255,255,255,0.07)",
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
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask(input)}
                placeholder="Ask about my skills, projects, experience..."
                className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-white/25"
            />
            <button onClick={() => ask(input)} disabled={loading || !input.trim()}
                className="flex-none transition-opacity duration-200 p-1"
                style={{ opacity: loading || !input.trim() ? 0.25 : 1 }} aria-label="Send">
                <SendIcon />
            </button>
        </div>
    );

    /* ── CARD MODE (full-width, used everywhere) ── */
    if (card) {
        return (
            <div className="w-full flex flex-col rounded-2xl overflow-hidden"
                style={{
                    background: "rgba(14,14,16,0.82)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 0 60px rgba(98,224,255,0.04), 0 20px 40px rgba(0,0,0,0.35)",
                }}>

                {/* ── Header: avatar + name + label + available badge ── */}
                <div className="flex items-center gap-4 px-5 py-4 flex-wrap gap-y-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

                    {/* Avatar + identity */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="size-10 rounded-full overflow-hidden flex-none"
                            style={{ border: "2px solid rgba(98,224,255,0.35)", boxShadow: "0 0 10px rgba(98,224,255,0.15)" }}>
                            <img src="/images/Herosection.png" alt="Pramil"
                                className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-white text-sm leading-tight">Pramil Dhungana</p>
                            <p className="text-xs mt-0.5" style={{ color: "#839cb5" }}>Full Stack Developer</p>
                        </div>
                    </div>

                    {/* AI badge */}
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide flex-none"
                        style={{ background: "rgba(98,224,255,0.1)", color: "#62e0ff", border: "1px solid rgba(98,224,255,0.2)" }}>
                        AI
                    </span>
                </div>

                {/* ── Body: suggestions or messages ── */}
                <div className="px-5 pt-4 pb-3 flex-1 overflow-hidden">
                    {messages.length === 0 ? (
                        <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-none" style={{ background: "#62e0ff" }} />
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Ask me anything about Pramil</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTIONS.map((s, i) => (
                                <button key={i} onClick={() => ask(s)}
                                    className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:text-white hover:border-[rgba(98,224,255,0.35)]"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#d9ecff" }}>
                                    {s}
                                </button>
                            ))}
                        </div>
                        </div>
                    ) : (
                        <div className="space-y-2 overflow-y-auto" style={{ maxHeight: 220, scrollbarWidth: "none" }}>
                            <MessageList messages={messages} loading={loading} endRef={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* ── Input ── */}
                <div className="px-5 pb-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {inputBar}
                    <p className="text-[10px] mt-1.5 text-right" style={{ color: "rgba(255,255,255,0.16)" }}>
                        Powered by Gemini
                    </p>
                </div>
            </div>
        );
    }

    /* ── INLINE FALLBACK (not used in current layout but kept for safety) ── */
    return (
        <div className="w-full relative z-10">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#62e0ff" }} />
                <p className="text-xs text-white-50">Ask anything about me</p>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: "rgba(98,224,255,0.1)", color: "#62e0ff", border: "1px solid rgba(98,224,255,0.2)" }}>
                    AI
                </span>
            </div>
            {messages.length === 0 ? (
                <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s, i) => (
                        <button key={i} onClick={() => ask(s)}
                            className="text-xs px-3 py-1.5 rounded-full"
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
