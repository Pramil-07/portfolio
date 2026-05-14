import { useEffect, useState } from "react";
import type { ProjectImage } from "../constants/types";

interface ProjectDevicePreviewCardsProps {
    images: ProjectImage[];
    alt: string;
}

const MOBILE_FILENAME_PATTERN = /-mob(?=\.[a-z0-9]+(?:[?#].*)?$)/i;
const INTERVAL_MS = 2800;

const getImageSrc = (image: ProjectImage) =>
    typeof image === "string" ? image : image.src;

const getImageAlt = (image: ProjectImage, fallback: string, label: string) =>
    typeof image === "string"
        ? `${fallback} ${label} preview`
        : image.alt ?? `${fallback} ${label} preview`;

const getImageDevice = (image: ProjectImage) => {
    if (typeof image !== "string" && image.device) return image.device;
    return MOBILE_FILENAME_PATTERN.test(getImageSrc(image)) ? "mobile" : "desktop";
};

const matchesDevice = (image: ProjectImage, device: "desktop" | "mobile") => {
    const imageDevice = getImageDevice(image);
    return imageDevice === device || imageDevice === "all";
};

const ProjectDevicePreviewCards = ({ images, alt }: ProjectDevicePreviewCardsProps) => {
    const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);
    const desktopImages = images.filter(image => matchesDevice(image, "desktop"));
    const mobileImages = images.filter(image => matchesDevice(image, "mobile"));

    useEffect(() => {
        setActiveDesktopIndex(0);
        setActiveMobileIndex(0);
    }, [images]);

    useEffect(() => {
        if (desktopImages.length <= 1) return;

        const timer = window.setInterval(() => {
            setActiveDesktopIndex(prev => (prev + 1) % desktopImages.length);
        }, INTERVAL_MS);

        return () => window.clearInterval(timer);
    }, [desktopImages]);

    useEffect(() => {
        if (mobileImages.length <= 1) return;

        const timer = window.setInterval(() => {
            setActiveMobileIndex(prev => (prev + 1) % mobileImages.length);
        }, INTERVAL_MS);

        return () => window.clearInterval(timer);
    }, [mobileImages]);

    if (desktopImages.length === 0 && mobileImages.length === 0) return null;

    return (
        <div className="device-previews" aria-label={`${alt} responsive previews`}>
            {desktopImages.length > 0 && (
                <figure className="device-preview-card device-preview-card--desktop">
                    <figcaption className="device-preview-card__topbar">
                        <span>Desktop</span>
                        <span className="device-preview-card__meta">Web dashboard</span>
                    </figcaption>
                    <div className="device-preview-card__screen">
                        {desktopImages.map((image, index) => (
                            <img
                                key={getImageSrc(image)}
                                src={getImageSrc(image)}
                                alt={getImageAlt(image, alt, `desktop ${index + 1}`)}
                                loading="lazy"
                                decoding="async"
                                className={`device-preview-card__preview-image${
                                    index === activeDesktopIndex
                                        ? " device-preview-card__preview-image--active"
                                        : ""
                                }`}
                            />
                        ))}
                    </div>
                </figure>
            )}

            {mobileImages.length > 0 && (
                <figure className="device-preview-card device-preview-card--mobile">
                    <figcaption className="device-preview-card__topbar">
                        <span>Mobile</span>
                        <span className="device-preview-card__meta">Shop flow</span>
                    </figcaption>
                    <div className="device-preview-card__screen">
                        {mobileImages.map((image, index) => (
                            <img
                                key={getImageSrc(image)}
                                src={getImageSrc(image)}
                                alt={getImageAlt(image, alt, `mobile ${index + 1}`)}
                                loading="lazy"
                                decoding="async"
                                className={`device-preview-card__preview-image${
                                    index === activeMobileIndex
                                        ? " device-preview-card__preview-image--active"
                                        : ""
                                }`}
                            />
                        ))}
                    </div>
                </figure>
            )}
        </div>
    );
};

export default ProjectDevicePreviewCards;
