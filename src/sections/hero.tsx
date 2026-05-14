import { useRef, useEffect, useState, useCallback } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Globe, Zap, Layers, Sparkles, X } from "lucide-react";
import type { GSAPTimeline } from "gsap";
import { resumeFile } from "../constants";
import { shouldReduceHeavyMotion } from "../utils/motion";
import HeroChat from "../components/HeroChat";
import AnimatedCounter from "../components/AnimatedCounter";

const SERVICES = [
    { label: "Web Apps",        Icon: Globe,    ai: false },
    { label: "REST APIs",       Icon: Zap,      ai: false },
    { label: "SaaS Products",   Icon: Layers,   ai: false },
    { label: "AI Integrations", Icon: Sparkles, ai: true  },
] as const;

const TYPEWRITER_PHRASES = ["Design.", "Build.", "Ship.", "AI Apps."];

/* ── Social icons ───────────────────────────────── */
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "var(--c-text-3)" }}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "var(--c-text-3)" }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "var(--c-text-3)" }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

/* ── Typewriter ─────────────────────────────────── */
const TypewriterHeading = ({ phrase, paused }: { phrase: string; paused: boolean }) => {
    const [text, setText] = useState(phrase);
    useEffect(() => {
        if (paused) { setText(phrase); return; }
        if (text === phrase) return;
        let timeout: number;
        const isPrefix = phrase.startsWith(text);
        if (!isPrefix) {
            timeout = window.setTimeout(() => setText(t => t.slice(0, -1)), 36);
        } else {
            timeout = window.setTimeout(() => setText(phrase.slice(0, text.length + 1)), 90);
        }
        return () => clearTimeout(timeout);
    }, [text, phrase, paused]);
    return (
        <span className="hero-tw-text" aria-live="polite">
            {text || " "}
            <span className="hero-tw-caret" aria-hidden="true" />
        </span>
    );
};

