import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, TrendingUp, Cpu } from "lucide-react";

const tags = [
  { label: "Real-time Analytics", icon: Activity },
  { label: "Predictive Modeling", icon: TrendingUp },
  { label: "Edge Processing", icon: Cpu },
];

export const AIBrain = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-brain" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              The AI Brain
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Advanced <span className="gradient-text">Cognitive Architecture</span>
            </h2>
          </motion.div>

          {/* Floating Brain Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative my-16"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative inline-block"
            >
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-cyan-400 to-secondary rounded-full blur-3xl opacity-30 scale-150" />
              
              {/* Main chip/brain container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Circuit pattern background */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
                    <defs>
                      <pattern id="circuit" patternUnits="userSpaceOnUse" width="20" height="20">
                        <path d="M0 10 L10 10 L10 0" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                        <circle cx="10" cy="10" r="1.5" className="fill-primary" />
                      </pattern>
                    </defs>
                    <rect width="200" height="200" fill="url(#circuit)" />
                  </svg>
                </div>

                {/* Main shape */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 border border-primary/30">
                  {/* Inner core */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-card to-muted border border-primary/20 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Cpu className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1} />
                    </motion.div>
                  </div>
                </div>

                {/* Orbiting nodes */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      inset: `${-10 - i * 5}px`,
                    }}
                  >
                    <div
                      className="absolute w-3 h-3 rounded-full bg-primary shadow-lg"
                      style={{
                        top: "50%",
                        left: i % 2 === 0 ? "0" : "auto",
                        right: i % 2 === 1 ? "0" : "auto",
                        transform: "translateY(-50%)",
                        boxShadow: "0 0 20px hsl(199, 89%, 48%, 0.5)",
                      }}
                    />
                  </motion.div>
                ))}

                {/* Pulse rings */}
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full border border-primary"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Our proprietary AI model doesn't just process data; it{" "}
            <span className="text-foreground font-medium">understands context</span>.
            Self-learning algorithms that predict failures before they happen.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {tags.map((tag, index) => (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full glass-card neon-border"
              >
                <tag.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{tag.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
