"use client";
import useGitgazeUsers from "@/hooks/useGitgazeUsers";
import { GitGazeUser } from "@/types/github/user.types";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomAreaTooltip from "./area-chart/custom-area-tooltip";
import Card from "./card";

interface AvatarDotProps {
  cx?: number;
  cy?: number;
  payload?: GitGazeUser;
  index?: number;
  totalPoints: number;
  duration: number;
  active?: boolean;
}

const AvatarDot = React.memo((props: AvatarDotProps) => {
  const { cx, cy, payload, index = 0, totalPoints, duration, active } = props;

  if (!cx || !cy || !payload || totalPoints <= 1) return null;

  const delay = React.useMemo(
    () => (active ? 0 : (index / (totalPoints - 1)) * duration),
    [active, index, totalPoints, duration],
  );

  return (
    <foreignObject
      onClick={() => {
        console.log(payload);
      }}
      overflow={"visible"}
      x={cx - 25}
      y={cy - 25}
      width={50}
      height={50}
    >
      <Image
        src={payload.avatarUrl}
        alt={payload.login}
        width={50}
        height={50}
        className={`md:size-12 size-10 rounded-full border-2 object-cover ${active ? "border-slate-500" : "border-slate-300 animate-avatar-pop"}`}
        style={{ animationDelay: `${delay}ms`, scale: active ? 1.3 : 1 }}
      />
    </foreignObject>
  );
});
AvatarDot.displayName = "AvatarDot";

const calculateMinDomain = (dataMin: number) => Math.max(0, dataMin - 10);
const calculateMaxDomain = (dataMax: number) => dataMax + 10;
const yAxisDomain: [(dataMin: number) => number, (dataMax: number) => number] =
  [calculateMinDomain, calculateMaxDomain];

const chartMargin = {
  top: 16,
  right: 14,
  left: -14,
  bottom: 0,
};

const LINE_DURATION = 2500;
const customTooltip = (
  <CustomAreaTooltip type="text" valuePrefix="Profile Views" />
);

const LeaderBoardLineChart = () => {
  const [mounted, setMounted] = useState(false);
  const { data, isLoading } = useGitgazeUsers(false, "desc", 5);

  const chartData = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) => page.data ?? [])
        .sort((a, b) => a.views - b.views) ?? []
    );
  }, [data]);
  const totalPoints = chartData.length;

  useEffect(() => setMounted(true), []);

  const renderDot = useCallback(
    (props: Omit<AvatarDotProps, "totalPoints" | "duration" | "active">) => (
      <AvatarDot
        {...props}
        key={`dot-${props.index}`}
        totalPoints={totalPoints}
        duration={LINE_DURATION}
      />
    ),
    [totalPoints],
  );

  const renderActiveDot = useCallback(
    (props: Omit<AvatarDotProps, "totalPoints" | "duration" | "active">) => (
      <AvatarDot
        {...props}
        key={`active-dot-${props.index}`}
        totalPoints={totalPoints}
        duration={LINE_DURATION}
        active
      />
    ),
    [totalPoints],
  );

  if (!mounted) return null;
  return (
    <Card
      cardTitle="Leaderboard Graph"
      iconName="PresentationChartLineIcon"
      className="md:h-[420px] h-[280px]"
    >
      <div className="flex-1 min-h-0 min-w-0 flex items-center justify-center">
        {isLoading ? (
          <p className="text-xs text-slate-600 tracking-wide">
            Generating leaderboard...
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              className="w-full h-full"
              data={chartData}
              margin={chartMargin}
            >
              <CartesianGrid opacity={0.4} />
              <XAxis
                dataKey="login"
                tickMargin={10}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 20, right: 20 }}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                tickMargin={10}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                domain={yAxisDomain}
              />

              <Tooltip content={customTooltip} />

              <Line
                type="monotone"
                dataKey="views"
                stroke="#fe9a00"
                strokeWidth={3}
                dot={renderDot}
                activeDot={renderActiveDot}
                isAnimationActive
                animationDuration={LINE_DURATION}
                animationEasing="linear"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default LeaderBoardLineChart;
