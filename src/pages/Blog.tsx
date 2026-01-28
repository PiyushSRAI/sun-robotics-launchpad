import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const posts: BlogPost[] = [
  {
    id: "future-of-industrial-ai",
    title: "The Future of Industrial AI: 2026 Trends",
    excerpt:
      "Explore the emerging trends in industrial artificial intelligence and how they're reshaping manufacturing and logistics.",
    category: "AI Research",
    date: "Jan 25, 2026",
    readTime: "5 min read",
    image: "/placeholder.svg",
  },
  {
    id: "collaborative-robots",
    title: "Why Collaborative Robots Are the Future",
    excerpt:
      "Understanding the rise of cobots and their impact on human-machine collaboration in modern factories.",
    category: "Robotics",
    date: "Jan 20, 2026",
    readTime: "4 min read",
    image: "/placeholder.svg",
  },
  {
    id: "edge-computing-robotics",
    title: "Edge Computing in Robotics: A Deep Dive",
    excerpt:
      "How edge computing is enabling real-time decision making in autonomous robotic systems.",
    category: "Technology",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    image: "/placeholder.svg",
  },
  {
    id: "safety-standards",
    title: "Navigating Industrial Robot Safety Standards",
    excerpt:
      "A comprehensive guide to ISO and IEC safety standards for industrial robotics deployments.",
    category: "Compliance",
    date: "Jan 10, 2026",
    readTime: "7 min read",
    image: "/placeholder.svg",
  },
  {
    id: "computer-vision-quality",
    title: "Computer Vision for Quality Control",
    excerpt:
      "Implementing AI-powered visual inspection systems for zero-defect manufacturing.",
    category: "AI Research",
    date: "Jan 5, 2026",
    readTime: "5 min read",
    image: "/placeholder.svg",
  },
  {
    id: "roi-automation",
    title: "Calculating ROI on Automation Investments",
    excerpt:
      "A practical framework for measuring the return on investment in industrial automation projects.",
    category: "Business",
    date: "Jan 1, 2026",
    readTime: "4 min read",
    image: "/placeholder.svg",
  },
];

const Blog = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <>
      <SEO
        title="Blog"
        description="Insights and updates from Sun Robotics & AI on industrial automation, AI research, and the future of robotics."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              Insights & <span className="gradient-text">Updates</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Stay updated with the latest in industrial automation, AI
              research, and robotics innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 relative" ref={gridRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden glow-card group cursor-pointer"
              >
                <div className="aspect-video bg-muted/30 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
