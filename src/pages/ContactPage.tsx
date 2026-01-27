import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, Phone, MapPin, Loader2, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage = () => {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sunroboticsandai@gmail.com",
      href: "mailto:sunroboticsandai@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8144426440",
      href: "tel:+918144426440",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Indraprastha Tower, Rau, Indore, India",
      href: "https://maps.google.com/?q=Indraprastha+Tower+Rau+Indore+India",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon - Sat: 9:00 AM - 6:00 PM IST",
      href: null,
    },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              Let's Build the Future <span className="gradient-text">Together</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your operations with AI and robotics? 
              Our team is here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative overflow-hidden" ref={formRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="glass-card p-8 md:p-10 rounded-2xl">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-muted/50 border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="bg-muted/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company Name"
                        className="bg-muted/50 border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="bg-muted/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="bg-muted/50 border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements..."
                      rows={6}
                      required
                      className="bg-muted/50 border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full glow-button bg-primary text-primary-foreground hover:bg-primary/90 py-6"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.label === "Address" ? "_blank" : undefined}
                      rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-6 glass-card rounded-xl glow-card group block"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </div>
                        <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-6 glass-card rounded-xl">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </div>
                        <div className="text-foreground font-medium">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass-card rounded-xl overflow-hidden h-64"
              >
                <div className="w-full h-full bg-muted/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 grid-bg opacity-50" />
                  <div className="relative text-center">
                    <Globe className="w-12 h-12 text-primary mx-auto mb-3" />
                    <p className="text-foreground font-medium mb-1">
                      Indraprastha Tower
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rau, Indore, India
                    </p>
                    <a
                      href="https://maps.google.com/?q=Indraprastha+Tower+Rau+Indore+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-sm text-primary hover:underline"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
