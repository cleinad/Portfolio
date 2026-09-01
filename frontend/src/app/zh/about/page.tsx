import type { Metadata } from "next";
import About from "@/components/sections/About";
import PortfolioShell from "@/components/PortfolioShell";
import { getContent, getShellContent } from "@/data/content";

export const metadata: Metadata = {
    title: "陈思远",
    description: "陈思远的个人作品集。",
    alternates: { canonical: "/zh/about", languages: { en: "/about", "zh-Hans": "/zh/about" } },
};

export default function ChineseAboutPage() {
    const content = getContent("zh-Hans");
    return <PortfolioShell section="about" route="about" content={getShellContent(content)}><About content={content.about} /></PortfolioShell>;
}
