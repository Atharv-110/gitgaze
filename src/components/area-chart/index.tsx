"use client";
import { GhContributionDay } from "@/types/github/contributions.types";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomAreaTooltip from "./custom-area-tooltip";

function getDynamicYAxisTicks(maxValue: number, desiredTicks = 6): number[] {
  if (maxValue <= 0) return [0, 1];
  const roughStep = maxValue / desiredTicks;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalized = roughStep / magnitude;
  let niceStep: number;
  if (normalized <= 1) niceStep = 1 * magnitude;
  else if (normalized <= 2) niceStep = 2 * magnitude;
  else if (normalized <= 5) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;
  const roundedMax = Math.ceil(maxValue / niceStep) * niceStep;
  const ticks: number[] = [];
  for (let i = 0; i <= roundedMax; i += niceStep) {
    ticks.push(i);
  }
  return ticks;
}

const CustomAreaChart = ({ data }: { data: GhContributionDay[] }) => {
  const ticks = React.useMemo(() => {
    const maxValue =
      data && data.length
        ? data.reduce(
            (max, d) => (d.contributionCount > max ? d.contributionCount : max),
            0
          )
        : 0;
    return getDynamicYAxisTicks(maxValue, 6);
  }, [data]);
  return (
    <AreaChart
      className="w-full max-w-full max-h-full aspect-[1.618]"
      responsive
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
      <XAxis
        tick={{ fontSize: 9 }}
        tickFormatter={(value: string) => new Date(value).getDate().toString()}
        dataKey="date"
        label={{
          value: "Days",
          position: "center",
          dy: 10,
          fontSize: 12,
        }}
      />
      <YAxis
        tick={{ fontSize: 9 }}
        width="auto"
        domain={[0, ticks[ticks.length - 1]]}
        ticks={ticks}
        scale="linear"
        type="number"
        allowDecimals={false}
        label={{
          value: "Contributions",
          angle: -90,
          position: "center",
          dx: -10,
          fontSize: 12,
        }}
      />
      <Tooltip content={<CustomAreaTooltip />} />
      <Area
        type="monotone"
        dataKey="contributionCount"
        stroke="#e17100"
        strokeWidth={2}
        fill="#fe9a00"
        dot={{ fill: "#fe9a00" }}
        activeDot={{ r: 5, fill: "#e17100" }}
      />
    </AreaChart>
  );
};

export default React.memo(CustomAreaChart);
CustomAreaChart.displayName = "CustomAreaChart";
