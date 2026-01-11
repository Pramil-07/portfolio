import Navbar from "./components/NavBar";
import Testimonials from "./secitons/Testimonials";
import Contact from "./secitons/Contact";
import Footer from "./secitons/Footer";
import {Hero} from "./secitons/hero";
import ShowcaseSection from "./secitons/ShowcaseSection";
import LogoShowcase from "./secitons/LogoShowcase";
import FeatureCards from "./secitons/FeatureCards";
import Experience from "./secitons/Experience";
import TechStack from "./secitons/TechStack";
import ResumeAndCertifications from "./secitons/ResumeAndCertifications";

export function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <ResumeAndCertifications />
      <Contact />
      <Footer />
    </>
  );
}
