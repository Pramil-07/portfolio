import React from "react";
import { socialImgs } from "../constants";



const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Terms & Conditions */}
                <div className="flex flex-col justify-center">
                    <p>Terms & tt Conditions</p>
                </div>

                {/* Social Icons */}
                <div className="socials">
                    {socialImgs.map((socialImg, index: number) => (
                        <div key={index} className="icon">
                                                        <a 
                                    href={socialImg.url}      
                                    target="_blank"            
                                    rel="noopener noreferrer"  // security best practice
                                ></a>
                            <img src={socialImg.imgPath} alt={socialImg.name || "social icon"} />
                        </div>
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
