"use client";
import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";
import Blizzard from "@/components/scenes/Blizzard";
import { Github, Mail, FileText } from "lucide-react";

const XIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function HomePage() {
    const [background, setBackground] = useState<"celestial" | "blizzard">("celestial");
    const [activeTab, setActiveTab] = useState<"about" | "experience" | "projects" | "thoughts">("about");
    const isCelestial = background === "celestial";

    useEffect(() => {
        // Keep a pleasant fallback color behind the canvas "wallpaper"
        document.body.style.backgroundColor = isCelestial ? "#000" : "#fff6d6";
    }, [isCelestial]);

    const navItems = [
        { id: "about", label: "About" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "thoughts", label: "Thoughts" },
    ] as const;

    // Theme helper classes
    const textPrimary = isCelestial ? "text-white" : "text-black";
    const textSecondary = isCelestial ? "text-gray-400" : "text-gray-600";
    const borderColor = isCelestial ? "border-gray-800" : "border-gray-300";
    const hoverBg = isCelestial ? "hover:bg-gray-800/50" : "hover:bg-black/5";

    return (
        <main className={`min-h-screen ${textPrimary} font-sans relative overflow-hidden transition-colors duration-500`}>
            {/* Wallpaper Background */}
            <div className="absolute inset-0 z-0">
                {isCelestial ? <Starfield /> : <Blizzard />}
            </div>

            {/* Top Right: Contact Icons & Theme Toggle */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-6">
                <div className={`flex items-center gap-4 ${textSecondary}`}>
                    <a href="https://github.com/cleinad" target="_blank" rel="noopener noreferrer" className={`hover:${textPrimary} transition-colors`}>
                        <Github size={18} />
                    </a>
                    <a href="/resume/Daniel Chen's Resume.pdf" target="_blank" rel="noopener noreferrer" className={`hover:${textPrimary} transition-colors`}>
                        <FileText size={18} />
                    </a>
                    <a href="https://x.com/danielsychen" target="_blank" rel="noopener noreferrer" className={`hover:${textPrimary} transition-colors`}>
                        <XIcon size={18} />
                    </a>
                    <a href="mailto:danieltwentytwo@gmail.com" className={`hover:${textPrimary} transition-colors`}>
                        <Mail size={18} />
                    </a>
                </div>

                <div className="hidden md:block h-6 w-px bg-current opacity-20"></div>

                <select
                    value={background}
                    onChange={(e) => setBackground(e.target.value as "celestial" | "blizzard")}
                    className={`text-xs md:text-sm rounded-xl px-2 py-1 shadow-sm border backdrop-blur-md cursor-pointer outline-none transition-colors ${isCelestial
                        ? "bg-black/30 border-white/20 text-white hover:bg-black/50"
                        : "bg-white/40 border-black/10 text-black hover:bg-white/60"
                        }`}
                >
                    <option value="celestial" className="bg-black text-white">Celestial</option>
                    <option value="blizzard" className="bg-white text-black">Blizzard</option>
                </select>
            </div>

            {/* Main Layout Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 md:h-screen w-full max-w-7xl mx-auto md:-translate-y-[20%]">

                {/* Left Column: Navigation */}
                <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-center px-8 md:pl-16 lg:pl-24 pt-24 md:pt-0">
                    <nav className="flex flex-row md:flex-col flex-wrap gap-4 md:space-y-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`block text-sm md:text-lg tracking-widest transition-all duration-500 text-left uppercase
                                    ${activeTab === item.id
                                        ? `${textPrimary} scale-110 md:translate-x-1 font-bold`
                                        : `${textSecondary} hover:${textPrimary} md:hover:translate-x-0.5`
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right Column: Content */}
                <div className="md:col-span-8 lg:col-span-6 flex flex-col justify-center md:h-full px-8 md:pr-16 py-12 md:py-0 overflow-y-auto">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* ABOUT TAB */}
                        {activeTab === "about" && (
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl font-medium mb-4">
                                    Daniel Chen <span className="font-zhi-mang font-normal ml-3 text-5xl md:text-6xl align-middle">陈思远</span>
                                </h1>
                                <p className={`text-lg md:text-xl leading-relaxed ${textSecondary}`}>
                                    I&apos;m a third year Business + CS student at UBC interested in technology innovations.
                                    Lately, I&apos;ve been drawn to space tech, AI, and tools that make life smoother.
                                </p>
                                <p className={`text-lg md:text-xl leading-relaxed ${textSecondary}`}>
                                    Outside of code, I love learning new skills and meeting new people.
                                </p>
                                <div className="pt-4">
                                    <p className="text-sm opacity-50">wondering what is out there 🪐</p>
                                </div>
                            </div>
                        )}

                        {/* EXPERIENCE TAB */}
                        {activeTab === "experience" && (
                            <div className="space-y-8">
                                <div className={`p-6 rounded-xl border ${borderColor} ${hoverBg} transition-colors`}>
                                    <h3 className="font-semibold text-xl">Business Management Project Assistant</h3>
                                    <p className={`${textSecondary} text-sm mb-2`}>Nicola Wealth • Jan 2024 – Present</p>
                                    <p className={`${textSecondary}`}>
                                        Planned and built a new internal site for advisors.
                                    </p>
                                </div>
                                <div className={`p-6 rounded-xl border ${borderColor} ${hoverBg} transition-colors`}>
                                    <h3 className="font-semibold text-xl">Procurement Coordinator</h3>
                                    <p className={`${textSecondary} text-sm mb-2`}>Boardwalk REIT • May 2023 – Sept 2023</p>
                                    <p className={`${textSecondary}`}>
                                        Coordinated with contractors to maintain over 30,000 units across Canada.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* PROJECTS TAB */}
                        {activeTab === "projects" && (
                            <div className="space-y-6">
                                <a href="https://housr.ca" target="_blank" rel="noopener noreferrer" className="block group">
                                    <div className={`p-6 rounded-xl border ${borderColor} ${hoverBg} transition-all`}>
                                        <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4">
                                            Housr
                                        </h3>
                                        <p className={`mt-2 ${textSecondary}`}>
                                            Centralized Student Housing. Simplified off-campus housing discovery for students at UBC.
                                        </p>
                                        <div className={`mt-4 text-xs ${textSecondary} flex gap-2 font-mono uppercase tracking-wide opacity-70`}>
                                            <span>Next.js</span>
                                            <span>Django</span>
                                            <span>Postgres</span>
                                            <span>Tailwind</span>
                                        </div>
                                    </div>
                                </a>
                                {/* Example placeholder for more projects */}
                                <div className={`p-6 rounded-xl border border-dashed ${borderColor} opacity-50`}>
                                    <p className="text-center text-sm">More projects coming soon...</p>
                                </div>
                            </div>
                        )}

                        {/* THOUGHTS TAB */}
                        {activeTab === "thoughts" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-medium mb-4">Random Musings</h2>
                                <p className={`${textSecondary} leading-relaxed`}>
                                    Nova-3 achieves breakthrough accuracy in challenging acoustic environments through
                                    several key innovations in data and modeling. At its foundation is a sophisticated
                                    audio embedding framework...
                                </p>
                                <p className={`${textSecondary} leading-relaxed`}>
                                    (This is just a placeholder for now, but this is where I&apos;ll write about things that interest me!)
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
