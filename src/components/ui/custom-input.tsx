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
  return (
    <div className="max-w-xl w-full flex items-stretch gap-2 p-1 rounded-full border border-gray-300">
      <Image
        src="/gitgaze_logo.svg"
        alt="GitGaze Logo"
        width={56}
        height={56}
        className="h-full fill-black"
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="w-full appearance-none outline-none text-3xl leading-none font-medium placeholder:font-normal placeholder:text-[22px]"
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
