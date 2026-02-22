"use client";
import useHolopinBadges from "@/hooks/useHolopinBadges";
import React from "react";
import HolopinCard from "./holopin-card";

const Holopin = ({ holopinUsername }: { holopinUsername: string | null }) => {
  const { data, isLoading, error } = useHolopinBadges(holopinUsername || "");
  const hacktoberfestData = data?.hacktoberfest;

  return (
    <>
      {hacktoberfestData?.badges.map((badge) => (
        <HolopinCard
          orgData={hacktoberfestData.organization}
          isLoading={isLoading}
          errorMsg={error?.message}
          key={badge.year}
          hacktoberfestData={badge}
          badges={badge.badges}
        />
      ))}
      {data?.otherBadges && (
        <HolopinCard
          isLoading={isLoading}
          errorMsg={error?.message}
          badges={data?.otherBadges}
        />
      )}
    </>
  );
};

export default React.memo(Holopin);
