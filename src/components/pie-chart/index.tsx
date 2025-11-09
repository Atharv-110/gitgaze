import { getTextWidth } from "@/lib/utils";
import { Language } from "@/types/github/github.types";
import hexToRgba from "hex-to-rgba";
import { Cell, Pie, PieChart, PieLabelRenderProps, Tooltip } from "recharts";
import LanguageIcon, { LanguageKey } from "../ui/language-icon";
import CustomPieTooltip from "./custom-tooltip";
import React, { useCallback, useMemo } from "react";

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
      const { height: fontHeight, width: fontWidth } = getTextWidth(name!, 12);
      const adjustedFontWidth = fontWidth + 28;
      const adjustedFontHeight = fontHeight + 14;

      return (
        <foreignObject
          x={x - (isRight ? 0 : adjustedFontWidth)}
          y={y - adjustedFontHeight / 2}
          width={adjustedFontWidth}
          height={adjustedFontHeight}
          overflow={"visible"}
        >
          <div
            className="w-full h-full flex items-center justify-center gap-1 text-xs leading-none p-1 bg-white rounded-md border-2 shadow-sm"
            style={{ borderColor: fill }}
          >
            <LanguageIcon name={name as LanguageKey} size={14} />
            <span>{name}</span>
          </div>
        </foreignObject>
      );
    },
    []
  );

  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: 1,
      }}
      responsive
    >
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
