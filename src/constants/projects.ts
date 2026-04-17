import { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "NepaStore",
    description:
      "B2B wholesale ordering platform. Contributed across frontend and backend — authentication, admin invitation flows, cart and order updates, audit support, and migration fixes using React, TypeScript, FastAPI, and PostgreSQL.",
    images: [
      "/images/projects/nepastore-1.jpg",
      "/images/projects/nepastore-2.jpg",
    ],
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    category: "Full Stack",
  },
  {
    id: 2,
    title: "SellrClub",
    description:
      "Multi-tenant sales operations SaaS. Built password reset, workspace state management, notification integration, warehouse APIs, time-tracking support, and SMTP configuration across frontend and backend.",
    images: [
      "/images/projects/sellrclub-1.jpg",
    ],
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    category: "SaaS",
  },
  {
    id: 3,
    title: "Homaale",
    description:
      "Service and product marketplace. Delivered backend APIs for booking slots, merchant workflows, payment integrations (Khalti, eSewa), analytics, and merchant-facing UI features including map and autocomplete flows.",
    images: ["/images/certifications/project1.png"],
    liveUrl: "https://homaale.com",
    tags: ["Next.js", "Django", "PostgreSQL", "REST API", "Pytest"],
    category: "Full Stack",
  },
  {
    id: 4,
    title: "Buzz API",
    description:
      "E-commerce and content backend with product CRUD, blog management, analytics APIs, vendor operations, cart and checkout improvements, Google OAuth, Khalti payments, and Redis caching.",
    images: ["/images/certifications/cagtu_cms.jpg"],
    tags: ["Django", "PostgreSQL", "Redis", "REST API"],
    category: "Backend",
  },
  {
    id: 5,
    title: "MithoSweets",
    description:
      "E-commerce storefront for a traditional Nepali sweets brand. Contributed responsive UI updates, shop card improvements, best-seller slider refinements, and mobile experience fixes.",
    images: ["/images/certifications/project2.png"],
    liveUrl: "https://mithosweets.com",
    tags: ["Next.js", "React", "Tailwind CSS"],
    category: "E-Commerce",
  },
  {
    id: 6,
    title: "CAGTU CMS",
    description:
      "Modular CMS and admin workspace used for content and operational management workflows across multiple CAGTU products.",
    images: ["/images/certifications/cagtu_cms.jpg"],
    tags: ["Nx", "React", "Mantine", "React Query"],
    category: "CMS",
  },
];
