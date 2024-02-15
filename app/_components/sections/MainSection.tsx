"use client";
import { useState, useEffect, useRef } from "react";
import InputComp from "@/app/_components/@ui/InputComp";
import ProfileCard from "@/app/_components/card/ProfileCard";
import TypographyComp from "@/app/_components/@ui/TypographyComp";
import { searchUser } from "@/app/_services/api";
import { IData } from "@/app/_interface/iData";
import ButtonComp from "@/app/_components/@ui/ButtonComp";
import html2canvas from "html2canvas";

const MainSection: React.FC = () => {
  const [username, setUsername] = useState<string>("octocat");
  const [data, setData] = useState<IData | null>(null);

  const divRef = useRef<HTMLDivElement>(null);

  const downloadDivAsImage = async () => {
    // Get the div element
    const divToDownload = divRef.current;

    if (!divToDownload) {
      console.error("Nothing to download");
      return;
    }

    try {
      const canvas = await html2canvas(divToDownload, {
        allowTaint: true,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/jpg");

      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "gitgaze_image.jpg";

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error capturing div content:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await searchUser(username);
        setData(responseData?.data ?? null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  console.log(data);
  

  return (
    <section className="w-full md:w-[760px] flex flex-col gap-8">
      <TypographyComp variant="title" text="GitGaze" />
      <InputComp setUsername={setUsername} />
      {data && <ProfileCard reff={divRef} {...data} />}
      {data && <ButtonComp onClick={downloadDivAsImage} title="Download" />}
    </section>
  );
};

export default MainSection;
