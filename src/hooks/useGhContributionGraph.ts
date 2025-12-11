import { fetchGhContributionGraph } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGhContributionWindow = (
  username: string,
  window?: number,
  year?: number
) => {
  return useQuery({
    queryKey: ["gh-user-contribution-graph", username, window, year],
    queryFn: () => fetchGhContributionGraph(username, window, year),
    enabled: !!username,
  });
};

export default useGhContributionWindow;
