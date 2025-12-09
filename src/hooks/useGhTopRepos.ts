import { fetchGhTopRepos } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGhTopRepos = (username: string) => {
  return useQuery({
    queryKey: ["gh-user-top-repos", username],
    queryFn: () => fetchGhTopRepos(username),
    enabled: !!username,
  });
};

export default useGhTopRepos;
