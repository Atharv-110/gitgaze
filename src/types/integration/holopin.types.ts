export interface HolopinResponse {
  count: number;
  stickers: HolopinBadge[];
}

export interface HolopinBadge {
  id: string;
  name: string;
  description: string | null;
  notes: string | null;
  image: string;

  organization: HolopinOrganization;

  UserSticker: HolopinUserSticker[];
}

export interface HolopinOrganization {
  name: string;
  username: string;
  image: string;
  description: string | null;
}

export interface HolopinUserSticker {
  id: string;
  image: string | null;
  listed: boolean;
}

export interface GitGazeHolopinBadge extends Omit<
  HolopinBadge,
  "organization" | "UserSticker" | "notes"
> {}

export interface HacktoberfestYearGroup {
  year: number;
  badges: GitGazeHolopinBadge[];
}

export interface GitGazeHolopinResponse {
  hacktoberfest: {
    organization: HolopinOrganization | null;
    badges: HacktoberfestYearGroup[];
  };
  otherBadges: GitGazeHolopinBadge[];
}
