import type { Metadata } from "next";
import "./globals.css";
import MainProvider from "@/providers/main-provider";

export const metadata: Metadata = {
  title: "GitGaze",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
