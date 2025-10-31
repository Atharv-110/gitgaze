"use client";
import React from "react";
import useGithubUser from "@/hooks/useGithubUser";
import { GitHubUser } from "@/types/github";
import { BuildingOffice2Icon, CpuChipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Card from "../card";
import { ParseEmoji } from "../ui/parse-emoji";
import Chip from "../ui/chip";
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
    <Card>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading user</div>}
      {userData && (
        // <div className="h-full flex flex-col justify-between">
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
              <h1 className="pl-px flex items-center justify-start font-semibold text-xl leading-none gap-1.5">
                {userData.name}{" "}
                {userData.isDeveloperProgramMember && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CpuChipIcon className="size-[22px] text-purple-500" />
                    </TooltipTrigger>
                    <TooltipContent
                      align="start"
                      side="right"
                      className="bg-black text-white rounded-lg"
                    >
                      <p>Developer Program Member</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </h1>
              <p className="flex items-center justify-start text-sm gap-1 text-slate-600">
                <span>
                  <BuildingOffice2Icon className="size-4" />
                </span>
                {userData.company}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600">{userData.bio}</p>
          <div className="bg-slate-100 border border-slate-200 py-1 px-4 rounded-md">
            <p className="text-sm text-center">github.com/{userData.login}</p>
          </div>
        </>
        // </div>
      )}
    </Card>
  );
};

export default ProfileCard;
