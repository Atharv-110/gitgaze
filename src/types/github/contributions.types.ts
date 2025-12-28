export interface GhContributionDay {
  date: string;
  contributionCount: number;
}

export interface GhContributionWeek {
  contributionDays: GhContributionDay[];
}

export interface GhUserContributionCollection {
  contributionsCollection: {
    totalCommitContributions?: number;
    totalPullRequestContributions?: number;
    totalIssueContributions?: number;
    totalRepositoryContributions?: number;
    contributionCalendar: {
      weeks: GhContributionWeek[];
    };
  };
}
