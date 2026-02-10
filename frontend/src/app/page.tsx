"use client";
import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";
import Blizzard from "@/components/scenes/Blizzard";
import Sky from "@/components/scenes/Sky";
import { Github, Mail, FileText } from "lucide-react";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Thoughts from "@/components/sections/Thoughts";

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
    const [background, setBackground] = useState<"celestial" | "blizzard" | "sky">("sky");
    const [activeTab, setActiveTab] = useState<"about" | "experience" | "projects" | "thoughts">("about");
    const isCelestial = background === "celestial";
    const isSky = background === "sky";

    useEffect(() => {
        // Keep a pleasant fallback color behind the canvas "wallpaper"
        document.body.style.backgroundColor = isCelestial ? "#000" : (isSky ? "#b3e5fc" : "#ffffff");
    }, [isCelestial, isSky]);

    const navItems = [
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "thoughts", label: "Thoughts" },
    ] as const;

    // Theme helper classes
    const textPrimary = isCelestial ? "text-white" : "text-black";
    const textSecondary = isCelestial ? "text-gray-300" : (isSky ? "text-gray-700" : "text-gray-600");
    // const borderColor = isCelestial ? "border-gray-800" : "border-gray-300";
    // const hoverBg = isCelestial ? "hover:bg-gray-800/50" : "hover:bg-black/5";

    return (
        <main className={`min-h-screen ${textPrimary} font-sans relative overflow-hidden transition-colors duration-500`}>
            {/* Wallpaper Background */}
            <div className="absolute inset-0 z-0">
                {background === "celestial" && <Starfield />}
                {background === "blizzard" && <Blizzard />}
                {background === "sky" && <Sky />}
            </div>

            {/* Top Right: Theme Toggle & Icons */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-6">
                <div className={`flex flex-col md:flex-row items-center gap-4 ${textSecondary} order-2 md:order-1`}>
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

                <select
                    value={background}
                    onChange={(e) => setBackground(e.target.value as "celestial" | "blizzard" | "sky")}
                    className={`text-xs md:text-sm rounded-xl px-2 py-1 shadow-sm border backdrop-blur-md cursor-pointer outline-none transition-colors order-1 md:order-2 ${isCelestial
                        ? "bg-black/30 border-white/20 text-white hover:bg-black/50"
                        : (isSky
                            ? "bg-white/30 border-white/20 text-black hover:bg-white/50"
                            : "bg-white/40 border-black/10 text-black hover:bg-white/60")
                        }`}
                >
                    <option value="celestial" className="bg-black text-white">Celestial</option>
                    <option value="blizzard" className="bg-white text-black">Blizzard</option>
                    <option value="sky" className="bg-sky-400 text-white">Sky</option>
                </select>
            </div>

            {/* Main Layout Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:h-screen w-full max-w-7xl mx-auto">

                {/* Left Column: Navigation */}
                <div className="absolute top-4 left-4 lg:relative lg:top-0 lg:left-0 lg:col-span-3 flex flex-col justify-start px-4 lg:px-8 lg:pl-24 pt-0 lg:pt-44">
                    <nav className="flex flex-row lg:flex-col flex-wrap gap-4 lg:space-y-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`block text-sm lg:text-lg tracking-widest transition-all duration-500 text-left uppercase
                                    ${activeTab === item.id
                                        ? `${textPrimary} scale-110 lg:translate-x-1 font-bold`
                                        : `${textSecondary} hover:${textPrimary} lg:hover:translate-x-0.5`
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right Column: Content */}
                <div className={`flex flex-col justify-start lg:h-full px-8 pr-14 lg:pr-20 pt-32 pb-12 lg:pt-40 lg:pb-24 overflow-y-auto hide-scrollbar ${activeTab === "projects" ? "lg:col-span-9" : "lg:col-span-6"}`}>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {activeTab === "about" && <About textSecondary={textSecondary} />}
                        {activeTab === "projects" && <Projects textSecondary={textSecondary} background={background} />}
                        {activeTab === "thoughts" && <Thoughts textSecondary={textSecondary} />}

                    </div>
                </div>
            </div>
        </main >

    );
}
