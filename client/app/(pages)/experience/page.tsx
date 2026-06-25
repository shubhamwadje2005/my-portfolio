"use client";

import React, { useEffect } from "react";
import { useGetExperienceQuery } from "@/redux/api/experience.api";
import { useGetEducationQuery } from "@/redux/api/education.api";
import { Briefcase, Calendar, GraduationCap, Loader2 } from "lucide-react";

const ExperiencePage = () => {
    const { data: experienceData, isLoading: expLoading } = useGetExperienceQuery();
    const { data: educationData, isLoading: eduLoading } = useGetEducationQuery();

    const experiences = experienceData?.result || [];
    const education = educationData?.result || [];
    const isLoading = expLoading || eduLoading;

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
    }, [experiences, education, isLoading]);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
                <div className="relative w-16 h-16 mb-4">
                    <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide">Loading experience...</p>
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
                    100% { transform: scale(0.8); }
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

            <div className="max-w-[1350px] mx-auto w-full space-y-24">
                {/* --- Work Experience Section --- */}
                <section>
                    <div className="flex flex-col items-center mb-16 text-center animate-reveal-up">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-black dark:text-white">Work Experience</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-widest">My professional journey</p>
                        <div className="h-1 bg-black dark:bg-white mt-6 rounded-full animate-expand-line"></div>
                    </div>

                    <div className="space-y-10 group">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp._id}
                                className="flex flex-col md:flex-row bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 opacity-0 animate-reveal-up"
                                style={{ animationDelay: `${index * 0.2}s`, transitionDelay: `${index * 0.2}s` }}
                            >
                                <div className="md:w-1/4 bg-zinc-50 dark:bg-[#0d0d0d] p-8 md:p-10 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center justify-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group/icon">
                                        <Briefcase size={28} className="transition-transform group-hover/icon:scale-110" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg md:text-xl font-black text-black dark:text-white leading-tight">{exp.role}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 font-bold text-sm tracking-wide">{exp.company}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-black rounded-full border border-zinc-200 dark:border-zinc-900 text-[10px] md:text-xs font-medium text-zinc-500 uppercase tracking-widest shadow-sm">
                                        <Calendar size={14} className="text-zinc-400" />
                                        {exp.period || "Present"}
                                    </div>
                                </div>

                                {/* Right Side: Content Area */}
                                <div className="flex-1 p-8 md:p-10 space-y-4">
                                    <p className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
                                        {exp.description}
                                    </p>

                                    {exp.responsibilities && (
                                        <div className="space-y-3">
                                            <h4 className="text-black dark:text-white font-bold text-base md:text-lg tracking-tight">
                                                Key Responsibilities:
                                            </h4>
                                            <ul className="flex flex-col gap-1.5">
                                                {(() => {
                                                    const rawData = Array.isArray(exp.responsibilities)
                                                        ? exp.responsibilities.join('\n')
                                                        : (exp.responsibilities || "");

                                                    const lines = rawData
                                                        .split(/\n|(?=[•\-\*])/)
                                                        .map(line => line.trim())
                                                        .filter(line => line.length > 0)
                                                        .map(line => line.replace(/^[•\-\*\s]+/, ''));

                                                    return lines.map((res, i) => (
                                                        <li key={i} className="flex items-start gap-2.5 group/li">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-[7px] flex-shrink-0" />
                                                            <p className="text-zinc-600 dark:text-zinc-400 text-[13px] md:text-[15px] leading-tight md:leading-snug group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">
                                                                {res}
                                                            </p>
                                                        </li>
                                                    ));
                                                })()}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Education Section --- */}
                <section>
                    <div className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 animate-reveal-up" style={{ animationDelay: '0.4s', transitionDelay: '0.4s' }}>
                        <h2 className="text-2xl font-black text-black dark:text-white tracking-tight">Education</h2>
                        <div className="flex flex-col gap-10">
                            {education.map((edu, index) => (
                                <div
                                    key={edu._id}
                                    className="flex items-start gap-6 group opacity-0 animate-reveal-up"
                                    style={{ animationDelay: `${0.6 + index * 0.2}s`, transitionDelay: `${0.6 + index * 0.2}s` }}
                                >
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <GraduationCap size={24} className="text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl md:text-2xl font-black text-black dark:text-white group-hover:text-orange-500 transition-colors tracking-tight">{edu.degree}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed">    {edu.university}, {edu.location}</p>
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
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExperiencePage;