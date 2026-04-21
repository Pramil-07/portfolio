import type { GlowCardProps, HasReview } from "../constants/types";




const GlowCard = <T extends HasReview>({ card, children, isHerosection }: GlowCardProps<T>) => {
    return (
        <div
            className="card timeline-card rounded-xl  mb-5 break-inside-avoid-column"
        >
            {!isHerosection &&(
                <>
                    <div className="glow"></div>
            <div className="mb-5">
                <p className="text-white-50 text-base leading-relaxed">{card.review}</p>
            </div>
            </>
            )}
            
            {children}
        </div>
    );
};

export default GlowCard;
