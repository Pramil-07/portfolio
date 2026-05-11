import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: (originX?: number, originY?: number) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: "dark",
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

/* ── Ripple overlay ─────────────────────────────────────────────────
   A full-screen circle expands from the toggle button origin,
   revealing the new theme underneath via clip-path animation.
   Uses the View Transitions API when available for a native feel,
   with a CSS fallback otherwise.
─────────────────────────────────────────────────────────────────── */
function animateThemeTransition(
    nextTheme: Theme,
    originX: number,
    originY: number,
    applyTheme: (t: Theme) => void,
) {
    // Use View Transitions API (Chrome 111+)
    if (document.startViewTransition) {
        const root = document.documentElement;
        const maxRadius = Math.hypot(
            Math.max(originX, window.innerWidth - originX),
            Math.max(originY, window.innerHeight - originY),
        );

        const transition = document.startViewTransition(() => {
            applyTheme(nextTheme);
        });

        transition.ready.then(() => {
            const clipFrom = `circle(0px at ${originX}px ${originY}px)`;
            const clipTo   = `circle(${maxRadius}px at ${originX}px ${originY}px)`;

            document.documentElement.animate(
                { clipPath: [clipFrom, clipTo] },
                {
                    duration: 460,
                    easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                    pseudoElement: "::view-transition-new(root)",
                },
            );
        });
        return;
    }

    // CSS fallback — fade transition (already on html via index.css)
    applyTheme(nextTheme);
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            const stored = localStorage.getItem("theme") as Theme | null;
            if (stored === "dark" || stored === "light") return stored;
        } catch {}
        return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    });

    // Keep a ref so the animation callback always sees the latest setter
    const setThemeRef = useRef(setTheme);
    setThemeRef.current = setTheme;

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try { localStorage.setItem("theme", theme); } catch {}
    }, [theme]);

    const toggleTheme = (originX = window.innerWidth / 2, originY = window.innerHeight / 2) => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        animateThemeTransition(next, originX, originY, (t) => setThemeRef.current(t));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
