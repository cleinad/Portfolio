"use client";
import Image from "next/image";
import { Project } from "@/data/projects";

const themeStyles = {
    celestial: {
        card: "bg-white/5 border-white/10 hover:border-white/25",
        tag: "text-gray-400",
    },
    blizzard: {
        card: "bg-black/[0.03] border-black/10 hover:border-black/25",
        tag: "text-gray-500",
    },
    sky: {
        card: "bg-white/20 border-white/20 hover:border-white/40",
        tag: "text-gray-600",
    },
} as const;

interface ProjectCardProps {
    project: Project;
    background: "celestial" | "blizzard" | "sky";
    textSecondary: string;
    onClick: () => void;
}

export default function ProjectCard({
    project,
    background,
    textSecondary,
    onClick,
}: ProjectCardProps) {
    const styles = themeStyles[background];

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`Open details for ${project.title}`}
            className={`w-full text-left rounded-xl border backdrop-blur-md overflow-hidden transition-all duration-300 group cursor-pointer ${styles.card}`}
        >
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className={`text-lg leading-relaxed line-clamp-2 ${textSecondary}`}>
                    {project.description}
                </p>
                <div
                    className={`pt-1 text-sm flex flex-wrap gap-2 font-mono tracking-normal ${styles.tag}`}
                >
                    {project.tech.slice(0, 3).map((t) => (
                        <span key={t}>{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                        <span>+{project.tech.length - 3}</span>
                    )}
                </div>
            </div>
        </button>
    );
}
