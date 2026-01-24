import React from "react";

const Background = () => {
  return (
    <>
      <div className="absolute -z-10 top-0 left-0 blur-[60px] md:blur-[120px] size-[200px] md:size-[300px] xl:size-[400px] rounded-full bg-gradient-to-b from-purple-500/60 to-purple-200 md:animate-upDown" />
      <div className="absolute -z-10 bottom-0 right-0 blur-[60px] md:blur-[120px] size-[200px] md:size-[300px] xl:size-[400px] rounded-full bg-gradient-to-b from-blue-500/60 to-blue-200 md:animate-downUp" />
    </>
  );
};

export default Background;
