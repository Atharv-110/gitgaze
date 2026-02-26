import { fetchGitgazeUsers } from "@/lib/fetcher";
import { PageParam } from "@/types/github/user.types";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGitgazeUsers = (allUsers: boolean = false) => {
  return useInfiniteQuery({
    queryKey: ["gitgaze-users", allUsers],

    queryFn: ({ pageParam }) =>
      fetchGitgazeUsers(pageParam?.lastViews, pageParam?.lastId, allUsers),

    initialPageParam: undefined as PageParam,

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
  });
};

export default useGitgazeUsers;
