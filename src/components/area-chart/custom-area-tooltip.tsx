"use client";
import React from "react";
import { CustomTooltipProps } from "@/types/chart/chart.types";
import { GhContributionDay } from "@/types/github/contributions.types";

const CustomAreaTooltip: React.FC<CustomTooltipProps<GhContributionDay[]>> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;

  const { value } = payload[0];
  const date = label ? new Date(label) : null;
  return (
    <div className="bg-black/55 backdrop-blur-sm rounded-lg px-3 py-2 text-white border border-black">
      <p className="text-[10px] font-medium text-slate-100">
        {date?.toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
      <p className="font-semibold text-xs">Contributions: {value}</p>
    </div>
  );
};

export default React.memo(CustomAreaTooltip);
CustomAreaTooltip.displayName = "CustomAreaTooltip";
