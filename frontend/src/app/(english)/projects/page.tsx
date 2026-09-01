import type { Metadata } from "next";
import PortfolioShell from "@/components/PortfolioShell";
import Projects from "@/components/sections/Projects";
import { getContent, getShellContent } from "@/data/content";

export const metadata: Metadata = {
    title: "Projects | Daniel Chen",
    description: "Selected software projects by Daniel Chen.",
    alternates: { canonical: "/projects", languages: { en: "/projects", "zh-Hans": "/zh/projects" } },
};

export default function ProjectsPage() {
    const content = getContent("en");
    return <PortfolioShell section="projects" route="projects" content={getShellContent(content)}><Projects projects={content.projects} ui={content.projectUi} /></PortfolioShell>;
}
