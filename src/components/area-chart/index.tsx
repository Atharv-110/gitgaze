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
import { formatShortDate } from "@/lib/client.helpers";
import hexToRgba from "hex-to-rgba";

function getDynamicYAxisTicks(maxValue: number, desiredTicks = 5): number[] {
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
            0,
          )
        : 0;
    return getDynamicYAxisTicks(maxValue, 6);
  }, [data]);
  return (
    <AreaChart
      className="w-full max-w-full max-h-full aspect-[1.618]"
      responsive
      data={data}
      margin={{
        top: 8,
        right: 5,
        left: 5,
        bottom: 0,
      }}
    >
      <CartesianGrid vertical={false} opacity={0.4} />
      <XAxis
        tick={{ fontSize: 9 }}
        tickLine={false}
        minTickGap={20}
        axisLine={false}
        height={16}
        stroke="#64748b"
        tickFormatter={(value: string) => formatShortDate(value)}
        dataKey="date"
      />
      <YAxis
        tick={{ fontSize: 9 }}
        tickLine={false}
        width="auto"
        axisLine={false}
        stroke="#64748b"
        domain={[0, ticks[ticks.length - 1]]}
        scale="linear"
        type="number"
        allowDecimals={false}
      />
      <Tooltip content={<CustomAreaTooltip />} />
      <Area
        type="linear"
        dataKey="contributionCount"
        stroke="#e17100"
        strokeWidth={2}
        fill={"#fed7aa"}
        dot={{ r: 0, fill: "#fe9a00" }}
        activeDot={{ r: 4, fill: "#e17100" }}
      />
    </AreaChart>
  );
};

export default React.memo(CustomAreaChart);
CustomAreaChart.displayName = "CustomAreaChart";
