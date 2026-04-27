import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { abilities } from "../constants";
import OptimizedImage from "../components/OptimizedImage";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".feature-card", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 82%",
                toggleActions: "play none none none",
            },
        });
    }, { scope: sectionRef });

    return (
        <section id="features" ref={sectionRef} className="section-padding">
            <div className="w-full padding-x-lg">
                <TitleHeader title="What I Deliver" sub="End-to-end execution with clean systems" />
                <div className="mx-auto grid-3-cols">
                    {abilities.map(({ imgPath, title, desc }) => (
                        <div
                            key={title}
                            className="feature-card card-border p-6 flex flex-col gap-4"
                        >
                            <div className="size-11 flex items-center justify-center rounded-lg"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid var(--c-border)",
                                }}>
                                <OptimizedImage src={imgPath} alt={title} className="size-5" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-white font-semibold" style={{ fontSize: "var(--text-lg)" }}>{title}</h3>
                                <p className="leading-relaxed" style={{ fontSize: "var(--text-sm)", color: "var(--c-text-3)" }}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;
