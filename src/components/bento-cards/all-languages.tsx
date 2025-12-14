"use client";
import React from "react";
import Card from "../card";
import { Language } from "@/types/github/github.types";
import useGhTopLanguages from "@/hooks/useGhTopLanguages";
import Chip from "../ui/chip";
import LanguageIcon, { LanguageKey } from "../ui/language-icon";

const AllLanguages = ({ username }: { username: string }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState<Language[] | null>(null);
  const [height, setHeight] = React.useState<number>(250);
  const { data: fetchedData, isLoading } = useGhTopLanguages(username);
  React.useEffect(() => {
    if (fetchedData) setData(fetchedData);
  }, [fetchedData]);

  React.useLayoutEffect(() => {
    if (!divRef.current || !data) return;
    const parentHeight = divRef.current?.clientHeight;
    if (parentHeight) setHeight(parentHeight);
  }, [data]);
  return (
    <Card
      cardTitle="Tech Stack"
      iconName="ComputerDesktopIcon"
      isLoading={isLoading}
    >
      <div ref={divRef} className="flex-1">
        {height && (
          <div
            className="flex flex-wrap gap-1.5 overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ maxHeight: height }}
          >
            {data?.map((language) => (
              <Chip
                className="bg-white rounded-md gap-1 px-1.5 shadow-sm"
                key={language.name}
              >
                <LanguageIcon size={12} name={language.name as LanguageKey} />
                <p className="font-medium line-clamp-1">{language.name}</p>
              </Chip>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AllLanguages;
