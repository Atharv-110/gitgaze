import React from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { ChartData } from "recharts/types/state/chartDataSlice";

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  label?: string;
  payload?: {
    value: number;
    name: string;
    color: string;
    payload: ChartData;
  }[];
}

const CustomAreaTooltip: React.FC<CustomTooltipProps> = ({
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
      <h3 className="font-semibold text-sm">Contributions: {value}</h3>
    </div>
  );
};

export default React.memo(CustomAreaTooltip);
CustomAreaTooltip.displayName = "CustomAreaTooltip";
