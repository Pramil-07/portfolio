import React from "react";
import OptimizedImage from "../OptimizedImage";

export const HeroExperience = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <OptimizedImage
                src="/images/ideas.svg"
                alt="Hero visual"
                className="max-w-full max-h-full object-contain"
            />
        </div>
    );
};
export default HeroExperience
