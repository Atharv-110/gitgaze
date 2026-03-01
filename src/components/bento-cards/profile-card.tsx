"use client";
import { getIcon } from "@/assets/icons/icons";
import { Route } from "@/enums/route.enum";
import useGithubUser from "@/hooks/useGithubUser";
import { formatCompactNumber, getGithubAvatar } from "@/lib/client.helpers";
import { GitGazeUser, GitHubUser } from "@/types/github/user.types";
import {
  BuildingOffice2Icon,
  CpuChipIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "../card";
import Chip from "../ui/chip";
import LanguageIcon, { LanguageKey } from "../ui/language-icon";
import { ParseEmoji } from "../ui/parse-emoji";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ProfileCard = ({
  username,
  initData = null,
}: {
  username?: string;
  initData?: GitGazeUser | null;
}) => {
  const [userData, setUserData] = React.useState<
    GitHubUser | GitGazeUser | null
  >(initData);
  const shouldFetch = !initData;
  const { data, isLoading, error } = useGithubUser(username, {
    enabled: !!username && shouldFetch,
  });

  React.useEffect(() => {
    if (initData) {
      setUserData(initData);
      return;
    }
    if (data && !initData) {
      setUserData(data);
    }
  }, [data, initData]);

  return (
    <Card isLoading={isLoading} errorMsg={error ? "User Not Found" : undefined}>
      {userData && (
        <>
          <div className="flex items-stretch gap-3">
            <Image
              src={getGithubAvatar(userData.avatarUrl, 160)} // 80px × 2 retina
              alt={`${userData.name ?? userData.login}'s avatar`}
              width={80}
              height={80}
              sizes="(max-width: 768px) 72px, 80px"
              className="max-w-[72px] md:max-w-20 rounded-full object-cover border-2 border-slate-300"
            />{" "}
            <div
              className={`h-full flex flex-col py-px ${userData.status && userData.name ? "justify-between" : "gap-y-1"}`}
            >
              {userData.status && (
                <Chip
                  className={
                    userData.status.message
                      ? "px-2 py-0.5 rounded-md"
                      : "p-0.5 aspect-square"
                  }
                >
                  <ParseEmoji emoji={userData.status?.emojiHTML} size={15} />
                  {userData.status.message && (
                    <p className="line-clamp-1">{userData.status.message}</p>
                  )}
                </Chip>
              )}
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
              <p className="flex items-center justify-start text-xs md:text-sm gap-1 text-slate-600">
                <UsersIcon className="size-3 md:size-4" />
                <span className="font-medium">
                  {formatCompactNumber(userData.followers.totalCount)}
                </span>{" "}
                followers <span className="font-bold">·</span>{" "}
                <span className="font-medium">
                  {formatCompactNumber(userData.following.totalCount)}
                </span>{" "}
                following
              </p>
            </div>
          </div>
          {userData.bio && (
            <p className="text-xs tracking-wide leading-snug text-slate-600 line-clamp-3">
              {userData.bio}
            </p>
          )}

          {!initData && (
            <div className="flex items-stretch justify-start gap-1.5">
              {userData?.socialAccounts?.nodes.length > 0 &&
                userData?.socialAccounts?.nodes.map((node) => (
                  <Link
                    href={node.url}
                    key={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-7 md:max-w-9"
                  >
                    <Image
                      src={getIcon(node.provider) as string}
                      alt={node.provider || "Social Icon"}
                      width={36}
                      height={36}
                      className="w-full aspect-square size-7 md:size-9 bg-slate-50 border border-slate-200 rounded-lg p-1.5 object-contain hover:border-slate-400"
                    />
                  </Link>
                ))}
              <Link
                className="max-w-44 flex-1 flex items-center justify-center text-xs md:text-sm tracking-wide bg-slate-50 p-1 md:p-1.5 gap-[5px] font-medium rounded-lg border hover:border-slate-400"
                href={Route.USER_README(username)}
              >
                <LanguageIcon
                  name={"MDX" as LanguageKey}
                  className="md:!size-5 !size-4"
                />
                Readme
              </Link>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default ProfileCard;
