import { cn } from "@/lib/client.helpers";
import React from "react";

const Chip = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 w-fit px-2.5 py-0.5 text-xs rounded-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
