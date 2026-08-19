"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/data/projects";
import { usePortfolioTheme } from "@/components/PortfolioThemeContext";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
    const { background, textSecondary } = usePortfolioTheme();
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PROJECTS.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        background={background}
                        textSecondary={textSecondary}
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
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
