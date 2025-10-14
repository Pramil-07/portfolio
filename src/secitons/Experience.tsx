import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards,   } from "../constants";
import type {ExpCardType,} from "../constants/types.ts";

import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
    useGSAP(() => {
        // Animate each timeline card
        gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: "left left",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
            });
        });

        // Animate the timeline scaleY
        gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                onUpdate: (self) => {
                    gsap.to(".timeline", {
                        scaleY: 1 - self.progress,
                    });
                },
            },
        });

        // Animate each expText
        gsap.utils.toArray<HTMLElement>(".expText").forEach((text) => {
            gsap.from(text, {
                opacity: 0,
                xPercent: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 60%",
                },
            });
        }, "<");
    }, []);

    return (
        <section
            id="experience"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Professional Work Experience"
                    sub="💼 My Career Overview"
                />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards?.map((card: ExpCardType) => (
                            <div key={card.title} className="exp-card-wrapper">
                                <div className="xl:w-2/6">
                                    <GlowCard index={card?.id ?? 0} card={card}>
                                        <div>
                                            <img
                                                src={card.imgPath}
                                                alt="exp-img"
                                                width={150}
                                                height={100}
                                                style={{borderRadius: "8px", objectFit: "contain"}}
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
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                            <div className="timeline-logo">
                                                <img src={card.logoPath} alt="logo" />
                                            </div>
                                            <div>
                                                <h1 className="font-semibold text-3xl">{card.title}</h1>
                                                <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                                                <p className="text-[#839CB5] italic">Responsibilities</p>
                                                <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                                                    {card.responsibilities.map((resp:string, index:number) => (
                                                        <li key={index} className="text-lg">
                                                            {resp}
                                                        </li>
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
