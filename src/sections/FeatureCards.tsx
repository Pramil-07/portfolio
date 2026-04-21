import { abilities } from "../constants";
import OptimizedImage from "../components/OptimizedImage";
import TitleHeader from "../components/TitleHeader";

const FeatureCards = () => (
    <section className="section-padding">
        <div className="w-full padding-x-lg">
            <TitleHeader title="What I Deliver" sub="End-to-end execution with clean systems" />
        <div className="mx-auto grid-3-cols">
            {abilities.map(({ imgPath, title, desc }) => (
                <div
                    key={title}
                    className="card-border p-7 flex flex-col gap-3"
                >
                    <div className="size-12 flex items-center justify-center rounded-full">
                        <OptimizedImage src={imgPath} alt={title} />
                    </div>
                    <h3 className="text-white text-xl font-semibold mt-1">{title}</h3>
                    <p className="text-white-50 text-sm leading-relaxed">{desc}</p>
                </div>
            ))}
        </div>
        </div>
    </section>
);

export default FeatureCards;
