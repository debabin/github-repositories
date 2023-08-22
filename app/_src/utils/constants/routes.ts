export const ROUTES = {
  PROFILE: (login: string) => `/profile/${login}`,
  REPOSITORY: (owner: string, repository: string) => `/repositories/${owner}/${repository}`
};
