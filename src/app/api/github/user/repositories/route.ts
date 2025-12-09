import { GitHubAPIResponse } from "@/types/github/github.types";
import {
  PinnedRepoResponse,
  RepositoryNode,
  RepositoryWithLanguageNames,
} from "@/types/github/repositories.types";
import { NextResponse } from "next/server";
import { githubRequest } from "../../utils/githubClient";

const PINNED_REPOS_QUERY = `
query ($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          stargazerCount
          languages(first:5, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              node {
                name
              }
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

  const result: GitHubAPIResponse<{
    user: PinnedRepoResponse;
  }> = await githubRequest(PINNED_REPOS_QUERY, { login });

  if (!result.success || !result.data?.user) {
    return NextResponse.json<GitHubAPIResponse<RepositoryNode[]>>(
      { success: false, message: "User not found", data: null },
      { status: 404 }
    );
  }
  let nodes: RepositoryWithLanguageNames[] = [];
  if (result.success && result.data?.user) {
    nodes = result.data.user.pinnedItems.nodes.map((repo: RepositoryNode) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      homepageUrl: repo.homepageUrl,
      stargazerCount: repo.stargazerCount,
      languageNames: Array.isArray(repo.languages?.edges)
        ? repo.languages.edges
            .map((edge) => edge.node.name)
            .filter((name): name is string => Boolean(name))
        : [],
    }));
  }
  return NextResponse.json<GitHubAPIResponse<RepositoryWithLanguageNames[]>>({
    success: true,
    message: "OK",
    data: nodes,
  });
}
