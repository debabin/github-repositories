'use client';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
});

const authLink = setContext((_, { headers }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  headers: {
    ...headers,
    'User-Agent': 'debabin',
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_TOKEN ?? ''}`
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const useGluedEmotionCache = (key = 'emotion') => {
  const [cache] = useState(() => {
    const cache = createCache({ key });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const entries = Object.entries(cache.inserted);
    if (!entries.length) return null;

    const names = entries
      .map(([n]) => n)
      .filter((n) => typeof n === 'string')
      .join(' ');
    const styles = entries.map(([, s]) => s).join('\n');
    const emotionKey = `${key} ${names}`;
    return <style dangerouslySetInnerHTML={{ __html: styles }} data-emotion={emotionKey} />;
  });

  return cache;
};

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const cache = useGluedEmotionCache();

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={cache}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={cache}
          theme={{ colorScheme: 'dark' }}
        >
          {children}
        </MantineProvider>
      </CacheProvider>
    </ApolloProvider>
  );
};
