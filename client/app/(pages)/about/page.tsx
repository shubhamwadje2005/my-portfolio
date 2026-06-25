"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetAboutQuery } from "@/redux/api/about.api";
import { User, GraduationCap, Calendar, MapPin, Mail, Phone, Briefcase, Loader2 } from "lucide-react";
import { useGetEducationQuery } from "@/redux/api/education.api";

const AboutPage = () => {
    const { data: aboutData, isLoading } = useGetAboutQuery();
    const about = aboutData?.result;
    const { data: educationData, isLoading: eduLoading } = useGetEducationQuery();
    const education = educationData?.result || [];

    const [activeTab, setActiveTab] = useState<"Bio" | "Education" | "Personal">("Bio");

    useEffect(() => {
        if (isLoading) return;

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
            { threshold: 0.05 }
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
    }, [about, isLoading]);

    const tabs = ["Bio", "Education", "Personal"] as const;

    if (isLoading || !about) {
        return (
            <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
                <div className="relative w-16 h-16 mb-4">
                    <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide">Loading bio...</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white pt-24 pb-20 px-4 md:px-8 lg:px-20 overflow-hidden">
            <style jsx global>{`
                @keyframes pulse-ring {
                    0% { transform: scale(0.33); opacity: 0; }
                    80%, 100% { opacity: 0; }
                }
                @keyframes pulse-dot {
                    0% { transform: scale(0.8); }
                    50% { transform: scale(1); }
                    100% { transform: scale(0.8); }
                }
                .loading-pulse {
                    position: relative;
                    width: 40px;
                    height: 40px;
                }
                .loading-pulse::before,
                .loading-pulse::after {
                    content: "";
                    position: absolute;
                    border-radius: 50%;
                }
                .loading-pulse::before {
                    width: 100%;
                    height: 100%;
                    background-color: #f97316;
                    animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                .loading-pulse::after {
                    width: 80%;
                    height: 80%;
                    top: 10%;
                    left: 10%;
                    background-color: #f97316;
                    animation: pulse-dot 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
                    box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
                }

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
                    width: 110px;
                    visibility: visible !important;
                }
            `}</style>

            <div className="max-w-[1350px] mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col items-center mb-12 md:mb-16 text-center animate-reveal-up">
                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">About Me</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-widest">
                        Get to know me better
                    </p>
                    <div className="h-1 bg-black dark:bg-white mt-5 rounded-full animate-expand-line"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">

                    {/* <div className="relative w-full max-w-[800px] md:max-w-[900px] lg:max-w-[1000px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-reveal-left group shadow-2xl h-[800px] md:h-[900px] lg:h-[1000px]">
                        <Image
                            src={about.profileImage}
                            alt={about.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-14 md:h-14 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-black dark:text-white shadow-xl">
                            <User size={20} className="md:w-6 md:h-6" />
                        </div>
                    </div> */}

                    <div className="relative w-full max-w-[800px] md:max-w-[900px] lg:max-w-[1000px] rounded-2xl border border-zinc-200 dark:border-zinc-800 animate-reveal-left group shadow-2xl overflow-visible h-[800px] md:h-[900px] lg:h-[1000px]">

                        {/* Main Image Container */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            <Image
                                src={about.profileImage}
                                alt={about.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Floating Icon - Same to Same Design with New Height */}
                        <div className="absolute -bottom-5 -right-3 -md:bottom-5 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-10 p-2 transition-colors duration-300">
                            {/* Inner Circle with Icon */}
                            <div className="w-full h-full bg-[#e5e7eb] dark:bg-zinc-800 rounded-full flex items-center justify-center border-[6px] md:border-[8px] border-white dark:border-black">
                                <User
                                    size={32}
                                    className="text-black dark:text-white md:w-12 md:h-12 transition-colors"
                                    strokeWidth={2.5}
                                />
                            </div>
                        </div>
                    </div>



                    <div className="flex flex-col animate-reveal-right">
                        <div className="bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800/60 p-1 rounded-xl flex gap-1 mb-8 md:mb-10 w-full md:w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 md:flex-initial px-10 md:px-8 lg:px-20 py-2.5 rounded-lg text-sm font-bold
                                         ${activeTab === tab
                                            ? "bg-white dark:bg-black text-black dark:text-white  border border-zinc-200 dark:border-zinc-700"
                                            : "text-zinc-500 hover:text-black dark:hover:text-zinc-300"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
                                Hello There!
                            </h2>

                            {activeTab === "Bio" && (
                                <div className="text-zinc-600 dark:text-zinc-300 text-[15px] md:text-lg leading-relaxed space-y-4">
                                    <p>
                                        I'm{" "}
                                        <span className="text-black dark:text-white font-bold">
                                            {about?.name || "N/A"}
                                        </span>
                                        , a{" "}
                                        <span className="text-black dark:text-white font-bold">
                                            {about?.title || "Developer"}
                                        </span>{" "}
                                        based in{" "}
                                        <span className="text-black dark:text-white font-bold">
                                            {about?.personal?.[0]?.location || "N/A"}
                                        </span>
                                        . {about?.introduction || ""}
                                    </p>

                                    {about?.journey && (
                                        <p>{about.journey}</p>
                                    )}

                                    {about?.currentWork && (
                                        <p>
                                            Currently working at{" "}
                                            <span className="text-black dark:text-white font-bold">
                                                {about.currentWork}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {activeTab === "Education" && (
                                <div className="space-y-5">
                                    {eduLoading ? (
                                        <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
                                    ) : education.length > 0 ? (
                                        education.map((edu) => (
                                            <div
                                                key={edu._id}
                                                className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-colors shadow-sm"
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <GraduationCap size={24} className="text-orange-500 flex-shrink-0" />
                                                    <h3 className="text-lg md:text-xl font-bold">
                                                        {edu.degree}
                                                    </h3>
                                                </div>
                                                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base pl-1">
                                                    {edu.university}, {edu.location}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-zinc-500 dark:text-zinc-400">No education data available</p>
                                    )}
                                </div>
                            )}

                            {activeTab === "Personal" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                    <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow">
                                        <Calendar size={20} className="text-orange-500 mt-1 md:w-6 md:h-6 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold mb-1 text-sm md:text-base">Date of Birth</h4>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
                                                {about.personal?.[0]?.dateOfBirth || "17 March"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow">
                                        <MapPin size={20} className="text-orange-500 mt-1 md:w-6 md:h-6 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold mb-1 text-sm md:text-base">Location</h4>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
                                                {about.personal?.[0]?.location || "Chhatrapati Sambhajinagar, Maharashtra"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow">
                                        <Mail size={20} className="text-orange-500 mt-1 md:w-6 md:h-6 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold mb-1 text-sm md:text-base">Email</h4>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base break-all">
                                                {about.personal?.[0]?.email || "komalkshirasagar32009@gmail.com"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow">
                                        <Phone size={20} className="text-orange-500 mt-1 md:w-6 md:h-6 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold mb-1 text-sm md:text-base">Phone</h4>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
                                                {about.personal?.[0]?.phone || "+91-8080211162"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 md:p-5 shadow-sm">
                                        <h4 className="font-semibold mb-3 text-sm md:text-base">Languages</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {(() => {
                                                const langs = about.personal?.[0]?.languages;
                                                let languageList = ["English", "Hindi", "Marathi"];
                                                if (langs && typeof langs === 'string') {
                                                    languageList = langs.split(",").map(l => l.trim());
                                                } else if (langs && Array.isArray(langs)) {
                                                    languageList = langs;
                                                }
                                                return languageList.map((lang, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-full text-sm font-medium"
                                                    >
                                                        {lang}
                                                    </span>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;