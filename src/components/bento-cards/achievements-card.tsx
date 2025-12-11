"use client";
import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useGhUserAchievements from "@/hooks/useGhAchievements";
import { GhUserAchievement } from "@/types/github/user.types";
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
    setSpaceX((dataLength * size.height - size.width) / (dataLength - 1));
  }, [dataLength, achievements]);

  return (
    <Card cardTitle="Achievements" iconName="TrophyIcon">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading user</div>}
      {achievements && (
        <div
          ref={divRef}
          className="flex-1 flex items-center justify-start group"
        >
          {achievements.map((achievement, i) => (
            <Tooltip key={achievement.type}>
              <TooltipTrigger asChild>
                <Image
                  key={achievement.type}
                  src={achievement.image || ""}
                  alt={achievement.type || "achievement"}
                  style={{ marginLeft: i > 0 ? -spaceX : 0 }}
                  width={widthPerItem}
                  height={100}
                  priority
                  quality={95}
                  className="h-full object-contain transition-all ease-in-out duration-200 group-hover:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-110"
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
