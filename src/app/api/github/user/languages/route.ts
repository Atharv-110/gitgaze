import { GitHubAPIResponse, Language } from "@/types/github/github.types";
import {
  RepositoriesResponse,
  RepositoryNode,
} from "@/types/github/repositories.types";
import { NextResponse } from "next/server";
import { githubRequest } from "../../utils/githubClient";

const SINGLE_WINDOW_SIZE = 100;
const MAX_LANGUAGES_PER_REPO = 10;

const aggregateLanguages = (repos: RepositoryNode[]): Language[] => {
  const languageMap: Record<string, { totalSize: number; color: string }> = {};

  repos.forEach((repo) => {
    repo.languages.edges.forEach(({ size, node }) => {
      const { name, color } = node;

      if (!languageMap[name]) {
        languageMap[name] = { totalSize: size, color: color ?? "#000000" };
      } else {
        languageMap[name].totalSize += size;
      }
    });
  });

  return Object.entries(languageMap)
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
    const query = `
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

    const result = await githubRequest<{
      user: RepositoriesResponse;
    }>(query, { login });

    if (!result.success || !result.data?.user) {
      return NextResponse.json<GitHubAPIResponse<Language[]>>(
        { success: false, message: "User not found", data: null },
        { status: 404 }
      );
    }

    const repoData = result.data?.user?.repositories;

    // Push new repo nodes
    allRepos.push(...repoData.nodes);
    hasNextPage = repoData.pageInfo.hasNextPage;
    afterCursor = repoData.pageInfo.endCursor;
  }
  return NextResponse.json<GitHubAPIResponse<Language[]>>({
    success: true,
    message: "Fetched repositories & languages successfully",
    data: aggregateLanguages(allRepos),
  });
}
