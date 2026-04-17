import {ExpCardType, Testimonial, NavLink, Certification} from "./types";

export const navLinks: NavLink[] = [
  { id: 1, name: "Home", href: "#hero" },
  { id: 2, name: "Work", href: "#work" },
  { id: 3, name: "Experience", href: "#experience" },
  { id: 4, name: "Skills", href: "#skills" },
  { id: 5, name: "Testimonials", href: "#testimonials" },
  { id: 6, name: "Resume", href: "#resume" },
  { id: 7, name: "Contact", href: "#contact" },
];

const words = [
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Brands", imgPath: "/images/designs.svg" },
    { text: "Dreams", imgPath: "/images/concepts.svg" },
    { text: "Products", imgPath: "/images/code.svg" },
    { text: "Solutions", imgPath: "/images/ideas.svg" },
    { text: "Visions", imgPath: "/images/designs.svg" },
];


const counterItems = [
    { value: 1.5, suffix: "+", label: "Years of Experience" },
    { value: 8, suffix: "+", label: "Projects Delivered" },
    { value: 15, suffix: "+", label: "Technologies Used" },
    { value: 100, suffix: "%", label: "Commitment to Quality" },
];

const logoIconsList = [
    {
        imgPath: "/images/logos/company-logo-1.png",
    },
    {
        imgPath: "/images/logos/company-logo-2.png",
    },
    {
        imgPath: "/images/logos/company-logo-3.png",
    },
    {
        imgPath: "/images/logos/company-logo-4.png",
    },
    {
        imgPath: "/images/logos/company-logo-5.png",
    },
    {
        imgPath: "/images/logos/company-logo-6.png",
    },
    {
        imgPath: "/images/logos/company-logo-7.png",
    },
    {
        imgPath: "/images/logos/company-logo-8.png",
    },
    {
        imgPath: "/images/logos/company-logo-9.png",
    },
    {
        imgPath: "/images/logos/company-logo-10.png",
    },
    {
        imgPath: "/images/logos/company-logo-11.png",
    },
];
const abilities = [
    {
        imgPath: "/images/seo.png",
        title: "Full Stack Development",
        desc: "Building production web products with React, Next.js, TypeScript, FastAPI, and Django — from UI to API to database.",
    },
    {
        imgPath: "/images/time.png",
        title: "Reliable Delivery",
        desc: "Shipping end-to-end features across auth, payments, analytics, and testing in multi-repo team environments.",
    },
    {
        imgPath: "/images/chat.png",
        title: "Collaborative Workflow",
        desc: "Working across frontend and backend repositories with Git, GitHub Actions, code review, and structured debugging.",
    },
];

const techStackImgs = [
    { name: "Next.js / React", imgPath: "/images/REACT.png" },
    { name: "Django / FastAPI", imgPath: "/images/DJANGO.png" },
    { name: "PostgreSQL", imgPath: "/images/MONGO_DB.png" },
    { name: "Redis", imgPath: "/images/REDIS.png" },
    { name: "Docker", imgPath: "/images/docker_logo.png" },
];

