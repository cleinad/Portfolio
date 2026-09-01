import type { MetadataRoute } from "next";

const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
);

const paths = ["", "/about", "/projects"];

export default function sitemap(): MetadataRoute.Sitemap {
    return paths.flatMap((path) => {
        const englishUrl = new URL(path || "/", siteUrl).toString();
        const chineseUrl = new URL(`/zh${path}`, siteUrl).toString();
        const alternates = { languages: { en: englishUrl, "zh-Hans": chineseUrl } };

        return [
            { url: englishUrl, alternates },
            { url: chineseUrl, alternates },
        ];
    });
}
