export interface GitHubAPIResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  status: number;
}

export interface GitHubGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
  status?: number;
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

export interface Language {
  name: string;
  totalSize: number;
  color: string;
}

export interface WrappedSlideProps {
  title: string;
  description: string;
  stats: number | string | number[] | string[];
}
