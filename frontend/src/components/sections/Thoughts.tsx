"use client";

interface ThoughtsProps {
    textSecondary: string;
}

export default function Thoughts({ textSecondary }: ThoughtsProps) {
    return (
        <div className="space-y-12 max-w-2xl">
            <p className={`text-xl tracking-widest uppercase opacity-70 ${textSecondary}`}>
                Musings
            </p>

            {/* Isaiah — poetry with cascading indentation */}
            <div className="space-y-5">
                <div className="relative pl-8">
                    <span
                        className="absolute left-0 -top-6 text-[5rem] leading-none opacity-[0.06] font-serif select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>
                    <div className={`${textSecondary} text-lg md:text-xl leading-[1.9] font-crimson italic`}>
                        <p>Because this people draw near with their mouth</p>
                        <p className="ml-6">and honor me with their lips,</p>
                        <p className="ml-12">while their hearts are far from me,</p>
                        <p>and their fear of me is a commandment taught by men,</p>
                    </div>
                </div>
                <p className={`text-lg tracking-[0.2em] font-semibold uppercase opacity-85 ${textSecondary} pl-8`}>
                    &mdash; Isaiah 29 : 13
                </p>
            </div>

            {/* Separator */}
            <div className="flex items-center justify-center gap-3 opacity-[0.12]" aria-hidden="true">
                <span className="block w-8 h-px bg-current" />
                <span className="block w-1.5 h-1.5 rounded-full bg-current" />
                <span className="block w-8 h-px bg-current" />
            </div>

            {/* Matthew — prose blockquote */}
            <div className="space-y-5">
                <div className="relative pl-8">
                    <span
                        className="absolute left-0 -top-6 text-[5rem] leading-none opacity-[0.06] font-serif select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>
                    <p className={`${textSecondary} text-lg md:text-xl leading-[1.9] font-crimson italic`}>
                        You are the light of the world. A city set on a hill cannot be hidden.
                        Nor do people light a lamp and put it under a basket, but on a stand,
                        and it gives light to all in the house. In the same way, let your light
                        shine before others, so that they may see your good works and give glory
                        to your Father who is in heaven.
                    </p>
                </div>
                <p className={`text-lg tracking-[0.2em] font-semibold uppercase opacity-85 ${textSecondary} pl-8`}>
                    &mdash; Matthew 5 : 14&ndash;16
                </p>
            </div>
        </div>
    );
}
