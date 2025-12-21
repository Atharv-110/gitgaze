import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/ui/aurora-text";
import LanguageIcon from "@/components/ui/language-icon";
import { GitHubUser } from "@/types/github/user.types";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import HeatMapComponent from "./heatmap";

export const UserSlide = ({
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
    <div className=" w-full h-full flex flex-col items-center justify-center gap-2">
      {/* <Image
        src={userData.avatarUrl}
        alt={`${userData.name}'s avatar`}
        width={85}
        height={85}
        className="rounded-full aspect-square object-contain"
      /> */}
      <h2 className="text-lg font-bold">👋 Hello, {firstName}!</h2>
      <p className="text-xs text-slate-600">
        2025 was a breakout year in your developer journey — let&apos;s rewind
        your impact 👀
      </p>
    </div>
  );
};

const TotalContributionsSlideComponent = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex items-center gap-3">
      <AuroraText className="font-extrabold text-6xl" speed={2}>
        1,234
      </AuroraText>
      <div className="text-green-500 flex flex-col items-center">
        <ArrowTrendingUpIcon className="size-8" />
        <p className="font-bold -mt-2 text-sm">2200</p>
      </div>
    </div>
    <h2 className="text-lg font-bold">Commits in 2025</h2>
    <p className="text-sm opacity-80">You made 1,234 contributions!</p>
  </div>
);

export const TotalContributionsSlide = React.memo(
  TotalContributionsSlideComponent
);

export const TopLanguageSlide = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative mt-10">
      <Image
        src="/winner_podium.svg"
        alt="Winner Podium"
        width={100}
        height={100}
        className="w-52 opacity-90"
        quality={75}
      />
      {/* First Place */}
      <motion.div
        initial={{ y: 60, x: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="absolute -top-[50px] left-1/2"
      >
        <LanguageIcon name="HTML" className="rounded-lg" size={48} />
      </motion.div>
      {/* Second Place */}
      <motion.div
        initial={{ y: 60, x: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1, type: "spring" }}
        className="absolute -top-3 left-8 -translate-x-1/2"
      >
        <LanguageIcon name="JavaScript" className="rounded-lg" size={40} />
      </motion.div>
      {/* Third Place */}
      <motion.div
        initial={{ y: 60, x: -23, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, type: "spring" }}
        className="absolute -top-0.5 -right-2 -translate-x-1/2"
      >
        <LanguageIcon name="JavaScript" className="rounded-lg" size={40} />
      </motion.div>
    </div>
    <p className="text-xs opacity-80">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, aliquid!
    </p>
  </div>
);

export const ActiveMonthSlide = () => (
  <div>
    <div className="w-full flex items-center justify-center gap-1">
      <div>
        <HeatMapComponent />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-[10px] md:text-xs text-slate-600 tracking-tight">
          Your most active month was
        </p>
        <AuroraText
          colors={["#BFFFD1", "#5FED83", "#08872B", "#104C35"]}
          className="text-4xl md:text-5xl font-extrabold"
        >
          October
        </AuroraText>
      </div>
    </div>
    <p className="text-xs mt-3 text-slate-600">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem,
      dignissimos!
    </p>
  </div>
);

export const HighlightPRSlide = () => (
  <div className="flex flex-col items-center gap-2">
    <h2 className="text-lg font-bold">⭐ Highlight PR</h2>
    <p className="text-sm opacity-80">Big merge in leetburns repo</p>
  </div>
);
