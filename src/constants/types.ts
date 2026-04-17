import {ReactNode} from "react";

export interface ExpCardType {
    id?: number;
    company: string;
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
    isHerosection?: boolean;
}

export interface NavLink {
  id: number;
  name: string;
  href: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  imgPath: string;
  credentialUrl: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  category: string;
}