import React from "react";
import Card from "../card";
import { AuroraText } from "../ui/aurora-text";
import { Trigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const StreakCard = ({ username }: { username: string }) => {
  return (
    <Card cardTitle="Contributions & Streak" iconName="FireIcon" className="">
      <div className="flex-1 h-full flex items-center justify-between py-1.5">
        <div className="w-1/2 border-r border-slate-200 h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <AuroraText
              colors={["#ABE098", "#83D475", "#57C84D", "#2EB62C"]}
              className="text-5xl font-extrabold"
            >
              2000
            </AuroraText>
            <p className="mt-0.5 text-xs inline-flex items-center gap-1 text-slate-600">
              Total Contributions
              <Tooltip>
                <Trigger asChild>
                  <InformationCircleIcon className="size-4 cursor-help" />
                </Trigger>
                <TooltipContent
                  side="bottom"
                  className="bg-black text-white rounded-lg"
                >
                  <p className="">
                    This is the total number of commits made by the user.
                  </p>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center gap-y-1.5">
          <div className="p-1 size-20 aspect-square rounded-full bg-gradient-to-b from-orange-300 via-orange-400  to-orange-500">
            <div className="relative p-2 flex flex-col justify-center items-center w-full h-full rounded-full bg-white">
              <Image
                src="/fire.gif"
                alt="Fire Icon"
                width={50}
                height={50}
                className="size-7 absolute -top-[18px] bg-white"
              />
              <h2 className="text-3xl leading-none font-semibold text-black">
                99
              </h2>
              <p className="text-xs leading-none text-slate-600">Days</p>
              {/* "#FDB777", "#FDA766", "#FD7F2C", "#FF6200" */}
            </div>
          </div>
          <div>
            <p className="text-slate-600 text-xs">Current Streak</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StreakCard;
