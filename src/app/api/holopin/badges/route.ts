import { transformHolopinData } from "@/lib/server.helpers";
import { GitHubAPIResponse } from "@/types/github/github.types";
import {
  GitGazeHolopinResponse,
  HolopinResponse,
} from "@/types/integration/holopin.types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { holopinUsername } = (await req.json()) as {
      holopinUsername: string;
    };

    const apiUrl = `https://www.holopin.io/api/stickers?username=${holopinUsername}`;

    const { data } = await axios.get(apiUrl);

    const badges: HolopinResponse = data?.data ?? null;

    if (!badges || badges.count < 1) {
      return NextResponse.json(
        { success: false, message: "No Holopin Badges Found", data: null },
        { status: 404 },
      );
    }

    const transformedData = transformHolopinData(badges);

    return NextResponse.json<GitHubAPIResponse<GitGazeHolopinResponse>>({
      success: true,
      message: "OK",
      data: transformedData,
    });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    console.error("Error fetching holopin data:", errorMessage);

    return NextResponse.json(
      { success: false, message: "No Badges Found", data: null },
      { status: 404 },
    );
  }
}
