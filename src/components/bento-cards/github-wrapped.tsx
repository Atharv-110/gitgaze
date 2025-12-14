"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

type Slide = {
  id: number;
  title: string;
  description: string;
};

interface GithubWrappedProps {
  duration?: number; // time per slide (ms)
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
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
];

const slides = [
  {
    id: 1,
    title: "🔥 Your Top Language in 2025",
    description: "TypeScript dominated your commits this year!",
  },
  {
    id: 2,
    title: "🚀 Most Active Month",
    description: "You shipped the most code in October.",
  },
  {
    id: 3,
    title: "⭐ Your Highlight PR",
    description: "Merged a big feature in leetburns repo!",
  },
];

const GithubWrapped: React.FC<GithubWrappedProps> = ({ duration = 4000 }) => {
  const [current, setCurrent] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, duration);

    return () => clearTimeout(timer);
  }, [current, duration, totalSlides]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border bg-white p-4 shadow-md flex flex-col justify-center items-center">
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center"
          initial={animations[current % animations.length].initial}
          animate={animations[current % animations.length].animate}
          exit={animations[current % animations.length].exit}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h2 className="text-lg font-bold mb-2">{slides[current].title}</h2>
          <p className="text-sm opacity-80">{slides[current].description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 bg-slate-100 rounded-full h-1.5">
        <motion.div
          key={current}
          className="h-full bg-slate-700 overflow-hidden rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: duration / 1000,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default GithubWrapped;
