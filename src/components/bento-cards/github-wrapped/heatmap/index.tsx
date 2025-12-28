import React from "react";
import HeatMap from "@uiw/react-heat-map";
import { Montserrat } from "next/font/google";
import { topMonthContributionProps } from "@/types/github/github.types";

const value = [
  { date: "2025/11/11", count: 2 },
  { date: "2025/11/12", count: 2 },
  { date: "2025/11/01", count: 1 },
  { date: "2025/11/02", count: 5 },
  { date: "2025/11/03", count: 27 },
  { date: "2025/11/04", count: 11 },
  { date: "2025/11/08", count: 32 },
];
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

const HeatMapComponent = ({
  data,
}: {
  data: topMonthContributionProps["monthData"];
}) => {
  const heatMapData = data.map(({ date, contributionCount }) => ({
    date: date.replace(/-/g, "/"),
    count: contributionCount,
  }));
  return (
    <HeatMap
      fontFamily={montserrat.style.fontFamily}
      value={heatMapData}
      width={100}
      height={100}
      alignmentBaseline="central"
      weekLabels={false}
      monthLabels={false}
      legendCellSize={0}
      rectProps={{
        rx: 2.5,
      }}
      space={2.5}
      startDate={new Date(heatMapData[0].date)}
      endDate={new Date(heatMapData[heatMapData.length - 1].date)}
      panelColors={{
        0: "#EFF2F5",
        1: "#BFFFD1",
        15: "#5FED83",
        25: "#08872B",
        30: "#104C35",
      }}
    />
  );
};
export default HeatMapComponent;
