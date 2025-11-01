import { fetchGhTotalStreaks } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGhTotalStreaks = (username: string) => {
  return useQuery({
    queryKey: ["gh-user-total-streaks", username],
    queryFn: () => fetchGhTotalStreaks(username),
    enabled: !!username,
  });
};

export default useGhTotalStreaks;
