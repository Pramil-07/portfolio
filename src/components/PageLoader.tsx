import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PageLoader() {
    const [mounted, setMounted] = useState(true);
    const containerRef  = useRef<HTMLDivElement>(null);
    const contentRef    = useRef<HTMLDivElement>(null);
    const barFillRef    = useRef<HTMLDivElement>(null);
    const counterRef    = useRef<HTMLSpanElement>(null);
    const glowRef       = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            const countObj = { val: 0 };

            /* ── Entrance ── */
            tl
                .from(".pl-initials", {
                    y: 60, opacity: 0, duration: 0.9,
                    ease: "power4.out",
                })
                .from(".pl-name", {
                    y: 20, opacity: 0, duration: 0.6,
                    ease: "power3.out",
                }, "-=0.5")
                .from(".pl-role", {
                    y: 12, opacity: 0, duration: 0.5,
                    ease: "power3.out",
                }, "-=0.38")
                .from(".pl-bar-track", {
                    scaleX: 0, opacity: 0, duration: 0.45,
                    ease: "power2.out",
                    transformOrigin: "left center",
                }, "-=0.3")
                .from(".pl-counter", {
                    opacity: 0, duration: 0.3,
                }, "-=0.4");

            /* ── Glow breathe ── */
            gsap.to(glowRef.current, {
                scale: 1.12,
                opacity: 0.7,
                duration: 1.8,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            /* ── Progress counter (drives bar fill) ── */
            gsap.to(countObj, {
                val: 100,
                duration: 2.1,
                delay: 0.55,
                ease: "power1.inOut",
                onUpdate() {
                    const v = Math.round(countObj.val);
                    if (counterRef.current)    counterRef.current.textContent   = String(v);
                    if (barFillRef.current)    barFillRef.current.style.width   = `${v}%`;
                },
                onComplete() {
                    /* ── Exit: content fades up, then curtain slides up ── */
                    const exit = gsap.timeline({
                        onComplete: () => setMounted(false),
                    });
                    exit
                        .to(contentRef.current, {
                            y: -44, opacity: 0,
                            duration: 0.45, ease: "power3.in",
                        })
                        .to(containerRef.current, {
                            yPercent: -100,
                            duration: 0.75,
                            ease: "power3.inOut",
                        }, "-=0.1");
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!mounted) return null;

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="pl-container"
        >
            {/* ── Grid texture ── */}
            <div className="pl-grid" />

            {/* ── Ambient glow ── */}
            <div ref={glowRef} className="pl-glow" />

            {/* ── Center content ── */}
            <div ref={contentRef} className="pl-content">
                <div className="pl-initials-wrap">
                    <span className="pl-initials">PD</span>
                </div>
                <p className="pl-name">Pramil Dhungana</p>
                <p className="pl-role">Full-Stack &amp; AI Engineer</p>
            </div>

            {/* ── Progress bar (bottom-center) ── */}
            <div className="pl-bar-wrap">
                <div className="pl-bar-track">
                    <div ref={barFillRef} className="pl-bar-fill" />
                </div>
            </div>

            {/* ── Counter (bottom-right) ── */}
            <p className="pl-counter">
                <span ref={counterRef}>0</span>
            </p>
        </div>
    );
}
