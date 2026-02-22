"use client";

import { cn } from "@/lib/client.helpers";
import * as Icons from "@heroicons/react/24/outline";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: keyof typeof Icons;
  label?: string;
  size?: number;
  color?: string;
}

export default function Button({
  icon,
  label,
  size = 24,
  color = "text-slate-400",
  className = "",
  ...props
}: IconButtonProps) {
  const IconComponent = Icons[icon];

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found in Heroicons.`);
    return null;
  }

  return (
    <button
      {...props}
      className={cn(
        "flex items-center gap-1 py-2 px-4 rounded-md bg-slate-100 border border-slate-200 hover:border-black group disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed transition-opacity",
        className,
      )}
    >
      {label && (
        <span
          className={cn(
            "font-medium leading-none group-hover:text-black",
            color,
          )}
        >
          {label}
        </span>
      )}
      <IconComponent
        style={{ width: size, height: size }}
        className={cn("group-hover:text-black", color)}
      />
    </button>
  );
}
