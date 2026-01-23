import { githubRequest } from "@/lib/githubClient";
import { connectDB } from "@/lib/mongo";
import Users from "@/models/Users";
import { GitHubAPIResponse } from "@/types/github/github.types";
import { GitHubUser } from "@/types/github/user.types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await Users.find({}).sort({ views: -1 }).lean();
    const usernames = users.map((u) => u.username);

    const query = `
      query {
        ${usernames
          .map(
            (u, i) => `
            user${i}: user(login: "${u}") {
              login
              avatarUrl
            }
          `,
          )
          .join("\n")}
      }
    `;

    const result = await githubRequest<{
      [key: string]: Pick<GitHubUser, "login" | "avatarUrl">;
    }>(query);

    const userdata = result.data ? Object.values(result.data) : [];
    return NextResponse.json<
      GitHubAPIResponse<Pick<GitHubUser, "login" | "avatarUrl">[]>
    >({
      success: true,
      message: "OK",
      data: userdata,
    });
  } catch (error) {
    console.error("GitGaze Avatar Pipeline Failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json<
      GitHubAPIResponse<Pick<GitHubUser, "login" | "avatarUrl">>
    >(
      {
        success: false,
        message: errorMessage,
        data: null,
      },
      { status: 404 },
    );
  }
}
