import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Animations for each app showcase
        const cards = [project1Ref.current, project2Ref.current, project3Ref.current];

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    },
                }
            );
        });
    }, []);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div ref={project1Ref} className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/project1.png" alt="Ryde App Interface"/>
                        </div>
                        <div className="text-content">
                            <h2>
                                Empowering People to Buy, Sell, and Offer Services Seamlessly with Homaale
                            </h2>
                            <p className="text-white-50 md:text-xl">
                                Homaale is a dynamic service and product marketplace built with Next.js,
                                Django REST Framework, and PostgreSQL. It enables users to become merchants,
                                create shops, and sell products or services — all within one powerful platform.
                            </p>
                        </div>

                    </div>
                    {/*RIGHT*/}
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={project2Ref}>
                            <div className="image-wrapper bg-[#FFEFDB]">
                                <img
                                    src="/images/project2.png"
                                    alt="Library Management Platform"
                                />
                            </div>
                            <h2>The Ecommerce Platform to buy Sweets</h2>
                        </div>

                        <div className="project " ref={project3Ref} >
                            <div className="image-wrapper bg-[#FFE7EB]">
                                <img src="/images/project3.png" alt="YC Directory App"/>
                            </div>
                            <div className="text-content">
                                <h2>
                                    Cagtu CMS — An admin dashboard to manage multiple platforms effortlessly.

                                </h2>
                                <p className="text-white-50 md:text-xl mt-2">A unified CMS for managing multiple platforms easily.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppShowcase;
