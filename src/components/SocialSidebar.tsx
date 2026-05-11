import { socialImgs } from "../constants";
import { useTheme } from "../context/ThemeContext";

const SocialSidebar = () => {
    const { theme } = useTheme();

    return (
        <div className="hidden lg:flex fixed left-6 bottom-0 flex-col items-center gap-4 z-50">
            {socialImgs.map(({ name, url, imgPath, invertImg }) => (
                <a
                    key={name}
                    href={url}
                    target={url.startsWith("mailto") ? undefined : "_blank"}
                    rel={url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={name}
                    className="opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all duration-200"
                >
                    <img
                        src={imgPath}
                        alt={name}
                        className={`w-5 h-5${invertImg && theme === "dark" ? " invert" : ""}`}
                    />
                </a>
            ))}
            <div className="w-px h-24 mt-2" style={{ background: "var(--c-border-strong)" }} />
        </div>
    );
};

export default SocialSidebar;
