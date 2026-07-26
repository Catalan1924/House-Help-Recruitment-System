import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import FeaturedWorkers from "../components/FeaturedWorkers";
import FeaturedJobs from "../components/FeaturedJobs";
import TrustSection from "../components/TrustSection";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FeaturedWorkers />
      <FeaturedJobs />
      <TrustSection />
      <CTA />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default Landing;
