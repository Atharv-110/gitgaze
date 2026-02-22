import { fetchGitHubUser } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

type UseGithubUserOptions = {
  enabled?: boolean;
};

const useGithubUser = (
  username?: string,
  options: UseGithubUserOptions = {},
) => {
  const { enabled = !!username } = options;

  return useQuery({
    queryKey: ["github-user", username],
    queryFn: () => fetchGitHubUser(username),
    enabled,
  });
};

export default useGithubUser;
