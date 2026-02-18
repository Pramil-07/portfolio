import { useEffect, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    fallbackSrc?: string;
};

const DEFAULT_FALLBACK_SRC = "/images/fav.png";

const OptimizedImage = ({
    src,
    alt,
    loading = "lazy",
    decoding = "async",
    fallbackSrc = DEFAULT_FALLBACK_SRC,
    onError,
    ...rest
}: OptimizedImageProps) => {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
        setImageSrc(src);
    }, [src]);

    const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        if (fallbackSrc && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
        }
        onError?.(event);
    };

    return (
        <img
            {...rest}
            src={imageSrc}
            alt={alt ?? "image"}
            loading={loading}
            decoding={decoding}
            onError={handleError}
        />
    );
};

export default OptimizedImage;
