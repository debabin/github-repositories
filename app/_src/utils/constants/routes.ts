export const ROUTES = {
  PROFILE: (login: string) => `/profile/${login}`,
  REPOSITORY: (login: string, repository: string) => `/profile/${login}/repositories/${repository}`
};
