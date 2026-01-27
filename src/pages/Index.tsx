import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { IndustrialRobotics } from "@/components/IndustrialRobotics";
import { ITSolutions } from "@/components/ITSolutions";
import { ProductShowcase } from "@/components/ProductShowcase";
import { AIBrain } from "@/components/AIBrain";
import { MultipurposeRobotics } from "@/components/MultipurposeRobotics";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <IndustrialRobotics />
        <ITSolutions />
        <ProductShowcase />
        <AIBrain />
        <MultipurposeRobotics />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
