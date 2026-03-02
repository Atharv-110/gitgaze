"use client";
import { Route } from "@/enums/route.enum";
import useGitgazeUsers from "@/hooks/useGitgazeUsers";
import { getGithubAvatar } from "@/lib/client.helpers";
import { GitGazeUser } from "@/types/github/user.types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const isLeader = index === totalPoints - 1;

  const delay = active ? 0 : (index / (totalPoints - 1)) * duration;
  const name = payload.name ?? payload.login;

  const [leaderActive, setLeaderActive] = React.useState(false);

  React.useEffect(() => {
    if (!isLeader) return;

    const timer = setTimeout(() => {
      setLeaderActive(true);
    }, delay + 600);

    return () => clearTimeout(timer);
  }, [isLeader, delay]);

  const handleAvatarClick = React.useCallback(() => {
    router.push(Route.USER_PROFILE(payload.login));
  }, [payload.login, router]);

  const rectSize = 100;

  return (
    <foreignObject
      overflow={"visible"}
      x={cx - rectSize / 2}
      y={cy - rectSize / 2}
      width={rectSize}
      height={rectSize}
    >
      <div className="relative w-full h-full">
        <div
          onClick={handleAvatarClick}
          className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: "auto" }}
        >
          <Image
            src={getGithubAvatar(payload.avatarUrl, 96)}
            alt={name}
            width={48}
            height={48}
            sizes="(max-width: 768px) 40px, 48px"
            className={`rounded-full border-2 object-cover md:size-12 size-10
              ${
                active || leaderActive
                  ? "border-[#fe9a00]"
                  : "border-slate-300 animate-avatar-pop"
              }`}
            style={{
              animationDelay: `${delay}ms`,
              transform: active ? "scale(1.2)" : "scale(1)",
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
  const { data, isLoading } = useGitgazeUsers(false, "desc", isMobile ? 5 : 6);

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

const LeaderBoardLineChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <LeaderBoardLineChartContent />;
};

export default LeaderBoardLineChart;
