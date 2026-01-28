import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";

// Validation schema using zod
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z
    .string()
    .trim()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(200, "Subject must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  /** Show extended fields (phone, subject) - used on dedicated contact page */
  extended?: boolean;
  /** Custom class name for the form container */
  className?: string;
  /** Callback after successful submission */
  onSuccess?: () => void;
}

export function ContactForm({ extended = false, className = "", onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate form submission - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        extended
          ? "Message sent successfully! We'll get back to you within 24 hours."
          : "Message sent successfully! We'll get back to you soon."
      );

      form.reset();
      onSuccess?.();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-6 ${className}`}>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  {extended ? "Full Name *" : "Name"}
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

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  {extended ? "Email Address *" : "Email"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    className="bg-muted/50 border-border focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {extended ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Company Name"
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
                  <FormLabel className="text-foreground">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-muted/50 border-border focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Company Name"
                    className="bg-muted/50 border-border focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {extended && (
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Subject *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="How can we help you?"
                    className="bg-muted/50 border-border focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {extended ? "Message *" : "Message"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    extended
                      ? "Tell us about your project requirements..."
                      : "Tell us about your project..."
                  }
                  rows={extended ? 6 : 5}
                  className="bg-muted/50 border-border focus:border-primary resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full glow-button bg-primary text-primary-foreground hover:bg-primary/90 ${
            extended ? "py-6" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className={`mr-2 ${extended ? "w-5 h-5" : "w-4 h-4"} animate-spin`} />
              Sending...
            </>
          ) : (
            <>
              <Send className={`mr-2 ${extended ? "w-5 h-5" : "w-4 h-4"}`} />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
