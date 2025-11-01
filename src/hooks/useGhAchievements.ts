import { fetchGhUserAchievements } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGhUserAchievements = (username: string) => {
  return useQuery({
    queryKey: ["gh-user-achievements", username],
    queryFn: () => fetchGhUserAchievements(username),
    enabled: !!username,
  });
};

export default useGhUserAchievements;
