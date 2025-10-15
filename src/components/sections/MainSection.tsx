"use client";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import ButtonComp from "../@ui/ButtonComp";
import { IData } from "@/interface/iData";
import { searchUser } from "@/services/api";
import TypographyComp from "../@ui/TypographyComp";
import InputComp from "../@ui/InputComp";
import ProfileCard from "../card/ProfileCard";
import { useRouter } from "next/navigation";

const MainSection: React.FC = () => {
  const [username, setUsername] = useState<string>("octocat");
  const [data, setData] = useState<IData | null>(null);

  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  return (
    <section className="w-full md:w-[760px] flex flex-col gap-8">
      <TypographyComp variant="title" text="GitGaze" />
      <InputComp setUsername={setUsername} />
      {data && <ProfileCard reff={divRef} {...data} />}
      {data && <ButtonComp onClick={downloadDivAsImage} title="Download" />}
      {/* <ButtonComp
        onClick={() => router.push("/dashboard")}
        title="Go to Dashboard"
      /> */}
    </section>
  );
};

export default MainSection;
