"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Github, Linkedin, ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { useGetAboutQuery } from "@/redux/api/about.api";
import { useGetStatusQuery } from "@/redux/api/status.api";
import { useGetProjectQuery } from "@/redux/api/project.api";
import { useGetSkillQuery } from "@/redux/api/skill.api";
import DynamicIcon from "@/components/DynamicIcon";

const Home = () => {
  const [clickedSkillId, setClickedSkillId] = useState<string | null>(null);
  const { data: aboutData, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: statusData, isLoading: statusLoading } = useGetStatusQuery();
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery();
  const { data: skillData, isLoading: skillLoading } = useGetSkillQuery();

  const isLoading = aboutLoading || statusLoading || projectLoading || skillLoading;

  const about = aboutData?.result;
  const stats = statusData?.result?.[0];
  const projects = projectData?.result;
  const skills = skillData?.result;

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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('[class*="animate-reveal"], .animate-expand-line');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();
    // Re-check after small delays to catch dynamic data
    const t1 = setTimeout(observeElements, 500);
    const t2 = setTimeout(observeElements, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [skills, projects, about]);

  const formatStat = (val: string | undefined) => {
    if (!val) return "0+";
    return val.endsWith("+") ? val : `${val}+`;
  };

  const statCards = [
    { label: "Years Experience", value: stats?.yearsExperience || "0" },
    { label: "Projects Completed", value: formatStat(stats?.projectsCompleted) },
    { label: "Technologies", value: formatStat(stats?.technologies) },
    { label: "Happy Clients", value: formatStat(stats?.happyClients) },
  ];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
        <div className="relative w-16 h-16 mb-4">
          <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        .animate-reveal-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, opacity;
        }
        .animate-reveal-scale.in-view {
          opacity: 1 !important;
          transform: scale(1);
          visibility: visible !important;
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
        .animate-reveal-top {
          opacity: 0;
          transform: translateY(-50px);
          transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, opacity;
        }
        .animate-reveal-top.in-view {
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
          width: 110px;
          visibility: visible !important;
        }
        .delay-100 { transition-delay: 0.1s !important; }
        .delay-200 { transition-delay: 0.2s !important; }
        .delay-300 { transition-delay: 0.3s !important; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-white dark:bg-black text-black dark:text-white min-h-[90vh] flex items-center px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-[1350px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="opacity-0 animate-reveal-up">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Hi, I'm <br />
              {about?.name && (
                <span>
                  <span className="text-black dark:text-white">{about.name.split(' ')[0]} </span>
                  <span className="text-orange-500">{about.name.split(' ').slice(1).join(' ')}</span>
                </span>)}
            </h2>
            <p className="text-zinc-600 dark:text-gray-400 mt-4 text-lg max-w-md">
              {about?.title}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-md font-medium flex items-center gap-2 hover:bg-zinc-800 dark:hover:bg-gray-200 transition shadow-xl active:scale-95 group"
              >
                Get in Touch   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/Shubham_Wadje_Resume.pdf"
                download="Shubham_Wadje_Resume.pdf"
                className="border border-zinc-200 dark:border-gray-700 px-6 py-2.5 rounded-md font-medium flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-gray-900 transition text-zinc-600 dark:text-gray-200 shadow-xl active:scale-95 group"
              >
                <Download size={18} className="group-hover:translate-y-1 transition-transform duration-300" /> Download CV
              </a>
            </div>

            {/* Social Icons */}

            <div className="flex gap-4 mt-8">
              <Link
                href="https://github.com/shubhamwadje2005"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 shadow-sm"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/shubham-wadje-916a31317"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 shadow-sm"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="flex justify-center md:justify-end opacity-0 animate-reveal-scale delay-200">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl">
              <Image
                src={about?.profileImage || "/your-image-path.jpg"}
                alt={about?.name || "Profile"}
                fill
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bouncing Arrow Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-500 animate-bounce" style={{ animationDuration: "1.4s" }}>
          <ChevronDown size={32} />
        </div>
      </section >

      {/* About Me Section */}
      <section className="bg-zinc-50 dark:bg-[#050505] text-black dark:text-white py-24 px-6 md:px-20 border-t border-zinc-100 dark:border-zinc-900" >
        <div className="max-w-[1350px] mx-auto w-full">

          {/* Header */}
          <div className="flex flex-col items-center mb-20 text-center opacity-0 animate-reveal-top">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">About Me</h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm">Get to know me better</p>
            <div className="h-1 bg-black dark:bg-white mt-6 rounded-full opacity-0 animate-expand-line"></div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Content */}
            <div className="space-y-8 opacity-0 animate-reveal-left">
              <div className="space-y-6 text-left">
                <p className="text-black dark:text-white text-lg md:text-xl leading-relaxed font-medium">
                  {about?.introduction ? (
                    about.introduction.split("MERN Stack Developer").map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <b className="text-black dark:text-white font-bold">MERN Stack Developer</b>}
                      </React.Fragment>
                    ))
                  ) : (
                    <>I'm a <b className="text-black dark:text-white font-bold">MERN Stack Developer</b> with a passion for building modern, responsive web applications.</>
                  )}
                </p>
                {about?.currentWork && (
                  <p className="text-zinc-600 dark:text-zinc-200 text-lg leading-relaxed">
                    {about.currentWork.split("Matic UI").map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <b className="text-black dark:text-white font-bold">Matic UI</b>}
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white px-8 py-3.5 rounded-xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-xl active:scale-95 group"
              >
                More About Me
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/40 rounded-3xl p-8 md:p-10 flex flex-col items-center justify-center text-center group transition-all duration-300 shadow-lg cursor-default border-t border-l border-white/5 dark:border-white/5 opacity-0 animate-reveal-right"
                  style={{ animationDelay: `${index * 0.2}s`, transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tighter group-hover:scale-110 transition-transform duration-300 mb-2">
                    {card.value}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm transition-opacity whitespace-nowrap">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section >





      {/* project section */}
      <section className="bg-white dark:bg-black text-black dark:text-white py-24 px-6 md:px-10 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center opacity-0 animate-reveal-top">
            <h2 className="text-4xl md:text-5xl font-black mb-3">Featured Projects</h2>
            <p className="text-zinc-500 dark:text-[#a1a1aa] font-medium text-sm md:text-base">Some of my recent work</p>
            <div className="h-1 bg-black dark:bg-white w-20 mt-6 rounded-full opacity-0 animate-expand-line"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects?.slice(0, 2).map((project, index) => (
              <div
                key={project._id}
                className={`bg-zinc-50 dark:bg-[#0d0d0d] border border-zinc-200 dark:border-zinc-800/40 rounded-3xl overflow-hidden opacity-0 ${index % 2 === 0 ? "animate-reveal-left" : "animate-reveal-right"
                  }`}
                style={{ animationDelay: `${index * 0.3}s`, transitionDelay: `${index * 0.3}s` }}
              >
                {/* Image Container */}
                <div className="relative h-60 md:h-72 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl || "/project-placeholder.jpg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-black dark:text-white">
                      {project.title.toLowerCase().includes("whatsapp") && <span className="text-green-500">{"\uD83D\uDCE2"}</span>}
                      {project.title.toLowerCase().includes("krushi") && <span className="text-orange-500">{"\uD83E\uDEB4"}</span>}
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-[#a1a1aa] text-[15px] leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pb-2">
                    {(() => {
                      const rawData = Array.isArray(project.technologies)
                        ? project.technologies
                        : [project.technologies];

                      const techList = rawData
                        .flatMap(item => (typeof item === 'string' ? item.split(',') : item))
                        .map(t => String(t).trim())
                        .filter(t => t !== "" && t !== "undefined");

                      return techList.map((tech, index) => (
                        <span
                          key={index}
                          className="text-[13px] font-medium bg-zinc-200 dark:bg-[#18181b] text-zinc-800 dark:text-white px-2 py-0.2 rounded-full border border-zinc-300 dark:border-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-[#27272a] transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ));
                    })()}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href={project.liveUrl || "#"}
                      target="_blank"
                      className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg font-semibold text-[15px] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
                    >
                      Live Demo
                    </Link>
                    <Link
                      href={project.githubUrl || "#"}
                      target="_blank"
                      className="bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 text-black dark:text-white px-6 py-2.5 rounded-lg font-semibold text-[15px] flex items-center gap-2 hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] transition-all active:scale-95"
                    >
                      <Github size={20} />
                      GitHub
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-20 opacity-0 animate-reveal-up delay-300">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl active:scale-95 group"
            >
              View All Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>



      {/* skill section */}
      <section className="bg-zinc-50 dark:bg-black text-black dark:text-white py-24 px-6 md:px-20 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden">
        <div className="max-w-[1450px] mx-auto w-full">

          {/* Header */}
          <div className="flex flex-col items-center mb-20 text-center opacity-0 animate-reveal-top">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">My Skills</h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-widest">Technologies I work with</p>
            <div className="h-1 bg-black dark:bg-white w-20 mt-6 rounded-full opacity-0 animate-expand-line"></div>
          </div>

          {/* Staggered Dynamic Skills Grid */}
          {/* Staggered Dynamic Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {skills?.slice(0, 10).map((skill, index) => {
              const isClicked = clickedSkillId === skill._id;
              return (
                <div
                  key={skill._id}
                  onClick={() => setClickedSkillId(isClicked ? null : skill._id)}
                  className={`bg-white dark:bg-[#0a0a0a] border rounded-xl h-32 md:h-40 flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer group p-4 shadow-sm select-none opacity-0 animate-reveal-up hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-md active:scale-[1.06] active:-translate-y-3 ${isClicked
                    ? "scale-[1.06] -translate-y-3 border-orange-500 shadow-xl dark:border-orange-500"
                    : "border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  style={{ animationDelay: `${0.4 + index * 0.05}s`, transitionDelay: `${0.4 + index * 0.05}s` }}
                >
                  {skill.icon && (
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <DynamicIcon
                        iconName={skill.icon}
                        className="text-2xl md:text-3xl filter grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                  )}

                  <span className="text-zinc-600 dark:text-zinc-300 font-bold text-sm md:text-base group-hover:text-black dark:group-hover:text-white transition-colors text-center">
                    {skill.skillName}
                  </span>
                </div>
              );
            })}
          </div>
          {/* View All Button */}
          <div className="flex justify-center mt-20 opacity-0 animate-reveal-up" style={{ animationDelay: '1.2s', transitionDelay: '1.2s' }}>
            <Link
              href="/skills"
              className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 text-black dark:text-white px-8 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-95 flex items-center gap-2 group shadow-lg"
            >
              View All Skills
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>


      {/* ya madhi  */}
      {/* Ready to Work Section */}
      <section className="bg-white dark:bg-black py-20 px-6 md:px-20 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden">
        <div className="max-w-[1450px] mx-auto w-full opacity-0 animate-reveal-up">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-200 dark:from-[#d4d4d8] via-orange-500 to-orange-700 p-8 md:p-16 text-center shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Ready to Work Together?
              </h2>
              <p className="text-white/95 font-medium text-sm md:text-lg">
                Let's discuss your project and see how I can help bring your ideas to life.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-black dark:bg-zinc-900 text-white px-8 py-3.5 rounded-md font-bold hover:bg-zinc-800 dark:hover:bg-black transition-all shadow-xl active:scale-95 group text-sm md:text-base uppercase tracking-widest"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Subtle background patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;