"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const themeStyles = {
    celestial: {
        arrow: "bg-black/40 hover:bg-black/60 text-white",
        dot: "bg-white/40",
        dotActive: "bg-white",
    },
    blizzard: {
        arrow: "bg-black/10 hover:bg-black/20 text-black",
        dot: "bg-black/20",
        dotActive: "bg-black/70",
    },
    sky: {
        arrow: "bg-white/40 hover:bg-white/60 text-black",
        dot: "bg-white/40",
        dotActive: "bg-white",
    },
} as const;

interface ImageCarouselProps {
    images: string[];
    background: "celestial" | "blizzard" | "sky";
}

export default function ImageCarousel({
    images,
    background,
}: ImageCarouselProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const styles = themeStyles[background];

    const go = useCallback(
        (dir: number) => {
            setDirection(dir);
            setIndex((prev) => (prev + dir + images.length) % images.length);
        },
        [images.length],
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (lightboxOpen) {
                if (e.key === "Escape") {
                    e.stopPropagation();
                    setLightboxOpen(false);
                } else if (e.key === "ArrowLeft") {
                    go(-1);
                } else if (e.key === "ArrowRight") {
                    go(1);
                }
                return;
            }
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
        };
        window.addEventListener("keydown", onKey, true);
        return () => window.removeEventListener("keydown", onKey, true);
    }, [go, lightboxOpen]);

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
    };

    return (
        <>
            <div className="relative">
                <div
                    className="relative aspect-video overflow-hidden cursor-zoom-in"
                    onClick={() => setLightboxOpen(true)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setLightboxOpen(true);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open screenshot ${index + 1} in full screen`}
                >
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={images[index]}
                                alt={`Screenshot ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 900px"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); go(-1); }}
                            aria-label="Previous screenshot"
                            className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 backdrop-blur-sm transition-colors ${styles.arrow}`}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); go(1); }}
                            aria-label="Next screenshot"
                            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 backdrop-blur-sm transition-colors ${styles.arrow}`}
                        >
                            <ChevronRight size={18} />
                        </button>

                        <div className="flex justify-center gap-1.5 mt-3">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                        setDirection(i > index ? 1 : -1);
                                        setIndex(i);
                                    }}
                                    aria-label={`Show screenshot ${i + 1}`}
                                    aria-current={i === index ? "true" : undefined}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                        i === index ? styles.dotActive : styles.dot
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Full-screen lightbox */}
            {lightboxOpen &&
                createPortal(
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 cursor-zoom-out"
                            onClick={() => setLightboxOpen(false)}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Screenshot viewer"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="relative w-[95vw] h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={images[index]}
                                    alt={`Screenshot ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="95vw"
                                />
                            </motion.div>

                            <button
                                type="button"
                                onClick={() => setLightboxOpen(false)}
                                aria-label="Close screenshot viewer"
                                className="absolute top-5 right-5 text-white/60 hover:text-white p-2 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X size={22} />
                            </button>

                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); go(-1); }}
                                        aria-label="Previous screenshot"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2.5 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); go(1); }}
                                        aria-label="Next screenshot"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2.5 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDirection(i > index ? 1 : -1);
                                                    setIndex(i);
                                                }}
                                                aria-label={`Show screenshot ${i + 1}`}
                                                aria-current={i === index ? "true" : undefined}
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    i === index ? "bg-white" : "bg-white/40"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
}
