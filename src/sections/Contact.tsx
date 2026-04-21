import React, { useRef, useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";
import OptimizedImage from "../components/OptimizedImage";

// Define the form state type
interface ContactForm {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<ContactForm>({
        name: "",
        email: "",
        message: "",
    });

    // EmailJS environment variables (supports both APP and non-APP prefixes)
    const env = import.meta.env as Record<string, string | undefined>;
    const SERVICE_ID = env.VITE_APP_EMAILJS_SERVICE_ID || env.VITE_EMAILJS_SERVICE_ID || "";
    const TEMPLATE_ID = env.VITE_APP_EMAILJS_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID || "";
    const PUBLIC_KEY = env.VITE_APP_EMAILJS_PUBLIC_KEY || env.VITE_EMAILJS_PUBLIC_KEY || "";
    const missingConfigKeys: string[] = [];

    if (!SERVICE_ID) missingConfigKeys.push("EMAILJS_SERVICE_ID");
    if (!TEMPLATE_ID) missingConfigKeys.push("EMAILJS_TEMPLATE_ID");
    if (!PUBLIC_KEY) missingConfigKeys.push("EMAILJS_PUBLIC_KEY");
    const isEmailConfigured = missingConfigKeys.length === 0;
    const missingConfigSummary = missingConfigKeys.join(", ");

    // Check environment variables on mount
    useEffect(() => {
        if (!isEmailConfigured) {
            toast.error(`EmailJS config missing: ${missingConfigSummary}`);
        }
    }, [isEmailConfigured, missingConfigSummary]);

    // Change handler
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Simple email regex for validation
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Submit handler
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isEmailConfigured) {
            toast.error(`Email service config missing: ${missingConfigSummary}`);
            return;
        }

        // Client-side validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(form.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!formRef.current) return;

        setLoading(true);
        const loadingToast = toast.loading("Sending your message...");

        try {
            const { default: emailjs } = await import("@emailjs/browser");
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

            toast.dismiss(loadingToast);
            toast.success("Message sent successfully! 🎉");

            // Reset form
            setForm({ name: "", email: "", message: "" });
        } catch (error: unknown) {
            toast.dismiss(loadingToast);
            const message =
                typeof error === "object" &&
                error !== null &&
                "text" in error &&
                typeof (error as { text?: unknown }).text === "string"
                    ? (error as { text: string }).text
                    : "Something went wrong. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Get In Touch"
                    sub="Tell me what you want to build"
                />
                <div className="grid-12-cols mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center card-border rounded-xl p-5 md:p-10">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-7"
                            >
                                <div>
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What’s your good name?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="What’s your email address?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={loading}>
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">{loading ? "Sending..." : "Send Message"}</p>
                                        <div className="arrow-wrapper">
                                            <OptimizedImage src="/images/arrow-down.svg" alt="arrow" />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="xl:col-span-7 flex items-center justify-center">
                        <div className="w-full max-w-lg xl:max-w-full overflow-hidden">
                            <ContactExperience />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
