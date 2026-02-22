"use client";
import Image from "next/image";
import React from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route.enum";

const CustomInput = () => {
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const handleClick = () => {
    const userName = value.trim();
    if (userName) {
      router.push(Route.USER_PROFILE(userName));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };
  return (
    <div className="max-w-xl w-full flex items-stretch gap-1 p-1 rounded-full bg-white border border-gray-300">
      <Image
        src="/gitgaze_logo.png"
        alt="GitGaze Logo"
        width={50}
        height={50}
        className="pl-2 w-11 mx-auto aspect-square object-contain"
        quality={75}
        priority
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent appearance-none outline-none md:text-2xl font-semibold placeholder:font-normal md:placeholder:text-[20px]"
        placeholder="Enter github username..."
      />
      <Button
        icon="ArrowRightIcon"
        size={28}
        className="w-12 h-12 aspect-square justify-center p-0 rounded-full bg-black border-black hover:opacity-80"
        color="text-white group-hover:text-white"
        onClick={handleClick}
      />
    </div>
  );
};

export default CustomInput;
