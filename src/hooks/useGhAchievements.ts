import { fetchGhUserAchievements, fetchGitHubUser } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import useGithubUser from "./useGithubUser";

const useGhUserAchievements = (username: string) => {
  return useQuery({
    queryKey: ["gh-user-achievements", username],
    queryFn: () => fetchGhUserAchievements(username),
    enabled: !!username,
  });
};

export default useGhUserAchievements;
