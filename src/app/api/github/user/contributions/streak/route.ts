import {
  GhContributionDay,
  GhContributionWeek,
} from "@/types/github/contributions.types";
import { GhStreak, GitHubAPIResponse } from "@/types/github/github.types";
import { NextResponse } from "next/server";
import { fetchUserContributionCalendar } from "../../../../../../lib/server.helpers";

const calculateStreak = (weeks: GhContributionWeek[]) => {
  const days: GhContributionDay[] = weeks.flatMap((w) => w.contributionDays);
  let currentStreak = { count: 0, startDate: "", endDate: "" };
  let longestStreak = { count: 0, startDate: "", endDate: "" };
  let tempStreak = 0;

  for (let i = 0; i < days.length; i++) {
    if (days[i].contributionCount > 0) {
      tempStreak++;
      longestStreak =
        tempStreak > longestStreak.count
          ? {
              count: tempStreak,
              startDate: days[i - tempStreak + 1]?.date,
              endDate: days[i].date,
            }
          : longestStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Calculate CURRENT streak
  for (let i = days.length - 2; i > 0; i--) {
    const currDay = new Date(days[i].date);
    const prevDay = new Date(days[i - 1].date);

    const diffInTime = currDay.getTime() - prevDay.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (days[i].contributionCount > 0) {
      if (diffInDays <= 1.1) {
        currentStreak.count++;
        currentStreak.startDate = days[i - 1].date;
        currentStreak.endDate = days[days.length - 1].date;
      } else {
        break;
      }
    } else break;
  }

  // Include the last day if contributions exist
  if (days[days.length - 1].contributionCount > 0) {
    currentStreak.count++;
    currentStreak.endDate = days[days.length - 1].date;
  }

  return { currentStreak, longestStreak };
};

export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };
  const result = await fetchUserContributionCalendar(login);

  if (!result.success || !result.data?.user) {
    return NextResponse.json<
      GitHubAPIResponse<{ currentStreak: GhStreak; longestStreak: GhStreak }>
    >({
      success: false,
      message: result.message,
      data: null,
    });
  }

  const weeks =
    result.data.user.contributionsCollection.contributionCalendar.weeks;

  const totalStreaks = calculateStreak(weeks);

  return NextResponse.json<
    GitHubAPIResponse<{ currentStreak: GhStreak; longestStreak: GhStreak }>
  >({
    success: true,
    message: result.message,
    data: totalStreaks,
  });
}
