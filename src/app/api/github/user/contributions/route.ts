import {
  GhContributionDay,
  GhUserContributionCollection,
} from "@/types/github/contributions.types";
import { GitHubAPIResponse } from "@/types/github/github.types";
import { NextResponse } from "next/server";
import { fetchUserContributionCalendar } from "../../../../../lib/server.helpers";

export async function POST(req: Request) {
  const { login, window, year } = (await req.json()) as {
    login: string;
    window?: number;
    year?: number;
  };

  if (window && window > 365) {
    return NextResponse.json<GitHubAPIResponse<GhUserContributionCollection>>({
      success: false,
      message: "Window size cannot exceed 365 days",
      data: null,
    });
  }

  let endDate = year ? new Date(`${year}-12-31T23:59:59Z`) : new Date();
  let startDate = year ? new Date(`${year}-01-01T00:00:00Z`) : new Date();
  if (!year && window) {
    startDate.setDate(endDate.getDate() - window);
  }

  const result = await fetchUserContributionCalendar(login, startDate, endDate);

  if (!result.success || !result.data?.user) {
    return NextResponse.json<GitHubAPIResponse<GhUserContributionCollection>>({
      success: false,
      message: result.message,
      data: null,
    });
  }
  const flattenData =
    result.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays
    );

  return NextResponse.json<GitHubAPIResponse<GhContributionDay[]>>({
    success: true,
    message: "OK",
    data: flattenData,
  });
}
