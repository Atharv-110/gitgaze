import { fetchGhWrappedData } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGithubWrapped = (username: string) => {
  return useQuery({
    queryKey: ["github-wrapped", username],
    queryFn: () => fetchGhWrappedData(username),
    enabled: !!username,
  });
};

export default useGithubWrapped;
