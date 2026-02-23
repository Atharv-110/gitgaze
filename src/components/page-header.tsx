"use client";
import { Route } from "@/enums/route.enum";
import { cn } from "@/lib/client.helpers";
import { useRouter } from "next/navigation";
import React from "react";
import { ReadmeRightSideComponent } from "./header-components/rightside";
import { AuroraText } from "./ui/aurora-text";
import Button from "./ui/button";

function getRouteBasedConfig(route: string, username?: string) {
  switch (route) {
    case Route.HOME:
      return { name: null, className: "hidden" };
    case Route.USER_PROFILE(username): {
      return {
        name: "GitGaze",
        className: "",
      };
    }
    case Route.USER_README(username): {
      return {
        name: "Readme",
        className: "bg-white/50",
        rightSideComponent: ReadmeRightSideComponent,
      };
    }
    case Route.DISCOVER: {
      return { name: "Discover", className: "bg-white/50 shadow-sm" };
    }
    default:
      return { name: null, className: "hidden" };
  }
}

const PageHeader = ({
  showBackButton = true,
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
  } = React.useMemo(
    () => getRouteBasedConfig(route, username),
    [route, username],
  );
  const RightSideComponentToRender = rightSideComponent;

  const [showBack, setShowBack] = React.useState(false);
  const initialRoute = React.useRef(route);

  React.useEffect(() => {
    if (route !== initialRoute.current) {
      setShowBack(true);
    } else {
      const referrer = document.referrer;
      const isInternal = !!referrer?.startsWith(window.location.origin);
      const state = window.history.state;
      const hasHistory =
        state &&
        typeof state === "object" &&
        "idx" in state &&
        (state as any).idx > 0;
      setShowBack(isInternal || !!hasHistory);
    }
  }, [route]);

  if (overrideWrapperClassName === "hidden") {
    return null;
  }

  return (
    <header
      className={cn(
        "absolute border-b md:border-2 border-slate-200 rounded-xl z-10 max-w-screen-xl w-full md:top-2 left-1/2 -translate-x-1/2 max-h-10 md:max-h-12 h-full bg-white/50 md:bg-white backdrop-blur shadow-sm flex items-center justify-between px-4",
        wrapperClassName,
        overrideWrapperClassName,
      )}
    >
      <div className="flex items-center gap-x-2 md:gap-x-3">
        {showBackButton && showBack && (
          <Button
            icon="ArrowLeftIcon"
            className="bg-transparent border border-slate-400  hover:border-slate-500 group rounded-full p-1.5"
            color="text-slate-400 !size-3 md:!size-4 group-hover:text-slate-500"
            onClick={() => router.back()}
          />
        )}
        {showHomeButton && (
          <Button
            icon="HomeIcon"
            className="bg-transparent border border-slate-400  hover:border-slate-500 group rounded-full p-1.5"
            color="text-slate-400 !size-3 md:!size-4 group-hover:text-slate-500"
            onClick={() => router.push(Route.HOME)}
          />
        )}
        {defaultType ? (
          <h1 className="text-base w-fit md:text-xl font-bold line-clamp-1">
            {username && <span>{username}'s </span>}
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
