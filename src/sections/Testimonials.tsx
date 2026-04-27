import React from "react";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import OptimizedImage from "../components/OptimizedImage";
import type { Testimonial } from "../constants/types";

const TestimonialCard = ({ t }: { t: Testimonial }) => (
    <div
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{
            width: "min(calc(100vw - 40px), 360px)",
            flexShrink: 0,
            background: "#0e0e10",
            border: "1px solid rgba(255,255,255,0.1)",
        }}
    >
        {/* Review body */}
        <div className="relative px-5 pt-5 pb-4 flex-1">
            {/* Faded quote mark */}
            <span
                className="absolute top-2 left-4 font-black select-none pointer-events-none leading-none"
                style={{ fontSize: 72, color: "rgba(255,255,255,0.05)", lineHeight: 1 }}
            >
                ❝
            </span>

            {/* Stars */}
            <div className="flex gap-0.5 mb-3 relative z-10">
                {[...Array(5)].map((_, s) => (
                    <span key={s} style={{ color: "#f5c518", fontSize: 12 }}>★</span>
                ))}
            </div>

            <p className="relative z-10" style={{
                fontSize: "var(--text-sm)",
                color: "var(--c-text-3)",
                lineHeight: 1.65,
            }}>
                "{t.review}"
            </p>
        </div>

        {/* Divider */}
        <div className="mx-5" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Author */}
        <div className="px-5 py-4 flex items-center gap-3">
            <OptimizedImage
                src={t.imgPath}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover flex-none"
                style={{ border: "1px solid var(--c-border)" }}
            />
            <div className="min-w-0">
                <p className="font-semibold leading-tight truncate" style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--c-text)",
                }}>
                    {t.name}
                </p>
                <p className="truncate mt-0.5" style={{
                    fontSize: "var(--text-xs)",
                    color: "#839cb5",
                }}>
                    {t.role}
                </p>
                <p className="mt-0.5" style={{
                    fontSize: "10px",
                    color: "var(--c-text-4)",
                }}>
                    {t.mentions}
                </p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    /* Duplicate the list so the track is wide enough for a seamless loop.
       Each item wrapper has paddingRight = gap, so translateX(-50%) lands
       exactly at the start of the duplicate set. */
    const doubled = [...testimonials, ...testimonials];

    return (
        <section id="testimonials" className="py-20 md:py-24">
            {/* Title — keep horizontal padding here */}
            <div className="px-5 md:px-10 mb-12">
                <TitleHeader title="Testimonials" sub="Feedback from teammates and clients" />
            </div>

            {/* Full-width infinite scroll track */}
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="gradient-edge" />
                <div className="gradient-edge" />

                {/* Animated track — no gap on flex, spacing lives in wrapper padding */}
                <div className="testimonials-track flex">
                    {doubled.map((t, i) => (
                        <div key={i} style={{ paddingRight: "20px", flexShrink: 0 }}>
                            <TestimonialCard t={t} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
