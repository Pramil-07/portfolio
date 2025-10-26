import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "./components/NavBar";
import Testimonials from "./secitons/Testimonials";
import Contact from "./secitons/Contact";
import Footer from "./secitons/Footer";
import { Hero } from "./secitons/hero";
import ShowcaseSection from "./secitons/ShowcaseSection";
import LogoShowcase from "./secitons/LogoShowcase";
import FeatureCards from "./secitons/FeatureCards";
import Experience from "./secitons/Experience";
import TechStack from "./secitons/TechStack";
export const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(Hero, {}), _jsx(ShowcaseSection, {}), _jsx(LogoShowcase, {}), _jsx(FeatureCards, {}), _jsx(Experience, {}), _jsx(TechStack, {}), _jsx(Testimonials, {}), _jsx(Contact, {}), _jsx(Footer, {})] }));
};
