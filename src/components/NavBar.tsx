import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { navLinks } from "../constants";
import { useTheme } from "../context/ThemeContext";

const TRACKED_SECTION_IDS = [...navLinks.map(({ href }) => href.replace("#", "")), "contact"];

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const getActiveSection = () => {
            const probeLine = 60 + window.innerHeight * 0.22;
            let currentSection = TRACKED_SECTION_IDS[0] ?? "hero";

            for (const sectionId of TRACKED_SECTION_IDS) {
                const section = document.getElementById(sectionId);
                if (!section) continue;

                const rect = section.getBoundingClientRect();
                if (rect.top <= probeLine) {
                    currentSection = sectionId;
                }
            }

            return currentSection;
        };

        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
            setActiveSection((prev) => {
                const next = getActiveSection();
                return prev === next ? prev : next;
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round(rect.left + rect.width / 2);
        const y = Math.round(rect.top + rect.height / 2);
        toggleTheme(x, y);
    };

    const handleNavClick = (href: string) => {
        setActiveSection(href.replace("#", ""));
    };

    return (
        <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
            <div className="inner">
                <a href="#hero" className="logo">
                    Pramil Dhungana
                </a>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({ href, name }) => (
                            <li
                                key={name}
                                className={`group${activeSection === href.replace("#", "") ? " active" : ""}`}
                            >
                                <a
                                    href={href}
                                    className="nav-link"
                                    onClick={() => handleNavClick(href)}
                                    aria-current={activeSection === href.replace("#", "") ? "page" : undefined}
                                >
                                    <span>{name}</span>
                                    <span className="underline" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                        className="theme-toggle"
                        onClick={handleToggle}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    <a
                        href="#contact"
                        className={`contact-btn group${activeSection === "contact" ? " active" : ""}`}
                        onClick={() => handleNavClick("#contact")}
                        aria-current={activeSection === "contact" ? "page" : undefined}
                    >
                        <div className="inner">
                            <span>Contact me</span>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
