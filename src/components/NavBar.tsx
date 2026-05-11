import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { navLinks } from "../constants";
import { useTheme } from "../context/ThemeContext";

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round(rect.left + rect.width / 2);
        const y = Math.round(rect.top + rect.height / 2);
        toggleTheme(x, y);
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
                            <li key={name} className="group">
                                <a href={href}>
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

                    <a href="#contact" className="contact-btn group">
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
