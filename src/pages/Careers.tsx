import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Briefcase, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { api, Job } from "@/lib/api";

// Validation schema matching Backend ApplicationRequestDto
const applicationSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Full Name is required")
        .max(100, "Name must be less than 100 characters"),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Please enter a valid email")
        .max(255, "Email must be less than 255 characters"),
    phone: z
        .string()
        .trim()
        .max(20, "Phone number must be less than 20 characters")
        .optional(),
    resumeUrl: z
        .string()
        .trim()
        .url("Please enter a valid URL to your resume")
        .max(500, "URL must be less than 500 characters"),
    coverLetter: z
        .string()
        .trim()
        .max(2000, "Cover letter must be less than 2000 characters")
        .optional()
        .or(z.literal("")),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const Careers = () => {
    const heroRef = useRef(null);
    const jobsRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const isJobsInView = useInView(jobsRef, { once: true, margin: "-100px" });

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch jobs from backend on mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await api.getJobs();
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                toast.error("Could not load open positions. Is the backend running?");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            resumeUrl: "",
            coverLetter: "",
        },
    });

    const handleApply = async (data: ApplicationFormData) => {
        if (!selectedJob) return;
        setIsSubmitting(true);

        try {
            await api.applyForJob({
                jobId: selectedJob.id,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone || "",
                resumeUrl: data.resumeUrl,
                coverLetter: data.coverLetter || "",
            });

            toast.success(
                `Application submitted for ${selectedJob.title}! We'll be in touch soon.`
            );
            form.reset();
            setSelectedJob(null);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper to parse requirements (DB stores them as a string, e.g. "Java, Spring, SQL")
    const getRequirementsCount = (reqs: string) => {
        if (!reqs) return 0;
        return reqs.split(',').length;
    };

    return (
        <>
            <SEO
                title="Careers"
                description="Join Sun Robotics & AI and build the future of industrial automation. Explore open positions in engineering, AI research, and more."
            />

            {/* Hero Section */}
            <section className="pt-32 pb-24 relative overflow-hidden" ref={heroRef}>
                <div className="absolute inset-0 hero-gradient" />
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[200px]" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Careers
            </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
                            Join the <span className="gradient-text">Revolution</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                            Build the future with us. We're looking for passionate engineers,
                            researchers, and innovators to shape the next generation of
                            industrial automation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-24 relative" ref={jobsRef}>
                <div className="container mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Open <span className="neon-text">Positions</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Find your place in our growing team and help us build something
                            extraordinary.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-20 glass-card max-w-2xl mx-auto rounded-xl">
                            <p className="text-muted-foreground">No open positions at the moment. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card p-6 md:p-8 glow-card group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {job.department}
                      </span>
                                            <h3 className="text-xl font-display font-bold text-foreground mt-1">
                                                {job.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                        {job.location}
                    </span>
                                        <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                                            {job.type}
                    </span>
                                        <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-primary" />
                                            {getRequirementsCount(job.requirements)} Key Skills
                    </span>
                                    </div>

                                    <Button
                                        onClick={() => setSelectedJob(job)}
                                        className="w-full glow-button bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        Apply Now
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Application Modal */}
            <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
                <DialogContent className="glass-card bg-background/95 backdrop-blur-xl border-border max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-display">
                            Apply for {selectedJob?.title}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Fill out the form below to submit your application.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleApply)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">
                                            Full Name *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                className="bg-muted/50 border-border focus:border-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Email *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className="bg-muted/50 border-border focus:border-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="+91..."
                                                    className="bg-muted/50 border-border focus:border-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="resumeUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">
                                            Resume URL *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://drive.google.com/..."
                                                className="bg-muted/50 border-border focus:border-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coverLetter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">
                                            Cover Letter
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us why you're excited about this role..."
                                                rows={4}
                                                className="bg-muted/50 border-border focus:border-primary resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setSelectedJob(null)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 glow-button bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Application
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Careers;