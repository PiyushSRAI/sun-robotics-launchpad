import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, BarChart3, Cloud, Brain, Server, Database, Shield, Cpu } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";

const solutions = [
  {
    icon: Code,
    title: "Custom Enterprise APIs",
    description: "Scalable backend solutions designed for high-throughput industrial operations. Our APIs handle millions of requests with sub-millisecond latency.",
    features: ["RESTful & GraphQL", "Real-time WebSockets", "Auto-scaling", "99.99% Uptime SLA"],
    color: "from-primary to-cyan-400",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Dashboards",
    description: "Real-time KPI tracking with intelligent anomaly detection and predictive insights. Visualize your entire operation in one place.",
    features: ["Live Data Streaming", "Custom Widgets", "Role-based Access", "Export & Reports"],
    color: "from-cyan-400 to-teal-400",
  },
  {
    icon: Cloud,
    title: "Cloud & IoT Integration",
    description: "Edge computing solutions for low-latency robotic control systems. Connect your entire fleet to the cloud seamlessly.",
    features: ["Multi-cloud Support", "Edge Processing", "Device Management", "OTA Updates"],
    color: "from-teal-400 to-secondary",
  },
  {
    icon: Brain,
    title: "Predictive Maintenance",
    description: "ML-driven anomaly detection that prevents failures before they happen. Reduce downtime and maintenance costs by up to 70%.",
    features: ["Failure Prediction", "Maintenance Scheduling", "Parts Inventory", "Cost Optimization"],
    color: "from-secondary to-primary",
  },
];

const techStack = [
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Python", icon: "🐍", category: "AI/ML" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "Kubernetes", icon: "☸️", category: "Orchestration" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "TensorFlow", icon: "🧠", category: "AI/ML" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
];

const additionalServices = [
  {
    icon: Server,
    title: "Infrastructure Management",
    description: "Complete infrastructure setup and management for your robotics operations.",
  },
  {
    icon: Database,
    title: "Data Warehousing",
    description: "Centralized data storage with analytics-ready architecture.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with industry compliance certifications.",
  },
  {
    icon: Cpu,
    title: "Edge Computing",
    description: "Process data at the edge for real-time robotic decision making.",
  },
];

const ITSolutionsPage = () => {
  const headerRef = useRef(null);
  const solutionsRef = useRef(null);
  const techRef = useRef(null);
  const additionalRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true });
  const isSolutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });
  const isTechInView = useInView(techRef, { once: true, margin: "-100px" });
  const isAdditionalInView = useInView(additionalRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              IT Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              Enterprise-Grade IT for <span className="gradient-text">Smart Industries</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Custom APIs, Cloud Robotics, and ML-Driven Dashboards that power the factories of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Solutions Grid */}
      <section className="py-24 relative overflow-hidden" ref={solutionsRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isSolutionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 glow-card group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${solution.color} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <solution.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {solution.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 relative overflow-hidden" ref={techRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="gradient-text">Technology Stack</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading tools and frameworks for enterprise-scale solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isTechInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors cursor-default"
                >
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="text-sm font-medium text-foreground">{tech.name}</span>
                  <span className="text-xs text-muted-foreground">{tech.category}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 relative overflow-hidden" ref={additionalRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAdditionalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Additional <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive IT services to support your automation journey.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isAdditionalInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 text-center glow-card group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
};

export default ITSolutionsPage;
