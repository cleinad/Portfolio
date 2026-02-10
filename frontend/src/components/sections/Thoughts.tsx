"use client";

interface ThoughtsProps {
    textSecondary: string;
}

export default function Thoughts({ textSecondary }: ThoughtsProps) {
    return (
        <div className="space-y-8 max-w-2xl">
            <h2 className="text-xl font-medium mb-4 opacity-80">Musings</h2>
            <div className={`${textSecondary} leading-relaxed font-serif italic space-y-8`}>
                <div className="space-y-4">
                    <p className="text-sm not-italic opacity-50 mb-2">Isaiah 29:13</p>
                    <div className="pl-4 border-l border-current/10 space-y-3">
                        <p>“Because this people draw near with their mouth</p>
                        <p className="pl-4">and honor me with their lips,</p>
                        <p className="pl-6">while their hearts are far from me,</p>
                        <p>and their fear of me is a commandment taught by men,”</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm not-italic opacity-50 mb-2">Matthew 5:14-16</p>
                    <div className="pl-4 border-l border-current/10 space-y-3">
                        <p>“You are the light of the world. A city set on a hill cannot be hidden. Nor do people light a lamp and put it under a basket, but on a stand, and it gives light to all in the house. In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven.”</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
