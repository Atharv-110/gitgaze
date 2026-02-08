import type { Metadata } from "next";
import "./globals.css";
import MainProvider from "@/providers/main-provider";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "GitGaze by Atharv Vani",
    template: "%s - GitGaze",
  },
  authors: [
    { name: "Atharv Vani", url: "https://www.gitgaze.dev/u/atharv-110" },
  ],
  description:
    "Showcase your GitHub statistics and activities in a personalized and share-ready dashboard.",
  keywords:
    "gitgaze, github, github stats, open source, contributions, github wrapped",
  icons: {
    icon: "/icons/icon.png",
    apple: "/icons/apple-icon.png",
    shortcut: "/icons/icon.png",
  },
  metadataBase: new URL("https://www.gitgaze.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.gitgaze.dev",
    title: "GitGaze by Atharv Vani",
    description:
      "Showcase your GitHub statistics and activities in a personalized and share-ready dashboard.",
    siteName: "GitGaze",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GitGaze Landing Page Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitGaze by Atharv Vani",
    creator: "@atharv_110",
    description:
      "Showcase your GitHub statistics and activities in a personalized and share-ready dashboard.",
    images: ["/opengraph-image.jpg"],
  },
  other: {
    "og:logo": "/icons/icon.png",
  },
};

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GitGaze by Atharv Vani",
    url: "https://www.gitgaze.dev",
    description:
      "Showcase your GitHub statistics and activities in a personalized and share-ready dashboard.",
  };
  return (
    <html lang="en" className={montserrat.className}>
      <body className="relative z-20 flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
