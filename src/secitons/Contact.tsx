import React, { useRef, useState, ChangeEvent, FormEvent, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

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

    // EmailJS environment variables
    const SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID as string;
    const TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID as string;
    const PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY as string;

    // Check environment variables on mount
    useEffect(() => {
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            toast.error(
                "EmailJS environment variables are missing. Check your .env file."
            );
        }
    }, [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY]);

    // Change handler
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Simple email regex for validation
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Submit handler
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            toast.error("Email service is not configured properly.");
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
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

            toast.dismiss(loadingToast);
            toast.success("Message sent successfully! 🎉");

            // Reset form
            setForm({ name: "", email: "", message: "" });
        } catch (error: any) {
            toast.dismiss(loadingToast);
            console.error("EmailJS Error:", error);
            toast.error(error?.text || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Let’s Build Something Great Together 🚀"
                    sub="Whether you have a business idea, need a new website, or want to elevate your brand’s online presence — I’m just a message away."
                />
                <div className="grid-12-cols mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center card-border rounded-xl p-10">
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
                                        rows={5}
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={loading}>
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">{loading ? "Sending..." : "Send Message"}</p>
                                        <div className="arrow-wrapper">
                                            <img src="/images/arrow-down.svg" alt="arrow" />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="xl:col-span-7 min-h-96">
                        <div className="w-full h-[75%] hover:cursor-grab rounded-3xl">
                            <ContactExperience />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
