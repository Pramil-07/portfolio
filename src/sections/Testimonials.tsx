import React, { useRef, useState } from "react";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { Testimonial } from "../constants/types";
import OptimizedImage from "../components/OptimizedImage";

const MobileTestimonialScroll = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setActiveIndex(Math.round(el.scrollLeft / (el.scrollWidth / testimonials.length)));
    };

    const scrollTo = (index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: (el.scrollWidth / testimonials.length) * index, behavior: "smooth" });
    };

    return (
        <div className="lg:hidden mt-10">
            {/* Scroll track */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory px-5 scroll-pl-5"
                style={{ scrollbarWidth: "none" }}
            >
                {testimonials.map((t: Testimonial, i: number) => (
                    <div
                        key={i}
                        className="snap-start flex-none w-[calc(100vw-40px)] rounded-2xl overflow-hidden bg-black-100 flex flex-col"
                        style={{
                            borderLeft: "2px solid #62e0ff",
                            boxShadow: "0 0 32px rgba(98,224,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* Review body */}
                        <div className="relative px-5 pt-5 pb-4 flex-1">
                            {/* Faded quote mark */}
                            <span
                                className="absolute top-2 left-4 font-black select-none pointer-events-none leading-none"
                                style={{ fontSize: 80, color: "rgba(98,224,255,0.05)", lineHeight: 1 }}
                            >
                                "
                            </span>
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-3 relative z-10">
                                {[...Array(5)].map((_, s) => (
                                    <span key={s} style={{ color: "#f5c518", fontSize: 13 }}>★</span>
                                ))}
                            </div>
                            <p className="text-white-50 text-sm leading-relaxed relative z-10">
                                "{t.review}"
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="mx-5" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                        {/* Author */}
                        <div className="px-5 py-4 flex items-center gap-3">
                            <div className="flex-none">
                                <OptimizedImage
                                    src={t.imgPath}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                    style={{ border: "1px solid rgba(98,224,255,0.2)" }}
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-white font-semibold text-sm leading-tight truncate">{t.name}</p>
                                <p className="text-xs mt-0.5 truncate" style={{ color: "#839cb5" }}>{t.role}</p>
                                <p className="text-[10px] mt-0.5" style={{ color: "#62e0ff", opacity: 0.7 }}>{t.mentions}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Right-edge spacer */}
                <div className="flex-none w-5 shrink-0" />
            </div>

            {/* Segmented progress bar + counter */}
            <div className="mt-5 px-1">
                <div className="flex gap-1.5 mb-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
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
                    {String(testimonials.length).padStart(2, "0")}
                </p>
            </div>
        </div>
    );
};

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What People Say About Me?"
                    sub="⭐️ Customer feedback highlights"
                />

                {/* Mobile / tablet — horizontal snap scroll */}
                <MobileTestimonialScroll />

                {/* Desktop — original masonry layout */}
                <div className="hidden lg:block">
                    <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
                        {testimonials.map((testimonial: Testimonial, index: number) => (
                            <GlowCard<Testimonial> card={testimonial} key={index} index={index}>
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <OptimizedImage
                                            src={testimonial.imgPath}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-gray-300 text-sm font-mono">{testimonial.role}</p>
                                        <p className="text-white-50">{testimonial.mentions}</p>
                                    </div>
                                </div>
                            </GlowCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
