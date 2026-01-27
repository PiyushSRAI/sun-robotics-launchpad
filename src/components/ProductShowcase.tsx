import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Factory, Warehouse, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "SunBot Industrial X1",
    category: "Heavy Manufacturing",
    icon: Factory,
    specs: {
      payload: "500kg",
      reach: "3.2m",
      speed: "2.5m/s",
      accuracy: "±0.02mm",
    },
    description: "Our flagship industrial robot designed for heavy-duty manufacturing. Built for 24/7 operation in demanding environments.",
    gradient: "from-primary via-cyan-500 to-blue-600",
  },
  {
    id: 2,
    name: "SunBot Logistics Pro",
    category: "Warehouse Automation",
    icon: Warehouse,
    specs: {
      payload: "200kg",
      battery: "12h",
      speed: "3.0m/s",
      navigation: "SLAM",
    },
    description: "Autonomous mobile robot for warehouse logistics. Features advanced navigation and fleet management capabilities.",
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
  },
  {
    id: 3,
    name: "SunBot Vision AI",
    category: "Quality Inspection",
    icon: Eye,
    specs: {
      resolution: "4K",
      accuracy: "99.8%",
      speed: "100fps",
      defects: "500+ types",
    },
    description: "AI-powered visual inspection system for quality control. Detects defects invisible to the human eye.",
    gradient: "from-secondary via-purple-500 to-pink-500",
  },
  {
    id: 4,
    name: "SunBot Collaborative",
    category: "Human-Robot Interaction",
    icon: Users,
    specs: {
      payload: "15kg",
      certified: "ISO 10218",
      sensing: "Force",
      setup: "5 min",
    },
    description: "Safe collaborative robot designed to work alongside humans. Features advanced force sensing and quick programming.",
    gradient: "from-pink-500 via-rose-500 to-primary",
  },
];

export const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <section id="products" className="py-24 relative overflow-hidden" ref={ref}>
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
            Products
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Innovation in <span className="gradient-text">Motion</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our range of cutting-edge robotic solutions designed for every industry.
          </p>
        </motion.div>

        {/* Product Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct.gradient} opacity-5`} />

            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              {/* Product Visual */}
              <div className="relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    key={currentProduct.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Glow ring */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentProduct.gradient} blur-3xl opacity-30`} />
                    
                    {/* Icon container */}
                    <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${currentProduct.gradient} p-1`}>
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <currentProduct.icon className="w-24 h-24 md:w-32 md:h-32 text-primary" strokeWidth={1} />
                      </div>
                    </div>

                    {/* Orbiting elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-primary" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Product Info */}
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {currentProduct.category}
                </div>
                
                <h3 className="text-3xl font-display font-bold text-foreground mb-4">
                  {currentProduct.name}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {currentProduct.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(currentProduct.specs).map(([key, value]) => (
                    <div key={key} className="bg-muted/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {key}
                      </div>
                      <div className="text-lg font-display font-semibold text-foreground">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="glow-button bg-primary text-primary-foreground">
                  Learn More
                </Button>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="glass border-white/10 hover:bg-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="glass border-white/10 hover:bg-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