/* ── AI Robot Avatar ────────────────────────────── */
const RobotAvatar = ({ size = 48, talking = false }: { size?: number; talking?: boolean }) => (
    <div
        className={`robot-avatar${talking ? " robot-avatar--talking" : ""}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
    >
        <span className="robot-avatar__ring" />
        <span className="robot-avatar__ring robot-avatar__ring--2" />
        <div className="robot-avatar__core">
            <div className="robot-avatar__eyes">
                <span className="robot-avatar__eye" />
                <span className="robot-avatar__eye" />
            </div>
            <div className="robot-avatar__bars">
                {[0, 1, 2, 3, 4].map(i => (
                    <span key={i} className="robot-avatar__bar" style={{ animationDelay: `${i * 0.09}s` }} />
                ))}
            </div>
        </div>
    </div>
);

/* ── Hero ───────────────────────────────────────── */
export const Hero = () => {
    const heroRef  = useRef<HTMLElement>(null);
    const contentPanelRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const zoneRef  = useRef<HTMLDivElement>(null);
    const cursorOrbRef = useRef<HTMLSpanElement>(null);
    const chatTimelineRef = useRef<GSAPTimeline | null>(null);
    const reduceMotion = shouldReduceHeavyMotion();

    const [phraseIdx, setPhraseIdx]   = useState(0);
    const [activeChip, setActiveChip] = useState<number | null>(null);
    const [chatOpen, setChatOpen]     = useState(false);
    const [aiTalking, setAiTalking]   = useState(false);

    const isMobileChatLayout = useCallback(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(max-width: 900px)").matches;
    }, []);

    const getHeroContent = useCallback(
        () => heroRef.current?.querySelector<HTMLElement>(".hero-left-content") ?? null,
        []
    );

    const stopChatAnimations = useCallback(() => {
        chatTimelineRef.current?.kill();
        chatTimelineRef.current = null;

        const panel = panelRef.current;
        const zone = zoneRef.current;
        const content = getHeroContent();

        if (panel) gsap.killTweensOf(panel);
        if (zone) gsap.killTweensOf(zone);
        if (content) gsap.killTweensOf(content);
    }, [getHeroContent]);

    /* ── Open ── */
    const openChat = useCallback(() => {
        if (chatOpen) return;
        stopChatAnimations();
        setChatOpen(true);

        const panel = panelRef.current;
        const zone  = zoneRef.current;
        const content = getHeroContent();
        const isMobile = isMobileChatLayout();

        if (isMobile) {
            return;
        }

        if (!panel || reduceMotion) return;

        const chatInnerElements = panel.querySelectorAll(".chat-inner-anim");
        const robotAvatar = panel.querySelector(".chat-panel-head .robot-avatar");

        gsap.set(panel, { x: "100%", opacity: 0 });
        gsap.set(chatInnerElements, { y: 20, opacity: 0 });
        if (robotAvatar) {
            gsap.set(robotAvatar, { scale: 0.5, opacity: 0, rotation: -12 });
        }

        const timeline = gsap.timeline({
            defaults: { overwrite: "auto" },
            onComplete: () => {
                chatTimelineRef.current = null;
            },
        });

        if (zone) {
            timeline.to(zone, { opacity: 0, scale: 0.97, duration: 0.28, ease: "power2.in" }, 0);
        }

        if (content) {
            timeline.to(
                content,
                { filter: "brightness(0.5) blur(0.4px)", scale: 0.975, duration: 0.6, ease: "power2.inOut" },
                0
            );
        }

        timeline.to(panel, { x: "0%", opacity: 1, duration: 0.72, ease: "expo.out" }, 0);

        if (chatInnerElements.length > 0) {
            timeline.to(
                chatInnerElements,
                { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" },
                0.3
            );
        }

        if (robotAvatar) {
            timeline.to(
                robotAvatar,
                { scale: 1, opacity: 1, rotation: 0, duration: 0.55, ease: "back.out(1.8)" },
                0.38
            );
        }

        chatTimelineRef.current = timeline;
    }, [chatOpen, getHeroContent, isMobileChatLayout, reduceMotion, stopChatAnimations]);

    /* ── Close ── */
    const closeChat = useCallback(() => {
        const panel = panelRef.current;
        const zone  = zoneRef.current;
        const content = getHeroContent();

        if (!panel || reduceMotion || isMobileChatLayout()) {
            setChatOpen(false);
            return;
        }
        stopChatAnimations();
        setChatOpen(false);

        const timeline = gsap.timeline({
            defaults: { overwrite: "auto" },
            onComplete: () => {
                chatTimelineRef.current = null;
            },
        });

        timeline.to(panel, { x: "100%", opacity: 0, duration: 0.42, ease: "power3.in" }, 0);

        if (content) {
            timeline.to(content, { filter: "brightness(1) blur(0px)", scale: 1, duration: 0.45, ease: "power2.out" }, 0.08);
        }

        if (zone) {
            timeline.to(zone, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.3)" }, 0.05);
        }

        chatTimelineRef.current = timeline;
    }, [getHeroContent, isMobileChatLayout, reduceMotion, stopChatAnimations]);

    /* ── Entrance animation ── */
    useGSAP(() => {
        if (reduceMotion) return;
        const tl = gsap.timeline({ delay: 3.9, defaults: { ease: "power3.out", willChange: "transform, opacity" } });
        tl
            .from(".hero-eyebrow",      { y: 12,  opacity: 0, duration: 0.5 })
            .from(".hero-heading",      { y: 28,  opacity: 0, duration: 0.7 }, "-=0.35")
            .from(".hero-anno",         { x: 12,  opacity: 0, duration: 0.5 }, "-=0.5")
            .from(".hero-desc",         { y: 14,  opacity: 0, duration: 0.55 }, "-=0.5")
            .from(".hero-actions",      { y: 12,  opacity: 0, duration: 0.5 }, "-=0.4")
            .from(".hero-service-chip", { y: 10,  opacity: 0, scale: 0.9, duration: 0.4, stagger: 0.06, ease: "back.out(1.5)" }, "-=0.3")
            .from(".hero-social-row",   { opacity: 0, duration: 0.4 }, "-=0.2")
            .from(".hero-ai-zone",      { x: 40,  opacity: 0, duration: 0.75, ease: "expo.out" }, "-=0.45");
    }, { scope: heroRef });

    /* ── Phrase + chip cycle ── */
    useGSAP(() => {
        if (reduceMotion) return;
        const tl = gsap.timeline({ repeat: -1, delay: 5.4 });
        tl.to({}, { duration: 3 });
        tl.call(() => setPhraseIdx(i => (i + 1) % TYPEWRITER_PHRASES.length));
        tl.to({}, { duration: 2.5 });
        tl.call(() => setActiveChip(0));
        tl.to({}, { duration: 0.7 });
        tl.call(() => setActiveChip(null));
        tl.to({}, { duration: 1.5 });
        tl.call(() => setActiveChip(3));
        tl.to({}, { duration: 0.85 });
        tl.call(() => setActiveChip(null));
        tl.to({}, { duration: 1 });
    }, { scope: heroRef });

    const handleHeroPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
        if (reduceMotion || !cursorOrbRef.current || !contentPanelRef.current) return;

        const bounds = contentPanelRef.current.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        gsap.to(cursorOrbRef.current, {
            x,
            y,
            opacity: 1,
            scale: 1,
            duration: 0.38,
            ease: "power3.out",
            overwrite: "auto",
        });
    }, [reduceMotion]);

    const handleHeroPointerLeave = useCallback(() => {
        if (reduceMotion || !cursorOrbRef.current) return;

        gsap.to(cursorOrbRef.current, {
            opacity: 0,
            scale: 0.82,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
        });
    }, [reduceMotion]);

    return (
        <section id="hero" ref={heroRef}>
            <div className="hero-shell">

                {/* ── LEFT: hero content ── */}
                <div
                    ref={contentPanelRef}
                    className="hero-content-panel"
                    onPointerMove={handleHeroPointerMove}
                    onPointerLeave={handleHeroPointerLeave}
                >
                    <div className="hero-bg-art" aria-hidden="true">
                        <span ref={cursorOrbRef} className="hero-bg-art__cursor-orb" />
                        <span className="hero-bg-art__glow hero-bg-art__glow--one" />
                        <span className="hero-bg-art__glow hero-bg-art__glow--two" />
                        <span className="hero-bg-art__grid" />
                        <span className="hero-bg-art__beam hero-bg-art__beam--one" />
                        <span className="hero-bg-art__beam hero-bg-art__beam--two" />
                        <span className="hero-bg-art__shape hero-bg-art__shape--diamond" />
                        <span className="hero-bg-art__shape hero-bg-art__shape--ring" />
                        <span className="hero-bg-art__shape hero-bg-art__shape--pill" />
                    </div>
                    <div className="hero-left-content">
                        <span className="hero-eyebrow">Full-Stack Engineer · Kathmandu</span>

                        <div className="hero-heading-wrap">
                            <h1 className="hero-heading">
                                <TypewriterHeading phrase={TYPEWRITER_PHRASES[phraseIdx]} paused={reduceMotion} />
                            </h1>
                            <span className="hero-anno hero-anno--heading">
                                <span className="hero-anno-icon">Aa</span>
                                <span className="hero-anno-body">
                                    <span className="hero-anno-key">Display</span>
                                    <span className="hero-anno-val">88 / Serif</span>
                                </span>
                            </span>
                        </div>

                        <p className="hero-desc">
                            I build production-ready web products — full-stack to
                            AI-powered — across frontend, backend, APIs, and data layers.
                        </p>

                        <div className="hero-actions">
                            <a href="#work" className="hero-btn-primary">See my work</a>
                            <a href={resumeFile} download className="hero-btn-text">
                                Download resume
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                                    stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="6" y1="1" x2="6" y2="9" />
                                    <polyline points="2,6 6,10 10,6" />
                                </svg>
                            </a>
                        </div>

                        <div className="hero-services">
                            {SERVICES.map(({ label, Icon, ai }, i) => (
                                <div
                                    key={label}
                                    className={[
                                        "hero-service-chip",
                                        ai ? "hero-service-chip--ai" : "",
                                        activeChip === i ? "hero-service-chip--active" : "",
                                    ].filter(Boolean).join(" ")}
                                >
                                    <Icon size={11} strokeWidth={2.2} />
                                    {label}
                                </div>
                            ))}
                        </div>

                        <div className="hero-social-row">
                            <a href="https://github.com/Pramil-07" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero-soc-btn">
                                <GithubIcon />
                            </a>
                            <a href="https://www.linkedin.com/in/pramil-dhungana/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero-soc-btn">
                                <LinkedInIcon />
                            </a>
                            <div className="hero-soc-sep" />
                            <a href="https://x.com/pramil_dev" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="hero-soc-btn">
                                <XIcon />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: AI invite zone ── */}
                <div
                    ref={zoneRef}
                    className={`hero-ai-zone${chatOpen ? " hero-ai-zone--hidden-mobile" : ""}`}
                    onClick={openChat}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && openChat()}
                    aria-label="Open AI chat assistant"
                    aria-expanded={chatOpen}
                >
                    {/* Corner reticle brackets */}
                    <span className="hz-corner hz-corner--tl" aria-hidden="true" />
                    <span className="hz-corner hz-corner--tr" aria-hidden="true" />
                    <span className="hz-corner hz-corner--bl" aria-hidden="true" />
                    <span className="hz-corner hz-corner--br" aria-hidden="true" />

                    <div className="hz-inner">
                        {/* Large robot */}
                        <RobotAvatar size={96} />

                        {/* Status */}
                        <div className="hz-status">
                            <span className="hz-status__dot" aria-hidden="true" />
                            Available now
                        </div>

                        {/* Heading */}
                        <h3 className="hz-title">Ask my AI</h3>
                        <p className="hz-desc">
                            Skills, projects, experience<br />or availability — just ask.
                        </p>

                        {/* Preview question pills */}
                        <div className="hz-previews">
                            <span className="hz-preview">"What's your tech stack?"</span>
                            <span className="hz-preview">"Show me your best work"</span>
                        </div>

                        {/* CTA */}
                        <div className="hz-cta">
                            Start chatting
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ── CHAT PANEL: slides in over the zone ── */}
                <div
                    ref={panelRef}
                    className={`hero-right-panel${chatOpen ? " hero-right-panel--open" : ""}`}
                    aria-hidden={!chatOpen}
                    style={{ pointerEvents: chatOpen ? "auto" : "none" }}
                >
                    <div className="hero-chat-inner">
                        {/* Header */}
                        <div className="chat-panel-head chat-inner-anim">
                            <div className="chat-panel-head__left">
                                <RobotAvatar size={46} talking={aiTalking} />
                                <div>
                                    <p className="chat-panel-head__name">Pramil's AI</p>
                                    <p className="chat-panel-head__status">
                                        <span className={`chat-head-dot${aiTalking ? " chat-head-dot--thinking" : ""}`} />
                                        {aiTalking ? "Generating…" : "Online now"}
                                    </p>
                                </div>
                            </div>
                            <button className="chat-panel-head__close" onClick={closeChat} aria-label="Close chat">
                                <X size={15} />
                            </button>
                        </div>

                        {/* Chat widget */}
                        <div className="hero-chat-block chat-inner-anim" style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                            <HeroChat card={true} onThinking={setAiTalking} />
                        </div>
                    </div>
                </div>

            </div>

            <AnimatedCounter />
        </section>
    );
};
