"use client";
import useGhTopLanguages from "@/hooks/useGhTopLanguages";
import { Language } from "@/types/github/github.types";
import React from "react";
import Card from "../card";
import CustomPieChart from "../pie-chart";

const TopLanguages = ({ username }: { username: string }) => {
  const chartDivRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | null>(null);
  const [data, setData] = React.useState<Language[] | null>(null);
  const { data: fetchedData } = useGhTopLanguages(username);

  React.useEffect(() => {
    if (fetchedData) {
      setData(fetchedData.slice(0, 5));
    }
  }, [fetchedData]);

  React.useLayoutEffect(() => {
    if (!chartDivRef.current || !data) return;
    const parentHeight = chartDivRef.current?.clientHeight;
    if (parentHeight) setHeight(parentHeight);
  }, [data]);

  return (
    <Card cardTitle="Top Languages" iconName="ChartPieIcon">
      <div
        ref={chartDivRef}
        className="flex-1 w-full h-full flex justify-center items-center"
      >
        {height && data && (
          <div className="w-full h-full" style={{ maxHeight: height }}>
            <CustomPieChart data={data} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default TopLanguages;
