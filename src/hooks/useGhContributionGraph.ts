import { fetchGhContributionGraph } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGhContributionGraph = (username: string, window: number) => {
  return useQuery({
    queryKey: ["gh-user-contribution-graph", username, window],
    queryFn: () => fetchGhContributionGraph(username, window),
    enabled: !!username,
  });
};

export default useGhContributionGraph;
