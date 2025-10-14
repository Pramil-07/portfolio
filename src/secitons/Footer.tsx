import React from "react";
import { socialImgs } from "../constants";

// Define the type for social images
interface SocialImg {
    imgPath: string;
    name?: string; // optional if you have a name or alt property
}

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
                    {socialImgs.map((socialImg: SocialImg, index: number) => (
                        <div key={index} className="icon">
                            <img src={socialImg.imgPath} alt={socialImg.name || "social icon"} />
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Adrian Hajdin. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
