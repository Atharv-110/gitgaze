import { GitHubUser } from "@/types/github/user.types";
import { githubRequest } from "../../utils/githubClient";
import { GhUserContributionCalendar } from "@/types/github/contributions.types";

export const getUserCreatedAtDate = async (
  login: string
): Promise<string | null> => {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        createdAt
      }
    }
  `;
  const result = await githubRequest<{ user: Pick<GitHubUser, "createdAt"> }>(
    query,
    { login }
  );
  if (!result.success || !result.data?.user) {
    return null;
  }

  return result.data.user.createdAt;
};

export const fetchUserContributionCalendar = async (
  login: string,
  query: string,
  from?: Date,
  to?: Date
) => {
  if (from && to) {
    return await githubRequest<{
      user: GhUserContributionCalendar;
    }>(query, { login, from: from.toISOString(), to: to.toISOString() });
  } else {
    return await githubRequest<{
      user: GhUserContributionCalendar;
    }>(query, { login });
  }
};
