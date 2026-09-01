import About from "@/components/sections/About";
import PortfolioShell from "@/components/PortfolioShell";
import { getContent, getShellContent } from "@/data/content";

export default function HomePage() {
    const content = getContent("en");
    return <PortfolioShell section="about" route="home" content={getShellContent(content)}><About content={content.about} /></PortfolioShell>;
}
