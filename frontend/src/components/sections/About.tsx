import Image from "next/image";
import { Activity, BookOpen, ExternalLink, Music, Wrench } from "lucide-react";
import type { SiteContent } from "@/data/content";

const secondaryTextStyle = { color: "var(--portfolio-text-secondary)" };

function OrganizationLogo({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-current/10 bg-white/70 p-0.5">
            <Image src={src} alt={alt} width={28} height={28} sizes="28px" className="h-full w-full object-contain" />
        </div>
    );
}

export default function About({ content }: { content: SiteContent["about"] }) {
    const interestIcons = [Activity, Music, BookOpen, Wrench];

    return (
        <div className="space-y-12">
            <h1 className="text-2xl md:text-3xl font-medium">
                Daniel Chen <span className="block md:inline-block font-zhi-mang font-normal md:ml-3 text-3xl md:text-3xl align-middle mt-2 md:mt-0">陈思远</span>
            </h1>

            <section className="space-y-4" aria-labelledby="experience-heading" style={secondaryTextStyle}>
                <p id="experience-heading" className="text-sm tracking-normal opacity-70">{content.experience}</p>
                <div className="space-y-4">
                    {content.roles.map((role) => (
                        <div key={`${role.organization}-${role.title}`} className="flex items-center gap-4">
                            <OrganizationLogo src={role.logo} alt={role.alt} />
                            <div>
                                <p className="text-lg md:text-xl">{role.title}</p>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-60">
                                    {role.date && <span>{role.date}</span>}
                                    {role.openSource && <a href="https://github.com/OptOutRights/tracker-blocker/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-opacity hover:opacity-100">
                                        {role.openSource} <ExternalLink size={13} aria-hidden="true" />
                                    </a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4" aria-labelledby="education-heading" style={secondaryTextStyle}>
                <p id="education-heading" className="text-sm tracking-normal opacity-70">{content.education}</p>
                <div className="space-y-4">
                    {content.educationItems.map((item) => (
                        <div key={item.organization} className="flex items-center gap-4">
                            <OrganizationLogo src={item.logo} alt={item.alt} />
                            <p className="text-lg md:text-xl">{item.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4" aria-labelledby="interests-heading" style={secondaryTextStyle}>
                <p id="interests-heading" className="text-sm tracking-normal opacity-70">{content.interests}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.interestsItems.map((interest, index) => {
                        const Icon = interestIcons[index];
                        return <div key={interest} className="flex items-center gap-3"><Icon size={18} className="opacity-70" /><span>{interest}</span></div>;
                    })}
                </div>
            </section>
        </div>
    );
}
