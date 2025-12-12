import React from "react";
import DynamicIsland from "./dynamic-island";
import Button from "./ui/button";
import { AuroraText } from "./ui/aurora-text";
import Image from "next/image";

const Header = ({ username }: { username: string | null }) => {
  return (
    <DynamicIsland
      className="flex justify-center items-center"
      smallClassName="md:w-fit px-4"
      smallWidth={300}
      smallHeight={35}
      largeHeight={80}
      largeRadius={12}
      largeWidth={370}
      top={12}
      initialAnimation
      triggerType="hover"
    >
      {(isSmall) =>
        isSmall ? (
          <div className="flex items-center gap-1.5">
            <Image
              src="/gitgaze_logo.png"
              alt="GitGaze Logo"
              width={24}
              height={24}
              className="h-full object-contain"
            />
            <h1 className="font-extrabold tracking-wider pointer-events-none">
              {username + "'s"} <AuroraText>GitGaze</AuroraText>
            </h1>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-2">
            <Image
              src="/gitgaze_logo.png"
              alt="GitGaze Logo"
              width={28}
              height={28}
              className="h-full object-contain"
            />
            <h1 className="text-lg font-extrabold tracking-wider whitespace-nowrap pointer-events-none">
              {username + "'s"} <AuroraText>GitGaze</AuroraText>
            </h1>
            <Button
              icon="ShareIcon"
              size={16}
              label="Share"
              color="text-black"
              className="bg-white rounded-full gap-1 p-0 px-4 py-1.5 text-sm"
            />
          </div>
        )
      }
    </DynamicIsland>
  );
};

export default Header;
