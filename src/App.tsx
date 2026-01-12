<<<<<<< HEAD

import React, { Suspense } from "react";
=======
>>>>>>> eebfe2403f746f72cdb1a521ddef4a4e455ab594
import Navbar from "./components/NavBar";
import Testimonials from "./secitons/Testimonials";
import Footer from "./secitons/Footer";
import {Hero} from "./secitons/hero";
import ShowcaseSection from "./secitons/ShowcaseSection";
import LogoShowcase from "./secitons/LogoShowcase";
import FeatureCards from "./secitons/FeatureCards";
import Experience from "./secitons/Experience";
<<<<<<< HEAD

const TechStack = React.lazy(() => import("./secitons/TechStack"));
const Contact = React.lazy(() => import("./secitons/Contact"));
export const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <ShowcaseSection />
            <LogoShowcase />
            <FeatureCards />
            <Experience />
            <Suspense fallback={null}>
                <TechStack />
            </Suspense>
            <Testimonials />
            <Suspense fallback={null}>
                <Contact />
            </Suspense>
            <Footer />
=======
import TechStack from "./secitons/TechStack";
import ResumeAndCertifications from "./secitons/ResumeAndCertifications";
>>>>>>> eebfe2403f746f72cdb1a521ddef4a4e455ab594

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
