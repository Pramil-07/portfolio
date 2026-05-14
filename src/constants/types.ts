import {ReactNode} from "react";

export type ProjectImage =
  | string
  | {
      src: string;
      device?: "desktop" | "mobile" | "all";
      alt?: string;
    };

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

export interface Project {
  id: number;
  title: string;
  description: string;
  images: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  category: string;
}
