import React from "react";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { Testimonial } from "../constants/types";


const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What People Say About Me?"
                    sub="⭐️ Customer feedback highlights"
                />

                <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
                    {testimonials.map((testimonial: Testimonial, index: number) => (
                        <GlowCard<Testimonial> card={testimonial} key={index} index={index}>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    <img 
                                        src={testimonial.imgPath} 
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold">{testimonial.name}</p>
                                    <p className="text-gray-300 text-sm font-mono ">{testimonial.role}</p>
                                    <p className="text-white-50">{testimonial.mentions}</p>
                                </div>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
