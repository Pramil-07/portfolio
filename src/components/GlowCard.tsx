import { useRef, type ReactNode, type MouseEvent } from "react";


interface HasReview {
    review?: string;
}

interface GlowCardProps<T extends HasReview> {
    card: T;
    index: number;
    children?: ReactNode;
}

const GlowCard = <T extends HasReview>({ card, index, children }: GlowCardProps<T>) => {
    // refs for all the cards
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

    // when mouse moves over a card, rotate the glow effect
    const handleMouseMove = (index: number) => (e: MouseEvent<HTMLDivElement>) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl) return;

        const rect = cardEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        cardEl.style.setProperty("--start", (angle + 60).toString());
    };

    return (
        <div
            ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
            }}

            onMouseMove={handleMouseMove(index)}
            className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
        >
            <div className="glow"></div>
            <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }, (_, i) => (
                    <img key={i} src="/images/star.png" alt="star" className="size-5" />
                ))}
            </div>
            <div className="mb-5">
                <p className="text-white-50 text-lg">{card.review}</p>
            </div>
            {children}
        </div>
    );
};

export default GlowCard;
