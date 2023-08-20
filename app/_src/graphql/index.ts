import { GraphQLClient } from 'graphql-request';

import { getSdk } from './requests/__generated__';

const client = new GraphQLClient(`https://api.github.com/graphql`, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_TOKEN || ''}`
  }
});

export const gql = getSdk(client);

export { useSearchQuery, SearchType, useFollowersQuery } from './hooks/__generated__';
export type { RepositoriesQuery } from './hooks/__generated__';
