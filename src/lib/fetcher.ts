import { GhContributionDay } from "@/types/github/contributions.types";
import {
  GhYearlyContribution,
  Language,
  PaginatedAPIResponse,
  WrappedServerResponse,
} from "@/types/github/github.types";
import { RepositoryWithLanguageNames } from "@/types/github/repositories.types";
import { GitGazeUser, GitHubUser } from "@/types/github/user.types";
import { GitGazeHolopinResponse } from "@/types/integration/holopin.types";
import { axiosInstance } from "./axios";

export async function fetchGitHubUser(username?: string): Promise<GitHubUser> {
  if (!username) {
    return Promise.reject(new Error("Username is required"));
  }
  const res = await axiosInstance.post("/github/user", { login: username });
  return res.data.data;
}

export async function fetchGitgazeUsers(
  lastViews?: number,
  lastId?: string,
  allUsers: boolean = false,
  sort: string = "asc",
  limit?: number,
): Promise<
  PaginatedAPIResponse<
    GitGazeUser[],
    { lastViews: number; lastId: string } | null
  >
> {
  const res = await axiosInstance.get("/users", {
    params: {
      lastViews,
      lastId,
      allUsers,
      sort,
      limit,
    },
  });

  return res.data;
}

export async function fetchGhUserAchievements(username: string) {
  const res = await axiosInstance.post("/github/user/achievements", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhYearlyContributions(
  username: string,
): Promise<{ contributions: GhYearlyContribution[]; userCreatedAt: string }> {
  const res = await axiosInstance.post("/github/user/contributions/total", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhTotalStreaks(username: string): Promise<{
  currentStreak: { count: number; startDate: string; endDate: string };
  longestStreak: { count: number; startDate: string; endDate: string };
}> {
  const res = await axiosInstance.post("/github/user/contributions/streak", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhTopLanguages(
  username: string,
): Promise<Language[]> {
  const res = await axiosInstance.post("/github/user/languages", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhTopRepos(
  username: string,
): Promise<RepositoryWithLanguageNames[]> {
  const res = await axiosInstance.post("/github/user/repositories", {
    login: username,
  });
  return res.data.data;
}

export async function fetchGhContributionGraph(
  username: string,
  window?: number,
  year?: number,
): Promise<GhContributionDay[]> {
  const res = await axiosInstance.post("/github/user/contributions", {
    login: username,
    window: window,
    year: year,
  });
  return res.data.data;
}

export async function fetchGhWrappedData(
  username: string,
): Promise<WrappedServerResponse> {
  const res = await axiosInstance.post("/github/user/wrapped", {
    login: username,
  });
  return res.data.data;
}

export async function fetchHolopinBadges(
  username: string,
): Promise<GitGazeHolopinResponse> {
  const res = await axiosInstance.post("/holopin/badges", {
    holopinUsername: username,
  });
  return res.data.data;
}
