import { NextResponse } from "next/server";
import {
  GitHubAPIResponse,
  Language,
  topMonthContributionProps,
  WrappedServerResponse,
  WrappedSlideProps,
} from "@/types/github/github.types";
import {
  GhContributionDay,
  GhUserContributionCollection,
} from "@/types/github/contributions.types";
import { githubRequest } from "../../utils/githubClient";
import { RepositoriesResponse } from "@/types/github/repositories.types";
import {
  aggregateLanguages,
  fetchYearlyContributions,
} from "../../utils/helper";

type WrappedQueryResponse = GhUserContributionCollection & RepositoriesResponse;

const WRAPPED_QUERY = `
query ($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      totalPullRequestContributions
      totalIssueContributions
      totalCommitContributions
      totalRepositoryContributions
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
    repositories(
      first: 10
      privacy: PUBLIC
      ownerAffiliations: OWNER
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      nodes {
        name
        stargazerCount
        updatedAt
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
  }
}
`;

const PREV_WRAPPED_QUERY = `
query ($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      totalPullRequestContributions
      totalIssueContributions
      totalCommitContributions
      totalRepositoryContributions
    }
  }
}`;

function prepareResponseData(data: {
  prevContributionsCollection: GhUserContributionCollection["contributionsCollection"];
  contributionsCollection: GhUserContributionCollection["contributionsCollection"];
  repositories: RepositoriesResponse["repositories"];
  topLanguages: Language[];
  topMonthContribution: topMonthContributionProps;
  wrappedYear: number;
}): WrappedServerResponse {
  const {
    contributionsCollection,
    prevContributionsCollection,
    repositories,
    topLanguages,
    topMonthContribution,
    wrappedYear,
  } = data;

  // Preparation of commits slide starts
  const commitsData = {
    prev: prevContributionsCollection.totalCommitContributions ?? 0,
    current: contributionsCollection.totalCommitContributions ?? 0,
  };
  const slide1 = {
    slot: 1,
    title: "Commits Overview",
    description: `From ${commitsData.prev} → ${commitsData.current} commits, ${wrappedYear} was built line-by-line.`,
    data: commitsData,
  };
  // Preparation of commits slide ends

  // Preparation of top languages slide starts
  const topThreeLanguages = topLanguages.slice(0, 3);
  const slide2 = {
    slot: 2,
    title: "Top Languages",
    description: `${topThreeLanguages[0].name} dominated your work — demonstrating scalability and structure.`,
    data: topThreeLanguages,
  };
  // Preparation of top languages slide ends

  // Preparation of top month slide starts
  const slide3 = {
    slot: 3,
    title: "Top Month Overview",
    description: `${topMonthContribution.monthName} lit up your graph — your breakthrough month.`,
    data: topMonthContribution,
  };
  // Preparation of top month slide ends
  return { wrappedYear, slides: [slide1, slide2, slide3] };
}

function getTopMonthContributions(
  data: GhContributionDay[],
  wrappedYear: number
) {
  const monthTotals: Record<number, number> = {};

  for (const { date, contributionCount } of data) {
    const month = new Date(date).getMonth(); // 0–11
    monthTotals[month] = (monthTotals[month] ?? 0) + contributionCount;
  }

  const monthIndex = Object.entries(monthTotals).reduce(
    (maxMonth, [month, total]) =>
      total > (monthTotals[maxMonth] ?? 0) ? Number(month) : maxMonth,
    0
  );

  return {
    monthIndex,
    monthName: new Date(wrappedYear, monthIndex).toLocaleString("default", {
      month: "long",
    }),
    monthData: data.filter(
      ({ date }) => new Date(date).getMonth() === monthIndex
    ),
  };
}

export async function POST(req: Request) {
  const { login } = (await req.json()) as { login: string };
  const wrappedYear =
    new Date().getMonth() === 11
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;
  const fromDate = new Date(`${wrappedYear}-01-01T00:00:00Z`);
  const toDate = new Date(`${wrappedYear}-12-31T23:59:59Z`);
  const result = await githubRequest<{
    user: WrappedQueryResponse;
  }>(WRAPPED_QUERY, {
    login,
    from: fromDate.toISOString(),
    to: toDate.toISOString(),
  });
  const prevYearContributions = await fetchYearlyContributions(
    PREV_WRAPPED_QUERY,
    login,
    `${wrappedYear - 1}-01-01T00:00:00Z`,
    `${wrappedYear - 1}-12-31T23:59:59Z`
  );

  if (!result.success || !result.data?.user || !prevYearContributions) {
    return NextResponse.json<
      GitHubAPIResponse<GhUserContributionCollection | RepositoriesResponse>
    >({
      success: false,
      message: "Wrapped or previous year data fetch failed",
      data: null,
    });
  }

  const prevContributionsCollection =
    prevYearContributions.contributionsCollection;
  const contributionsCollection = result.data.user.contributionsCollection;
  const repositories = result.data.user.repositories;

  const flattenData =
    contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays
    );

  const topMonthContribution = getTopMonthContributions(
    flattenData,
    wrappedYear
  );
  const topLanguages = aggregateLanguages(repositories.nodes);
  const response = prepareResponseData({
    prevContributionsCollection,
    contributionsCollection,
    repositories,
    topLanguages,
    topMonthContribution,
    wrappedYear,
  });

  return NextResponse.json<GitHubAPIResponse<WrappedServerResponse>>({
    success: true,
    message: "OK",
    data: response,
  });

  // console.log(topMonthContribution);
}
