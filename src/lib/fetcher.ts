import { GhContributionDay } from "@/types/github/contributions.types";
import {
  GhYearlyContribution,
  Language,
  WrappedServerResponse,
} from "@/types/github/github.types";
import { RepositoryWithLanguageNames } from "@/types/github/repositories.types";
import { GitHubUser } from "@/types/github/user.types";
import { axiosInstance } from "./axios";

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
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

export async function fetchGhTopLanguages(
  username: string
): Promise<Language[]> {
  const res = await axiosInstance.post("/user/languages", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhTopRepos(
  username: string
): Promise<RepositoryWithLanguageNames[]> {
  const res = await axiosInstance.post("/user/repositories", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhContributionGraph(
  username: string,
  window?: number,
  year?: number
): Promise<GhContributionDay[]> {
  const res = await axiosInstance.post("/user/contributions", {
    login: username,
    window: window,
    year: year,
  });
  return res.data.data;
}

export async function fetchGhWrappedData(
  username: string
): Promise<WrappedServerResponse> {
  const res = await axiosInstance.post("/user/wrapped", {
    login: username,
  });
  return res.data.data;
}
