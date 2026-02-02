//
import { motion } from "framer-motion";
import { MapPin, Globe } from "lucide-react";

interface MapPlaceholderProps {
    /** Use Globe icon instead of MapPin */
    variant?: "mapPin" | "globe";
    /** Enable animation */
    animate?: boolean;
    /** Is the parent section in view (for animations) */
    isInView?: boolean;
    /** Custom height class */
    heightClass?: string;
    /** Custom class name */
    className?: string;
}

export function MapPlaceholder({
                                   variant = "mapPin",
                                   animate = true,
                                   isInView = true,
                                   heightClass = "h-48",
                                   className = "",
                               }: MapPlaceholderProps) {
    const Icon = variant === "globe" ? Globe : MapPin;
    const iconSize = variant === "globe" ? "w-12 h-12" : "w-8 h-8";

    // Updated Google Maps Link
    const mapLink = "https://maps.app.goo.gl/DLrHRAwJ2983ZWDV9";

    const content = (
        <div className={`w-full h-full bg-muted/30 flex items-center justify-center relative`}>
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative text-center">
                <Icon className={`${iconSize} text-primary mx-auto mb-2`} />
                {variant === "globe" ? (
                    <>
                        <p className="text-foreground font-medium mb-1">Indraprastha Tower</p>
                        <p className="text-sm text-muted-foreground">Rau, Indore, India</p>
                        <a
                            href={mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-sm text-primary hover:underline"
                        >
                            View on Google Maps →
                        </a>
                    </>
                ) : (
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                    >
                        <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            Indraprastha Tower, Rau
                            <br />
                            Indore, India
                        </p>
                    </a>
                )}
            </div>
        </div>
    );

    if (animate) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={`glass-card rounded-xl overflow-hidden ${heightClass} ${className}`}
            >
                {content}
            </motion.div>
        );
    }

    return (
        <div className={`glass-card rounded-xl overflow-hidden ${heightClass} ${className}`}>
            {content}
        </div>
    );
}