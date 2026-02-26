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
  followers: { totalCount: number };
  following: { totalCount: number };
  isDeveloperProgramMember: boolean;
  company: string | null;
  websiteUrl: string | null;
  socialAccounts: { nodes: GhSocialAccountNode[] | [] };
  email?: string | null;
}

export interface GhSocialAccountNode {
  provider: string;
  url: string;
}

export interface GhUserAchievement {
  type: string | null;
  tier: number | null;
  image: string | null;
}

export interface GitGazeUser extends GitHubUser {
  views: number;
}

export type PageParam =
  | { lastViews: number; lastId: string }
  | undefined
  | null;
