"use client";
import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";
import Blizzard from "@/components/scenes/Blizzard";

export default function HomePage() {
    const [background, setBackground] = useState<"celestial" | "blizzard">("celestial");
    const isCelestial = background === "celestial";

    useEffect(() => {
        // Keep a pleasant fallback color behind the canvas "wallpaper"
        document.body.style.backgroundColor = isCelestial ? "#000" : "#fff6d6";
    }, [isCelestial]);

    return (
        <main className={`min-h-screen ${isCelestial ? "text-white" : "text-black"} font-sans relative overflow-x-hidden`}>
            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                }
                .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #444a #181a20;
                }
                .custom-scroll::-webkit-scrollbar {
                    width: 8px;
                    background: #181a20;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background: rgba(80,80,90,0.5);
                    border-radius: 8px;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(120,120,130,0.7);
                }
            `}</style>
            {/* Wallpaper Background */}
            {isCelestial ? <Starfield /> : <Blizzard />}

            {/* Content Container with Gentler Scroll Snap and Custom Scrollbar */}
            <div className="relative z-10 h-screen snap-y snap-proximity overflow-y-scroll custom-scroll">
                {/* Hero Section */}
                <section className="flex flex-col items-center justify-center h-screen text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-4">
                        Daniel Chen
                    </h1>
                    <p className="text-xl md:text-2xl max-w-xl">
                        {/* Building thoughtful things */}
                    </p>
                    {/* <p className="mt-4 text-sm ">Currently dreaming of orbit 🛰️</p> */}
                </section>

                {/* Projects Section */}
                <section className="px-6 py-16">
                    <h2 className="text-3xl font-semibold mb-10 text-center">{"// projects"}</h2>
                    <div className="space-y-8 max-w-3xl mx-auto">
                        <div className={`border ${isCelestial ? "border-gray-700 hover:bg-gray-800/50" : "border-gray-300 hover:bg-black/5"} rounded-xl p-6 transition`}>
                            <h3 className="text-xl font-medium">
                            <a href="https://housr.ca" target="_blank" rel="noopener noreferrer" className={isCelestial ? "hover:text-white" : "hover:text-black"}>Housr</a>
                              — Centralized Student Housing</h3>
                            <p className={`mt-2 ${isCelestial ? "text-gray-300" : "text-gray-700"}`}>
                                Simplified off-campus housing discovery for students at UBC.
                            </p>
                            <div className={`mt-3 text-sm ${isCelestial ? "text-gray-400" : "text-gray-600"} space-x-2`}>
                                <span>[Next.js]</span>
                                <span>[Django]</span>
                                <span>[Postgres]</span>
                                <span>[Tailwind]</span>
                            </div>
                        </div>

                        {/* <div className={`border ${darkMode ? "border-gray-700 hover:bg-gray-800/50" : "border-gray-200 hover:bg-gray-50/50"} rounded-xl p-6 transition`}>
                            <h3 className="text-xl font-medium">Orbital Tools — ISS Tracker</h3>
                            <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-300"}`}>
                                Real-time dashboard for viewing ISS position and telemetry using open APIs.
                            </p>
                            <div className={`mt-3 text-sm ${darkMode ? "text-gray-500" : "text-gray-300"} space-x-2`}>
                                <span>[React]</span>
                                <span>[Framer Motion]</span>
                                <span>[REST API]</span>
                            </div>
                        </div> */}
                    </div>
                </section>

                {/* About Me */}
                <section className="px-6 py-24">
                    <h2 className="text-3xl font-semibold mb-10 text-center">{"// about"}</h2>
                    <p className={`max-w-2xl mx-auto text-lg ${isCelestial ? "text-gray-300" : "text-gray-700"}`}>
                        I&apos;m a third year Business + CS student at UBC interested in technology innovations. 
                        Lately, I&apos;ve been drawn to space tech, AI, and tools that make life smoother. 
                        Outside of code, I love learning new skills and meeting new people.
                    </p>
                </section>

                {/* Experience */}
                <section className="px-6 py-24">
                    <h2 className="text-3xl font-semibold mb-10 text-center">{"// experience"}</h2>
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div>
                            <h3 className="font-medium text-lg">Business Management Project Assistant @ Nicola Wealth</h3>
                            <p className={`text-sm ${isCelestial ? "text-gray-300" : "text-gray-700"}`}>Jan 2024 – Present</p>
                            <p className={`text-sm mt-1 ${isCelestial ? "text-gray-400" : "text-gray-600"}`}>
                                Planned and built a new internal site for advisors.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">Procurement Coordinator @ Boardwalk REIT</h3>
                            <p className={`text-sm ${isCelestial ? "text-gray-300" : "text-gray-700"}`}>May 2023 – Sept 2023</p>
                            <p className={`text-sm mt-1 ${isCelestial ? "text-gray-400" : "text-gray-600"}`}>
                                Coordinated with contractors to maintain over 30,000 units across Canada.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-12">
                    <p>Contact: <a href="mailto:danieltwentytwo@gmail.com" className={`underline ${isCelestial ? "hover:text-white" : "hover:text-black"}`}>danieltwentytwo@gmail.com</a></p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <a href="https://github.com/cleinad" target="_blank" rel="noopener noreferrer" className={isCelestial ? "hover:text-white" : "hover:text-black"}>GitHub</a>
                        <a href="https://linkedin.com/in/danielsychen" target="_blank" rel="noopener noreferrer" className={isCelestial ? "hover:text-white" : "hover:text-black"}>LinkedIn</a>
                        <a href="/resume/Daniel Chen's Resume.pdf" target="_blank" rel="noopener noreferrer" className={isCelestial ? "hover:text-white" : "hover:text-black"}>Resume</a>
                    </div>
                    <p className="text-xs mt-6">Designed & built from Earth, reaching for orbit 🪐</p>
                </footer>
            </div>

            {/* Background selector */}
            <div className="fixed top-6 right-6 z-50">
                <label className={`sr-only`} htmlFor="bg-mode">
                    Background mode
                </label>
                <select
                    id="bg-mode"
                    value={background}
                    onChange={(e) => setBackground(e.target.value as "celestial" | "blizzard")}
                    className={`text-sm rounded-lg px-3 py-2 shadow-md border backdrop-blur-sm ${
                        isCelestial
                            ? "bg-black/40 text-white border-white/15"
                            : "bg-white/70 text-black border-black/10"
                    }`}
                    aria-label="Select background"
                >
                    <option value="celestial">Celestial</option>
                    <option value="blizzard">Blizzard</option>
                </select>
            </div>
        </main>
    );
}
