import { fetchGitgazeUsers } from "@/lib/fetcher";
import { PageParam } from "@/types/github/user.types";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGitgazeUsers = (
  allUsers: boolean = false,
  sort: string = "asc",
  limit?: number,
) => {
  return useInfiniteQuery({
    queryKey: ["gitgaze-users", allUsers, sort, limit],

    queryFn: ({ pageParam }) =>
      fetchGitgazeUsers(
        pageParam?.lastViews,
        pageParam?.lastId,
        allUsers,
        sort,
        limit,
      ),

    initialPageParam: undefined as PageParam,

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
  });
};

export default useGitgazeUsers;
