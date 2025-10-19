import type { Metadata } from "next";
import "./globals.css";
import MainProvider from "@/providers/main-provider";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "GitGaze",
  description: "",
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
