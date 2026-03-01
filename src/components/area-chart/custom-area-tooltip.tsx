"use client";
import { CustomTooltipProps } from "@/types/chart/chart.types";
import { GhContributionDay } from "@/types/github/contributions.types";
import { GitGazeUser } from "@/types/github/user.types";
import React from "react";

export interface ExtendedTooltipProps extends CustomTooltipProps<
  GhContributionDay[] | GitGazeUser[]
> {
  valuePrefix?: string;
  type?: "date" | "text";
}

const CustomAreaTooltip: React.FC<ExtendedTooltipProps> = ({
  active,
  payload,
  label,
  valuePrefix,
  type = "text",
}) => {
  if (!active || !payload?.length) return null;

  const { value } = payload[0];

  const formattedLabel = React.useMemo(() => {
    if (!label) return null;
    if (type === "date") {
      const date = new Date(label as string);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        });
      }
    }
    return label;
  }, [label, type]);

  return (
    <div className="bg-black/55 backdrop-blur-sm rounded-lg px-3 py-2 text-white border border-black max-w-xs">
      {formattedLabel && (
        <p className="md:text-xs text-[10px] font-medium text-slate-100 mb-1">
          {typeof formattedLabel === "string"
            ? formattedLabel
            : String(formattedLabel)}
        </p>
      )}
      <p className="font-semibold md:text-sm text-xs">
        {valuePrefix}&nbsp;:&nbsp;{value}
      </p>
    </div>
  );
};

export default React.memo(CustomAreaTooltip);
CustomAreaTooltip.displayName = "CustomAreaTooltip";
