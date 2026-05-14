import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectDevicePreviewCards from "../components/ProjectDevicePreviewCards";
import ProjectImageSlider from "../components/ProjectImageSlider";
import TitleHeader from "../components/TitleHeader";
import type { ProjectImage } from "../constants/types";
import { shouldReduceHeavyMotion } from "../utils/motion";
import { projects } from "../constants/projects";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_FILENAME_PATTERN = /-mob(?=\.[a-z0-9]+(?:[?#].*)?$)/i;

const getImageSrc = (image: ProjectImage) =>
    typeof image === "string" ? image : image.src;

const getImageDevice = (image: ProjectImage) => {
    if (typeof image !== "string" && image.device) return image.device;
    return MOBILE_FILENAME_PATTERN.test(getImageSrc(image)) ? "mobile" : "desktop";
};

const hasMobilePreviewImages = (images: ProjectImage[]) =>
    images.some(image => {
        const device = getImageDevice(image);
        return device === "mobile" || device === "all";
    });

const AppShowcase = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        if (shouldReduceHeavyMotion()) return;

        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );

        gsap.fromTo(
            cardRefs.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: cardRefs.current[0],
                    start: "top 85%",
                },
            }
        );
    }, []);

    return (
        <section id="work" ref={sectionRef} className="section-padding">
            <div className="padding-x-lg">
                <TitleHeader
                    title="Selected Projects"
                    sub="Full-stack products shipped for real users"
                />
                <div className="projects-masonry mt-12">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            className="project-card"
                            ref={el => { if (el) cardRefs.current[i] = el; }}
                        >
                            {hasMobilePreviewImages(project.images) ? (
                                <ProjectDevicePreviewCards images={project.images} alt={project.title} />
                            ) : (
                                <ProjectImageSlider images={project.images} alt={project.title} />
                            )}
                            <div className="project-card__body">
                                <span className="project-card__category">{project.category}</span>
                                <h3 className="project-card__title">{project.title}</h3>
                                <p className="project-card__desc">{project.description}</p>
                                <div className="project-card__tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag-chip">{tag}</span>
                                    ))}
                                </div>
                                {(project.liveUrl || project.githubUrl) && (
                                    <div className="project-card__links">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link project-link--live"
                                            >
                                                Live ↗
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link project-link--github"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;
