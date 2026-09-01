import type { Metadata } from "next";
import About from "@/components/sections/About";
import PortfolioShell from "@/components/PortfolioShell";
import { getContent, getShellContent } from "@/data/content";

export const metadata: Metadata = {
    title: "Daniel Chen",
    description: "Daniel Chen's portfolio.",
    alternates: { canonical: "/about", languages: { en: "/about", "zh-Hans": "/zh/about" } },
};

export default function AboutPage() {
    const content = getContent("en");
    return <PortfolioShell section="about" route="about" content={getShellContent(content)}><About content={content.about} /></PortfolioShell>;
}
