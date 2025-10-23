"use client";

import { cn } from "@/lib/utils";
import * as Icons from "@heroicons/react/24/solid";
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
  color = "text-white",
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
        "flex items-center gap-1.5 py-2 px-4 rounded-md bg-black hover:opacity-90",
        className
      )}
    >
      {label && <span className={cn(color, "font-medium")}>{label}</span>}
      <IconComponent style={{ width: size, height: size }} className={color} />
    </button>
  );
}
