import { GitHubAPIResponse, Language } from "@/types/github/github.types";
import {
  RepositoriesResponse,
  RepositoryNode,
} from "@/types/github/repositories.types";
import { NextResponse } from "next/server";
import { githubRequest } from "../../../../../lib/githubClient";
import { aggregateLanguages } from "../../../../../lib/server.helpers";

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
      });
    }

    const repoData = result.data?.user?.repositories;

    // Push new repo nodes
    allRepos.push(...repoData.nodes);
    hasNextPage = repoData.pageInfo ? repoData.pageInfo.hasNextPage : false;
    afterCursor = repoData.pageInfo ? repoData.pageInfo.endCursor : null;

    if (!afterCursor && hasNextPage) break;
  }

  const aggregatedLanguages = aggregateLanguages(allRepos);

  return NextResponse.json<GitHubAPIResponse<Language[]>>({
    success: true,
    message: "Fetched repositories & languages successfully",
    data: aggregatedLanguages,
  });
}
