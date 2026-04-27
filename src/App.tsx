import { Suspense, lazy } from "react";
import Navbar from "./components/NavBar";
import { Hero } from "./sections/hero";
import MobileNav from "./components/MobileNav";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import { useLenis } from "./hooks/useLenis";

const Testimonials = lazy(() => import("./sections/Testimonials"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const LogoShowcase = lazy(() => import("./sections/LogoShowcase"));
const FeatureCards = lazy(() => import("./sections/FeatureCards"));
const Experience = lazy(() => import("./sections/Experience"));
const TechStack = lazy(() => import("./sections/TechStack"));
export function App() {
  useLenis();
  return (
    <>
      <PageLoader />
      <MobileNav />
      <Navbar />
      <Hero />
      <ErrorBoundary>
        <Suspense fallback={<div className="flex-center min-h-[200px]"><span className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" /></div>}>
          <ShowcaseSection />
          <LogoShowcase />
          <FeatureCards />
          <Experience />
          <TechStack />
          <Testimonials />
          <Contact />
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
