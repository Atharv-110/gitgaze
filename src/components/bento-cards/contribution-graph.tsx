"use client";
import useGhContributionWindow from "@/hooks/useGhContributionGraph";
import { GhContributionDay } from "@/types/github/contributions.types";
import React from "react";
import CustomAreaChart from "../area-chart";
import Card from "../card";

const ContributionGraph = ({ username }: { username: string }) => {
  const chartDivRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | null>(null);
  const [data, setData] = React.useState<GhContributionDay[] | null>(null);
  const [window, setWindow] = React.useState<number>(30);
  const { data: fetchedData } = useGhContributionWindow(username, window);

  React.useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  React.useLayoutEffect(() => {
    if (!chartDivRef.current || !data) return;
    const parentHeight = chartDivRef.current?.clientHeight;
    if (parentHeight) setHeight(parentHeight);
  }, [data]);

  return (
    <Card cardTitle="Contribution Graph" iconName="PresentationChartLineIcon">
      <div
        ref={chartDivRef}
        className="flex-1 w-full h-full flex justify-center items-center"
      >
        {height && data && (
          <div className="w-full h-full" style={{ maxHeight: height }}>
            <CustomAreaChart data={data} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContributionGraph;
