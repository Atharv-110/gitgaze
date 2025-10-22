"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function MainProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="relative bg-white w-full h-screen overflow-hidden px-3">
        <div className="absolute top-0 -left-16 blur-[110px] size-[200px] lg:size-[400px] rounded-full bg-gradient-to-b from-purple-500/60 to-purple-200 animate-upDown" />
        <div className="absolute bottom-0 -right-16 blur-[110px] size-[200px] lg:size-[400px] rounded-full bg-gradient-to-b from-blue-500/60 to-blue-200 animate-downUp" />
        {children}
      </main>
    </QueryClientProvider>
  );
}
