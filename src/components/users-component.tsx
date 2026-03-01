"use client";
import useGitgazeUsers from "@/hooks/useGitgazeUsers";
import { GitGazeUser } from "@/types/github/user.types";
import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Card from "./card";
import Chip from "./ui/chip";
import Loader from "./ui/loader";
import { ParseEmoji } from "./ui/parse-emoji";
import { getGithubAvatar } from "@/lib/client.helpers";

const UserCard = React.memo(({ user }: { user: GitGazeUser | null }) => {
  if (!user) return null;
  return (
    <Card className="max-sm:min-h-full p-2 md:p-2">
      <div className="flex items-center gap-x-2">
        <Image
          src={getGithubAvatar(user.avatarUrl, 56)}
          alt={`${user.name}'s avatar`}
          width={56}
          height={56}
          sizes="56px"
          className="rounded-lg object-cover border-2 border-slate-300"
        />
        <div className="flex-1 flex flex-col justify-between gap-y-1 pb-1">
          <h1 className="text-base font-semibold line-clamp-1">
            {user.name ? user.name : "@" + user.login}
          </h1>
          <div className="flex items-center gap-x-1.5 text-xs font-medium pointer-events-none">
            {user.status && (
              <Chip
                className={
                  user.status.message
                    ? "px-2 py-0.5 rounded-lg"
                    : "p-1 aspect-square leading-none"
                }
              >
                <ParseEmoji emoji={user.status?.emojiHTML} size={15} />
                {user.status.message && (
                  <p className="line-clamp-1">{user.status.message}</p>
                )}
              </Chip>
            )}
            <Chip className="rounded-lg px-1.5">
              <EyeIcon className="size-4" />
              <p className="text-xs">{user.views}</p>
            </Chip>
          </div>
        </div>
      </div>
    </Card>
  );
});

const UsersComponent = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGitgazeUsers(false, "desc");

  const users = data?.pages.flatMap((page) => page.data ?? []) ?? [];
  const observerTarget = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries[0].isIntersecting);
      },
      { threshold: 0.1 },
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      setIsDebouncing(true);
      timeoutId = setTimeout(() => {
        fetchNextPage();
      }, 1500);
    } else {
      setIsDebouncing(false);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-center gap-y-4">
      {isLoading ? (
        <Loader className="my-40" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
          {users.map((user) => (
            <UserCard key={`${user.login}`} user={user} />
          ))}
        </div>
      )}
      <div ref={observerTarget} className="h-4 w-full" />
      {(isFetchingNextPage || isDebouncing) && <Loader className="mb-8" />}
    </div>
  );
};

export default UsersComponent;
