import { NextResponse } from "next/server";
import axios from "axios";
import { GhUserAchievement } from "@/types/github/user.types";
import { GitHubAPIResponse } from "@/types/github/github.types";

export async function POST(req: Request) {
  try {
    const { login } = (await req.json()) as { login: string };

    const apiUrl = `https://github-achievements-api.wangrunlin.workers.dev/${login}`;

    const { data } = await axios.get(apiUrl);

    const achievements: GhUserAchievement[] = data?.achievements ?? [];

    return NextResponse.json<GitHubAPIResponse<GhUserAchievement[]>>({
      success: true,
      message: "OK",
      data: achievements,
    });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    console.error("Error fetching achievements:", errorMessage);

    return NextResponse.json(
      { success: false, message: "No Achievements Found", data: null },
      { status: 404 },
    );
  }
}
