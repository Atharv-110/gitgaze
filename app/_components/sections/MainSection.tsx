"use client";
import { useState, useEffect } from "react";
import InputComp from "@/app/_components/@ui/InputComp";
import ProfileCard from "@/app/_components/card/ProfileCard";
import TypographyComp from "../@ui/TypographyComp";
import { searchUser } from "@/app/_services/api";
import { IData } from "@/app/_interface/iData";

const MainSection: React.FC = () => {
  const [username, setUsername] = useState<string>("octocat");
  const [data, setData] = useState<IData[]>([]);
  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await searchUser(username);
        if (responseData !== undefined) {
          setData(responseData?.data);
        } else setData([]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <section className="w-full md:w-[760px] flex flex-col gap-12">
      <TypographyComp variant="title" text="GitGaze" />
      <InputComp setUsername={setUsername} />
      <ProfileCard data={data} />
    </section>
  );
};

export default MainSection;
