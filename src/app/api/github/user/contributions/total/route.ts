import {
  GhYearlyContribution,
  GitHubAPIResponse,
} from "@/types/github/github.types";
import { NextResponse } from "next/server";
import { githubRequest } from "../../../utils/githubClient";
import { getUserCreatedAtDate } from "../helper";
import { GhUserTotalContributions } from "@/types/github/contributions.types";
import { GitHubUser } from "@/types/github/user.types";

const fetchOneWindow = async (
  login: string,
  from: string,
  to: string
): Promise<GhUserTotalContributions | null> => {
  const query = `
        query ($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
                contributionsCollection(from: $from, to: $to) {
                    totalCommitContributions
                }
            }
        }
    `;
  const res = await githubRequest<{
    user: GhUserTotalContributions;
  }>(query, { login, from, to });

  return res.data?.user ?? null;
};

export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };

  const userCreatedAt = await getUserCreatedAtDate(login);

  if (!userCreatedAt) {
    return NextResponse.json<GitHubAPIResponse<Pick<GitHubUser, "createdAt">>>(
      { success: false, message: "User not found", data: null },
      { status: 404 }
    );
  }
  const contributions: GhYearlyContribution[] = [];
  let startYear = userCreatedAt
    ? new Date(userCreatedAt).getFullYear()
    : new Date().getFullYear();
  let endYear = new Date().getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;
    const yearData = await fetchOneWindow(login, from, to);

    contributions.push({
      year,
      totalCommitContributions:
        yearData?.contributionsCollection.totalCommitContributions ?? 0,
    });
  }

  return NextResponse.json({
    success: true,
    message: "OK",
    data: { contributions, userCreatedAt },
  });
}
