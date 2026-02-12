import { fetchGitHubUserReadme } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGithubUserReadme = (username: string) => {
  return useQuery({
    queryKey: ["github-user-readme", username],
    queryFn: () => fetchGitHubUserReadme(username),
    enabled: !!username,
  });
};

export default useGithubUserReadme;
