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
  isHireable: boolean;
  twitterUsername: string | null;
  company: string | null;
  websiteUrl: string | null;
}

export interface GhUserAchievement {
  type: string | null;
  tier: number | null;
  image: string | null;
}
