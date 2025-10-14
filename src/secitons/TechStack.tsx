import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import {techStackIcons} from "../constants";
import type {TechStackIcon} from "../constants/types.ts";


const TechStack: React.FC = () => {
    // Animate the tech cards
    useGSAP(() => {
        gsap.fromTo(
            ".tech-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: "#skills",
                    start: "top center",
                },
            }
        );
    });

    return (
        <div id="skills" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="How I Can Contribute & My Key Skills"
                    sub="🤝 What I Bring to the Table"
                />
                <div className="tech-grid mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {techStackIcons.map((techStackIcon: TechStackIcon) => (
                        <div
                            key={techStackIcon.name}
                            className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg relative"
                        >
                            <div className="tech-card-animated-bg absolute inset-0" />
                            <div className="tech-card-content relative flex flex-col justify-center items-center p-1">
                                <div className="tech-icon-wrapper w-30 h-20">
                                    <TechIconCardExperience model={techStackIcon} />
                                </div>
                                <div className="padding-x w-full text-center mt-2">
                                    <p className="text-white text-lg font-medium">{techStackIcon.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStack;
