"use client";
import Image from "next/image";
import { Activity, Music, BookOpen, Wrench } from "lucide-react";


interface AboutProps {
    textSecondary: string;
}

export default function About({ textSecondary }: AboutProps) {
    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl font-medium mb-4">
                    Daniel Chen <span className="block md:inline-block font-zhi-mang font-normal md:ml-3 text-3xl md:text-3xl align-middle mt-2 md:mt-0">陈思远</span>
                </h1>
                <div className="space-y-4">
                    <p className={`text-sm tracking-widest uppercase opacity-70 ${textSecondary}`}>
                        Currently
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-current/10">
                                <Image
                                    src="/nicolawealthmanagement_logo.jpeg"
                                    alt="Nicola Wealth Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className={`text-lg md:text-xl ${textSecondary}`}>
                                Software Engineer @ Nicola Wealth
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-current/10">
                                <Image
                                    src="/ubc.png"
                                    alt="UBC Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className={`text-lg md:text-xl ${textSecondary}`}>
                                CS and Business @ UBC
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="space-y-4">
                <p className={`text-sm tracking-widest uppercase opacity-70 ${textSecondary}`}>
                    Previously
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-current/10">
                            <Image
                                src="/nicolawealthmanagement_logo.jpeg"
                                alt="Nicola Wealth Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className={`text-lg md:text-xl ${textSecondary}`}>
                                Business Management Project Assistant @ Nicola Wealth
                            </p>
                            <p className={`text-sm opacity-60 ${textSecondary}`}>Jan 2025 – Jan 2026</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-current/10">
                            <Image
                                src="/boardwalk.jpeg"
                                alt="Boardwalk REIT Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className={`text-lg md:text-xl ${textSecondary}`}>
                                Procurement Coordinator @ Boardwalk REIT
                            </p>
                            <p className={`text-sm opacity-60 ${textSecondary}`}>May 2023 – Sept 2023</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="space-y-4">
                <p className={`text-sm tracking-widest uppercase opacity-70 ${textSecondary}`}>
                    Interests
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <Activity size={18} className="opacity-70" />
                        <span className={`${textSecondary}`}>Mixed Martial Arts</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Music size={18} className="opacity-70" />
                        <span className={`${textSecondary}`}>Ambient Music</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <BookOpen size={18} className="opacity-70" />
                        <span className={`${textSecondary}`}>Reading</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Wrench size={18} className="opacity-70" />
                        <span className={`${textSecondary}`}>Building</span>
                    </div>
                </div>
            </div>


            {/* <div className="pt-4">
                <p className="text-sm opacity-50"> 🪐</p>
            </div> */}
        </div>
    );
}
