"use client";
import { useState } from "react";
import InputComp from "@/app/_components/@ui/InputComp";
import ProfileCard from "@/app/_components/card/ProfileCard";
import TypographyComp from "../@ui/TypographyComp";
import { searchUser } from "@/app/_services/api";

const MainSection: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  console.log(username ? username : "null");
  const response = searchUser(username);
  console.log(response)

  return (
    <section className="w-full md:w-[760px] flex flex-col gap-12">
      <TypographyComp variant="title" text="GitGaze" />
      <InputComp setUsername={setUsername} />
      <ProfileCard />
    </section>
  );
};

export default MainSection;
