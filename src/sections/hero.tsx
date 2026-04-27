import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Globe, Zap, Layers, Sparkles } from "lucide-react";
import { resumeFile } from "../constants";
import { shouldReduceHeavyMotion } from "../utils/motion";
import HeroChat from "../components/HeroChat";
import AnimatedCounter from "../components/AnimatedCounter";

/* ── Himalayan silhouette — decorative background ── */
const HimalayanSilhouette = () => (
    <svg
        viewBox="0 0 800 180"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="hero-himalaya"
    >
        <path
            d="M0,180 L0,148
               L38,138 L72,143 L100,128
               L128,134 L152,118 L172,124
               L196,105 L218,112 L238,94
               L256,101 L272,82  L285,90
               L298,68  L310,56  L320,44
               L328,34  L336,24  L342,18
               L348,12  L354,20  L360,30
               L368,42  L378,52  L390,62
               L404,50  L418,62  L432,74
               L448,64  L464,78  L482,90
               L500,80  L520,95  L542,88
               L562,102 L584,96  L606,110
               L630,104 L658,118 L686,112
               L714,126 L742,120 L770,134
               L800,128 L800,180 Z"
            fill="url(#himalaya-grad)"
            opacity="0.9"
        />
        <defs>
            <linearGradient id="himalaya-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.07)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
        </defs>
    </svg>
);

/* ── Static data ─────────────────────────────────────── */
const SERVICES = [
    { label: "Web Apps",        Icon: Globe,     ai: false },
    { label: "REST APIs",       Icon: Zap,       ai: false },
    { label: "SaaS Products",   Icon: Layers,    ai: false },
    { label: "AI Integrations", Icon: Sparkles,  ai: true  },
] as const;

const AI_TAGS = ["Gemini API", "OpenAI", "LangChain", "RAG", "Vector DBs"];

/* ── Social icons ────────────────────────────────────── */
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "rgba(255,255,255,0.45)" }}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "rgba(255,255,255,0.45)" }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "rgba(255,255,255,0.45)" }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

/* ── Hero ────────────────────────────────────────────── */
export const Hero = () => {
    const heroRef  = useRef<HTMLElement>(null);
    const blobRef  = useRef<HTMLDivElement>(null);

    /* Mouse-parallax on ambient glow blob */
    useEffect(() => {
        const hero = heroRef.current;
        const blob = blobRef.current;
        if (!hero || !blob || shouldReduceHeavyMotion()) return;

        const xSet = gsap.quickSetter(blob, "x", "px");
        const ySet = gsap.quickSetter(blob, "y", "px");

        const onMove = (e: MouseEvent) => {
            const { left, top, width, height } = hero.getBoundingClientRect();
            xSet(((e.clientX - left) / width  - 0.5) * 70);
            ySet(((e.clientY - top)  / height - 0.5) * 50);
        };

        hero.addEventListener("mousemove", onMove, { passive: true });
        return () => hero.removeEventListener("mousemove", onMove);
    }, []);

    /* Entrance animation timeline — starts after PageLoader fades */
    useGSAP(() => {
        if (shouldReduceHeavyMotion()) return;

        const tl = gsap.timeline({
            delay: 3.9,
            defaults: { ease: "power3.out", willChange: "transform, opacity" },
        });

        tl
            .from(".hero-eyebrow",      { y: 18, opacity: 0, duration: 0.65 })
            .from(".hero-heading",      { y: 48, opacity: 0, duration: 0.9  }, "-=0.45")
            .from(".hero-desc",         { y: 24, opacity: 0, duration: 0.7  }, "-=0.55")
            .from(".hero-callout",      { y: 20, opacity: 0, scale: 0.96, duration: 0.65, ease: "back.out(1.7)" }, "-=0.45")
            .from(".hero-actions",      { y: 18, opacity: 0, duration: 0.6  }, "-=0.4")
            .from(".hero-service-chip", {
                y: 14, opacity: 0, scale: 0.88,
                duration: 0.5, stagger: 0.075,
                ease: "back.out(1.5)",
            }, "-=0.35")
            .from(".hero-social-row",   { opacity: 0, duration: 0.5 }, "-=0.25")
            /* Right panel slides in while heading is animating */
            .from(".hero-right",        { x: 40, opacity: 0, duration: 1.0  }, "<-=1.4");
    }, { scope: heroRef });

    return (
        <section id="hero" ref={heroRef}>
            <div className="hero-main-grid">

                {/* ── LEFT ── */}
                <div className="hero-left">
                    {/* Ambient glow blob (purely decorative) */}
                    <div ref={blobRef} className="hero-glow-blob" aria-hidden="true" />
                    {/* Himalayan silhouette — anchored to bottom of hero-left */}
                    <HimalayanSilhouette />

                    {/* Content sits above the blob */}
                    <div className="hero-left-content">

                        <span className="hero-eyebrow">
                            Full-Stack Engineer · Kathmandu
                            <svg viewBox="0 0 22 14" width="16" height="10" aria-label="Nepal" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "6px", marginBottom: "1px", opacity: 0.55 }}>
                                <path d="M1,13 L6,6 L10,9 L13,4 L16,7 L19,2 L21,13 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                            </svg>
                        </span>

                        <h1 className="hero-heading">
                            Design. Build.<br /><em>Ship.</em>
                        </h1>

                        <p className="hero-desc">
                            I build production-ready web products — full-stack to
                            AI-powered — across frontend, backend, APIs, and data layers.
                        </p>

                        {/* ── Option 4: AI availability callout ── */}
                        <div className="hero-callout">
                            <span className="hero-callout-dot" aria-hidden="true" />
                            <div>
                                <p className="hero-callout-label">
                                    Available for AI-integrated projects
                                </p>
                                <div className="hero-callout-tags">
                                    {AI_TAGS.map(tag => (
                                        <span key={tag} className="hero-callout-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── CTAs ── */}
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

                        {/* ── Option 3: Service chips ── */}
                        <div className="hero-services">
                            {SERVICES.map(({ label, Icon, ai }) => (
                                <div
                                    key={label}
                                    className={`hero-service-chip${ai ? " hero-service-chip--ai" : ""}`}
                                >
                                    <Icon size={11} strokeWidth={2.2} />
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* ── Social row ── */}
                        <div className="hero-social-row">
                            <a href="https://github.com/Pramil-07" target="_blank"
                                rel="noopener noreferrer" aria-label="GitHub"
                                className="hero-soc-btn">
                                <GithubIcon />
                            </a>
                            <a href="https://www.linkedin.com/in/pramil-dhungana/"
                                target="_blank" rel="noopener noreferrer"
                                aria-label="LinkedIn" className="hero-soc-btn">
                                <LinkedInIcon />
                            </a>
                            <div className="hero-soc-sep" />
                            <a href="https://x.com/pramil_dev" target="_blank"
                                rel="noopener noreferrer" aria-label="X / Twitter"
                                className="hero-soc-btn">
                                <XIcon />
                            </a>
                        </div>

                    </div>{/* /hero-left-content */}
                </div>

                {/* ── RIGHT: AI Chat ── */}
                <div className="hero-right">
                    <div className="hero-chat-block">
                        <p className="hero-panel-label">
                            Ask about skills, projects, or availability
                        </p>
                        <HeroChat card={true} />
                    </div>
                </div>

            </div>

            <AnimatedCounter />
        </section>
    );
};
