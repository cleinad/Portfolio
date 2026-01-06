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
        document.body.style.backgroundColor = isCelestial ? "#000" : "#ffffff";
    }, [isCelestial]);

    const navItems = [
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "thoughts", label: "Thoughts" },
    ] as const;

    // Theme helper classes
    const textPrimary = isCelestial ? "text-white" : "text-black";
    const textSecondary = isCelestial ? "text-gray-300" : "text-gray-600";
    // const borderColor = isCelestial ? "border-gray-800" : "border-gray-300";
    // const hoverBg = isCelestial ? "hover:bg-gray-800/50" : "hover:bg-black/5";

    return (
        <main className={`min-h-screen ${textPrimary} font-sans relative overflow-hidden transition-colors duration-500`}>
            {/* Wallpaper Background */}
            <div className="absolute inset-0 z-0">
                {isCelestial ? <Starfield /> : <Blizzard />}
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
                    onChange={(e) => setBackground(e.target.value as "celestial" | "blizzard")}
                    className={`text-xs md:text-sm rounded-xl px-2 py-1 shadow-sm border backdrop-blur-md cursor-pointer outline-none transition-colors order-1 md:order-2 ${isCelestial
                        ? "bg-black/30 border-white/20 text-white hover:bg-black/50"
                        : "bg-white/40 border-black/10 text-black hover:bg-white/60"
                        }`}
                >
                    <option value="celestial" className="bg-black text-white">Celestial</option>
                    <option value="blizzard" className="bg-white text-black">Blizzard</option>
                </select>
            </div>

            {/* Main Layout Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 md:h-screen w-full max-w-7xl mx-auto">

                {/* Left Column: Navigation */}
                <div className="absolute top-4 left-4 md:relative md:top-0 md:left-0 md:col-span-4 lg:col-span-3 flex flex-col justify-start px-4 md:px-8 md:pl-16 lg:pl-24 pt-0 md:pt-44">
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
                <div className="md:col-span-8 lg:col-span-6 flex flex-col justify-start md:h-full px-8 md:pr-16 pt-32 pb-12 md:pt-40 md:pb-24 overflow-y-auto hide-scrollbar">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* ABOUT TAB */}
                        {activeTab === "about" && (
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h1 className="text-4xl md:text-5xl font-medium mb-4">
                                        Daniel Chen <span className="block md:inline-block font-zhi-mang font-normal md:ml-3 text-5xl md:text-6xl align-middle mt-2 md:mt-0">陈思远</span>
                                    </h1>
                                    <p className={`text-lg md:text-xl leading-relaxed ${textSecondary}`}>
                                        I&apos;m a third year Business + CS student at UBC. Currently I am cofounder of a
                                        Christian organization with over 100 members. I enjoy running, fighting,
                                        listening to ambient music, reading and finding hidden tools to test out.

                                    </p>
                                    <p className={`text-lg md:text-xl leading-relaxed ${textSecondary}`}>
                                        I&apos;m always looking to meet to people, so don&apos;t hesitate to reach out!
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <h2 className="text-2xl font-medium opacity-80">Experience</h2>
                                    <div className="space-y-10">
                                        <div className="group">
                                            <div className="border-l-2 pl-6 border-current/10 space-y-2 transition-all group-hover:border-current/30">
                                                <h3 className="font-semibold text-xl group-hover:underline decoration-1 underline-offset-4">Business Management Project Assistant</h3>
                                                <p className={`${textSecondary} text-sm`}>Nicola Wealth • Jan 2024 – Present</p>
                                                <p className={`${textSecondary}`}>
                                                    Planned and built a new internal site for advisors.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <div className="border-l-2 pl-6 border-current/10 space-y-2 transition-all group-hover:border-current/30">
                                                <h3 className="font-semibold text-xl group-hover:underline decoration-1 underline-offset-4">Procurement Coordinator</h3>
                                                <p className={`${textSecondary} text-sm`}>Boardwalk REIT • May 2023 – Sept 2023</p>
                                                <p className={`${textSecondary}`}>
                                                    Coordinated with contractors to improve over 30,000 units across Canada.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="pt-4">
                                    <p className="text-sm opacity-50"> 🪐</p>
                                </div> */}
                            </div>
                        )}


                        {/* PROJECTS TAB */}
                        {activeTab === "projects" && (
                            <div className="space-y-12">
                                <div className="space-y-8">
                                    <a href="https://housr.ca" target="_blank" rel="noopener noreferrer" className="block group">
                                        <div className="border-l-2 pl-6 border-current/10 space-y-2 transition-all group-hover:border-current/30">
                                            <h3 className="text-xl font-semibold group-hover:underline decoration-1 underline-offset-4">
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
                                </div>
                                {/* Example placeholder for more projects */}
                                <div className="border-l-2 pl-6 border-dashed border-current/10 opacity-50">
                                    <p className="text-sm">More projects coming soon...</p>
                                </div>
                            </div>
                        )}

                        {/* THOUGHTS TAB */}
                        {activeTab === "thoughts" && (
                            <div className="space-y-8 max-w-2xl">
                                <h2 className="text-xl font-medium mb-4 opacity-80">Musings</h2>
                                <div className={`${textSecondary} leading-relaxed font-serif italic space-y-4`}>
                                    <p className="text-sm not-italic opacity-50 mb-6">Isaiah 29:13</p>
                                    <div className="pl-4 border-l border-current/10 space-y-3">
                                        <p>“Because this people draw near with their mouth</p>
                                        <p className="pl-4">and honor me with their lips,</p>
                                        <p className="pl-6">while their hearts are far from me,</p>
                                        <p>and their fear of me is a commandment taught by men,”</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
