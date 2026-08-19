import Image from "next/image";
import { Activity, BookOpen, ExternalLink, Music, Wrench } from "lucide-react";

const secondaryTextStyle = { color: "var(--portfolio-text-secondary)" };

function OrganizationLogo({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-current/10 bg-white/70 p-0.5">
            <Image src={src} alt={alt} width={28} height={28} sizes="28px" className="h-full w-full object-contain" />
        </div>
    );
}

export default function About() {
    return (
        <div className="space-y-12">
            <h1 className="text-2xl md:text-3xl font-medium">
                Daniel Chen <span className="block md:inline-block font-zhi-mang font-normal md:ml-3 text-3xl md:text-3xl align-middle mt-2 md:mt-0">陈思远</span>
            </h1>

            <section className="space-y-4" aria-labelledby="experience-heading" style={secondaryTextStyle}>
                <p id="experience-heading" className="text-sm tracking-normal opacity-70">Experience</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <OrganizationLogo src="/nicolawealthmanagement_logo.jpeg" alt="Nicola Wealth logo" />
                        <div>
                            <p className="text-lg md:text-xl">Software Developer @ Nicola Wealth</p>
                            <p className="text-sm opacity-60">Jan 2026 – Aug 2026</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <OrganizationLogo src="/optoutrights.png" alt="OptOutRights.org logo" />
                        <div>
                            <p className="text-lg md:text-xl">Software Engineer Intern @ Opt Out Rights</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-60">
                                <span>May 2026 – Jul 2026</span>
                                <a href="https://github.com/OptOutRights/tracker-blocker/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-opacity hover:opacity-100">
                                    Open source <ExternalLink size={13} aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <OrganizationLogo src="/nicolawealthmanagement_logo.jpeg" alt="Nicola Wealth logo" />
                        <div>
                            <p className="text-lg md:text-xl">Business Management Project Assistant @ Nicola Wealth</p>
                            <p className="text-sm opacity-60">Jan 2025 – Jan 2026</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <OrganizationLogo src="/boardwalk.jpeg" alt="Boardwalk REIT logo" />
                        <div>
                            <p className="text-lg md:text-xl">Procurement Coordinator @ Boardwalk REIT</p>
                            <p className="text-sm opacity-60">May 2023 – Sept 2023</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4" aria-labelledby="education-heading" style={secondaryTextStyle}>
                <p id="education-heading" className="text-sm tracking-normal opacity-70">Education</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <OrganizationLogo src="/peking-university-emblem.webp" alt="Peking University logo" />
                        <p className="text-lg md:text-xl">Exchange Student @ Peking University</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <OrganizationLogo src="/ubc.png" alt="UBC logo" />
                        <p className="text-lg md:text-xl">CS and Business @ UBC</p>
                    </div>
                </div>
            </section>

            <section className="space-y-4" aria-labelledby="interests-heading" style={secondaryTextStyle}>
                <p id="interests-heading" className="text-sm tracking-normal opacity-70">Interests</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3"><Activity size={18} className="opacity-70" /><span>Mixed Martial Arts</span></div>
                    <div className="flex items-center gap-3"><Music size={18} className="opacity-70" /><span>Ambient Music</span></div>
                    <div className="flex items-center gap-3"><BookOpen size={18} className="opacity-70" /><span>Reading</span></div>
                    <div className="flex items-center gap-3"><Wrench size={18} className="opacity-70" /><span>Building</span></div>
                </div>
            </section>
        </div>
    );
}
