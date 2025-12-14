import { GitHubAPIResponse, Language } from "@/types/github/github.types";
import {
  RepositoriesResponse,
  RepositoryNode,
} from "@/types/github/repositories.types";
import { NextResponse } from "next/server";
import { githubRequest } from "../../utils/githubClient";

const SINGLE_WINDOW_SIZE = 100;
const MAX_LANGUAGES_PER_REPO = 10;

const LANGUAGE_QUERY = `
        query ($login: String!, $after: String) {
          user(login: $login) {
            repositories(first: ${SINGLE_WINDOW_SIZE}, privacy: PUBLIC, after: $after) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                name
                languages(first: ${MAX_LANGUAGES_PER_REPO}, orderBy: { field: SIZE, direction: DESC }) {
                  edges {
                    size
                    node {
                      name
                      color
                    }
                  }
                }
              }
            }
          }
        }
      `;

const aggregateLanguages = (repos: RepositoryNode[]): Language[] => {
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

export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };
  let hasNextPage = true;
  let afterCursor: string | null = null;
  const allRepos: RepositoryNode[] = [];
  while (hasNextPage) {
    const result: GitHubAPIResponse<{
      user: RepositoriesResponse;
    }> = await githubRequest(LANGUAGE_QUERY, { login, after: afterCursor });

    if (!result.success || !result.data?.user) {
      return NextResponse.json<GitHubAPIResponse<Language[]>>({
        success: false,
        message: result.message,
        data: null,
        status: result.status,
      });
    }

    const repoData = result.data?.user?.repositories;

    // Push new repo nodes
    allRepos.push(...repoData.nodes);
    hasNextPage = repoData.pageInfo.hasNextPage;
    afterCursor = repoData.pageInfo.endCursor;

    if (!afterCursor && hasNextPage) break;
  }
  return NextResponse.json<GitHubAPIResponse<Language[]>>({
    success: true,
    message: "Fetched repositories & languages successfully",
    data: aggregateLanguages(allRepos),
    status: 200,
  });
}
