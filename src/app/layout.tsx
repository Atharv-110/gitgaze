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
  icons: {
    icon: "/icons/icon.png",
    apple: "/icons/apple-icon.png",
    shortcut: "/icons/favicon.ico",
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitGaze Landing Page Open Graph Image",
      },
    ],
  },
  description:
    "Showcase your GitHub statistics and activities in a personalized and share-ready dashboard.",
  keywords:
    "gitgaze, github, github stats, open source, contributions, github wrapped",
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
