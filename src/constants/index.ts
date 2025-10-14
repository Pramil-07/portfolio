import {ExpCardType, Testimonial} from "./types";

const navLinks = [
    { name: "Work", link: "#work" },
    { name: "Experience", link: "#experience" },
    { name: "Skills", link: "#skills" },
    { name: "Testimonials", link: "#testimonials" },
];

const words = [
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Design", imgPath: "/images/designs.svg" },
    { text: "Build", imgPath: "/images/ideas.svg" },
    { text: "Deploy", imgPath: "/images/concepts.svg" },
    { text: "Scale", imgPath: "/images/code.svg" },
    { text: "Innovate", imgPath: "/images/ideas.svg" },
];

const counterItems = [
    { value: 1, suffix: "+", label: "Years of Experience" },
    { value: 3, suffix: "+", label: "Major Projects Completed" },
    { value: 5, suffix: "+", label: "Technologies Mastered" },
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
        desc: "Building scalable, high-performance web apps using Next.js and Django REST Framework.",
    },
    {
        imgPath: "/images/time.png",
        title: "Optimized Delivery",
        desc: "Deploying and maintaining production-ready systems with Docker, Redis, and PostgreSQL.",
    },
    {
        imgPath: "/images/chat.png",
        title: "Collaborative Workflow",
        desc: "Working closely with designers, developers, and clients using Agile methodology for effective delivery.",
    },
];

const techStackImgs = [
    { name: "Next.js Developer", imgPath: "/images/logos/nextjs.svg" },
    { name: "Django Developer", imgPath: "/images/logos/django.png" },
    { name: "PostgreSQL", imgPath: "/images/logos/postgresql.svg" },
    { name: "Redis", imgPath: "/images/logos/redis.svg" },
    { name: "Docker", imgPath: "/images/logos/docker.png" },
];

const techStackIcons = [
    {
        name: "React Developer",
        modelPath: "/images/REACT.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "Python Developer",
        modelPath: "/images/PYTHON.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "TypeScript Developer",
        modelPath: "/images/TYPESCRIPT.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "JavaScript Developer",
        modelPath: "/images/JAVASCRIPT.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "Backend Developer",
        modelPath: "/images/DJANGO.png",
        scale: [5 , 5 , 5],
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Redis cache ",
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
        name: "State Management ",
        modelPath: "/images/REDUX.png",
        scale: [5 , 5 , 5],
        rotation: [0, 0, 0],
    },
    {
        name: "Project Management",
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
        review:
            "Pramil has been instrumental in delivering full-stack features at Cagtu Nepal, combining clean design with efficient backend logic. His attention to scalability and integration has made him a reliable asset to the team.",
        imgPath: "/images/homaale-logo_png.png",
        logoPath: "/images/homaale-favicon.png",
        title: "Junior Full Stack Developer",
        date: "Nov 2024 – Present",
        responsibilities: [
            "Developing and maintaining scalable web applications using Next.js and Django REST Framework.",
            "Integrated Google Maps, PayPal, Stripe, eSewa, and Khalti APIs for real-world service and payment platforms.",
            "Worked on high-impact products like Homaale (task/service platform) and Buzz API (e-commerce backend).",
            "Implemented caching with Redis and deployed applications using Docker.",
        ],
    },
    {
        id: 2,
        review:
            "Pramil made a significant contribution to MithoSweets — a complete eCommerce platform with smooth customer experience and robust admin management. His expertise ensured a secure, scalable, and polished final product.",
        imgPath: "/images/mithoSweets_banner.png",
        logoPath: "/images/mithoSweets_logo.png",
        title: "MithoSweets – Full Stack E-commerce Platform",
        date: "Dec 2024 – Present",
        responsibilities: [
            "Developed a complete eCommerce website with separate Admin and Customer dashboards using Next.js and Django REST Framework.",
            "Implemented secure authentication and authorization with JWT for user roles (Admin, Customer).",
            "Integrated a payment gateway for real-time online transactions and order management.",
            "Built REST APIs in Django for product listings, orders, payments, and user management with optimized database queries.",
            "Collaborated with the team on Git and followed clean code architecture with reusable components.",
        ],
    },
    {
        id: 3,
        review:
            "During his internship, Pramil quickly demonstrated an ability to learn, adapt, and contribute effectively to team projects, delivering reliable and polished features.",
        imgPath: "/images/cagtu-logo-icon.png",
        logoPath: "/images/cagtu-Collapsed.webp",
        title: "Full Stack Intern",
        date: "Aug 2024 – Nov 2024",
        responsibilities: [
            "Built responsive UI components with Next.js and Tailwind CSS.",
            "Contributed to backend endpoints and bug fixes using Django REST Framework.",
            "Managed state using Redux Toolkit and consumed REST APIs using Axios.",
            "Collaborated with the development team following Agile practices and Git version control.",
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
        imgPath: "/images/client1.png",
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
        imgPath: "/images/client3.png",
    },
];

const socialImgs = [
    {
        name: "github",
        url: "https://github.com/pramildhungana",
        imgPath: "/images/github.png",
    },
    {
        name: "linkedin",
        url: "https://www.linkedin.com/in/pramildhungana",
        imgPath: "/images/linkedin.png",
    },
    {
        name: "email",
        url: "mailto:pramildhungana7@gmail.com",
        imgPath: "/images/mail.png",
    },
];

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
    navLinks,
};
