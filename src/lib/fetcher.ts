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
