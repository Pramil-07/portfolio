import React from "react";
import type { TechIconCardExperienceProps } from "../../../constants/types";

const TechIconCardExperience: React.FC<TechIconCardExperienceProps> = ({ model }) => {
    return (
        <img
            src={model.modelPath}
            alt={model.name}
            className="w-full h-full object-contain"
        />
    );
};

export default TechIconCardExperience;
