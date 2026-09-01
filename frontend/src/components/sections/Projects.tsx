"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Project, SiteContent } from "@/data/content";
import { usePortfolioTheme } from "@/components/PortfolioThemeContext";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects({ projects, ui }: { projects: Project[]; ui: SiteContent["projectUi"] }) {
    const { background, textSecondary } = usePortfolioTheme();
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        background={background}
                        textSecondary={textSecondary}
                        ui={ui}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        background={background}
                        textSecondary={textSecondary}
                        ui={ui}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
