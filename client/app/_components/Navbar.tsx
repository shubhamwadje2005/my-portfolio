"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Monitor, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const actionsRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
                setIsThemeOpen(false);
            }
        };

        if (isThemeOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isThemeOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    if (!mounted) return null;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Skills", href: "/skills" },
        { name: "Projects", href: "/projects" },
        { name: "Experience", href: "/experience" },
        { name: "Contact", href: "/contact" },
    ];

    const ThemeIcon = () => {
        if (theme === "system") return <Monitor size={20} />;

        switch (resolvedTheme) {
            case "light":
                return <Sun size={20} />;
            case "dark":
                return <Moon size={20} />;
            default:
                return <Monitor size={20} />;
        }
    };

    return (
        <>
            <nav className={`w-full fixed top-0 left-0 transition-all duration-300 z-[9999] ${isMenuOpen ? "bg-white dark:bg-black" : "bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/50"} animate-slide-down`}>

                <div className="max-w-[1450px] mx-auto flex items-center justify-between px-6 py-4 md:py-5 relative">
                    {/* Logo */}
                    <Link href="/" className="z-[110]" onClick={() => setIsMenuOpen(false)}>
                        <img src="/shubham.png" alt="Logo" className="h-8 md:h-10 w-auto invert dark:invert-0" />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 xl:gap-10 text-zinc-500 dark:text-gray-400 font-bold text-sm uppercase tracking-widest">
                        {navLinks.map((link) => (
                            <li key={link.href} className="relative group">
                                <Link href={link.href} className={`transition-colors duration-300 ${pathname === link.href ? "text-black dark:text-white" : "hover:text-black dark:hover:text-white"}`}>
                                    {link.name}
                                </Link>
                                {pathname === link.href && (
                                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 md:gap-6 relative z-[110]">
                        {/* Theme Switcher */}
                        <div className="relative" ref={actionsRef}>
                            <button
                                onClick={() => setIsThemeOpen(!isThemeOpen)}
                                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all flex items-center gap-2 border border-zinc-200 dark:border-zinc-800"
                            >
                                <ThemeIcon />
                                <ChevronDown size={14} className={`transition-transform duration-300 ${isThemeOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isThemeOpen && (
                                <div className="absolute right-0 top-[110%] mt-2 w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 z-[999999] block opacity-100">
                                    {[
                                        { name: 'Light', icon: <Sun size={16} />, val: 'light' },
                                        { name: 'Dark', icon: <Moon size={16} />, val: 'dark' },
                                        { name: 'System', icon: <Monitor size={16} />, val: 'system' }
                                    ].map((t) => (
                                        <button
                                            key={t.val}
                                            onClick={() => { setTheme(t.val); setIsThemeOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${theme === t.val ? 'bg-orange-500 text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white'}`}
                                        >
                                            {t.icon}
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="lg:hidden text-black dark:text-white p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay — z-index below nav so navbar stays visible */}
            <div className={`lg:hidden fixed inset-0 z-[9998] bg-white dark:bg-black transition-all duration-500 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full justify-evenly items-center py-20 px-10">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-2xl font-black transition-all duration-300 ${pathname === link.href ? "text-orange-500 scale-110" : "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white"}`}
                            style={{
                                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                                transform: isMenuOpen ? 'translateX(0)' : 'translateX(50px)',
                                opacity: isMenuOpen ? 1 : 0
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;

