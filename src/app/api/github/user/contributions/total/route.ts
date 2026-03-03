import {
  GhYearlyContribution,
  GitHubAPIResponse,
} from "@/types/github/github.types";
import { GitHubUser } from "@/types/github/user.types";
import { NextResponse } from "next/server";
import {
  fetchYearlyContributions,
  getUserCreatedAtDate,
} from "../../../../../../lib/server.helpers";

const TOTAL_CONTRIBUTIONS_QUERY = `
        query ($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
                contributionsCollection(from: $from, to: $to) {
                    totalCommitContributions
                    totalIssueContributions
                    totalPullRequestContributions
                    totalPullRequestReviewContributions
                    totalRepositoryContributions
                    restrictedContributionsCount
                }
            }
        }
    `;

export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };

  const userCreatedAt = await getUserCreatedAtDate(login);

  if (!userCreatedAt) {
    return NextResponse.json<GitHubAPIResponse<Pick<GitHubUser, "createdAt">>>({
      success: false,
      message: "User not found",
      data: null,
    });
  }
  const contributions: GhYearlyContribution[] = [];
  let startYear = userCreatedAt
    ? new Date(userCreatedAt).getFullYear()
    : new Date().getFullYear();
  let endYear = new Date().getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;
    const yearData = await fetchYearlyContributions(
      TOTAL_CONTRIBUTIONS_QUERY,
      login,
      from,
      to,
    );

    const contributionCollection = yearData?.contributionsCollection;

    contributions.push({
      year,
      totalCommitContributions:
        contributionCollection?.totalCommitContributions ?? 0,
      totalPullRequestContributions:
        contributionCollection?.totalPullRequestContributions ?? 0,
      totalIssueContributions:
        contributionCollection?.totalIssueContributions ?? 0,
      totalRepositoryContributions:
        contributionCollection?.totalRepositoryContributions ?? 0,
      totalPullRequestReviewContributions:
        contributionCollection?.totalPullRequestReviewContributions ?? 0,
      restrictedContributionsCount:
        contributionCollection?.restrictedContributionsCount ?? 0,
    });
  }

  return NextResponse.json<
    GitHubAPIResponse<{
      contributions: GhYearlyContribution[];
      userCreatedAt: string;
    }>
  >({
    success: true,
    message: "OK",
    data: { contributions, userCreatedAt },
  });
}
