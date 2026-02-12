import { githubRequest } from "@/lib/githubClient";
import { rewriteRelativePaths } from "@/lib/server.helpers";
import { GitHubAPIResponse } from "@/types/github/github.types";
import { GitHubReadmeResponse } from "@/types/github/repositories.types";
import { NextResponse } from "next/server";

const PROFILE_README_QUERY = `
query ($login: String!) {
  repository(owner: $login, name: $login) {
    defaultBranchRef {
      name
    }
    object(expression: "HEAD:README.md") {
      ... on Blob {
        text
      }
    }
  }
}
`;

export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };

  const result: GitHubAPIResponse<GitHubReadmeResponse> = await githubRequest(
    PROFILE_README_QUERY,
    { login },
  );

  if (!result.success || !result.data?.repository) {
    return NextResponse.json<GitHubAPIResponse<string>>({
      success: false,
      message: result.message,
      data: null,
    });
  }

  const repo = result.data.repository;
  const markdownText = result.data.repository.object?.text || "";
  const branch = repo.defaultBranchRef?.name || "main";

  const transformedMarkdown = rewriteRelativePaths(markdownText, login, branch);

  return NextResponse.json<GitHubAPIResponse<string>>({
    success: true,
    message: "OK",
    data: transformedMarkdown,
  });
}
