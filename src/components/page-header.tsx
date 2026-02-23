"use client";
import { Route } from "@/enums/route.enum";
import { cn } from "@/lib/client.helpers";
import { usePageHeaderContext } from "@/providers/page-header-provider";
import { useRouter } from "next/navigation";
import React from "react";
import { AuroraText } from "./ui/aurora-text";
import Button from "./ui/button";

function getRouteBasedConfig(route: string, username?: string) {
  console.log("getRouteBasedConfig: ", route);

  switch (route) {
    case Route.HOME:
      return { name: null, className: "hidden" };
    case Route.USER_PROFILE(username): {
      return {
        name: "GitGaze",
        className: "backdrop-blur-0",
      };
    }
    case Route.USER_README(username): {
      return {
        name: "Readme",
        className: "bg-white/50",
        rightSideComponent: React.memo(() => {
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
        }),
      };
    }
    case Route.DISCOVER: {
      return { name: "Discover", className: "bg-white/50 shadow-sm" };
    }
    default:
      return { name: null, className: "" };
  }
}

const PageHeader = ({
  showHomeButton = true,
  RightSideComponent,
  defaultType = true,
  children,
  wrapperClassName,
  route = Route.HOME,
  username,
}: {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  RightSideComponent?: React.ReactNode;
  defaultType?: boolean;
  children?: React.ReactNode;
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  route?: string;
  username?: string;
}) => {
  const router = useRouter();
  const {
    name: routeName,
    className: overrideWrapperClassName,
    rightSideComponent,
  } = getRouteBasedConfig(route, username);
  const RightSideComponentToRender = rightSideComponent;

  const [showBack, setShowBack] = React.useState(false);

  React.useEffect(() => {
    const referrer = document.referrer;

    const isInternal =
      referrer && referrer.startsWith(window.location.origin) ? true : false;

    setShowBack(isInternal);
  }, []);

  return (
    <header
      className={cn(
        "absolute border-b md:border-2 border-slate-200 rounded-xl z-10 max-w-screen-xl w-full md:top-2 left-1/2 -translate-x-1/2 max-h-12 h-full bg-white backdrop-blur shadow-sm flex items-center justify-between px-4",
        wrapperClassName,
        overrideWrapperClassName,
      )}
    >
      <div className="flex items-center gap-x-2 md:gap-x-3">
        {showBack && (
          <Button
            icon="ArrowLeftIcon"
            className="bg-transparent border border-slate-400  hover:border-slate-500 group rounded-full p-1.5"
            color="text-slate-400 !size-4 group-hover:text-slate-500"
            onClick={() => router.back()}
          />
        )}
        {showHomeButton && (
          <Button
            icon="HomeIcon"
            className="bg-transparent border border-slate-400  hover:border-slate-500 group rounded-full p-1.5"
            color="text-slate-400 !size-4 group-hover:text-slate-500"
            onClick={() => router.push(Route.HOME)}
          />
        )}
        {defaultType ? (
          <h1 className="text-lg md:text-xl font-bold line-clamp-1">
            {username && <span>{username}'s&nbsp;</span>}
            <AuroraText>{routeName}</AuroraText>
          </h1>
        ) : (
          children
        )}
      </div>

      <div>
        {typeof RightSideComponentToRender !== "undefined" && (
          <RightSideComponentToRender />
        )}
      </div>
    </header>
  );
};

export default PageHeader;
