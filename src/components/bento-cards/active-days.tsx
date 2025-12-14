"use client";
import React from "react";
import Card from "../card";
import BarChartComponent from "../bar-chart";
import useGhContributionWindow from "@/hooks/useGhContributionGraph";
import { DayWiseContributionProps } from "@/types/chart/chart.types";
import { GhContributionDay } from "@/types/github/contributions.types";

const prepareWeeklyChartData = (
  data: GhContributionDay[]
): DayWiseContributionProps[] => {
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;

  const totals: Record<string, number> = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  data.forEach((item) => {
    const dayIndex = new Date(item.date).getDay(); // 0 = Sun → 6 = Sat
    const weekday = weekdayNames[dayIndex];
    totals[weekday] += item.contributionCount;
  });

  return weekdayNames.map((day) => ({
    name: day,
    contributionCount: totals[day],
  }));
};

const ActiveDays = ({ username }: { username: string }) => {
  const chartDivRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(250);
  const [data, setData] = React.useState<DayWiseContributionProps[] | null>(
    null
  );
  const { isLoading, data: fetchedData } = useGhContributionWindow(
    username,
    undefined,
    new Date().getFullYear()
  );
  React.useEffect(() => {
    if (fetchedData) {
      const preparedData = prepareWeeklyChartData(fetchedData);
      setData(preparedData);
    }
  }, [fetchedData]);
  React.useLayoutEffect(() => {
    if (!chartDivRef.current && !data) return;
    const parentHeight = chartDivRef.current?.clientHeight;
    if (parentHeight) setHeight(parentHeight);
  }, [data]);
  return (
    <Card
      cardTitle="Day Wise Activity"
      iconName="CalendarDaysIcon"
      isLoading={isLoading}
    >
      <div
        ref={chartDivRef}
        className="flex-1 w-full h-full flex justify-center items-center"
      >
        {height && data && (
          <div className="w-full h-full" style={{ maxHeight: height }}>
            <BarChartComponent data={data} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActiveDays;
