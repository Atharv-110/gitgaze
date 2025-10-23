"use client";

import Background from "@/components/background";
import Header from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function MainProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDynamicUserPage = /^\/u\/[^/]+$/.test(pathname);
  const username = isDynamicUserPage ? pathname.split("/")[2] : null;

  return (
    <QueryClientProvider client={queryClient}>
      <Background />
      {username && <Header username={username} />}
      <main className="flex-1 w-full flex items-center">{children}</main>
      <footer>Footer</footer>
    </QueryClientProvider>
  );
}
