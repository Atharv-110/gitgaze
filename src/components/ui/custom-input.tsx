"use client";
import Image from "next/image";
import React from "react";
import Button from "./button";
import { useRouter } from "next/navigation";

const CustomInput = () => {
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const handleClick = () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      router.push(`/u/${trimmedValue}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };
  return (
    <div className="max-w-xl w-full flex items-stretch gap-2 p-1.5 rounded-full border border-gray-300">
      <Image
        src="/gitgaze_logo.png"
        alt="GitGaze Logo"
        width={50}
        height={50}
        className="pl-1.5 w-14 object-contain"
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        onKeyDown={handleKeyDown}
        className="w-full appearance-none outline-none text-[28px] font-medium placeholder:font-normal placeholder:text-[22px]"
        placeholder="Enter github username..."
      />
      <Button
        icon="ArrowRightIcon"
        size={28}
        className="w-14 h-14 aspect-square justify-center p-0 rounded-full"
        onClick={handleClick}
      />
    </div>
  );
};

export default CustomInput;
