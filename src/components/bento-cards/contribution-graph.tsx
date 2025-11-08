"use client";
import { Language } from "@/types/github/github.types";
import React from "react";
import SimpleAreaChart from "../area-chart";
import Card from "../card";

const ContributionGraph = ({ username }: { username: string }) => {
  const chartDivRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | null>(null);
  const [data, setData] = React.useState<Language[] | null>(null);
  //   const { data: fetchedData } = useGhTopLanguages(username);

  //   React.useEffect(() => {
  //     if (fetchedData) {
  //       setData(fetchedData.slice(0, 5));
  //     }
  //   }, [fetchedData]);

  React.useLayoutEffect(() => {
    if (!chartDivRef.current) return;
    const parentHeight = chartDivRef.current?.clientHeight;
    if (parentHeight) setHeight(parentHeight);
  }, []);

  return (
    <Card cardTitle="Top Languages" iconName="ChartPieIcon">
      <div
        ref={chartDivRef}
        className="flex-1 w-full h-full flex justify-center items-center"
      >
        {height && (
          <div className="w-full h-full" style={{ maxHeight: height }}>
            <SimpleAreaChart />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContributionGraph;
