import { fetchHolopinBadges } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useHolopinBadges = (username: string) => {
  return useQuery({
    queryKey: ["holopin-badges", username],
    queryFn: () => fetchHolopinBadges(username),
    enabled: !!username,
  });
};

export default useHolopinBadges;
