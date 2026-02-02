import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@/components/ui/button";
import { useScrolled } from "@/hooks/useScrolled";

interface NavItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Robotics",
    href: "/robotics",
    dropdown: [
      { name: "Industrial Robots", href: "/robotics#industrial" },
      { name: "AI Vision Systems", href: "/robotics#ai-brain" },
    ],
  },
  { name: "IT Solutions", href: "/it-solutions" },
  { name: "Products", href: "/products" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const isScrolled = useScrolled(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  const isActive = (href: string) => {
    const basePath = href.split("#")[0];
    if (basePath === "/") return location.pathname === "/";
    return location.pathname.startsWith(basePath);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Helper to determine if link has hash
  const isHashLink = (href: string) => href.includes("#");

  // Render a navigation link (either Link or HashLink)
  const renderNavLink = (
    href: string,
    children: React.ReactNode,
    className: string,
    onClick?: () => void
  ) => {
    const commonProps = {
      className,
      onClick: () => {
        onClick?.();
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      },
    };

    if (isHashLink(href)) {
      return (
        <HashLink to={href} smooth {...commonProps}>
          {children}
        </HashLink>
      );
    }

    return (
      <Link to={href} {...commonProps}>
        {children}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
              {/*<div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-colors">*/}
                {/*<Bot className="w-6 h-6 text-primary" />*/}
                  <img
                      src="/logo.png"
                      alt="Sun Robotics Logo"
                      className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
              {/*</div>*/}
              <span className="text-xl font-display font-bold text-foreground">
                Sun <span className="neon-text">Robotics</span> & AI
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  // Dropdown trigger button
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    aria-expanded={activeDropdown === link.name}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  // Regular link
                  renderNavLink(
                    link.href,
                    link.name,
                    `text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  )
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      role="menu"
                      aria-label={`${link.name} submenu`}
                      className="absolute top-full left-0 mt-2 w-48 glass-card p-2 bg-background/95 backdrop-blur-xl"
                    >
                      {link.dropdown.map((item) =>
                        renderNavLink(
                          item.href,
                          item.name,
                          "block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="glow-button bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass mt-2 mx-4 rounded-xl overflow-hidden bg-background/95 backdrop-blur-xl"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        aria-expanded={activeDropdown === link.name}
                        aria-haspopup="true"
                        className={`flex items-center justify-between w-full py-3 cursor-pointer ${
                          isActive(link.href) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            role="menu"
                            className="pl-4 space-y-1"
                          >
                            {link.dropdown.map((item) =>
                              renderNavLink(
                                item.href,
                                item.name,
                                "block w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground"
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    renderNavLink(
                      link.href,
                      link.name,
                      `block w-full text-left py-3 ${
                        isActive(link.href) ? "text-primary" : "text-foreground"
                      }`
                    )
                  )}
                </div>
              ))}
              <Button
                asChild
                className="w-full mt-4 glow-button bg-primary text-primary-foreground"
              >
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
