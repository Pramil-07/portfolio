import React from "react";

interface TitleHeaderProps {
    title: string;
    sub: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, sub }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="hero-badge">
                <p>{sub}</p>
            </div>
            <h2 className="section-heading">
                {title}
            </h2>
        </div>
    );
};

export default TitleHeader;
