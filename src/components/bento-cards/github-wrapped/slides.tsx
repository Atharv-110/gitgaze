import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/ui/aurora-text";
import LanguageIcon, { LanguageKey } from "@/components/ui/language-icon";
import { GitHubUser } from "@/types/github/user.types";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import HeatMapComponent from "./heatmap";
import {
  CommitsSlideData,
  Language,
  topMonthContributionProps,
  WrappedSlideProps,
} from "@/types/github/github.types";
import { cn } from "@/lib/client.helpers";
import winnerPodiumImg from "@/assets/images/winner_podium.svg";

const UserSlideComponent = ({
  userData,
}: {
  userData: GitHubUser | undefined;
}) => {
  if (!userData) {
    return (
      <p className="text-xs font-medium text-red-400">
        Unable to fetch the data.
      </p>
    );
  }
  const firstName = userData.name?.split(" ")[0] || "there";
  return (
    <div className=" w-full h-full flex flex-col items-center justify-center gap-1.5">
      <Image
        src={userData.avatarUrl}
        alt={`${userData.name}'s avatar`}
        width={75}
        height={75}
        className="rounded-full aspect-square object-contain"
      />
      <h2 className="text-lg font-bold">👋 Hello, {firstName}!</h2>
      <p className="text-xs text-slate-600">
        2025 was a breakout year in your developer journey — let&apos;s rewind
        your impact 👀
      </p>
    </div>
  );
};
export const UserSlide = React.memo(UserSlideComponent);

const TotalContributionsSlideComponent = ({
  data,
  wrappedYear,
}: {
  data: WrappedSlideProps | undefined;
  wrappedYear: number | undefined;
}) => {
  const commitData = data?.data as CommitsSlideData;
  const commitsDiff = commitData.current - commitData.prev;
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {wrappedYear && commitData && commitsDiff ? (
        <>
          <div className="flex items-center gap-3">
            <AuroraText className="font-extrabold text-6xl" speed={2}>
              {commitData.current}
            </AuroraText>
            <div
              className={cn(
                "flex flex-col items-center",
                commitsDiff < 0 ? "text-red-500" : "text-green-500",
              )}
            >
              {commitsDiff < 0 ? (
                <ArrowTrendingDownIcon className="size-8" />
              ) : (
                <ArrowTrendingUpIcon className="size-8" />
              )}
              <p className="font-bold -mt-2 text-sm">{commitsDiff}</p>
            </div>
          </div>
          <h2 className="text-lg font-bold">
            {data?.title} of {wrappedYear}
          </h2>
          <p className="text-xs text-slate-600">{data?.description}</p>
        </>
      ) : (
        <p className="text-xs text-red-400">
          Unable to generate commit&apos;s overview wrap.
        </p>
      )}
    </div>
  );
};
export const TotalContributionsSlide = React.memo(
  TotalContributionsSlideComponent,
);

const TopLanguageSlideComponent = ({
  data,
  wrappedYear,
}: {
  data: WrappedSlideProps | undefined;
  wrappedYear: number | undefined;
}) => {
  const topLanguages = data?.data as Language[];
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {data && topLanguages.length > 0 ? (
        <>
          <div className="relative mt-10">
            <Image
              src={winnerPodiumImg}
              alt="Winner Podium"
              width={100}
              height={100}
              className="w-52 opacity-90"
              loading="eager"
              quality={75}
            />
            {/* First Place */}
            <motion.div
              initial={{ y: 60, x: -25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="absolute -top-[50px] left-1/2"
            >
              <LanguageIcon
                name={topLanguages[0].name as LanguageKey}
                className="rounded-lg"
                size={48}
              />
            </motion.div>
            {/* Second Place */}
            <motion.div
              initial={{ y: 60, x: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1, type: "spring" }}
              className="absolute -top-3 left-8 -translate-x-1/2"
            >
              <LanguageIcon
                name={topLanguages[1].name as LanguageKey}
                className="rounded-lg"
                size={40}
              />
            </motion.div>
            {/* Third Place */}
            <motion.div
              initial={{ y: 60, x: -23, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1, type: "spring" }}
              className="absolute -top-0.5 -right-2 -translate-x-1/2"
            >
              <LanguageIcon
                name={topLanguages[2].name as LanguageKey}
                className="rounded-lg"
                size={40}
              />
            </motion.div>
          </div>
          <p className="text-xs text-slate-600">{data?.description}</p>
        </>
      ) : (
        <p className="text-xs text-red-400">
          Unable to generate top languages&apos; wrap.
        </p>
      )}
    </div>
  );
};
export const TopLanguageSlide = React.memo(TopLanguageSlideComponent);

const ActiveMonthSlideComponent = ({
  data,
  wrappedYear,
}: {
  data: WrappedSlideProps | undefined;
  wrappedYear: number | undefined;
}) => {
  const monthData = data?.data as topMonthContributionProps;
  return (
    <div className="flex flex-col items-center justify-center">
      {monthData && data && monthData.monthData.length > 0 ? (
        <>
          <div className="w-full flex items-center justify-center gap-1">
            <div>
              <HeatMapComponent data={monthData.monthData} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-[10px] md:text-xs text-slate-600 tracking-tight">
                Your most active month was
              </p>
              <AuroraText
                colors={["#BFFFD1", "#5FED83", "#08872B", "#104C35"]}
                className="text-4xl md:text-5xl font-extrabold"
              >
                {monthData.monthName}
              </AuroraText>
            </div>
          </div>
          <p className="text-xs mt-3 text-slate-600">{data?.description}</p>
        </>
      ) : (
        <p className="text-xs text-red-400">
          Unable to generate top month&apos;s wrap.
        </p>
      )}
    </div>
  );
};
export const ActiveMonthSlide = React.memo(ActiveMonthSlideComponent);

const HighlightPRSlideComponent = () => (
  <div className="flex flex-col items-center gap-2">
    <h2 className="text-lg font-bold">⭐ Highlight PR</h2>
    <p className="text-sm opacity-80">Big merge in leetburns repo</p>
  </div>
);
export const HighlightPRSlide = React.memo(HighlightPRSlideComponent);
