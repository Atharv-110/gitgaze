export interface GhUserTotalContributions {
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions?: number;
    totalIssueContributions?: number;
    totalRepositoryContributions?: number;
  };
}

export interface GhContributionDay {
  date: string;
  contributionCount: number;
}

export interface GhContributionWeek {
  contributionDays: GhContributionDay[];
}

export interface GhUserContributionCalendar {
  contributionsCollection: {
    contributionCalendar: {
      weeks: GhContributionWeek[];
    };
  };
}