const techStackIcons = [
    {
        name: "React / Next.js",
        modelPath: "/images/REACT.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "Python",
        modelPath: "/images/PYTHON.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "TypeScript",
        modelPath: "/images/TYPESCRIPT.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "JavaScript",
        modelPath: "/images/JAVASCRIPT.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "Django / FastAPI",
        modelPath: "/images/DJANGO.png",
        scale: [5 , 5 , 5],
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Redis",
        modelPath: "/images/REDIS.png",
        scale: [5 , 5 , 5],
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Tailwind CSS",
        modelPath: "/images/TAILWIND.png",
        scale: [5 , 5 , 5],
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "PostgreSQL",
        modelPath: "/images/MONGO_DB.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "Git / GitHub",
        modelPath: "/images/GITHUB.png",
        scale: [5 , 5 , 5],
        rotation: [0, -Math.PI / 4, 0],
    },
    {
        name: "Docker",
        modelPath: "/images/docker_logo.png",
        scale: [10 , 10 , 10],
        rotation: [0, -Math.PI / 4, 0],
    },
];
const expCards: ExpCardType[] = [
    {
        id: 1,
        company: "NepaWorks",
        review:
            "Pramil has been an excellent addition to the NepaWorks team, shipping full-stack features across NepaStore and SellrClub with speed and reliability. His ability to work across frontend and backend repositories in a fast-moving product environment is impressive.",
        imgPath: "/images/nepa-works.webp",
        logoPath: "/images/nepa-works.webp",
        title: "Full Stack Developer",
        date: "Jan 2026 – Present",
        responsibilities: [
            "Building and shipping full-stack features across NepaStore and SellrClub using React, TypeScript, FastAPI, PostgreSQL, Redis, and Docker.",
            "Delivered NepaStore functionality including authentication, admin invitation flows, cart and order updates, audit support, and migration fixes.",
            "Built SellrClub capabilities: password reset, workspace state management, notification integration, warehouse APIs, time-tracking, and SMTP configuration.",
            "Resolved migration conflicts, backend reliability issues, and unnecessary frontend API calls across multiple active product repositories.",
        ],
    },
    {
        id: 2,
        company: "CAGTU Nepal",
        review:
            "Pramil has been instrumental in delivering full-stack features at CAGTU Nepal, combining clean design with efficient backend logic across multiple live products. His attention to scalability, payments, and API integration made him a reliable asset to the team.",
        imgPath: "/images/cagtu-logo.jpg",
        logoPath: "/images/cagtu-logo.jpg",
        title: "Full Stack Developer",
        date: "Nov 2024 – Jan 2026",
        responsibilities: [
            "Developed frontend and backend features across Homaale, Buzz, Merchant Dashboard, CAGTU CMS, and Mitho Sweets using Next.js, React, Django, PostgreSQL, and REST APIs.",
            "Built service booking, merchant management, analytics, and e-commerce modules including availability APIs, sold-products workflows, and shop analytics.",
            "Integrated Google OAuth, Khalti and eSewa payment flows, map and location workflows, and product-level analytics.",
            "Improved product quality through bug fixing, API integration, responsive UI updates, test support, and release troubleshooting.",
        ],
    },
    {
        id: 3,
        company: "CAGTU Nepal",
        review:
            "During his internship, Pramil quickly demonstrated an ability to learn, adapt, and contribute effectively to team projects, delivering reliable and polished features.",
        imgPath: "/images/homaale-logo_png.png",
        logoPath: "/images/homaale-favicon.png",
        title: "Full Stack Intern",
        date: "Aug 2024 – Nov 2024",
        responsibilities: [
            "Built responsive UI components, connected frontend screens with APIs, and fixed issues in live products.",
            "Contributed dynamic data rendering, mobile responsiveness, and UI refinements to company products.",
            "Learned collaborative workflows, code review practices, and Git-based team development.",
        ],
    },
];

const expLogos = [
    { name: "Cagtu Nepal", imgPath: "/images/logo1.png" },
];

const testimonials:Testimonial[] = [
    {
        name: "Deepak Chalise",
        role:"Backend Developer at CAGTU Nepal",
        mentions: "@cagtunepal",
        review:
            "Pramil consistently delivers high-quality work with precision and dedication. His understanding of full-stack systems and proactive communication make him a valuable developer.",
        imgPath: "/images/deepak.jpg",
    },
    {
        name: "krijan Niraula",
        role:"Project Manager at CAGTU Nepal",
        mentions: "@projectlead",
        review:
            "Working with Pramil has been a smooth and productive experience. His problem-solving mindset and mastery of modern web technologies set him apart.",
        imgPath: "/images/client2.png",
    },
    {
        name: "Utsav Guragai",
        role:"Frontend Developer at CAGTU Nepal",
        mentions: "@uxcollab",
        review:
            "Pramil understands the importance of user experience and translates design ideas into robust, scalable code effortlessly. Highly recommended for any product-focused team.",
        imgPath: "/images/utsav.jpg",
    },
];

const socialImgs = [
    {
        name: "github",
        url: "https://github.com/Pramil-07",
        imgPath: "/images/GITHUB.png",
        invertImg: true,
    },
    {
        name: "linkedin",
        url: "https://www.linkedin.com/in/pramil-dhungana/",
        imgPath: "/images/linkedin.png",
        invertImg: false,
    },
    {
        name: "email",
        url: "mailto:pramildhungana7@gmail.com?subject=Hello Pramil&body=Hi Pramil,",
        imgPath: "/images/mail.png",
        invertImg: true,
    },
];

export const certifications: Certification[] = [
  {
    title: "Full Stack Development Internship",
    issuer: "CAGTU Nepal",
    date: "2024",
    imgPath: "/images/cagtu-logo.jpg",
    credentialUrl: "https://cagtu.com",
  },
];

export const resumeFile = "/Pramil_Dhungana_CV.pdf";

export {
    words,
    abilities,
    logoIconsList,
    counterItems,
    expCards,
    expLogos,
    testimonials,
    socialImgs,
    techStackIcons,
    techStackImgs,
};
