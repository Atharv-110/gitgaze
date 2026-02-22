"use client";
import { cn } from "@/lib/client.helpers";
import React, { useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Loader from "./ui/loader";

import { usePageHeaderContext } from "@/providers/page-header-provider";
import "github-markdown-css/github-markdown-light.css";

const ReadmeRenderer = ({
  username,
  readme,
}: {
  username: string;
  readme: string;
}) => {
  const { setConfig } = usePageHeaderContext();

  const handleDownload = useCallback(() => {
    if (!readme) return;

    const blob = new Blob([readme], { type: "text/markdown;charset=utf-8" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${username}.README.md`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [readme, username]);

  const handleCopy = useCallback(() => {
    if (!readme) return false;
    navigator.clipboard.writeText(readme);
    return true;
  }, [readme]);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      readme: {
        onDownloadMarkdown: handleDownload,
        onCopyMarkdown: handleCopy,
      },
    }));
  }, [handleDownload, handleCopy, setConfig]);

  return (
    <div className="max-w-[980px] w-full space-y-5">
      <div
        className={cn(
          "markdown-body p-3 md:p-6 rounded-xl border-2 border-slate-200 shadow-sm",
          !readme && "h-full flex items-center justify-center",
        )}
      >
        {!readme ? (
          <p className="text-sm tracking-wide font-normal !text-slate-600">
            Failed to load or parse {username}&apos;s README.MD file
          </p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
          >
            {readme}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default React.memo(ReadmeRenderer);
