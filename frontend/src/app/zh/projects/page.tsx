import type { Metadata } from "next";
import PortfolioShell from "@/components/PortfolioShell";
import Projects from "@/components/sections/Projects";
import { getContent, getShellContent } from "@/data/content";

export const metadata: Metadata = {
    title: "项目 | 陈思远",
    description: "陈思远的精选软件项目。",
    alternates: { canonical: "/zh/projects", languages: { en: "/projects", "zh-Hans": "/zh/projects" } },
};

export default function ChineseProjectsPage() {
    const content = getContent("zh-Hans");
    return <PortfolioShell section="projects" route="projects" content={getShellContent(content)}><Projects projects={content.projects} ui={content.projectUi} /></PortfolioShell>;
}
