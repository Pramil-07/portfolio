import { useState, useEffect } from "react";
import { Home, Briefcase, Code2, Mail } from "lucide-react";

const NAV_ITEMS = [
    { id: "hero",    label: "Home",    href: "#hero",    Icon: Home },
    { id: "work",    label: "Work",    href: "#work",    Icon: Briefcase },
    { id: "skills",  label: "Skills",  href: "#skills",  Icon: Code2 },
    { id: "contact", label: "Contact", href: "#contact", Icon: Mail },
];

const MobileNav = () => {
    const [active, setActive] = useState("hero");

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

    return (
        <nav
            className="flex lg:hidden fixed bottom-0 left-0 right-0 z-[200]"
            style={{
                background: "rgba(14, 14, 16, 0.97)",
                borderTop: "1px solid rgba(255,255,255,0.12)",
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
                        style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}
                    >
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                            style={{
                                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
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
        </nav>
    );
};

export default MobileNav;
