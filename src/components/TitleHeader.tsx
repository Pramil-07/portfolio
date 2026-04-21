import React from "react";

interface TitleHeaderProps {
    title: string;
    sub: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, sub }) => {
    return (
        <div className="section-header">
            <p className="section-kicker">{sub}</p>
            <h2 className="section-heading">{title}</h2>
        </div>
    );
};

export default TitleHeader;
