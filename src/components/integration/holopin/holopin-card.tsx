"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import Chip from "@/components/ui/chip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GitGazeHolopinBadge,
  HacktoberfestYearGroup,
  HolopinOrganization,
} from "@/types/integration/holopin.types";
import {
  BuildingOffice2Icon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const SLIDE_DURATION = 5000;

const HolopinCard = ({
  orgData,
  badges,
  hacktoberfestData,
  isLoading,
  errorMsg,
}: {
  orgData?: HolopinOrganization | null;
  badges: GitGazeHolopinBadge[];
  hacktoberfestData?: HacktoberfestYearGroup;
  isLoading: boolean;
  errorMsg?: string;
}) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const total = badges.length;

  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [current, paused, total]);

  const activeBadge = badges[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <Card className="h-60" isLoading={isLoading} errorMsg={errorMsg}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <Chip>
          {orgData?.image ? (
            <Image
              src={orgData.image}
              alt={orgData.name}
              width={16}
              height={16}
              className="rounded-full"
            />
          ) : (
            <BuildingOffice2Icon className="size-4" />
          )}
          {hacktoberfestData?.year ? (
            <p>Hacktoberfest {hacktoberfestData.year}</p>
          ) : (
            <p>Others</p>
          )}
        </Chip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              src="https://www.holopin.io/images/logo.png"
              alt="Holopin"
              width={20}
              height={20}
            />
          </TooltipTrigger>
          <TooltipContent
            align="center"
            side="bottom"
            className="max-w-56 bg-black text-white rounded-lg text-center "
          >
            <p className="text-xs">GitGaze x Holopin Integration</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* SLIDER */}
      <div
        className="flex-1 overflow-hidden flex items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeBadge.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col items-center gap-y-2"
          >
            <Image
              src={activeBadge.image}
              alt={activeBadge.name}
              width={150}
              height={150}
              priority
              className="size-28"
            />
            <div className="flex items-center gap-x-1.5">
              <p className="max-w-52 text-xs text-center line-clamp-1 ">
                {activeBadge.name}
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InformationCircleIcon className="mx-auto size-4 text-slate-600" />
                </TooltipTrigger>
                <TooltipContent
                  align="end"
                  side="bottom"
                  className="max-w-60 bg-black text-white rounded-lg text-center "
                >
                  <p className="text-xs">{activeBadge.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* STORY INDICATOR */}
      <div className="flex gap-1 mt-0">
        {badges.map((_, index) => (
          <div
            key={index}
            className={`h-[2.5px] flex-1 rounded-full transition-all ${
              index <= current ? "bg-gray-700" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </Card>
  );
};

export default React.memo(HolopinCard);
