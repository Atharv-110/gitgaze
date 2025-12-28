import { NextResponse } from "next/server";
import axios from "axios";
import { GhUserAchievement } from "@/types/github/user.types";
import { GitHubAPIResponse } from "@/types/github/github.types";

export async function POST(req: Request) {
  try {
    const { login } = (await req.json()) as { login: string };

    const apiUrl = `https://github-achievements-api.wangrunlin.workers.dev/${login}`;

    const { data } = await axios.get(apiUrl);

    if (!data) {
      return NextResponse.json<GitHubAPIResponse<GhUserAchievement[]>>(
        {
          success: false,
          message: "Failed to fetch achievements",
          data: null,
        },
        { status: 500 }
      );
    }

    const achievements: GhUserAchievement[] = data?.achievements ?? [];

    return NextResponse.json<GitHubAPIResponse<GhUserAchievement[]>>({
      success: true,
      message: "OK",
      data: achievements,
    });
  } catch (error: any) {
    console.error("Error fetching achievements:", error?.message);

    return NextResponse.json(
      { success: false, message: "Failed to fetch achievements", data: null },
      { status: 500 }
    );
  }
}
