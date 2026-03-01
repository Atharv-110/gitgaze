export const Route = {
  HOME: "/",
  DISCOVER: "/discover",
  USER_PROFILE: (username?: string) => `/u/${username}`,
  USER_README: (username?: string) => `/u/${username}/readme`,
  OPENGRAPH_IMAGE: (username?: string) => `/u/${username}/opengraph-image`,
} as const;

export const ApiRoute = {
  USERS: "/api/users",
} as const;
