import { useEffect, useRef, useState } from "react";

interface ProjectImageSliderProps {
    images: string[];
    alt: string;
}

const INTERVAL_MS = 3000;

const ProjectImageSlider = ({ images, alt }: ProjectImageSliderProps) => {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = () => {
        if (images.length <= 1) return;
        timerRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, INTERVAL_MS);
    };

    const clearTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        startTimer();
        return clearTimer;
    }, [images.length]);

    const goTo = (index: number) => {
        clearTimer();
        setCurrent(index);
        startTimer();
    };

    return (
        <div className="project-slider">
            <div className="project-slider__track">
                {images.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={`${alt} screenshot ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="project-slider__img"
                        style={{ opacity: i === current ? 1 : 0 }}
                    />
                ))}
            </div>
            {images.length > 1 && (
                <div className="project-slider__dots">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`project-slider__dot${i === current ? " project-slider__dot--active" : ""}`}
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
