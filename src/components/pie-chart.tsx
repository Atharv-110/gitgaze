import { SVGProps } from "react";
import { getTextWidth } from "@/lib/utils";
import { Language } from "@/types/github/github.types";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";
import LanguageIcon, { LanguageKey } from "./ui/language-icon";
import hexToRgba from "hex-to-rgba";

const CustomLabelLine = (props: SVGProps<SVGPathElement>) => {
  const { points } = props as any;
  if (!points) return null;

  const [start, mid, end] = points;

  // Extend the final line segment outward 🚀
  const extra = 15;
  const dx = end.x - mid.x;
  const dy = end.y - mid.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const factor = (len + extra) / len;

  const newEnd = {
    x: mid.x + dx * factor,
    y: mid.y + dy * factor,
  };

  return (
    <path
      d={`M${start.x},${start.y} L${mid.x},${mid.y} L${newEnd.x},${newEnd.y}`}
      stroke="#444"
      strokeWidth={2}
      fill="none"
    />
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
  name,
  fill,
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const radius = Number(outerRadius) * 1.25;
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
};

export default function PieChartWithPaddingAngle({
  isAnimationActive = true,
  data,
}: {
  isAnimationActive?: boolean;
  data: Language[];
}) {
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
        data={data.map((item) => ({
          name: item.name,
          value: item.totalSize,
          fill: item.color,
        }))}
        innerRadius="45%"
        outerRadius="70%"
        paddingAngle={5}
        cornerRadius="10%"
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
        isAnimationActive={isAnimationActive}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={hexToRgba(entry.color, 0.5)}
            stroke={entry.color}
            strokeWidth={2}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
