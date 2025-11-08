import { fetchGhTopLanguages } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGhTopLanguages = (username: string) => {
  return useQuery({
    queryKey: ["gh-user-top-languages", username],
    queryFn: () => fetchGhTopLanguages(username),
    enabled: !!username,
  });
};

export default useGhTopLanguages;
