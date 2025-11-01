export interface GitHubAPIResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface GitHubGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface GhYearlyContribution {
  year: number;
  totalCommitContributions: number;
}

export interface GhStreak {
  count: number;
  startDate: string;
  endDate: string;
}
