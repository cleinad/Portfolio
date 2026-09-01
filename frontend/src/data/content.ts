export type Locale = "en" | "zh-Hans";

export type Section = "about" | "projects";

export interface Project {
    id: string;
    title: string;
    description: string;
    detailedDescription: string;
    tech: readonly string[];
    link: { url: string; label: string };
    images: readonly string[];
    thumbnail: string;
}

interface AboutContent {
    experience: string;
    education: string;
    interests: string;
    roles: Array<{ organization: string; logo: string; alt: string; title: string; date?: string; openSource?: string }>;
    educationItems: Array<{ organization: string; logo: string; alt: string; title: string }>;
    interestsItems: string[];
}

export interface SiteContent {
    locale: Locale;
    nav: Record<Section, string>;
    navigationLabel: string;
    language: { english: string; chinese: string; label: string };
    theme: { label: string; celestial: string; blizzard: string; sky: string };
    social: { github: string; resume: string; x: string; email: string; resumeHref: string };
    projectUi: { openDetails: string; closeDetails: string; openScreenshot: string; previousScreenshot: string; nextScreenshot: string; showScreenshot: string; screenshotViewer: string; closeScreenshotViewer: string; visit: string };
    about: AboutContent;
    projects: Project[];
    metadata: Record<Section, { title: string; description: string }>;
}

const sharedProjects = [
    {
        id: "housr",
        title: "Housr",
        tech: ["Next.js", "Django", "Postgres", "Tailwind"],
        link: { url: "https://housr.ca", label: "housr.ca" },
        images: ["/projects/housr/housr-landing.png", "/projects/housr/housr-listing.png", "/projects/housr/housr-post-listing.png"],
        thumbnail: "/projects/housr/housr-landing.png",
    },
    {
        id: "tetr4",
        title: "Tetr4",
        tech: ["LiveKit", "ElevenLabs", "MCP", "Next.js", "FastAPI"],
        link: { url: "https://tetr4.tech", label: "tetr4.tech" },
        images: ["/projects/tetr4/console.png", "/projects/tetr4/landing.png", "/projects/tetr4/calendar.png"],
        thumbnail: "/projects/tetr4/console.png",
    },
    {
        id: "echo",
        title: "Echo",
        tech: ["Next.js", "OpenAI", "Supabase", "LangGraph", "ElevenLabs"],
        link: { url: "https://github.com/cleinad/echo/", label: "GitHub" },
        images: ["/projects/echo/extension-view.png", "/projects/echo/web-view.png"],
        thumbnail: "/projects/echo/web-view.png",
    },
    {
        id: "point-cloud-viewer",
        title: "Point Cloud Viewer",
        tech: ["C++", "OpenGL", "GLFW", "ImGui"],
        link: { url: "https://github.com/cleinad/point-cloud-viewer", label: "GitHub" },
        images: ["/projects/point-cloud-viewer/pcv-black.png", "/projects/point-cloud-viewer/pcv-white.png"],
        thumbnail: "/projects/point-cloud-viewer/pcv-black.png",
    },
] as const;

