"use client";

import React, { useEffect } from "react";
import { useGetAboutQuery } from "@/redux/api/about.api";
import { useCreateContactMutation } from "@/redux/api/contact.api";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
    const { data: aboutData, isLoading } = useGetAboutQuery();
    const about = aboutData?.result;
    const personal = about?.personal?.[0];

    const [createContact, { isLoading: isSubmitting }] = useCreateContactMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    } else {
                        entry.target.classList.remove("in-view");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const observeElements = () => {
            const elements = document.querySelectorAll('[class*="animate-reveal"], .animate-expand-line');
            elements.forEach((el) => observer.observe(el));
        };

        observeElements();
        const t = setTimeout(observeElements, 500);

        return () => {
            observer.disconnect();
            clearTimeout(t);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
                <div className="relative w-16 h-16 mb-4">
                    <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide">Loading contact info...</p>
            </div>
        );
    }

    const onSubmit = async (data: ContactFormData) => {
        try {
            await createContact(data).unwrap();
            reset();
            alert("Message sent successfully!");
        } catch (error) {
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white pt-24 pb-20 px-6 md:px-20 overflow-hidden">
            <style jsx global>{`
                .animate-reveal-up {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    will-change: transform, opacity;
                }
                .animate-reveal-up.in-view {
                    opacity: 1 !important;
                    transform: translateY(0);
                    visibility: visible !important;
                }
                .animate-reveal-down {
                    opacity: 0;
                    transform: translateY(-50px);
                    transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    will-change: transform, opacity;
                }
                .animate-reveal-down.in-view {
                    opacity: 1 !important;
                    transform: translateY(0);
                    visibility: visible !important;
                }
                .animate-reveal-left {
                    opacity: 0;
                    transform: translateX(-50px);
                    transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    will-change: transform, opacity;
                }
                .animate-reveal-left.in-view {
                    opacity: 1 !important;
                    transform: translateX(0);
                    visibility: visible !important;
                }
                .animate-reveal-right {
                    opacity: 0;
                    transform: translateX(50px);
                    transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    will-change: transform, opacity;
                }
                .animate-reveal-right.in-view {
                    opacity: 1 !important;
                    transform: translateX(0);
                    visibility: visible !important;
                }
                .animate-expand-line {
                    opacity: 0;
                    width: 4px;
                    transition: opacity 1.5s cubic-bezier(0.2, 0.8, 0.2, 1), width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                    will-change: width, opacity;
                }
                .animate-expand-line.in-view {
                    opacity: 1 !important;
                    width: 100px;
                    visibility: visible !important;
                }

                .contact-input {
                    background: #f9f9f9 !important;
                    border: 1px solid #e5e5e5 !important;
                    color: #1a1a1a !important;
                    transition: all 0.3s ease !important;
                }
                [data-theme="dark"] .contact-input {
                    background: #0a0a0a !important;
                    border: 1px solid #1a1a1a !important;
                    color: #e5e5e5 !important;
                }
                .contact-input:focus {
                    border-color: #f97316 !important;
                    box-shadow: 0 0 15px rgba(249, 115, 22, 0.1) !important;
                    outline: none !important;
                }
                .error-border {
                    border-color: #ef4444 !important;
                }
            `}</style>

            <div className="max-w-[1350px] mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col items-center mb-16 text-center animate-reveal-down">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-black dark:text-white">Contact Me</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-widest">Let's get in touch</p>
                    <div className="h-1 bg-black dark:bg-white mt-6 rounded-full animate-expand-line"></div>
                </div>

                {/* Grid - IMPORTANT: items-start keeps cards at their own height */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

                    {/* Left Column: Get In Touch */}
                    <div className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-8 md:p-10 shadow-2xl animate-reveal-left" style={{ animationDelay: '0.2s', transitionDelay: '0.2s' }}>
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-2xl font-black mb-8 tracking-tight text-black dark:text-white">Get In Touch</h2>
                                <div className="space-y-6">
                                    {/* <div className="flex items-center gap-5 group">
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all duration-300 shadow-sm">
                                            <Mail size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-black dark:text-white mb-0.5">Email</p>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">{personal?.email || "komalkshirasagar32009@gmail.com"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 group">
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all duration-300 shadow-sm">
                                            <Phone size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-black dark:text-white mb-0.5">Phone</p>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">{personal?.phone || "+91-8080211162"}</p>
                                        </div>
                                    </div> */}
                                    <div
                                        className="flex items-center gap-5 group cursor-pointer"
                                        onClick={() => {
                                            if (personal?.email) {
                                                window.location.href = `mailto:${personal.email}`
                                            } else {
                                                alert("Email not available")
                                            }
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all duration-300 shadow-sm">
                                            <Mail size={22} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-black dark:text-white mb-0.5">
                                                Email
                                            </p>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
                                                {personal?.email || "example@gmail.com"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 📞 PHONE CARD */}
                                    <div
                                        className="flex items-center gap-5 group cursor-pointer"
                                        onClick={() => {
                                            if (personal?.phone) {
                                                window.location.href = `tel:+91${personal.phone}`
                                            } else {
                                                alert("Phone number not available")
                                            }
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all duration-300 shadow-sm">
                                            <Phone size={22} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-black dark:text-white mb-0.5">
                                                Phone
                                            </p>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
                                                +91-{personal?.phone || "XXXXXXXXXX"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 group">
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all duration-300 shadow-sm">
                                            <MapPin size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-black dark:text-white mb-0.5">Location</p>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base line-clamp-2 md:line-clamp-none">
                                                {personal?.location || "Chhatrapati Sambhajinagar, Maharashtra, India"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-black dark:text-white mb-6 uppercase tracking-widest">Follow Me</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: <Github size={20} />, href: "https://github.com/shubhamwadje2005" },
                                        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/shubham-wadje-916a31317" },
                                        { icon: <Twitter size={20} />, href: "#" },
                                        { icon: <Instagram size={20} />, href: "#" }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            className="w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 shadow-sm"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Send Me a Message */}
                    <div className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-8 md:p-12 shadow-2xl animate-reveal-right" style={{ animationDelay: '0.4s', transitionDelay: '0.4s' }}>
                        <h2 className="text-2xl font-black mb-8 tracking-tight text-black dark:text-white">Send Me a Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Name</label>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        placeholder="Your name"
                                        className={`w-full px-5 py-4 rounded-xl contact-input ${errors.name ? 'error-border' : ''}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold px-1">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Email</label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="Your email address"
                                        className={`w-full px-5 py-4 rounded-xl contact-input ${errors.email ? 'error-border' : ''}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold px-1">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Subject</label>
                                    <input
                                        type="text"
                                        {...register("subject")}
                                        placeholder="Message subject"
                                        className={`w-full px-5 py-4 rounded-xl contact-input ${errors.subject ? 'error-border' : ''}`}
                                    />
                                    {errors.subject && <p className="text-red-500 text-[10px] uppercase font-bold px-1">{errors.subject.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Message</label>
                                    <textarea
                                        {...register("message")}
                                        rows={5}
                                        placeholder="Your message"
                                        className={`w-full px-5 py-4 rounded-2xl contact-input flex-grow resize-none ${errors.message ? 'error-border' : ''}`}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-[10px] uppercase font-bold px-1">{errors.message.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-4 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group shadow-md"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;