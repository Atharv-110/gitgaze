"use client";
import React from "react";
import {
  CustomTooltipProps,
  DayWiseContributionProps,
} from "@/types/chart/chart.types";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const CustomTooltip: React.FC<CustomTooltipProps<DayWiseContributionProps>> = ({
  active,
  payload,
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-black/55 backdrop-blur-sm rounded-lg px-3 py-2 text-white border border-black">
      <p className="text-xs font-medium text-slate-100">
        Contributions:&nbsp;
        <span className="font-semibold text-white">{payload[0].value}</span>
      </p>
    </div>
  );
};

const BarChartComponent = ({ data }: { data: DayWiseContributionProps[] }) => {
  return (
    <BarChart
      className="w-full max-w-full max-h-full aspect-[1.618]"
      responsive
      data={data}
      margin={{ bottom: 10 }}
    >
      <Tooltip
        wrapperStyle={{ pointerEvents: "none" }}
        content={<CustomTooltip />}
        cursor={false}
      />
      <XAxis
        dataKey="name"
        tick={{ fontSize: 11, fontWeight: 500 }}
        interval={0}
        axisLine={false}
        tickLine={false}
        tickFormatter={(value: string) => value.slice(0, 3)}
      />
      <YAxis hide domain={[0, (dataMax: number) => dataMax + 50]} />
      <Bar
        dataKey="contributionCount"
        fill="#4CB944"
        radius={4}
        activeBar={{ enableBackground: 0 }}
        label={{ position: "top", fontSize: 9, fill: "#000000" }}
      />
    </BarChart>
  );
};

export default React.memo(BarChartComponent);
BarChartComponent.displayName = "BarChartComponent";
