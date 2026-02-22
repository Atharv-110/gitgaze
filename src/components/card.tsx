import { cn } from "@/lib/client.helpers";
import * as Icon from "@heroicons/react/24/outline";
import React from "react";
import Chip from "./ui/chip";
import Loader from "./ui/loader";

interface CardProps {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  cardTitle?: string;
  iconName?: keyof typeof Icon;
  isLoading?: boolean;
  errorMsg?: string;
}

const Card = ({
  children,
  className,
  cardTitle,
  iconName,
  isLoading,
  errorMsg,
}: CardProps) => {
  const IconComponent = Icon[iconName as keyof typeof Icon];
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col justify-between overflow-hidden items-stretch isolate p-3 md:p-4 bg-white backdrop-blur border-2 border-slate-200 shadow-sm rounded-xl max-sm:min-h-[200px]",
        cardTitle ? "space-y-2" : "space-y-2",
        className,
      )}
    >
      {cardTitle && (
        <Chip>
          {iconName && IconComponent && (
            <IconComponent className="size-[14px]" />
          )}
          <p>{cardTitle}</p>
        </Chip>
      )}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Loader size={30} />
        </div>
      )}
      {!isLoading && !errorMsg && children}
      {errorMsg && (
        <div className="text-xs flex-1 flex items-center justify-center">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default Card;
