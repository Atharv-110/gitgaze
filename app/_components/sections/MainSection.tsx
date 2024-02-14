"use client";
import { useState, useEffect } from "react";
import InputComp from "@/app/_components/@ui/InputComp";
import ProfileCard from "@/app/_components/card/ProfileCard";
import TypographyComp from "../@ui/TypographyComp";
import { searchUser } from "@/app/_services/api";
import { IData } from "@/app/_interface/iData";

const MainSection: React.FC = () => {
  const [username, setUsername] = useState<string>("octocat");
  const currDate = new Date();
  const [data, setData] = useState<{
    avatar_url: string | null;
    name: string;
    username: string;
    url: string;
    bio: string | null;
    date: {
      day: number;
      month: string;
      year: number;
    };
  }>({
    avatar_url: null,
    name: "",
    username: "",
    url: "",
    bio: null,
    date: {
      day: 0,
      month: "",
      year: 2023,
    },
  });
  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await searchUser(username);
        if (responseData !== undefined) {
          // console.log(new Date(responseData.data.created_at));
          setData({
            avatar_url: responseData.data.avatar_url,
            name: responseData.data.name,
            username: responseData.data.login,
            url: responseData.data.html_url,
            bio: responseData.data.bio,
            date: {
              day: new Date(responseData.data.created_at).getDate(),
              month: new Date(responseData.data.created_at).toLocaleString(
                "default",
                { month: "long" }
              ),
              year: new Date(responseData.data.created_at).getFullYear(),
            },
          });
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
      <ProfileCard
        image={data.avatar_url}
        name={data.name}
        username={data.username}
        url={data.url}
        bio={data.bio}
        date={data.date}
      />
    </section>
  );
};

export default MainSection;
