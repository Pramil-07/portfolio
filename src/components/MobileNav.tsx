import { useState, useEffect } from "react";
import { Home, Briefcase, Code2, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
    { id: "hero",    label: "Home",    href: "#hero",    Icon: Home },
    { id: "work",    label: "Work",    href: "#work",    Icon: Briefcase },
    { id: "skills",  label: "Skills",  href: "#skills",  Icon: Code2 },
    { id: "contact", label: "Contact", href: "#contact", Icon: Mail },
];

const MobileNav = () => {
    const [active, setActive] = useState("hero");
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { threshold: 0.3 }
        );
        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round(rect.left + rect.width / 2);
        const y = Math.round(rect.top + rect.height / 2);
        toggleTheme(x, y);
    };

    return (
        <nav
            className="flex lg:hidden fixed bottom-0 left-0 right-0 z-[200]"
            style={{
                background: "var(--c-mobile-nav-bg)",
                borderTop: "1px solid var(--c-border)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
            }}
        >
            {NAV_ITEMS.map(({ id, label, href, Icon }) => {
                const isActive = active === id;
                return (
                    <a
                        key={id}
                        href={href}
                        className="flex flex-col items-center justify-center flex-1 py-2.5 gap-1 transition-all duration-200"
                        style={{ color: isActive ? "var(--c-mobile-text-on)" : "var(--c-mobile-text-off)" }}
                    >
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                            style={{
                                background: isActive ? "var(--c-mobile-active-bg)" : "transparent",
                            }}
                        >
                            <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
                        </div>
                        <span
                            className="text-[9px] font-semibold uppercase tracking-widest"
                            style={{ opacity: isActive ? 1 : 0.6 }}
                        >
                            {label}
                        </span>
                    </a>
                );
            })}

            {/* Theme toggle tab */}
            <button
                onClick={handleToggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex flex-col items-center justify-center flex-1 py-2.5 gap-1 transition-all duration-200"
                style={{
                    color: "var(--c-mobile-text-off)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg">
                    {theme === "dark" ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ opacity: 0.6 }}>
                    {theme === "dark" ? "Light" : "Dark"}
                </span>
            </button>
        </nav>
    );
};

export default MobileNav;
