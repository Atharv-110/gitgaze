"use client";
import React from "react";
import LanguageIcon, { LanguageKey } from "../ui/language-icon";

export interface CustomTooltipPayload {
  name: string;
  value: number;
  fill: string;
}

const CustomPieTooltip = ({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: { payload: CustomTooltipPayload }[];
  total: number;
}) => {
  if (!active || !payload || !payload.length) return null;

  const { name, value, fill } = payload[0].payload;
  const percentage = value / total;
  if (percentage >= 0.031) return null;

  return (
    <div
      className="flex items-center justify-center gap-1 text-xs leading-none p-1 bg-white rounded-md border-2 shadow-sm"
      style={{
        borderColor: fill,
        borderWidth: 2,
      }}
    >
      <LanguageIcon name={name as LanguageKey} />
      <p>{name}</p>
    </div>
  );
};

export default React.memo(CustomPieTooltip);
CustomPieTooltip.displayName = "CustomPieTooltip";
