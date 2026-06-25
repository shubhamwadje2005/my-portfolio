"use client";

import React, { useEffect, useState } from "react";
import { useGetProjectQuery } from "@/redux/api/project.api";
import { ExternalLink, Github, Loader2 } from "lucide-react";

const ProjectsPage = () => {
    const { data: projectData, isLoading } = useGetProjectQuery();
    const [activeCategory, setActiveCategory] = useState("All Projects");

    const categories = ["All Projects", "Web Apps", "Mobile Apps"];

    const filteredProjects = projectData?.result.filter((project) => {
        const category = project.category.toLowerCase();
        if (activeCategory === "All Projects") return true;
        if (activeCategory === "Web Apps") return category.includes("web");
        if (activeCategory === "Mobile Apps") return category.includes("app");
        return true;
    }) || [];

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
    }, [isLoading, activeCategory]);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
                <div className="relative w-16 h-16 mb-4">
                    <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide">Loading projects...</p>
            </div>
        );
    }

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
                {/* Header Section */}
                <div className="flex flex-col items-center mb-12 text-center animate-reveal-down">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-black dark:text-white">My Projects</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-widest">A showcase of my work</p>
                    <div className="h-1 bg-black dark:bg-white mt-6 rounded-full animate-expand-line"></div>
                </div>

                {/* Categories Tabs */}
                <div className="flex justify-center gap-2 mb-16 animate-reveal-down" style={{ animationDelay: '0.2s', transitionDelay: '0.2s' }}>
                    <div className="flex bg-zinc-100 dark:bg-[#111] p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800/50 shadow-sm">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeCategory === cat ? "bg-white dark:bg-black text-orange-500 shadow-xl border border-zinc-200 dark:border-zinc-800" : "text-zinc-500 hover:text-black dark:hover:text-zinc-300"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project._id}
                            className="group bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl overflow-hidden shadow-2xl animate-reveal-up"
                            style={{ animationDelay: `${0.1 * (index + 1)}s`, transitionDelay: `${0.1 * (index + 1)}s` }}
                        >
                            {/* Project Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-5">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-black dark:text-white group-hover:text-orange-500 transition-colors tracking-tight flex items-center gap-2">
                                        <span>{project.title}</span>
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-[15px] leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {(() => {
                                        const rawData = Array.isArray(project.technologies)
                                            ? project.technologies
                                            : [project.technologies];

                                        const techList = rawData
                                            .flatMap(item => (typeof item === 'string' ? item.split(',') : item))
                                            .map(t => String(t).trim())
                                            .filter(t => t !== "" && t !== "undefined");

                                        return techList.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-[13px] font-medium bg-zinc-200 dark:bg-[#18181b] text-zinc-800 dark:text-white px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-[#27272a] transition-all cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ));
                                    })()}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        className="flex-1 bg-black dark:bg-white text-white dark:text-black text-xs font-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-md"
                                    >
                                        <ExternalLink size={14} />
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        className="flex-1 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white text-xs font-black py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95 shadow-sm"
                                    >
                                        <Github size={14} />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;