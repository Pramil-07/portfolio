import { words, socialImgs } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/Button";
import AnimatedCounter from "../components/AnimatedCounter";
import OptimizedImage from "../components/OptimizedImage";
import { shouldReduceHeavyMotion } from "../utils/motion";
import HeroChat from "../components/HeroChat";

export const Hero = () => {
    useGSAP(() => {
        if (shouldReduceHeavyMotion()) return;
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        );
    });

    return (
        <section id="hero" className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 z-10 pointer-events-none">
                <OptimizedImage
                    src="/images/bg.png"
                    alt="hero background"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                />
            </div>

            <div className="relative z-20 md:px-20 px-5 xl:pt-28 md:pt-24 pt-20 pb-12">

                {/* ── Two-column on desktop, stacked on mobile ── */}
                <div className="flex flex-col md:flex-row md:gap-12 md:items-stretch gap-10">

                    {/* LEFT 60%: identity + CTA */}
                    <div className="flex flex-col justify-center gap-6 md:w-[58%] w-full">

                        {/* Availability pill */}
                        <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full relative z-10"
                            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-medium" style={{ color: "#10b981" }}>Available for work</span>
                        </div>

                        {/* Main heading */}
                        <div className="hero-text">
                            <h1>Shaping<span className="slide">
                                <span className="wrapper">
                                    {words.map((word, index) => (
                                        <span key={index} className="flex items-center gap-1 pb-2">
                                            <OptimizedImage
                                                src={word.imgPath}
                                                alt="icon"
                                                loading="eager"
                                                decoding="sync"
                                                className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                            />
                                            <span>{word.text}</span>
                                        </span>
                                    ))}
                                </span>
                            </span>
                            </h1>
                            <h1>into Real Projects that</h1>
                            <h1>Empower Businesses</h1>
                        </div>

                        {/* Tagline */}
                        <p className="text-white-50 md:text-lg text-base relative z-10 max-w-lg leading-relaxed">
                            Full Stack Developer based in Kathmandu, Nepal — building fast, scalable, and user-focused products.
                        </p>

                        {/* Social + CTA */}
                        <div className="flex items-center gap-6 flex-wrap relative z-10">
                            <div className="flex items-center gap-4">
                                {socialImgs.map(({ name, url, imgPath, invertImg }) => (
                                    <a key={name} href={url}
                                       target={url.startsWith("mailto") ? undefined : "_blank"}
                                       rel={url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                       aria-label={name}
                                       className="opacity-60 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-200">
                                        <img src={imgPath} alt={name} className={`w-5 h-5${invertImg ? " invert" : ""}`} />
                                    </a>
                                ))}
                            </div>
                            <Button
                                text="See My Work"
                                className="md:w-52 md:h-12 w-full max-w-[240px] h-12"
                                id="counter"
                            />
                        </div>
                    </div>

                    {/* RIGHT 40%: Chat card — full height beside heading */}
                    <div className="md:w-[42%] w-full flex">
                        <HeroChat card={true} />
                    </div>

                </div>
            </div>

            <AnimatedCounter />
        </section>
    );
};
