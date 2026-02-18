export const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const isMobileViewport = (): boolean => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }

    return window.matchMedia("(max-width: 768px)").matches;
};

export const shouldReduceHeavyMotion = (): boolean => {
    return prefersReducedMotion() || isMobileViewport();
};
