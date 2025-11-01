import { GitHubUser } from "@/types/github/user.types";
import { githubRequest } from "../../utils/githubClient";

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
