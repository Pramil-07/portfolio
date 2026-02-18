import { Suspense, lazy } from "react";
import Navbar from "./components/NavBar";
import { Hero } from "./secitons/hero";

const Testimonials = lazy(() => import("./secitons/Testimonials"));
const Contact = lazy(() => import("./secitons/Contact"));
const Footer = lazy(() => import("./secitons/Footer"));
const ShowcaseSection = lazy(() => import("./secitons/ShowcaseSection"));
const LogoShowcase = lazy(() => import("./secitons/LogoShowcase"));
const FeatureCards = lazy(() => import("./secitons/FeatureCards"));
const Experience = lazy(() => import("./secitons/Experience"));
const TechStack = lazy(() => import("./secitons/TechStack"));
const ResumeAndCertifications = lazy(
    () => import("./secitons/ResumeAndCertifications")
);

export function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <ShowcaseSection />
        <LogoShowcase />
        <FeatureCards />
        <Experience />
        <TechStack />
        <Testimonials />
        <ResumeAndCertifications />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
}
