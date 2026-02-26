"use client";
import useGitgazeUsers from "@/hooks/useGitgazeUsers";
import ProfileCard from "./bento-cards/profile-card";
import Loader from "./ui/loader";

const UsersComponent = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGitgazeUsers();

  const users = data?.pages.flatMap((page) => page.data ?? []) ?? [];

  return (
    <div className="flex flex-col items-center gap-6">
      {isLoading ? (
        <Loader size={20} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {users.map((user, index) => (
            <ProfileCard key={index} initData={user} />
          ))}
        </div>
      )}
      {hasNextPage &&
        (isFetchingNextPage ? (
          <Loader size={20} />
        ) : (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Load More
          </button>
        ))}
    </div>
  );
};

export default UsersComponent;
