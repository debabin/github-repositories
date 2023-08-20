'use client';

import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Autocomplete } from '@/components';
import { SearchType, useSearchQuery } from '@/gql';
import { ROUTES } from '@/utils/constants';

import { SearchBoxItem } from './components/SearchBoxItem';

export const SearchBox = () => {
  const router = useRouter();

  const [value, setValue] = React.useState('');
  const [debouncedValue] = useDebouncedValue(value, 1000);

  const searchQuery = useSearchQuery({
    variables: {
      first: 10,
      query: '',
      type: SearchType.User
    },
    notifyOnNetworkStatusChange: true
  });

  const options =
    searchQuery.data?.search.edges
      ?.filter(({ node }) => node && node.__typename === 'User' && !!node.login)
      .map(({ node }) => {
        if (node && node.__typename === 'User') {
          return { ...node, value: node.login };
        }

        return node;
      }) ?? [];

  const handleChange = (value: string) => setValue(value);

  React.useEffect(() => {
    searchQuery.refetch({ query: debouncedValue });
  }, [debouncedValue]);

  return (
    <Autocomplete
      data={options}
      disabled={searchQuery.loading}
      icon={<IconSearch />}
      itemComponent={SearchBoxItem}
      limit={5}
      nothingFound='not found'
      placeholder='Your email'
      // rightSection={searchQuery.loading ?? <Loader size='1rem' />}
      value={value}
      onChange={handleChange}
      onItemSubmit={(option) => router.push(ROUTES.PROFILE(option.value))}
    />
  );
};
