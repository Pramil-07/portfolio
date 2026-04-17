import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "../constants";
import type { ExpCardType } from "../constants/types.ts";

import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import OptimizedImage from "../components/OptimizedImage";
import { shouldReduceHeavyMotion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const MobileExperienceScroll = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.scrollWidth / expCards.length;
        setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };

    const scrollTo = (index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: (el.scrollWidth / expCards.length) * index, behavior: "smooth" });
    };

    return (
        <div className="xl:hidden mt-10">
            {/* Scroll track */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory px-5 scroll-pl-5"
                style={{ scrollbarWidth: "none" }}
            >
                {expCards.map((card: ExpCardType, i: number) => (
                    <div
                        key={i}
                        className="snap-start flex-none w-[calc(100vw-40px)] rounded-2xl overflow-hidden bg-black-100"
                        style={{
                            borderLeft: "2px solid #62e0ff",
                            boxShadow: "0 0 32px rgba(98,224,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* Header */}
                        <div className="relative px-4 pt-4 pb-3">
                            {/* Faded ordinal */}
                            <span
                                className="absolute top-2 right-3 font-black text-5xl select-none pointer-events-none leading-none"
                                style={{ color: "rgba(98,224,255,0.05)" }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="flex items-center gap-3 relative z-10">
                                <div
                                    className="size-10 rounded-xl flex-none flex items-center justify-center overflow-hidden p-1"
                                    style={{
                                        background: "rgba(40,39,50,0.8)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <OptimizedImage
                                        src={card.logoPath}
                                        alt={card.company}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#62e0ff" }}>
                                        {card.company}
                                    </p>
                                    <h3 className="font-semibold text-sm text-white leading-tight truncate">
                                        {card.title}
                                    </h3>
                                    <p className="text-white-50 text-[11px] mt-0.5">{card.date}</p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="mx-4" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                        {/* Responsibilities — scrollable so card stays on screen */}
                        <div className="px-4 py-3 overflow-y-auto" style={{ maxHeight: "52vh", scrollbarWidth: "none" }}>
                            <ul className="space-y-2">
                                {card.responsibilities.map((resp: string, j: number) => (
                                    <li key={j} className="flex gap-2.5 text-white-50 text-xs leading-relaxed">
                                        <span
                                            className="flex-none rounded-full"
                                            style={{ width: 4, height: 4, background: "#62e0ff", opacity: 0.7, marginTop: 5 }}
                                        />
                                        {resp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                {/* Right-edge spacer so last card clears the viewport */}
                <div className="flex-none w-5 shrink-0" />
            </div>

            {/* Segmented progress bar + counter */}
            <div className="mt-5 px-1">
                <div className="flex gap-1.5 mb-2">
                    {expCards.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to experience ${i + 1}`}
                            className="flex-1 rounded-full transition-all duration-500"
                            style={{
                                height: 2,
                                background: activeIndex === i
                                    ? "linear-gradient(90deg, #62e0ff, #839cb5)"
                                    : "rgba(255,255,255,0.1)",
                            }}
                        />
                    ))}
                </div>
                <p className="text-right text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>
                    <span style={{ color: "#62e0ff" }}>{String(activeIndex + 1).padStart(2, "0")}</span>
                    {" / "}
                    {String(expCards.length).padStart(2, "0")}
                </p>
            </div>
        </div>
    );
};

const Experience: React.FC = () => {
    useGSAP(() => {
        if (shouldReduceHeavyMotion()) return;

        gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: "left left",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: { trigger: card, start: "top 80%" },
            });
        });

        gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                onUpdate: (self) => {
                    gsap.to(".timeline", { scaleY: 1 - self.progress });
                },
            },
        });

        gsap.utils.toArray<HTMLElement>(".expText").forEach((text) => {
            gsap.from(text, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: { trigger: text, start: "top 60%" },
            });
        });

        // Mobile cards fade in
        gsap.utils.toArray<HTMLElement>(".exp-mobile-card").forEach((card) => {
            gsap.from(card, {
                opacity: 0,
                y: 24,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 85%" },
            });
        });
    }, []);

    return (
        <section id="experience" className="flex-center section-padding xl:px-0">
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Professional Work Experience"
                    sub="💼 My Career Overview"
                />

                {/* ── MOBILE / TABLET layout — horizontal snap scroll ─────── */}
                <MobileExperienceScroll />

                {/* ── DESKTOP layout (xl+) — original animated timeline ──────── */}
                <div className="hidden xl:block mt-32 relative">
                    <div className="relative z-50 xl:space-y-32">
                        {expCards.map((card: ExpCardType) => (
                            <div key={card.title} className="exp-card-wrapper">
                                <div className="xl:w-2/6">
                                    <GlowCard index={card?.id ?? 0} card={card}>
                                        <div>
                                            <OptimizedImage
                                                src={card.imgPath}
                                                alt="exp-img"
                                                width={150}
                                                height={100}
                                                style={{ borderRadius: "8px", objectFit: "contain" }}
                                            />
                                        </div>
                                    </GlowCard>
                                </div>
                                <div className="xl:w-4/6">
                                    <div className="flex items-start">
                                        <div className="timeline-wrapper">
                                            <div className="timeline" />
                                            <div className="gradient-line w-1 h-full" />
                                        </div>
                                        <div className="expText flex xl:gap-20 relative z-20">
                                            <div className="timeline-logo flex-none">
                                                <OptimizedImage src={card.logoPath} alt="logo" />
                                            </div>
                                            <div>
                                                <h1 className="font-semibold text-3xl">{card.title}</h1>
                                                <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                                                <p className="text-blue-50 italic text-sm mb-4">Responsibilities</p>
                                                <ul className="list-disc ms-5 flex flex-col gap-5 text-white-50">
                                                    {card.responsibilities.map((resp: string, index: number) => (
                                                        <li key={index} className="text-lg">{resp}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Experience;
