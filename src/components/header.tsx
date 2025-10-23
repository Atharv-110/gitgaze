import React from "react";
import DynamicIsland from "./dynamic-island";
import Button from "./ui/button";
import { AuroraText } from "./ui/aurora-text";

const Header = ({ username }: { username: string | null }) => {
  return (
    <DynamicIsland
      className="flex justify-center items-center"
      smallClassName="w-fit"
      wrapperClassName="bg-red-500"
      smallHeight={40}
      largeHeight={40}
      largeWidth={300}
      top={16}
      initialAnimation
    >
      {(isSmall) =>
        isSmall ? (
          <h1 className="px-4 font-extrabold tracking-wide whitespace-nowrap pointer-events-none">
            {username + "'s"} <AuroraText>GitGaze</AuroraText>
          </h1>
        ) : (
          <div className="w-full flex items-center justify-center gap-3">
            <h1 className="pl-1 font-extrabold tracking-wide whitespace-nowrap pointer-events-none">
              {username + "'s"} <AuroraText>GitGaze</AuroraText>
            </h1>
            <Button
              icon="PaperAirplaneIcon"
              size={15}
              label="Share"
              color="text-black"
              className="bg-white rounded-full gap-1 p-0 px-3 py-0.5 text-sm"
            />
          </div>
        )
      }
    </DynamicIsland>
  );
};

export default Header;
