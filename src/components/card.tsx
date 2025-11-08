import React from "react";
import { cn } from "@/lib/utils";
import * as Icon from "@heroicons/react/24/outline";
import Chip from "./ui/chip";

interface CardProps {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  cardTitle?: string;
  iconName?: keyof typeof Icon;
}

const Card = ({ children, className, cardTitle, iconName }: CardProps) => {
  const IconComponent = Icon[iconName as keyof typeof Icon];
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col justify-between items-stretch isolate p-5 bg-white border border-slate-200 shadow-md rounded-xl",
        className,
        cardTitle ? "space-y-2" : ""
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
      {children}
    </div>
  );
};

export default Card;
