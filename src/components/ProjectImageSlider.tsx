import { useEffect, useState } from "react";
import type { ProjectImage } from "../constants/types";

interface ProjectImageSliderProps {
    images: ProjectImage[];
    alt: string;
}

const INTERVAL_MS = 3000;
const MOBILE_QUERY = "(max-width: 767px)";
const MOBILE_FILENAME_PATTERN = /-mob(?=\.[a-z0-9]+(?:[?#].*)?$)/i;

const getImageSrc = (image: ProjectImage) =>
    typeof image === "string" ? image : image.src;

const getImageAlt = (image: ProjectImage, fallback: string, index: number) =>
    typeof image === "string"
        ? `${fallback} screenshot ${index + 1}`
        : image.alt ?? `${fallback} screenshot ${index + 1}`;

const getImageDevice = (image: ProjectImage) => {
    if (typeof image !== "string" && image.device) return image.device;
    return MOBILE_FILENAME_PATTERN.test(getImageSrc(image)) ? "mobile" : "desktop";
};

const ProjectImageSlider = ({ images, alt }: ProjectImageSliderProps) => {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY).matches : false
    );
    const [current, setCurrent] = useState(0);
    const targetDevice = isMobile ? "mobile" : "desktop";
    const matchingImages = images.filter(image => {
        const device = getImageDevice(image);
        return device === targetDevice || device === "all";
    });
    const visibleImages = matchingImages.length > 0 ? matchingImages : images;
    const visibleCount = visibleImages.length;
    const activeIndex = visibleCount > 0 ? current % visibleCount : 0;

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_QUERY);
        const updateDevice = () => setIsMobile(mediaQuery.matches);

        updateDevice();
        mediaQuery.addEventListener("change", updateDevice);
        return () => mediaQuery.removeEventListener("change", updateDevice);
    }, []);

    useEffect(() => {
        setCurrent(0);
    }, [isMobile, images]);

    useEffect(() => {
        if (visibleCount <= 1) return;

        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % visibleCount);
        }, INTERVAL_MS);

        return () => clearInterval(timer);
    }, [visibleCount]);

    const goTo = (index: number) => {
        setCurrent(index);
    };

    if (visibleCount === 0) return null;

    return (
        <div className="project-slider">
            <div className="project-slider__track">
                {visibleImages.map((image, i) => (
                    <img
                        key={getImageSrc(image)}
                        src={getImageSrc(image)}
                        alt={getImageAlt(image, alt, i)}
                        loading="lazy"
                        decoding="async"
                        className="project-slider__img"
                        style={{ opacity: i === activeIndex ? 1 : 0 }}
                    />
                ))}
            </div>
            {visibleCount > 1 && (
                <div className="project-slider__dots">
                    {visibleImages.map((_, i) => (
                        <button
                            key={i}
                            className={`project-slider__dot${i === activeIndex ? " project-slider__dot--active" : ""}`}
                            onClick={() => goTo(i)}
                            aria-label={`Show screenshot ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectImageSlider;
