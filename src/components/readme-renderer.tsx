"use client";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import useGithubUserReadme from "@/hooks/usGhUserReadme";
import "github-markdown-css/github-markdown-light.css";

const ReadmeRenderer = ({ username }: { username: string }) => {
  const { data: markdown } = useGithubUserReadme(username);

  if (!markdown) return null;

  return (
    <div className="markdown-body p-6 rounded-xl border shadow-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default ReadmeRenderer;
