import { fetchGitHubUser } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGithubUser = (username: string) => {
  return useQuery({
    queryKey: ["github-user", username],
    queryFn: () => fetchGitHubUser(username),
    enabled: !!username,
  });
};

export default useGithubUser;
