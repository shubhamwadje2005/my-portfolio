"use client";

import React, { useEffect, useState } from "react";
import { useGetSkillQuery } from "@/redux/api/skill.api";
import { BookOpen, Code2, Users2, Loader2 } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const SkillsPage = () => {
  const [clickedSkillId, setClickedSkillId] = useState<string | null>(null);
  const { data: skillData, isLoading } = useGetSkillQuery();
  const skills = skillData?.result || [];

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
  }, [skills, isLoading]);

  const learningApproach = [
    {
      title: "Continuous Learning",
      description: "I regularly take online courses and follow industry blogs to stay updated with the latest trends and technologies.",
      icon: <BookOpen className="text-orange-500" size={24} />
    },
    {
      title: "Hands-On Projects",
      description: "I build real-world projects to practice and reinforce my learning.",
      icon: <Code2 className="text-orange-500" size={24} />
    },
    {
      title: "Developer Community",
      description: "I actively participate in developer communities, attend meetups, and contribute to open-source projects when possible.",
      icon: <Users2 className="text-orange-500" size={24} />
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
        <div className="relative w-16 h-16 mb-4">
          <Loader2 className="w-full h-full text-zinc-400 dark:text-zinc-500 animate-spin" strokeWidth={1} />
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium tracking-wide">Loading skills...</p>
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

      <div className="max-w-[1350px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center animate-reveal-up">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-black dark:text-white">My Skills</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-widest">Technologies I work with</p>
          <div className="h-1 bg-black dark:bg-white mt-6 rounded-full animate-expand-line"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-24">
          {skills?.map((skill, index) => {
            const isClicked = clickedSkillId === skill._id;
            return (
              <div
                key={skill._id}
                onClick={() => setClickedSkillId(isClicked ? null : skill._id)}
                className={`bg-white dark:bg-[#0a0a0a] border rounded-xl h-32 md:h-40 flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer group p-4 shadow-sm select-none opacity-0 animate-reveal-up hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-md active:scale-[1.06] active:-translate-y-3 ${isClicked
                    ? "scale-[1.06] -translate-y-3 border-orange-500 shadow-xl dark:border-orange-500"
                    : "border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                style={{ animationDelay: `${0.2 + index * 0.05}s`, transitionDelay: `${0.2 + index * 0.05}s` }}
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
        {/* Learning Approach Section */}
        <div className="border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-8 md:p-12 bg-zinc-50 dark:bg-[#050505] opacity-0 animate-reveal-up shadow-lg" style={{ animationDelay: '0.8s', transitionDelay: '0.8s' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-orange-500">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-black dark:text-white">My Learning Approach</h2>
              <p className="text-zinc-500 text-sm">How I stay updated with the latest technologies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningApproach.map((item, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl p-6 space-y-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsPage;