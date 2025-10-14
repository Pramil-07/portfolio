import {ReactNode} from "react";

export interface ExpCardType {
    id?: number;
    title: string;
    date: string;
    imgPath: string;
    logoPath: string;
    review: string;
    responsibilities: string[];
}
export interface TechStackIcon {
    name: string;
    modelPath: string;
    imgPath?: string;
    scale?: number[];
    rotation?: number[];
}

export interface TechIconCardExperienceProps {
    model: TechStackIcon;
}


export interface HasReview {
    review?: string;
}

export interface Testimonial extends HasReview {
    name: string;
    role: string;
    mentions: string;
    imgPath: string;
}

export interface GlowCardProps<T extends HasReview> {
    card: T;
    index: number;
    children?: ReactNode;
}