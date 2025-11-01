import { GhYearlyContribution } from "@/types/github/github.types";
import { axiosInstance } from "./axios";

export async function fetchGitHubUser(username: string) {
  const res = await axiosInstance.post("/user", { login: username });
  return res.data.data;
}

export async function fetchGhUserAchievements(username: string) {
  const res = await axiosInstance.post("/user/achievements", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhYearlyContributions(
  username: string
): Promise<{ contributions: GhYearlyContribution[]; userCreatedAt: string }> {
  const res = await axiosInstance.post("/user/contributions/total", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhTotalStreaks(username: string): Promise<{
  currentStreak: { count: number; startDate: string; endDate: string };
  longestStreak: { count: number; startDate: string; endDate: string };
}> {
  const res = await axiosInstance.post("/user/contributions/streak", {
    login: username,
  });
  return res.data.data;
}
