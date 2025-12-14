import { cn } from "@/lib/utils";
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
}

const Card = ({
  children,
  className,
  cardTitle,
  iconName,
  isLoading,
}: CardProps) => {
  const IconComponent = Icon[iconName as keyof typeof Icon];
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col justify-between overflow-hidden items-stretch isolate p-3 md:p-5 bg-white border border-slate-200 shadow-md rounded-xl max-sm:max-h-[260px]",
        className,
        cardTitle ? "space-y-2" : "space-y-2"
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
      {!isLoading && children}
    </div>
  );
};

export default Card;
