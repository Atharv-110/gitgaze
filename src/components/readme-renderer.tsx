"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import useGithubUserReadme from "@/hooks/usGhUserReadme";
import Button from "./ui/button";
import { useRouter } from "next/navigation";
import Loader from "./ui/loader";
import { cn } from "@/lib/client.helpers";
import "github-markdown-css/github-markdown-light.css";

const ReadmeRenderer = ({ username }: { username: string }) => {
  const { data: markdown, isLoading, isError } = useGithubUserReadme(username);
  const router = useRouter();

  if (!markdown) return null;

  const handleDownload = () => {
    if (!markdown) return;

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${username}.README.md`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Button
            icon="ArrowLeftIcon"
            className="bg-transparent border border-slate-400  hover:border-slate-500 group rounded-full p-1.5"
            color="text-slate-400 !size-4 md:!size-5 group-hover:text-slate-500"
            onClick={() => router.back()}
            // size={20}
          />
          <h1 className="text-xl md:text-3xl font-semibold">README</h1>
        </div>
        <div>
          <Button
            icon="ArrowDownIcon"
            label="Download"
            disabled={!markdown}
            className="bg-slate-100 rounded-lg border border-slate-200 opacity-100 hover:opacity-100 hover:border-slate-400 group text-sm shadow-sm"
            color="text-black"
            size={18}
            onClick={handleDownload}
          />
        </div>
      </div>
      <div
        className={cn(
          "markdown-body p-3 md:p-6 rounded-xl border shadow-md",
          (isLoading || isError) && "min-h-96 flex items-center justify-center",
        )}
      >
        {isLoading && <Loader size={24} />}
        {isError && (
          <p className="text-sm tracking-wide font-normal !text-slate-600">
            Failed to load/parse README.MD file
          </p>
        )}
        {markdown && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
          >
            {markdown}
          </ReactMarkdown>
        )}
      </div>
    </section>
  );
};

export default React.memo(ReadmeRenderer);
