import About from "@/components/sections/About";
import PortfolioShell from "@/components/PortfolioShell";
import { getContent, getShellContent } from "@/data/content";

export default function ChineseHomePage() {
    const content = getContent("zh-Hans");
    return <PortfolioShell section="about" route="home" content={getShellContent(content)}><About content={content.about} /></PortfolioShell>;
}
