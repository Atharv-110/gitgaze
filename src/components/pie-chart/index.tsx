"use client";
import React, { useCallback, useMemo } from "react";
import { getTextWidth } from "@/lib/utils";
import { Language } from "@/types/github/github.types";
import hexToRgba from "hex-to-rgba";
import { Cell, Pie, PieChart, PieLabelRenderProps, Tooltip } from "recharts";
import LanguageIcon, { LanguageKey } from "../ui/language-icon";
import CustomPieTooltip from "./custom-tooltip";

const CustomPieChart = ({
  isAnimationActive = true,
  data,
}: {
  isAnimationActive?: boolean;
  data: Language[];
}) => {
  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.totalSize, 0),
    [data]
  );

  const processedData = useMemo(
    () =>
      data.map((item) => ({
        name: item.name,
        value: item.totalSize,
        fill: item.color,
      })),
    [data]
  );

  const renderCustomizedLabel = useCallback(
    ({
      cx,
      cy,
      midAngle,
      outerRadius,
      name,
      fill,
      percent,
    }: PieLabelRenderProps) => {
      if (typeof percent === "number" && percent < 0.031) return null;

      const RADIAN = Math.PI / 180;
      const radius = Number(outerRadius) * 1.2;
      const x = Number(cx) + radius * Math.cos(-midAngle! * RADIAN);
      const y = Number(cy) + radius * Math.sin(-midAngle! * RADIAN);

      const isRight = x > Number(cx);
      const isTop = y < Number(cy);
      const { height: fontHeight, width: fontWidth } = getTextWidth(name!, 12);
      const adjustedFontWidth = fontWidth + 28;
      const adjustedFontHeight = fontHeight + 14;

      return (
        <foreignObject
          x={x - (isRight ? 0 : adjustedFontWidth)}
          y={y - (adjustedFontHeight / 2 + (isTop ? 8 : 0))}
          overflow="visible"
          width={adjustedFontWidth}
          height={adjustedFontHeight}
        >
          <div
            className="w-fit h-fit flex items-center justify-center gap-1 leading-none px-1 py-0.5 bg-white rounded-md border-2 shadow-sm"
            style={{ borderColor: fill }}
          >
            <LanguageIcon
              name={name as LanguageKey}
              className="size-3 md:size-[14px]"
            />
            <span className="text-[10px] leading-normal md:text-xs">
              {name}
            </span>
          </div>
        </foreignObject>
      );
    },
    []
  );

  return (
    <PieChart className="w-full max-w-full max-h-full aspect-square" responsive>
      <Pie
        data={processedData}
        innerRadius="45%"
        outerRadius="70%"
        paddingAngle={5}
        cornerRadius="10%"
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
        isAnimationActive={isAnimationActive}
      >
        {processedData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={hexToRgba(entry.fill, 0.5)}
            stroke={entry.fill}
            strokeWidth={2}
          />
        ))}
      </Pie>
      <Tooltip
        isAnimationActive={false}
        content={<CustomPieTooltip total={total} />}
        wrapperStyle={{ outline: "none" }}
      />
    </PieChart>
  );
};

export default React.memo(CustomPieChart);
CustomPieChart.displayName = "CustomPieChart";
