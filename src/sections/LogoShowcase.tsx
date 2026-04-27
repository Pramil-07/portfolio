
import { logoIconsList } from "../constants";
import OptimizedImage from "../components/OptimizedImage";

interface LogoIconData {
    imgPath: string;
    name?: string;
}

const LogoIcon = ({ icon }: { icon: LogoIconData }) => {
    return (
        <div className="flex-none flex-center marquee-item">
            <OptimizedImage src={icon.imgPath} alt={icon.name ?? "company logo"} />
        </div>
    );
};

const LogoShowcase = () => (
    <div className="md:my-14 my-8 relative">
        <div className="gradient-edge" />
        <div className="gradient-edge" />

        <div className="marquee h-20 md:h-28">
            <div className="marquee-box md:gap-12 gap-8">
                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={index} icon={icon} />
                ))}

                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={index} icon={icon} />
                ))}
            </div>
        </div>
    </div>
);

export default LogoShowcase;
