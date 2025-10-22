export interface GitHubAPIResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface GitHubGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface GitHubUserStatus {
  message: string | null;
  emoji: string | null;
  emojiHTML: string | null;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  createdAt: string;
  avatarUrl: string;
  status: GitHubUserStatus | null;
  isEmployee: boolean;
  isViewer: boolean;
  isGitHubStar: boolean;
  isCampusExpert: boolean;
  isDeveloperProgramMember: boolean;
  isHireable: boolean;
  twitterUsername: string | null;
  websiteUrl: string | null;
}
