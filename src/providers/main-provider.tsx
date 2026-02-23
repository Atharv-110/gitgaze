"use client";

import Background from "@/components/background";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { Route } from "@/enums/route.enum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { PageHeaderProvider } from "./page-header-provider";

const queryClient = new QueryClient();

export default function MainProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isDynamicUserPage = pathname.startsWith("/u/");

  const username = isDynamicUserPage ? pathname.split("/")[2] : undefined;

  return (
    <PageHeaderProvider>
      <QueryClientProvider client={queryClient}>
        <Background />
        <PageHeader
          showHomeButton={false}
          route={pathname}
          username={username}
        />
        <main
          className={`${pathname === Route.HOME ? "pt-0" : "pt-14"} flex-1 w-full flex justify-start px-4 xl:px-16 overflow-y-auto [&::-webkit-scrollbar]:hidden`}
        >
          {children}
        </main>
        <Footer />
      </QueryClientProvider>
    </PageHeaderProvider>
  );
}
