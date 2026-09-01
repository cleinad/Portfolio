"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import { FileText, Github, Mail } from "lucide-react";
import { PortfolioThemeProvider, usePortfolioTheme, type Background } from "@/components/PortfolioThemeContext";
import type { Locale, Section, SiteContent } from "@/data/content";

const Starfield = dynamic(() => import("@/components/Starfield"), { ssr: false });
const Blizzard = dynamic(() => import("@/components/scenes/Blizzard"), { ssr: false });
const Sky = dynamic(() => import("@/components/scenes/Sky"), { ssr: false });

interface PortfolioShellProps {
    section: Section;
    route: "home" | Section;
    content: Pick<SiteContent, "locale" | "nav" | "navigationLabel" | "language" | "theme" | "social">;
    children: React.ReactNode;
}

const XIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const backgroundColors: Record<Background, string> = {
    celestial: "#000000",
    blizzard: "#ffffff",
    sky: "#b3e5fc",
};

function localePath(locale: Locale, route: PortfolioShellProps["route"]) {
    if (route === "home") return locale === "zh-Hans" ? "/zh" : "/";
    const suffix = route === "about" ? "/about" : "/projects";
    return locale === "zh-Hans" ? `/zh${suffix}` : suffix;
}

function LanguageToggle({ locale, route, content }: Pick<PortfolioShellProps, "route" | "content"> & { locale: Locale }) {
    const alternateLocale: Locale = locale === "en" ? "zh-Hans" : "en";

    const rememberLanguage = () => {
        document.cookie = `portfolio_locale=${alternateLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    };

    return (
        <nav className="flex min-h-8 items-center text-sm md:text-base" aria-label={content.language.label}>
            {locale === "en" ? (
                <span aria-current="page" className="font-semibold">{content.language.english}</span>
            ) : (
                <Link href={localePath("en", route)} prefetch={false} onClick={rememberLanguage} lang="en" hrefLang="en" className="rounded-sm px-1 py-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">{content.language.english}</Link>
            )}
            <span className="px-1.5 opacity-45" aria-hidden="true">/</span>
            {locale === "zh-Hans" ? (
                <span aria-current="page" lang="zh-Hans" className="font-semibold">{content.language.chinese}</span>
            ) : (
                <Link href={localePath("zh-Hans", route)} prefetch={false} onClick={rememberLanguage} lang="zh-Hans" hrefLang="zh-Hans" className="rounded-sm px-1 py-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">{content.language.chinese}</Link>
            )}
        </nav>
    );
}

function PortfolioFrame({ section, route, content, children }: PortfolioShellProps) {
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
                <nav className="pointer-events-auto absolute top-4 left-4 flex flex-wrap items-center gap-x-5 gap-y-2 md:top-8 md:left-8 lg:left-12" aria-label={content.navigationLabel}>
                    {(["about", "projects"] as const).map((item) => (
                        <Link
                            key={item}
                            href={localePath(content.locale, item)}
                            aria-current={section === item ? "page" : undefined}
                            className={`min-h-6 px-1 py-0.5 text-sm md:text-base transition-all duration-300 ${section === item
                                ? "border-b-2 border-current font-semibold"
                                : `${textSecondary} opacity-75 hover:opacity-100`
                                }`}
                        >
                            {content.nav[item]}
                        </Link>
                    ))}
                </nav>

                <div className="pointer-events-auto absolute top-4 right-4 flex flex-col items-end gap-3 md:top-8 md:right-8 md:flex-row md:items-center md:gap-6">
                    <LanguageToggle locale={content.locale} route={route} content={content} />
                    <div className={`order-2 flex flex-col items-center gap-4 ${textSecondary} md:order-1 md:flex-row`}>
                        <a href="https://github.com/cleinad" target="_blank" rel="noopener noreferrer" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label={content.social.github}><Github size={18} /></a>
                        <a href={content.social.resumeHref} target="_blank" rel="noopener noreferrer" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label={content.social.resume}><FileText size={18} /></a>
                        <a href="https://x.com/danielsychen" target="_blank" rel="noopener noreferrer" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label={content.social.x}><XIcon size={18} /></a>
                        <a href="mailto:danieltwentytwo@gmail.com" className="min-h-6 min-w-6 transition-opacity hover:opacity-100 opacity-70" aria-label={content.social.email}><Mail size={18} /></a>
                    </div>
                </div>

                <div className="pointer-events-auto fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
                    <select
                        value={background}
                        onChange={(event) => setBackground(event.target.value as Background)}
                        className={`text-xs md:text-sm rounded-xl px-2 py-1 shadow-sm border backdrop-blur-md cursor-pointer outline-none transition-colors ${isCelestial
                            ? "bg-black/30 border-white/20 text-white hover:bg-black/50"
                            : background === "sky"
                                ? "bg-white/30 border-white/20 text-black hover:bg-white/50"
                                : "bg-white/40 border-black/10 text-black hover:bg-white/60"
                            }`}
                        aria-label={content.theme.label}
                    >
                        <option value="celestial" className="bg-black text-white">{content.theme.celestial}</option>
                        <option value="blizzard" className="bg-white text-black">{content.theme.blizzard}</option>
                        <option value="sky" className="bg-sky-400 text-white">{content.theme.sky}</option>
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

export default function PortfolioShell({ section, route, content, children }: PortfolioShellProps) {
    return (
        <PortfolioThemeProvider>
            <PortfolioFrame section={section} route={route} content={content}>{children}</PortfolioFrame>
        </PortfolioThemeProvider>
    );
}
