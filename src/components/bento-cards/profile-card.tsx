"use client";
import useGithubUser from "@/hooks/useGithubUser";
import { GitHubUser } from "@/types/github/user.types";
import {
  BuildingOffice2Icon,
  CpuChipIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import Card from "../card";
import Chip from "../ui/chip";
import { ParseEmoji } from "../ui/parse-emoji";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ProfileCard = ({ username }: { username: string }) => {
  const [userData, setUserData] = React.useState<GitHubUser | null>(null);
  const { data, isLoading, error } = useGithubUser(username);

  React.useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  return (
    <Card isLoading={isLoading}>
      {error && <div>Error loading user</div>}
      {userData && (
        <>
          <div className="flex items-stretch gap-3">
            <Image
              src={userData.avatarUrl}
              alt={`${userData.name}'s avatar`}
              width={80}
              height={80}
              className="h-full rounded-xl object-contain"
            />{" "}
            <div className="space-y-1.5">
              <Chip>
                <ParseEmoji emoji={userData.status?.emojiHTML} size={15} />{" "}
                <p>{userData.status?.message}</p>
              </Chip>
              <h1 className="pl-px flex items-center justify-start font-semibold text-lg md:text-xl leading-none gap-x-1">
                {userData.name}{" "}
                {userData.isDeveloperProgramMember && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CpuChipIcon className="ml-0.5 size-[22px] text-violet-500" />
                    </TooltipTrigger>
                    <TooltipContent
                      align="start"
                      side="bottom"
                      className="bg-black text-white rounded-lg"
                    >
                      <p>Developer Program Member</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {userData.company && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BuildingOffice2Icon className="size-5 text-slate-600 hover:text-black" />
                    </TooltipTrigger>
                    <TooltipContent
                      align="start"
                      side="bottom"
                      className="bg-black text-white rounded-lg"
                    >
                      <p>Works at {userData.company}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </h1>
              {userData.company && false ? (
                <p className="flex items-center justify-start text-sm gap-1 text-slate-600">
                  <span>
                    <BuildingOffice2Icon className="size-4" />
                  </span>
                  {userData?.company}
                </p>
              ) : (
                <p className="flex items-center justify-start text-sm gap-1 text-slate-600">
                  <span>
                    <UsersIcon className="size-4" />
                  </span>
                  <span className="font-medium">
                    {userData.followers.totalCount}
                  </span>{" "}
                  followers <span className="font-bold">·</span>{" "}
                  <span className="font-medium">
                    {userData.following.totalCount}
                  </span>{" "}
                  following
                </p>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-normal">
            {userData.bio}
          </p>
          <div className="bg-slate-100 border border-slate-200 py-1 px-4 rounded-md">
            <p className="text-sm text-center">github.com/{userData.login}</p>
          </div>
        </>
      )}
    </Card>
  );
};

export default ProfileCard;
