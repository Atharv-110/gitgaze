import { NextResponse } from "next/server";
import axios from "axios";
import { GhUserAchievement } from "@/types/github";

export async function POST(req: Request) {
  try {
    const { login } = (await req.json()) as { login: string };

    if (!login) {
      return NextResponse.json(
        { success: false, message: "username is required", data: null },
        { status: 400 }
      );
    }

    const apiUrl = `https://github-achievements-api.wangrunlin.workers.dev/${login}`;

    const { data } = await axios.get(apiUrl);

    const achievements: GhUserAchievement[] = data?.achievements ?? [];

    return NextResponse.json({
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
