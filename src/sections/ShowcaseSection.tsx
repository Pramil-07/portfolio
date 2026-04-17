import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectImageSlider from "../components/ProjectImageSlider";
import TitleHeader from "../components/TitleHeader";
import { shouldReduceHeavyMotion } from "../utils/motion";
import { projects } from "../constants/projects";

gsap.registerPlugin(ScrollTrigger);

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
                    title="My Projects"
                    sub="A selection of work I've built — full-stack apps, e-commerce platforms, and internal tools."
                />
                <div className="projects-masonry mt-12">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            className="project-card"
                            ref={el => { if (el) cardRefs.current[i] = el; }}
                        >
                            <ProjectImageSlider images={project.images} alt={project.title} />
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
