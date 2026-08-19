"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import { FileText, Github, Mail } from "lucide-react";
import { PortfolioThemeProvider, usePortfolioTheme, type Background } from "@/components/PortfolioThemeContext";

const Starfield = dynamic(() => import("@/components/Starfield"), { ssr: false });
const Blizzard = dynamic(() => import("@/components/scenes/Blizzard"), { ssr: false });
const Sky = dynamic(() => import("@/components/scenes/Sky"), { ssr: false });

type Section = "about" | "projects" | "thoughts";

interface PortfolioShellProps {
    section: Section;
    children: React.ReactNode;
}

const XIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const navItems: { id: Section; label: string; href: string }[] = [
    { id: "about", label: "About", href: "/about" },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "thoughts", label: "Thoughts", href: "/thoughts" },
];

const backgroundColors: Record<Background, string> = {
    celestial: "#000000",
    blizzard: "#ffffff",
    sky: "#b3e5fc",
};

function PortfolioFrame({ section, children }: PortfolioShellProps) {
    const { background, setBackground, textSecondary } = usePortfolioTheme();
    const [animationEnabled, setAnimationEnabled] = useState(false);
    const isCelestial = background === "celestial";
    const textPrimary = isCelestial ? "#ffffff" : "#000000";
    const secondaryColor = isCelestial ? "#d1d5db" : background === "sky" ? "#374151" : "#4b5563";

    useEffect(() => {
        document.body.style.backgroundColor = backgroundColors[background];

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateAnimationState = () => {
            setAnimationEnabled(!reducedMotion.matches && document.visibilityState === "visible");
        };

        updateAnimationState();
        reducedMotion.addEventListener("change", updateAnimationState);
        document.addEventListener("visibilitychange", updateAnimationState);

        return () => {
            reducedMotion.removeEventListener("change", updateAnimationState);
            document.removeEventListener("visibilitychange", updateAnimationState);
        };
    }, [background]);

    return (
        <main
            className="min-h-screen relative overflow-hidden transition-colors duration-500"
            style={{
                color: textPrimary,
                backgroundColor: backgroundColors[background],
                "--portfolio-text-secondary": secondaryColor,
            } as CSSProperties}
        >
            <div className="absolute inset-0 z-0" aria-hidden="true">
                {animationEnabled && background === "celestial" && <Starfield />}
                {animationEnabled && background === "blizzard" && <Blizzard />}
                {animationEnabled && background === "sky" && <Sky />}
            </div>

            <header className="absolute inset-0 top-0 z-50 pointer-events-none">
                <nav className="pointer-events-auto absolute top-4 left-4 flex flex-wrap items-center gap-x-5 gap-y-2 md:top-8 md:left-8 lg:left-12" aria-label="Portfolio sections">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            aria-current={section === item.id ? "page" : undefined}
                            className={`min-h-6 px-1 py-0.5 text-sm md:text-base transition-all duration-300 ${section === item.id
                                ? "border-b-2 border-current font-semibold"
                                : `${textSecondary} opacity-75 hover:opacity-100`
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="pointer-events-auto absolute top-4 right-4 flex flex-col items-end gap-4 md:top-8 md:right-8 md:flex-row md:items-center md:gap-6">
                    <div className={`order-2 flex flex-col items-center gap-4 ${textSecondary} md:order-1 md:flex-row`}>
                        <a href="https://github.com/cleinad" target="_blank" rel="noopener noreferrer" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label="GitHub"><Github size={18} /></a>
                        <a href="/resume/Daniel Chen's Resume.pdf" target="_blank" rel="noopener noreferrer" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label="Resume"><FileText size={18} /></a>
                        <a href="https://x.com/danielsychen" target="_blank" rel="noopener noreferrer" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label="X"><XIcon size={18} /></a>
                        <a href="mailto:danieltwentytwo@gmail.com" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label="Email"><Mail size={18} /></a>
                    </div>

                    <select
                        value={background}
                        onChange={(event) => setBackground(event.target.value as Background)}
                        className={`order-1 text-xs md:text-sm rounded-xl px-2 py-1 shadow-sm border backdrop-blur-md cursor-pointer outline-none transition-colors md:order-2 ${isCelestial
                            ? "bg-black/30 border-white/20 text-white hover:bg-black/50"
                            : background === "sky"
                                ? "bg-white/30 border-white/20 text-black hover:bg-white/50"
                                : "bg-white/40 border-black/10 text-black hover:bg-white/60"
                            }`}
                        aria-label="Background theme"
                    >
                        <option value="celestial" className="bg-black text-white">Celestial</option>
                        <option value="blizzard" className="bg-white text-black">Blizzard</option>
                        <option value="sky" className="bg-sky-400 text-white">Sky</option>
                    </select>
                </div>
            </header>

            <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl overflow-y-auto px-4 pb-12 pt-28 hide-scrollbar md:px-8 md:pt-36 lg:px-12 lg:pt-40">
                <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${section === "projects" ? "max-w-6xl" : "max-w-3xl"}`}>
                    {children}
                </div>
            </div>
        </main>
    );
}

export default function PortfolioShell({ section, children }: PortfolioShellProps) {
    return (
        <PortfolioThemeProvider>
            <PortfolioFrame section={section}>{children}</PortfolioFrame>
        </PortfolioThemeProvider>
    );
}
