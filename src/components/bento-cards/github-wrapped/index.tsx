"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActiveMonthSlide,
  TopLanguageSlide,
  TotalContributionsSlide,
  UserSlide,
} from "./slides";
import Card from "@/components/card";
import useGithubUser from "@/hooks/useGithubUser";
import useGithubWrapped from "@/hooks/useGhWrapped";

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
  duration = 8000,
  username,
}) => {
  const [current, setCurrent] = useState(0);

  const { data: userData, isLoading: userLoading } = useGithubUser(username);
  const { data: wrappedData, isLoading: wrappedLoading } =
    useGithubWrapped(username);

  const isLoading = userLoading || wrappedLoading;

  const slides = useMemo(() => {
    if (!wrappedData || !userData) return [];
    return [
      { id: 1, content: <UserSlide userData={userData} /> },
      {
        id: 2,
        content: (
          <TotalContributionsSlide
            data={wrappedData.slides[0]}
            wrappedYear={wrappedData.wrappedYear}
          />
        ),
      },
      {
        id: 3,
        content: (
          <TopLanguageSlide
            data={wrappedData.slides[1]}
            wrappedYear={wrappedData.wrappedYear}
          />
        ),
      },
      {
        id: 4,
        content: (
          <ActiveMonthSlide
            data={wrappedData.slides[2]}
            wrappedYear={wrappedData.wrappedYear}
          />
        ),
      },
    ];
  }, [userData, wrappedData]);

  const totalSlides = slides.length;

  // Reset to slide 0 when data is ready
  useEffect(() => {
    if (!isLoading && totalSlides > 0) setCurrent(0);
  }, [isLoading, totalSlides]);

  useEffect(() => {
    if (isLoading || totalSlides === 0) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, duration);
    return () => clearTimeout(timer);
  }, [current, duration, totalSlides, isLoading]);

  const animation = useCallback(
    () => animations[current % animations.length],
    [current]
  )();

  return (
    <Card
      className="relative overflow-hidden rounded-xl border bg-white shadow-md max-sm:min-h-[255px]"
      isLoading={isLoading}
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        {slides[current] && (
          <motion.div
            key={slides[current].id}
            className="w-full h-full flex items-center justify-center text-center"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {slides[current].content}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROGRESS BAR */}
      {!isLoading && totalSlides > 0 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-1 flex gap-1 w-full px-3 md:px-5">
          {slides.map((_, index) => {
            const isDone = index < current;
            const isCurrent = index === current;

            return (
              <div
                key={index}
                className="flex-1 h-full bg-slate-200 rounded-full overflow-hidden"
              >
                {isDone && <div className="h-full w-full bg-slate-700" />}
                {isCurrent && (
                  <motion.div
                    className="h-full bg-slate-700"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default GithubWrapped;
