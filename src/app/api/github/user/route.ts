import { NextResponse } from "next/server";
import { githubRequest } from "../utils/githubClient";
import type { GitHubAPIResponse, GitHubUser } from "@/types/github";

export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };

  const query = `
    query ($login: String!) {
      user(login: $login) {
        login
        name
        bio
        createdAt
        avatarUrl
        isDeveloperProgramMember
        twitterUsername
        websiteUrl
        status {
          message
          emoji
          emojiHTML
        }
      }
    }
  `;

  const result = await githubRequest<{ user: GitHubUser }>(query, { login });

  if (!result.success || !result.data?.user) {
    return NextResponse.json<GitHubAPIResponse<GitHubUser>>(
      { success: false, message: "User not found", data: null },
      { status: 404 }
    );
  }

  return NextResponse.json<GitHubAPIResponse<GitHubUser>>({
    success: true,
    message: "OK",
    data: result.data.user,
  });
}
