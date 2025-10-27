import type { Metadata } from "next";
import "./globals.css";
import MainProvider from "@/providers/main-provider";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "GitGaze by Atharv Vani",
  description: "",
};

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="relative z-20 flex flex-col h-screen max-h-screen overflow-hidden bg-white">
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
