import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Clock, Wrench } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Ultimate Power",
    description: "Industrial-grade performance for the most demanding manufacturing environments.",
  },
  {
    icon: Shield,
    title: "Unmatched Accuracy",
    description: "Sub-millimeter precision in every operation, every time.",
  },
  {
    icon: Clock,
    title: "Maximum Uptime",
    description: "99.9% reliability with predictive maintenance and real-time monitoring.",
  },
  {
    icon: Wrench,
    title: "Easy Integration",
    description: "Seamless deployment with existing infrastructure and workflows.",
  },
];

export const IndustrialRobotics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industrial" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Industrial Robotics
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Power. Accuracy.{" "}
              <span className="gradient-text">Unmatched Uptime.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our industrial robotic systems are engineered for maximum productivity
              in heavy manufacturing environments. From automotive assembly to
              precision machining, we deliver solutions that redefine efficiency.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-5 glow-card group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl glass-card p-8 relative overflow-hidden">
              {/* Decorative grid */}
              <div className="absolute inset-0 grid-bg opacity-50" />
              
              {/* Robot Arm Illustration */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="relative">
                  {/* Main arm body */}
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="origin-bottom"
                  >
                    <svg
                      viewBox="0 0 300 300"
                      className="w-full max-w-xs mx-auto"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Base */}
                      <rect x="100" y="250" width="100" height="30" rx="5" className="fill-muted stroke-primary" strokeWidth="2" />
                      
                      {/* Lower arm */}
                      <rect x="135" y="150" width="30" height="100" rx="5" className="fill-card stroke-primary/60" strokeWidth="2" />
                      
                      {/* Joint */}
                      <circle cx="150" cy="150" r="20" className="fill-muted stroke-primary" strokeWidth="2" />
                      <circle cx="150" cy="150" r="8" className="fill-primary" />
                      
                      {/* Upper arm */}
                      <rect x="135" y="60" width="30" height="90" rx="5" className="fill-card stroke-primary/60" strokeWidth="2" />
                      
                      {/* Shoulder joint */}
                      <circle cx="150" cy="60" r="18" className="fill-muted stroke-primary" strokeWidth="2" />
                      <circle cx="150" cy="60" r="6" className="fill-primary" />
                      
                      {/* End effector */}
                      <path d="M130 35 L150 10 L170 35 L160 35 L150 20 L140 35 Z" className="fill-primary" />
                      
                      {/* Glow effect */}
                      <circle cx="150" cy="150" r="25" className="fill-primary/20" filter="blur(8px)" />
                    </svg>
                  </motion.div>
                  
                  {/* Floating data points */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -right-4 top-1/4 glass-card px-3 py-2 text-xs"
                  >
                    <span className="text-primary font-mono">99.9%</span>
                    <span className="text-muted-foreground ml-1">accuracy</span>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute -left-4 top-1/2 glass-card px-3 py-2 text-xs"
                  >
                    <span className="text-primary font-mono">500kg</span>
                    <span className="text-muted-foreground ml-1">payload</span>
                  </motion.div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
