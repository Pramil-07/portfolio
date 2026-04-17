import React from "react";
import { socialImgs } from "../constants";
import OptimizedImage from "../components/OptimizedImage";



const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Terms & Conditions */}
                <div className="flex flex-col justify-center">
                    <p>Terms & Conditions</p>
                </div>

                {/* Social Icons */}
                <div className="socials">
                    {socialImgs.map((socialImg) => (
                      
                        <a
                            key={socialImg.name}
                            href={socialImg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon"
                        > 
                            <OptimizedImage src={socialImg.imgPath} alt={socialImg.name || "social icon"} />

                        </a>
                       

                    ))}
                </div>

                {/* Copyright */}
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Pramil Dhungana. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
