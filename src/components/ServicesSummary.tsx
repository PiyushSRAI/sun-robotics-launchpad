import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, Code, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bot,
    title: "Robotics",
    description: "Industrial and multipurpose robotic systems engineered for maximum productivity and precision.",
    href: "/robotics",
    gradient: "from-primary to-cyan-400",
  },
  {
    icon: Code,
    title: "IT Solutions",
    description: "Custom APIs, AI-powered dashboards, and cloud integration for smart industries.",
    href: "/it-solutions",
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    icon: Package,
    title: "Products",
    description: "Explore our full range of SunBot robots designed for every industrial need.",
    href: "/products",
    gradient: "from-teal-400 to-secondary",
  },
];

export const ServicesSummary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Comprehensive <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From cutting-edge robotics to enterprise IT infrastructure, we deliver end-to-end automation solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 glow-card group cursor-pointer relative overflow-hidden"
              onClick={() => navigate(service.href)}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0"
                >
                  Learn More →
                </Button>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20">
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-tl-lg border-l-2 border-t-2 border-primary/20 group-hover:border-primary/40 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
