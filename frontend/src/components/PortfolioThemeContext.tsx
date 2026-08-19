"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Background = "celestial" | "blizzard" | "sky";

interface PortfolioTheme {
    background: Background;
    setBackground: (background: Background) => void;
    textSecondary: string;
}

const PortfolioThemeContext = createContext<PortfolioTheme | null>(null);

export function PortfolioThemeProvider({ children }: { children: React.ReactNode }) {
    const [background, setBackground] = useState<Background>("sky");
    const textSecondary = background === "celestial" ? "text-gray-300" : background === "sky" ? "text-gray-700" : "text-gray-600";

    const value = useMemo(
        () => ({ background, setBackground, textSecondary }),
        [background, textSecondary],
    );

    return <PortfolioThemeContext.Provider value={value}>{children}</PortfolioThemeContext.Provider>;
}

export function usePortfolioTheme() {
    const theme = useContext(PortfolioThemeContext);
    if (!theme) {
        throw new Error("usePortfolioTheme must be used inside PortfolioThemeProvider");
    }
    return theme;
}
