"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project, SiteContent } from "@/data/content";
import ImageCarousel from "./ImageCarousel";

const themeStyles = {
    celestial: {
        overlay: "bg-black/60",
        panel: "bg-gray-950/80 border-white/10",
        title: "text-white",
        tag: "text-gray-400",
        link: "bg-white/10 hover:bg-white/20 text-white",
        close: "text-white/60 hover:text-white",
    },
    blizzard: {
        overlay: "bg-black/30",
        panel: "bg-white/80 border-black/10",
        title: "text-black",
        tag: "text-gray-500",
        link: "bg-black/5 hover:bg-black/10 text-black",
        close: "text-black/50 hover:text-black",
    },
    sky: {
        overlay: "bg-black/30",
        panel: "bg-white/60 border-white/30",
        title: "text-black",
        tag: "text-gray-600",
        link: "bg-white/30 hover:bg-white/50 text-black",
        close: "text-black/50 hover:text-black",
    },
} as const;

interface ProjectModalProps {
    project: Project;
    background: "celestial" | "blizzard" | "sky";
    textSecondary: string;
    onClose: () => void;
    ui: SiteContent["projectUi"];
}

export default function ProjectModal({
    project,
    background,
    textSecondary,
    onClose,
    ui,
}: ProjectModalProps) {
    const styles = themeStyles[background];
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const prev = document.body.style.overflow;
        const previousActiveElement = document.activeElement as HTMLElement | null;
        document.body.style.overflow = "hidden";

        closeButtonRef.current?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
                return;
            }

            if (e.key !== "Tab" || !dialogRef.current) return;

            const focusableElements = Array.from(
                dialogRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            );
            if (focusableElements.length === 0) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
            previousActiveElement?.focus();
        };
    }, [onClose]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 ${styles.overlay}`}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border backdrop-blur-xl ${styles.panel}`}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                aria-describedby="project-modal-description"
            >
                {/* Carousel — full-bleed at top, no padding */}
                <div className="relative">
                    <ImageCarousel
                        images={project.images}
                        background={background}
                        ui={ui}
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        ref={closeButtonRef}
                        aria-label={ui.closeDetails}
                        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full backdrop-blur-md transition-colors ${styles.close}`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content below the carousel */}
                <div className="p-6 md:p-8 space-y-4">
                    <h2 id="project-modal-title" className={`text-3xl font-semibold ${styles.title}`}>{project.title}</h2>

                    <p id="project-modal-description" className={`text-xl leading-relaxed ${textSecondary}`}>
                        {project.detailedDescription}
                    </p>

                    <div
                        className={`text-sm flex flex-wrap gap-2 font-mono tracking-normal ${styles.tag}`}
                    >
                        {project.tech.map((t) => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>

                    <a
                        href={project.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl backdrop-blur-sm transition-colors ${styles.link}`}
                    >
                        {ui.visit} {project.link.label}
                        <ExternalLink size={14} />
                    </a>
                </div>
            </motion.div>
        </motion.div>,
        document.body,
    );
}
