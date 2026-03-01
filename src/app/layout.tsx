import type { Metadata } from "next";
import "./globals.css";
import MainProvider from "@/providers/main-provider";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { constructMetadata } from "@/utils/metadata";

export const metadata: Metadata = constructMetadata();

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

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
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans z-20 flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden bg-white relative">
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
