import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CTO, AutoTech Industries",
    content: "Sun Robotics transformed our manufacturing line. The precision and uptime of their industrial robots exceeded all expectations.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Operations Director, LogiFlow",
    content: "Their logistics robots reduced our warehouse processing time by 60%. The AI-powered navigation is incredibly intelligent.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "VP Engineering, GlobalMfg",
    content: "The integration was seamless. Their team provided exceptional support, and the ROI was visible within the first quarter.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Client Success
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our clients say about their experience with Sun Robotics & AI.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 relative"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
