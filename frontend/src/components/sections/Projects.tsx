"use client";

interface ProjectsProps {
    textSecondary: string;
}

export default function Projects({ textSecondary }: ProjectsProps) {
    return (
        <div className="space-y-12">
            <div className="space-y-8">
                <a href="https://housr.ca" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="border-l-2 pl-6 border-current/10 space-y-2 transition-all group-hover:border-current/30">
                        <h3 className="text-xl font-semibold group-hover:underline decoration-1 underline-offset-4">
                            Housr
                        </h3>
                        <p className={`mt-2 ${textSecondary}`}>
                            Centralized Student Housing. Simplified off-campus housing discovery for students at UBC.
                        </p>
                        <div className={`mt-4 text-xs ${textSecondary} flex gap-2 font-mono uppercase tracking-wide opacity-70`}>
                            <span>Next.js</span>
                            <span>Django</span>
                            <span>Postgres</span>
                            <span>Tailwind</span>
                        </div>
                    </div>
                </a>
                <a href="https://github.com/cleinad/echo" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="border-l-2 pl-6 border-current/10 space-y-2 transition-all group-hover:border-current/30">
                        <h3 className="text-xl font-semibold group-hover:underline decoration-1 underline-offset-4">
                            Echo
                        </h3>
                        <p className={`mt-2 ${textSecondary}`}>
                            Create a podcast episode from a quick note.
                        </p>
                        <div className={`mt-4 text-xs ${textSecondary} flex gap-2 font-mono uppercase tracking-wide opacity-70`}>
                            <span>Next.js</span>
                            <span>OpenAI</span>
                            <span>Supabase</span>
                            <span>LangGraph</span>
                            <span>ElevenLabs</span>
                        </div>
                    </div>
                </a>
                <a href="https://github.com/cleinad/point-cloud-viewer" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="border-l-2 pl-6 border-current/10 space-y-2 transition-all group-hover:border-current/30">
                        <h3 className="text-xl font-semibold group-hover:underline decoration-1 underline-offset-4">
                            Point Cloud Viewer
                        </h3>
                        <p className={`mt-2 ${textSecondary}`}>
                            A C++ application for visualizing 3D point cloud datasets with interactive viewing capabilities.
                        </p>
                        <div className={`mt-4 text-xs ${textSecondary} flex gap-2 font-mono uppercase tracking-wide opacity-70`}>
                            <span>Next.js</span>
                            <span>Django</span>
                            <span>Postgres</span>
                            <span>Tailwind</span>
                        </div>
                    </div>
                </a>
            </div>
            {/* Example placeholder for more projects */}
            <div className="border-l-2 pl-6 border-dashed border-current/10 opacity-50">
                <p className="text-sm">More projects coming soon...</p>
            </div>
        </div>
    );
}
