import React from "react";
import type { TechIconCardExperienceProps } from "../../../constants/types";
import OptimizedImage from "../../OptimizedImage";

const TechIconCardExperience: React.FC<TechIconCardExperienceProps> = ({ model }) => {
    return (
        <OptimizedImage
            src={model.modelPath}
            alt={model.name}
            className="w-full h-full object-contain"
        />
    );
};

export default TechIconCardExperience;
