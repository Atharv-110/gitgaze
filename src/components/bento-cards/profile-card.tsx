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
import { cn } from "@/lib/client.helpers";
import Link from "next/link";
import { getIcon } from "@/assets/icons/icons";
import LanguageIcon, { LanguageKey } from "../ui/language-icon";

const ProfileCard = ({ username }: { username: string }) => {
  const [userData, setUserData] = React.useState<GitHubUser | null>(null);
  const { data, isLoading, error } = useGithubUser(username);

  React.useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  return (
    <Card isLoading={isLoading} errorMsg={error ? "User Not Found" : undefined}>
      {userData && (
        <>
          <div className="flex items-stretch gap-3">
            <Image
              src={userData.avatarUrl}
              alt={`${userData.name}'s avatar`}
              width={80}
              height={80}
              className="max-w-[72px] md:max-w-20 aspect-square h-full rounded-full object-contain border-2 border-slate-300"
            />{" "}
            <div className="h-full flex flex-col justify-between py-px">
              {userData.status && (
                <Chip
                  className={cn(
                    "leading-none",
                    userData.status.message
                      ? "px-2 py-0.5 rounded-md"
                      : "p-0.5",
                  )}
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
                  {userData.followers.totalCount}
                </span>{" "}
                followers <span className="font-bold">·</span>{" "}
                <span className="font-medium">
                  {userData.following.totalCount}
                </span>{" "}
                following
              </p>
            </div>
          </div>
          <p className="text-xs tracking-wide leading-snug text-slate-600 line-clamp-3">
            {userData.bio}
          </p>

          <div className="flex items-stretch justify-start gap-1.5">
            {userData?.socialAccounts?.nodes.length > 0 &&
              userData?.socialAccounts?.nodes.map((node) => (
                <Link
                  href={node.url}
                  key={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-9"
                >
                  <Image
                    src={getIcon(node.provider) as string}
                    alt={node.provider || "Social Icon"}
                    width={36}
                    height={36}
                    className="w-full aspect-square bg-slate-100 border border-slate-200 rounded-lg p-1.5 object-contain hover:border-slate-400"
                  />
                </Link>
              ))}
            <Link
              className="max-w-44 flex-1 flex items-center justify-center text-xs md:text-sm tracking-wide bg-slate-100 p-1 md:p-1.5 gap-[5px] font-medium rounded-lg border hover:border-slate-400"
              href={`/u/${username}/readme`}
            >
              <LanguageIcon size={20} name={"MDX" as LanguageKey} />
              Readme
            </Link>
          </div>
        </>
      )}
    </Card>
  );
};

export default ProfileCard;
