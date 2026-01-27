import { Hero } from "@/components/Hero";
import { ServicesSummary } from "@/components/ServicesSummary";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";

const Index = () => {
  return (
    <>
      <Hero />
      <ServicesSummary />
      <Testimonials />
      <CTABanner />
    </>
  );
};

export default Index;
