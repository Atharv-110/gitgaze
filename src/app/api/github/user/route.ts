import { NextResponse } from "next/server";
import { githubRequest } from "../../../../lib/githubClient";
import type { GitHubAPIResponse } from "@/types/github/github.types";
import { GitHubUser } from "@/types/github/user.types";

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
        company
        email
        socialAccounts(first: 5) {
          nodes {
            provider
            url
          }
        }
        followers {
            totalCount
        }
        following {
            totalCount
        }
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
      {
        success: false,
        message: result.message,
        data: null,
      },
      { status: 404 },
    );
  }

  let modifiedUserData: GitHubUser = result.data.user;

  if (result.data.user.email) {
    modifiedUserData = {
      ...result.data.user,
      socialAccounts: {
        nodes: [
          ...result.data.user.socialAccounts.nodes,
          {
            provider: "EMAIL",
            url: `mailto:${result.data.user.email}`,
          },
        ],
      },
    };
  }

  return NextResponse.json<GitHubAPIResponse<GitHubUser>>({
    success: true,
    message: "OK",
    data: modifiedUserData,
  });
}
