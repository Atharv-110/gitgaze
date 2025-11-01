"use client";
import React, { useEffect } from "react";
import Card from "../card";
import { AuroraText } from "../ui/aurora-text";
import { Trigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { GhStreak, GhYearlyContribution } from "@/types/github/github.types";
import useGhYearlyContributions from "@/hooks/useGhYearlyContributions";
import useGhTotalStreaks from "@/hooks/useGhTotalStreaks";

const getTotalContributions = (data: GhYearlyContribution[]) => {
  return data.reduce(
    (total, yearContribution) =>
      total + yearContribution.totalCommitContributions,
    0
  );
};

const StreakCard = ({ username }: { username: string }) => {
  const [totalContributions, setTotalContributions] = React.useState<number>(0);
  const [streakData, setStreakData] = React.useState<{
    streak: GhStreak;
    type: string;
  }>({
    streak: { count: 0, startDate: "", endDate: "" },
    type: "CURRENT",
  });
  const [userCreatedAt, setUserCreatedAt] = React.useState<Date>(new Date());
  const {
    data: yearlyContributionData,
    isLoading: yearlyContributionLoading,
    error: yearlyContributionError,
  } = useGhYearlyContributions(username);

  const {
    data: totalStreaksData,
    isLoading: totalStreaksLoading,
    error: totalStreaksError,
  } = useGhTotalStreaks(username);

  useEffect(() => {
    if (yearlyContributionData) {
      setTotalContributions(
        getTotalContributions(yearlyContributionData.contributions)
      );
      setUserCreatedAt(new Date(yearlyContributionData.userCreatedAt));
    }
    if (totalStreaksData) {
      console.log(totalStreaksData);

      if (totalStreaksData.currentStreak.count > 0) {
        setStreakData({
          streak: totalStreaksData.currentStreak,
          type: "CURRENT",
        });
      } else {
        setStreakData({
          streak: totalStreaksData.longestStreak,
          type: "LONGEST",
        });
      }
    }
  }, [yearlyContributionData, totalStreaksData]);
  return (
    <Card cardTitle="Contributions & Streak" iconName="FireIcon">
      <div className="flex-1 h-full flex items-center justify-center py-2">
        <div className="w-1/2 border-r border-slate-200 h-full flex justify-center items-center">
          <div className="flex flex-col items-center gap-y-1.5">
            <AuroraText
              colors={["#ABE098", "#83D475", "#57C84D", "#2EB62C"]}
              className="text-6xl leading-none font-extrabold"
            >
              {totalContributions}
            </AuroraText>

            <p className="text-xs inline-flex items-center gap-1 text-slate-600">
              Total Contributions
              {/* <Tooltip>
                <Trigger asChild>
                  <InformationCircleIcon className="size-4 cursor-help" />
                </Trigger>
                <TooltipContent
                  side="bottom"
                  className="bg-black text-white rounded-lg"
                >
                  <p className="">
                    This is the total number of commits made by the user.
                  </p>
                </TooltipContent>
              </Tooltip> */}
            </p>
            <p className="text-xs text-slate-600">
              Since{" "}
              <span className="font-medium">
                {userCreatedAt.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center gap-y-1.5">
          <div
            className={`p-1.5 size-24 aspect-square rounded-full ${
              streakData.type === "CURRENT"
                ? "bg-gradient-to-b from-amber-300 via-amber-500  to-orange-600"
                : "bg-amber-500"
            } `}
          >
            <div className="relative p-2 flex flex-col justify-center items-center w-full h-full rounded-full bg-white">
              {streakData.type === "CURRENT" && (
                <Image
                  src="/fire.gif"
                  alt="Fire Icon"
                  width={50}
                  height={50}
                  className="size-8 absolute -top-5 bg-white"
                />
              )}
              <h2 className="text-3xl leading-none font-bold">
                {streakData.streak.count}
              </h2>
              <p className="text-xs leading-none text-slate-600">Days</p>
              {/* "#FDB777", "#FDA766", "#FD7F2C", "#FF6200" */}
            </div>
          </div>
          <div>
            <p className="text-slate-600 text-xs capitalize">
              {streakData.type.toLowerCase()} Streak
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StreakCard;
