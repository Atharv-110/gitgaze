import { GhContributionDay } from "./contributions.types";

export interface GitHubAPIResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface PaginatedAPIResponse<T, C> extends GitHubAPIResponse<T> {
  nextCursor: C | null;
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

export interface topMonthContributionProps {
  monthIndex: number;
  monthName: string;
  monthData: GhContributionDay[];
}

export interface CommitsSlideData {
  prev: number;
  current: number;
}

export type WrappedSlideData =
  | CommitsSlideData
  | Language[]
  | topMonthContributionProps;

export interface WrappedSlideProps {
  slot: number;
  title: string;
  description: string;
  data: WrappedSlideData;
}

export interface WrappedServerResponse {
  wrappedYear: number;
  slides: WrappedSlideProps[];
}

export type UserSlugProps = {
  params: Promise<{ username: string }>;
};
