import { usePageHeaderContext } from "@/providers/page-header-provider";
import React from "react";
import Button from "../ui/button";

export const ReadmeRightSideComponent = React.memo(() => {
  const { config } = usePageHeaderContext();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    const success = config.readme?.onCopyMarkdown?.();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [config.readme?.onCopyMarkdown]);

  return (
    <div className="flex items-center">
      <Button
        icon="ArrowDownIcon"
        className="px-1.5 py-1 rounded-s-lg rounded-e-none text-xs"
        color="text-black"
        size={15}
        label="Download"
        onClick={config.readme?.onDownloadMarkdown}
      />
      <Button
        icon={copied ? "CheckIcon" : "ClipboardIcon"}
        className="p-1 rounded-e-lg rounded-s-none text-xs"
        color="text-black"
        size={15}
        onClick={handleCopy}
      />
    </div>
  );
});
ReadmeRightSideComponent.displayName = "ReadmeRightSideComponent";
