export interface Project {
    id: string;
    title: string;
    description: string;
    detailedDescription: string;
    tech: string[];
    link: { url: string; label: string };
    images: string[];
    thumbnail: string;
}

export const PROJECTS: Project[] = [
    {
        id: "housr",
        title: "Housr",
        description:
            "Centralized Student Housing. Simplified off-campus housing discovery for students at UBC.",
        detailedDescription:
            "Housr is a full-stack platform designed to simplify off-campus housing search for UBC students. Landlords can list properties with detailed information and photos, while students can browse, filter, and save listings that match their preferences. Built with Next.js and Django, the app features server-side rendering for fast page loads and a PostgreSQL database for reliable data persistence.",
        tech: ["Next.js", "Django", "Postgres", "Tailwind"],
        link: { url: "https://housr.ca", label: "housr.ca" },
        images: [
            "/projects/housr/housr-landing.png",
            "/projects/housr/housr-listing.png",
            "/projects/housr/housr-post-listing.png",
        ],
        thumbnail: "/projects/housr/housr-landing.png",
    },
    {
        id: "tetr4",
        title: "Tetr4",
        description:
            "Voice-powered executive assistant for managing emails, tasks, and calendar hands-free.",
        detailedDescription:
            "Tetr4 is a voice-activated executive assistant built at Nexhacks. It uses LiveKit for real-time voice interaction and ElevenLabs for natural text-to-speech, letting users manage their emails, calendar, and tasks entirely hands-free. The app connects to Gmail and Google Calendar through Arcade MCP servers, enabling actions like summarizing emails, scheduling meetings, and converting messages into actionable tasks via voice commands.",
        tech: ["LiveKit", "ElevenLabs", "MCP", "Next.js", "FastAPI"],
        link: { url: "https://tetr4.tech", label: "tetr4.tech" },
        images: [
            "/projects/tetr4/console.png",
            "/projects/tetr4/landing.png",
            "/projects/tetr4/calendar.png",
        ],
        thumbnail: "/projects/tetr4/console.png",
    },
    {
        id: "echo",
        title: "Echo",
        description:
            "Create a podcast episode from a quick note.",
        detailedDescription:
            "Echo transforms short text notes into full podcast episodes using AI. It orchestrates multiple language models through LangGraph to generate scripts, then synthesizes natural-sounding audio with ElevenLabs. The app features a Chrome extension for capturing ideas on the go and a web dashboard for managing and listening to generated episodes.",
        tech: ["Next.js", "OpenAI", "Supabase", "LangGraph", "ElevenLabs"],
        link: { url: "https://github.com/cleinad/echo/", label: "GitHub" },
        images: [
            "/projects/echo/extension-view.png",
            "/projects/echo/web-view.png",
        ],
        thumbnail: "/projects/echo/web-view.png",
    },
    {
        id: "point-cloud-viewer",
        title: "Point Cloud Viewer",
        description:
            "A C++ application for visualizing 3D point cloud datasets with interactive viewing capabilities.",
        detailedDescription:
            "Point Cloud Viewer is a native desktop application built in C++ for rendering and exploring large 3D point cloud datasets. It uses OpenGL for hardware-accelerated rendering and GLFW for window management and input handling. The interface is built with ImGui, providing real-time controls for camera manipulation, color mapping, and point size adjustments.",
        tech: ["C++", "OpenGL", "GLFW", "ImGui"],
        link: {
            url: "https://github.com/cleinad/point-cloud-viewer",
            label: "GitHub",
        },
        images: [
            "/projects/point-cloud-viewer/pcv-black.png",
            "/projects/point-cloud-viewer/pcv-white.png",
        ],
        thumbnail: "/projects/point-cloud-viewer/pcv-black.png",
    },
];
