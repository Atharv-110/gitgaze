"use client";
import { useState, useEffect } from "react";
import InputComp from "@/app/_components/@ui/InputComp";
import ProfileCard from "@/app/_components/card/ProfileCard";
import TypographyComp from "../@ui/TypographyComp";
import { searchUser } from "@/app/_services/api";
import { IData } from "@/app/_interface/iData";

const MainSection: React.FC = () => {
  const [username, setUsername] = useState<string>("octocat");
  const [data, setData] = useState<{ avatar_url: string | null }>({
    avatar_url: null,
  });
  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await searchUser(username);
        if (responseData !== undefined) {
          setData({ avatar_url: responseData.data.avatar_url });
        }
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
      <ProfileCard image={data.avatar_url} />
    </section>
  );
};

export default MainSection;
