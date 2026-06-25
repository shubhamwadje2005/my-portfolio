"use client";

import React, { useEffect } from "react";
import { useGetEducationQuery } from "@/redux/api/education.api";
import { GraduationCap, Calendar, Loader2 } from "lucide-react";

const EducationPage = () => {
    const { data: educationData, isLoading } = useGetEducationQuery();
    const education = educationData?.result || [];

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
    }, [education, isLoading]);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
                <div className="relative w-16 h-16 mb-4">
                    <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide">Loading education...</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white pt-24 pb-20 px-6 md:px-20 overflow-hidden">
             <style jsx global>{`
                @keyframes pulse-ring {
                    0% { transform: scale(0.33); opacity: 0; }
                    80%, 100% { opacity: 0; }
                }
                @keyframes pulse-dot {
                    0% { transform: scale(0.8); }
                    50% { transform: scale(1); }
                    100% { scale: 0.8; }
                }
                .loading-pulse {
                    position: relative;
                    width: 40px;
                    height: 40px;
                }
                .loading-pulse::before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: #f97316;
                    animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                .loading-pulse::after {
                    content: "";
                    position: absolute;
                    width: 80%;
                    height: 80%;
                    top: 10%;
                    left: 10%;
                    border-radius: 50%;
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
            `}</style>

            <div className="max-w-[1350px] mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col items-center mb-16 text-center animate-reveal-up">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-black dark:text-white">Education</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-widest">My academic background</p>
                    <div className="h-1 bg-black dark:bg-white mt-6 rounded-full animate-expand-line"></div>
                </div>

                {/* Main Container */}
                <div className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12 animate-reveal-up">
                    <div className="flex flex-col gap-10">
                        {education.map((edu, index) => (
                            <div 
                              key={edu._id} 
                              className="flex items-start gap-6 group opacity-0 animate-reveal-up"
                              style={{ animationDelay: `${0.2 + index * 0.2}s`, transitionDelay: `${0.2 + index * 0.2}s` }}
                            >
                                {/* Graduation Icon */}
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800/50 transition-all duration-300 shadow-sm">
                                    <GraduationCap size={24} className="text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                </div>

                                {/* Content Area */}
                                <div className="space-y-2">
                                    <h2 className="text-xl md:text-2xl font-black text-black dark:text-white group-hover:text-orange-500 transition-colors tracking-tight">
                                        {edu.degree}
                                    </h2>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                                        {edu.university}{edu.location ? `, ${edu.location}` : ""}
                                    </p>
                                    <div className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm font-semibold pt-1">
                                        <Calendar size={16} className="text-zinc-400" />
                                        <span>
                                            {edu.startYear || edu.endYear
                                                ? `${edu.startYear || "?"} - ${edu.endYear || "?"}`
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {education.length === 0 && (
                          <div className="text-center py-10">
                            <p className="text-zinc-500 italic">No education records found.</p>
                          </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EducationPage;
