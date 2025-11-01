import { fetchGhYearlyContributions } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGhYearlyContributions = (username: string) => {
  return useQuery({
    queryKey: ["gh-user-yearly-contributions", username],
    queryFn: () => fetchGhYearlyContributions(username),
    enabled: !!username,
  });
};

export default useGhYearlyContributions;
