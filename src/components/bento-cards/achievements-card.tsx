"use client";
import React, { useEffect, useLayoutEffect } from "react";
import Card from "../card";
import useGhUserAchievements from "@/hooks/useGhAchievements";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { GhUserAchievement } from "@/types/github/user.types";

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
    if (data) {
      setAchievements(data);
      setDataLength(data.length);
    }
  }, [data]);
  useLayoutEffect(() => {
    if (achievements && divRef.current) {
      const size = divRef.current.getBoundingClientRect();
      const widthPerItem = size.height;
      setWidthPerItem(widthPerItem);
      setSpaceX((dataLength * widthPerItem - size.width) / (dataLength - 1));
    }
  }, [achievements, dataLength]);

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
                  height={widthPerItem}
                  className="object-contain transition-all ease-in-out duration-200 group-hover:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-110"
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
              className="text-blue-500 hover:underline font-medium tracking-tight text-sm"
              href="https://github.com/Atharv-110?tab=achievements"
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
