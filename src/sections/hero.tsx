import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { resumeFile } from "../constants";
import { shouldReduceHeavyMotion } from "../utils/motion";
import HeroChat from "../components/HeroChat";
import AnimatedCounter from "../components/AnimatedCounter";

const GithubIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "rgba(255,255,255,0.4)" }}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "rgba(255,255,255,0.4)" }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" style={{ fill: "rgba(255,255,255,0.4)" }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const Hero = () => {
    useGSAP(() => {
        if (shouldReduceHeavyMotion()) return;
        gsap.fromTo(
            ".hero-anim",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power2.out" }
        );
    });

    return (
        <section id="hero">
            <div className="hero-main-grid">

                {/* ── LEFT: Identity ── */}
                <div className="hero-left">
                    <span className="hero-eyebrow hero-anim">
                        Full-Stack Engineer · Kathmandu
                    </span>

                    <h1 className="hero-heading hero-anim">
                        Design. Build.<br /><em>Ship.</em>
                    </h1>

                    <p className="hero-desc hero-anim">
                        I build production-ready web products across frontend, backend,
                        API, and data layers with clean, scalable architecture.
                    </p>

                    <div className="hero-actions hero-anim">
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

                    <div className="hero-social-row hero-anim">
                        <a href="https://github.com/Pramil-07" target="_blank"
                            rel="noopener noreferrer" aria-label="GitHub" className="hero-soc-btn">
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
                </div>

                {/* ── RIGHT: Chat ── */}
                <div className="hero-right">
                    {/* AI Chat — fills remaining height */}
                    <div className="hero-chat-block">
                        <p className="hero-panel-label">Ask about skills, projects, or availability</p>
                        <HeroChat card={true} />
                    </div>

                </div>
            </div>

            <AnimatedCounter />
        </section>
    );
};
