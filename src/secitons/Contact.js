var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";
const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    // EmailJS environment variables
    const SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
    // Check environment variables on mount
    useEffect(() => {
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            toast.error("EmailJS environment variables are missing. Check your .env file.");
        }
    }, [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY]);
    // Change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(Object.assign(Object.assign({}, form), { [name]: value }));
    };
    // Simple email regex for validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    // Submit handler
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (!formRef.current)
            return;
        setLoading(true);
        const loadingToast = toast.loading("Sending your message...");
        try {
            yield emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
            toast.dismiss(loadingToast);
            toast.success("Message sent successfully! 🎉");
            // Reset form
            setForm({ name: "", email: "", message: "" });
        }
        catch (error) {
            toast.dismiss(loadingToast);
            console.error("EmailJS Error:", error);
            toast.error((error === null || error === void 0 ? void 0 : error.text) || "Something went wrong. Please try again.");
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs("section", { id: "contact", className: "flex-center section-padding", children: [_jsx(Toaster, { position: "top-right", reverseOrder: false }), _jsxs("div", { className: "w-full h-full md:px-10 px-5", children: [_jsx(TitleHeader, { title: "Let\u2019s Build Something Great Together \uD83D\uDE80", sub: "Whether you have a business idea, need a new website, or want to elevate your brand\u2019s online presence \u2014 I\u2019m just a message away." }), _jsxs("div", { className: "grid-12-cols mt-16", children: [_jsx("div", { className: "xl:col-span-5", children: _jsx("div", { className: "flex-center card-border rounded-xl p-10", children: _jsxs("form", { ref: formRef, onSubmit: handleSubmit, className: "w-full flex flex-col gap-7", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", children: "Your name" }), _jsx("input", { type: "text", id: "name", name: "name", value: form.name, onChange: handleChange, placeholder: "What\u2019s your good name?", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", children: "Your Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: form.email, onChange: handleChange, placeholder: "What\u2019s your email address?", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", children: "Your Message" }), _jsx("textarea", { id: "message", name: "message", value: form.message, onChange: handleChange, placeholder: "How can I help you?", rows: 5, required: true })] }), _jsx("button", { type: "submit", disabled: loading, children: _jsxs("div", { className: "cta-button group", children: [_jsx("div", { className: "bg-circle" }), _jsx("p", { className: "text", children: loading ? "Sending..." : "Send Message" }), _jsx("div", { className: "arrow-wrapper", children: _jsx("img", { src: "/images/arrow-down.svg", alt: "arrow" }) })] }) })] }) }) }), _jsx("div", { className: "xl:col-span-7 min-h-96", children: _jsx("div", { className: "w-full h-[75%] hover:cursor-grab rounded-3xl", children: _jsx(ContactExperience, {}) }) })] })] })] }));
};
export default Contact;
