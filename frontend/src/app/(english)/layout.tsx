import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Zhi_Mang_Xing } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const crimsonPro = Crimson_Pro({ variable: "--font-crimson-pro", subsets: ["latin"], preload: false });
const zhiMangXing = Zhi_Mang_Xing({ variable: "--font-zhi-mang-xing", weight: "400", subsets: ["latin"], preload: false });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const metadata: Metadata = {
    title: "Daniel Chen",
    description: "Daniel Chen's portfolio.",
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    alternates: { canonical: "/", languages: { en: "/", "zh-Hans": "/zh" } },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-GJVBE7GBVF" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-GJVBE7GBVF');
                `}</Script>
            </head>
            <body className={`${crimsonPro.variable} ${zhiMangXing.variable} antialiased`}>{children}</body>
        </html>
    );
}
