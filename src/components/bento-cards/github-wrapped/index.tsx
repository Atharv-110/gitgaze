"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActiveMonthSlide,
  HighlightPRSlide,
  TopLanguageSlide,
  TotalContributionsSlide,
  UserSlide,
} from "./slides";
import Card from "@/components/card";
import useGithubUser from "@/hooks/useGithubUser";

interface GithubWrappedProps {
  duration?: number;
  username: string;
}

const animations = [
  {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
  },
  {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  },
  {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.85, opacity: 0 },
  },
];

const GithubWrapped: React.FC<GithubWrappedProps> = ({
  duration = 5000,
  username,
}) => {
  const [current, setCurrent] = useState(0);
  const {
    data: userData,
    isLoading: userDataLoading,
    error,
  } = useGithubUser(username);

  const slides = useMemo(
    () => [
      { id: 1, content: <UserSlide userData={userData} /> },
      { id: 2, content: <TotalContributionsSlide /> },
      { id: 3, content: <TopLanguageSlide /> },
      // { id: 4, content: <HighlightPRSlide /> },
    ],
    [userData]
  );

  const totalSlides = slides.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, duration);

    return () => clearTimeout(timer);
  }, [current, duration, totalSlides]);

  const animation = animations[current % animations.length];

  return (
    <Card
      className="relative overflow-hidden rounded-xl border bg-white shadow-md max-sm:min-h-[255px]"
      isLoading={userDataLoading}
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="w-full h-full flex items-center justify-center text-center"
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {slides[current].content}
          {/* <TopLanguageSlide /> */}
        </motion.div>
      </AnimatePresence>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          key={current}
          className="h-full bg-slate-700 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: duration / 1000,
            ease: "linear",
          }}
        />
      </div>
    </Card>
  );
};

export default GithubWrapped;