export const CONTENT: Record<Locale, SiteContent> = {
    en: {
        locale: "en",
        nav: { about: "About", projects: "Projects" },
        navigationLabel: "Portfolio sections",
        language: { english: "EN", chinese: "中文", label: "Language" },
        theme: { label: "Background theme", celestial: "Celestial", blizzard: "Blizzard", sky: "Sky" },
        social: { github: "GitHub", resume: "Resume", x: "X", email: "Email", resumeHref: "/resume-en/Daniel Chen Resume.pdf" },
        projectUi: { openDetails: "Open details for", closeDetails: "Close project details", openScreenshot: "Open screenshot", previousScreenshot: "Previous screenshot", nextScreenshot: "Next screenshot", showScreenshot: "Show screenshot", screenshotViewer: "Screenshot viewer", closeScreenshotViewer: "Close screenshot viewer", visit: "Visit" },
        about: {
            experience: "Experience",
            education: "Education",
            interests: "Interests",
            roles: [
                { organization: "Nicola Wealth", logo: "/nicolawealthmanagement_logo.jpeg", alt: "Nicola Wealth logo", title: "Software Developer @ Nicola Wealth", date: "Jan 2026 – Aug 2026" },
                { organization: "Opt Out Rights", logo: "/optoutrights.png", alt: "OptOutRights.org logo", title: "Software Engineer Intern @ Opt Out Rights", date: "May 2026 – Jul 2026", openSource: "Open source" },
                { organization: "Nicola Wealth", logo: "/nicolawealthmanagement_logo.jpeg", alt: "Nicola Wealth logo", title: "Business Management Project Assistant @ Nicola Wealth", date: "Jan 2025 – Jan 2026" },
                { organization: "Boardwalk REIT", logo: "/boardwalk.jpeg", alt: "Boardwalk REIT logo", title: "Procurement Coordinator @ Boardwalk REIT", date: "May 2023 – Sept 2023" },
            ],
            educationItems: [
                { organization: "Peking University", logo: "/peking-university-emblem.webp", alt: "Peking University logo", title: "Guanghua School of Management @ Peking University" },
                { organization: "UBC", logo: "/ubc.png", alt: "UBC logo", title: "CS and Business @ UBC" },
            ],
            interestsItems: ["Mixed Martial Arts", "Ambient Music", "Reading", "Building"],
        },
        projects: [
            { ...sharedProjects[0], description: "Centralized Student Housing. Simplified off-campus housing discovery for students at UBC.", detailedDescription: "Housr is a full-stack platform designed to simplify off-campus housing search for UBC students. Landlords can list properties with detailed information and photos, while students can browse, filter, and save listings that match their preferences. Built with Next.js and Django, the app features server-side rendering for fast page loads and a PostgreSQL database for reliable data persistence." },
            { ...sharedProjects[1], description: "Voice-powered executive assistant for managing emails, tasks, and calendar hands-free.", detailedDescription: "Tetr4 is a voice-activated executive assistant built at Nexhacks. It uses LiveKit for real-time voice interaction and ElevenLabs for natural text-to-speech, letting users manage their emails, calendar, and tasks entirely hands-free. The app connects to Gmail and Google Calendar through Arcade MCP servers, enabling actions like summarizing emails, scheduling meetings, and converting messages into actionable tasks via voice commands." },
            { ...sharedProjects[2], description: "Create a podcast episode from a quick note.", detailedDescription: "Echo transforms short text notes into full podcast episodes using AI. It orchestrates multiple language models through LangGraph to generate scripts, then synthesizes natural-sounding audio with ElevenLabs. The app features a Chrome extension for capturing ideas on the go and a web dashboard for managing and listening to generated episodes." },
            { ...sharedProjects[3], description: "A C++ application for visualizing 3D point cloud datasets with interactive viewing capabilities.", detailedDescription: "Point Cloud Viewer is a native desktop application built in C++ for rendering and exploring large 3D point cloud datasets. It uses OpenGL for hardware-accelerated rendering and GLFW for window management and input handling. The interface is built with ImGui, providing real-time controls for camera manipulation, color mapping, and point size adjustments." },
        ],
        metadata: {
            about: { title: "Daniel Chen", description: "Daniel Chen's portfolio." },
            projects: { title: "Projects | Daniel Chen", description: "Selected software projects by Daniel Chen." },
        },
    },
    "zh-Hans": {
        locale: "zh-Hans",
        nav: { about: "关于", projects: "项目" },
        navigationLabel: "作品集导航",
        language: { english: "EN", chinese: "中文", label: "语言" },
        theme: { label: "背景主题", celestial: "星夜", blizzard: "雪境", sky: "晴空" },
        social: { github: "GitHub", resume: "简历", x: "X", email: "电子邮件", resumeHref: "/resume-cn/Daniel Chen Resume (Chinese).pdf" },
        projectUi: { openDetails: "查看项目详情：", closeDetails: "关闭项目详情", openScreenshot: "全屏查看截图", previousScreenshot: "上一张截图", nextScreenshot: "下一张截图", showScreenshot: "查看截图", screenshotViewer: "截图查看器", closeScreenshotViewer: "关闭截图查看器", visit: "访问" },
        about: {
            experience: "工作经历",
            education: "教育经历",
            interests: "兴趣",
            roles: [
                { organization: "Nicola Wealth", logo: "/nicolawealthmanagement_logo.jpeg", alt: "Nicola Wealth 标志", title: "Nicola Wealth 软件开发工程师", date: "2026 年 1 月 – 2026 年 8 月" },
                { organization: "Opt Out Rights", logo: "/optoutrights.png", alt: "OptOutRights.org 标志", title: "Opt Out Rights 软件工程实习生", date: "2026 年 5 月 – 2026 年 7 月", openSource: "开源项目" },
                { organization: "Nicola Wealth", logo: "/nicolawealthmanagement_logo.jpeg", alt: "Nicola Wealth 标志", title: "Nicola Wealth 业务管理项目助理", date: "2025 年 1 月 – 2026 年 1 月" },
                { organization: "Boardwalk REIT", logo: "/boardwalk.jpeg", alt: "Boardwalk REIT 标志", title: "Boardwalk REIT 采购协调员", date: "2023 年 5 月 – 2023 年 9 月" },
            ],
            educationItems: [
                { organization: "北京大学", logo: "/peking-university-emblem.webp", alt: "北京大学校徽", title: "北京大学光华管理学院" },
                { organization: "UBC", logo: "/ubc.png", alt: "英属哥伦比亚大学校徽", title: "英属哥伦比亚大学计算机科学与商科" },
            ],
            interestsItems: ["综合格斗", "氛围音乐", "阅读", "创造"],
        },
        projects: [
            { ...sharedProjects[0], description: "面向 UBC 学生的一站式校外租房平台，让找房更简单。", detailedDescription: "Housr 是一个为 UBC 学生打造的全栈校外租房平台，旨在简化找房流程。房东可发布附有详细信息和照片的房源；学生则可浏览、筛选并收藏符合需求的房源。项目采用 Next.js 与 Django 构建，通过服务端渲染实现快速加载，并以 PostgreSQL 提供可靠的数据持久化支持。" },
            { ...sharedProjects[1], description: "通过语音免手操作，轻松管理邮件、任务与日程的智能助理。", detailedDescription: "Tetr4 是在 Nexhacks 开发的语音交互式智能助理。它结合 LiveKit 的实时语音能力与 ElevenLabs 的自然语音合成，使用户能够全程免手操作地管理邮件、日程和任务。项目通过 Arcade MCP 服务器连接 Gmail 与 Google Calendar，可借助语音完成邮件摘要、会议安排，以及将消息转化为待办事项等操作。" },
            { ...sharedProjects[2], description: "将一个简短想法转化为完整的播客节目。", detailedDescription: "Echo 利用 AI 将简短的文字笔记转化为完整的播客节目。它通过 LangGraph 编排多个语言模型生成脚本，再借助 ElevenLabs 合成自然流畅的音频。项目还提供 Chrome 扩展程序，方便随时记录灵感，并配有网页仪表盘用于管理和收听节目。" },
            { ...sharedProjects[3], description: "一款用于交互式浏览和可视化三维点云数据集的 C++ 应用。", detailedDescription: "Point Cloud Viewer 是一款原生 C++ 桌面应用，用于渲染和探索大型三维点云数据集。它采用 OpenGL 进行硬件加速渲染，并结合 GLFW 处理窗口与输入；界面由 ImGui 构建，提供相机操控、颜色映射和点大小调整等实时控制功能。" },
        ],
        metadata: {
            about: { title: "陈思远", description: "陈思远的个人作品集。" },
            projects: { title: "项目 | 陈思远", description: "陈思远的精选软件项目。" },
        },
    },
};

export function getContent(locale: Locale) {
    return CONTENT[locale];
}

export function getShellContent(content: SiteContent) {
    const { locale, nav, navigationLabel, language, theme, social } = content;
    return { locale, nav, navigationLabel, language, theme, social };
}
