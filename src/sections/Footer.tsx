import React from "react";
import { socialImgs } from "../constants";
import OptimizedImage from "../components/OptimizedImage";
import { useTheme } from "../context/ThemeContext";

const MountainDivider = () => (
    <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: "100%", display: "block", opacity: 0.12, color: "var(--c-text)" }}
    >
        <polyline
            points="0,60 80,42 160,48 240,30 310,36 370,18 420,24 470,8 510,16 540,4 570,14 600,28 640,16 680,30 730,22 780,38 840,28 900,44 960,36 1040,50 1120,40 1200,52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
        />
    </svg>
);

const Footer: React.FC = () => {
    const { theme } = useTheme();

    return (
        <>
            <MountainDivider />
            <footer className="footer">
                <div className="footer-container">
                    <div className="flex flex-col justify-center">
                        <p>Minimal by design. Built in Nepal 🇳🇵</p>
                    </div>

                    <div className="socials">
                        {socialImgs.map((socialImg) => (
                            <a
                                key={socialImg.name}
                                href={socialImg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon"
                            >
                                <OptimizedImage
                                    src={socialImg.imgPath}
                                    alt={socialImg.name || "social icon"}
                                    className={socialImg.invertImg && theme === "dark" ? "invert" : ""}
                                />
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="text-center md:text-end">
                            © {new Date().getFullYear()} Pramil Dhungana. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
