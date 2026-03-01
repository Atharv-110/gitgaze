"use client";
import useGitgazeUsers from "@/hooks/useGitgazeUsers";
import { GitGazeUser, GitHubUser } from "@/types/github/user.types";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
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
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route.enum";

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

  const router = useRouter();

  const delay = active ? 0 : (index / (totalPoints - 1)) * duration;
  const name = payload.name ?? payload.login;

  const handleAvatarClick = React.useCallback(() => {
    router.push(Route.USER_PROFILE(payload.login));
  }, [payload.login, router]);

  const rectSize = 100;

  return (
    <foreignObject
      onClick={handleAvatarClick}
      overflow={"visible"}
      x={cx - rectSize / 2}
      y={cy - rectSize / 2}
      width={rectSize}
      height={rectSize}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={payload.avatarUrl}
            alt={payload.name ?? payload.login}
            width={50}
            height={50}
            className={`md:size-12 size-10 rounded-full border-2 aspect-square object-contain ${
              active
                ? "border-[#fe9a00]"
                : "border-slate-300 animate-avatar-pop"
            }`}
            style={{
              animationDelay: `${delay}ms`,
              scale: active ? 1.25 : 1,
            }}
          />
        </div>
        <p className="absolute top-[calc(50%+28px)] left-1/2 -translate-x-1/2 md:block hidden text-xs text-slate-600 text-center line-clamp-1 whitespace-nowrap">
          {name}
        </p>
      </div>
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
  left: -24,
  bottom: 0,
};

const LINE_DURATION = 2500;
const customTooltip = (
  <CustomAreaTooltip type="text" label="name" valuePrefix="Profile Views" />
);

const TICK_MOBILE = { fontSize: 10 };
const TICK_DESKTOP = { fontSize: 12 };
const X_AXIS_PADDING_MOBILE = { left: 12, right: 12 };
const X_AXIS_PADDING_DESKTOP = { left: 48, right: 48 };

const LeaderBoardLineChartContent = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  const { data, isLoading } = useGitgazeUsers(false, "desc", 5);

  const chartData = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) => page.data ?? [])
        .sort((a, b) => a.views - b.views) ?? []
    );
  }, [data]);
  const totalPoints = chartData.length;

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
              <CartesianGrid vertical={false} opacity={0.4} />
              <XAxis
                dataKey="login"
                tick={false}
                axisLine={false}
                padding={
                  isMobile ? X_AXIS_PADDING_MOBILE : X_AXIS_PADDING_DESKTOP
                }
              />

              <YAxis
                tick={isMobile ? TICK_MOBILE : TICK_DESKTOP}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                domain={yAxisDomain}
              />

              <Tooltip content={customTooltip} />

              <Line
                type="linear"
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

const LeaderBoardLineChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <LeaderBoardLineChartContent />;
};

export default LeaderBoardLineChart;
