import { Language } from "@/types/github/github.types";
import { ChartData } from "chart.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prepareLanguagePieData = (langs: Language[]): ChartData<"pie"> => {
  // Sort languages by size (descending)
  const sorted = [...langs].sort((a, b) => b.totalSize - a.totalSize);

  // Extract Top 5
  const topFive = sorted.slice(0, 6);

  // Remaining languages grouped into "Others"
  const others = sorted.slice(6);
  const othersTotal = others.reduce((sum, lang) => sum + lang.totalSize, 0);

  // Add "Others" only if needed
  if (others.length > 0) {
    topFive.push({
      name: "Others",
      totalSize: othersTotal,
      color: "#9CA3AF",
    });
  }

  // Create final chart dataset
  return {
    labels: topFive.map((lang) => lang.name),
    datasets: [
      {
        data: topFive.map((lang) => lang.totalSize),
        backgroundColor: topFive.map((lang) => lang.color),
        borderWidth: 1,
      },
    ],
  };
};

export function getTextWidth(
  text: string,
  fontSize: number = 12,
  fontFamily: string = "Montserrat, sans-serif",
  fontWeight: string = "normal"
): { width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return { width: 0, height: 0 };

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = context.measureText(text);

  const fontHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  return { width: metrics.width, height: fontHeight };
}
