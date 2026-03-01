"use client";
import useGhUserAchievements from "@/hooks/useGhAchievements";
import { GhUserAchievement } from "@/types/github/user.types";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useLayoutEffect } from "react";
import Card from "../card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const AchievementsCard = ({ username }: { username: string }) => {
  const [achievements, setAchievements] = React.useState<
    GhUserAchievement[] | null
  >(null);
  const [spaceX, setSpaceX] = React.useState(72);
  const [widthPerItem, setWidthPerItem] = React.useState(144);
  const [dataLength, setDataLength] = React.useState(0);

  const divRef = React.useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useGhUserAchievements(username);

  useEffect(() => {
    if (!data) return;
    const reversedData = [...data].reverse();
    const slicedData =
      data.length > 4 ? reversedData.slice(1, 5) : reversedData.slice(0, 4);
    setAchievements(slicedData);
    setDataLength(data.length);
  }, [data]);
  useLayoutEffect(() => {
    if (!(divRef.current && achievements)) {
      return;
    }
    const size = divRef.current.getBoundingClientRect();
    setWidthPerItem(size.height);
    const spaceDataLength = dataLength > 4 ? 5 : dataLength;
    setSpaceX(
      (spaceDataLength * size.height - size.width) / (spaceDataLength - 1),
    );
  }, [dataLength, achievements]);

  return (
    <Card
      cardTitle="Achievements"
      iconName="TrophyIcon"
      isLoading={isLoading}
      errorMsg={error ? "No Achievements Found" : undefined}
    >
      {achievements && (
        <div
          ref={divRef}
          className="flex-1 flex items-center justify-start group"
        >
          {achievements.map((achievement, i) => (
            <Tooltip key={achievement.type}>
              <TooltipTrigger asChild>
                <Image
                  src={achievement.image || ""}
                  alt={achievement.type || "achievement"}
                  width={widthPerItem}
                  height={widthPerItem}
                  sizes={`${widthPerItem}px`}
                  style={{ marginLeft: i > 0 ? -spaceX : 0 }}
                  className="h-full w-auto object-contain transition-all duration-200 ease-in-out group-hover:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-110"
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-black text-white rounded-lg capitalize"
              >
                <p>
                  {achievement.tier && achievement.tier > 1
                    ? achievement.tier + "x "
                    : ""}
                  {achievement.type}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
          {dataLength - 4 > 0 && (
            <Link
              className="text-blue-500 hover:underline font-medium tracking-tight text-xs"
              href={`https://github.com/${username}?tab=achievements`}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{dataLength - 4} more
            </Link>
          )}
        </div>
      )}
    </Card>
  );
};

export default AchievementsCard;
