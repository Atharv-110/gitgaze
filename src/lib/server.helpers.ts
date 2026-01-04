import { GitHubUser } from "@/types/github/user.types";
import { githubRequest } from "./githubClient";
import { GhUserContributionCollection } from "@/types/github/contributions.types";
import { RepositoryNode } from "@/types/github/repositories.types";
import { Language } from "@/types/github/github.types";

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

const CONTRIBUTION_QUERY = `
query ($login: String!, $from: DateTime, $to: DateTime) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

export const fetchUserContributionCalendar = async (
  login: string,
  from?: Date,
  to?: Date
) => {
  if (from && to) {
    return await githubRequest<{
      user: GhUserContributionCollection;
    }>(CONTRIBUTION_QUERY, {
      login,
      from: from.toISOString(),
      to: to.toISOString(),
    });
  } else {
    return await githubRequest<{
      user: GhUserContributionCollection;
    }>(CONTRIBUTION_QUERY, { login });
  }
};

export const fetchYearlyContributions = async (
  query: string,
  login: string,
  from: string,
  to: string
): Promise<GhUserContributionCollection | null> => {
  const res = await githubRequest<{
    user: GhUserContributionCollection;
  }>(query, { login, from, to });

  return res.data?.user ?? null;
};

export const aggregateLanguages = (repos: RepositoryNode[]): Language[] => {
  const map = new Map<string, { totalSize: number; color: string }>();

  for (const repo of repos) {
    for (const { size, node } of repo.languages.edges) {
      const { name, color } = node;
      const lang = map.get(name);
      if (!lang) {
        map.set(name, {
          totalSize: size ?? 0,
          color: color ?? "#000000",
        });
      } else {
        lang.totalSize += size ?? 0;
      }
    }
  }

  return [...map.entries()]
    .map(([name, info]) => ({
      name,
      totalSize: info.totalSize,
      color: info.color,
    }))
    .sort((a, b) => b.totalSize - a.totalSize);
};
