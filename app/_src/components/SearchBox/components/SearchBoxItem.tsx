import React from 'react';

import type { SelectItemProps } from '@/components';
import { Text, Avatar, Box, Flex } from '@/components';

interface SearchBoxItemProps extends SelectItemProps {
  avatarUrl: string;
  login: string;
  name?: string;
  status?: {
    emoji?: string;
    message?: string;
  };
}

export const SearchBoxItem = React.forwardRef<HTMLDivElement, SearchBoxItemProps>(
  ({ avatarUrl, login, name, status, ...props }, ref) => (
    <Flex ref={ref} {...props} gap='sm'>
      <Avatar src={avatarUrl} />
      <Box>
        <Text>{login}</Text>
        {name && (
          <Text color='dimmed' size='xs'>
            {name} {status && <Box>{status.message}</Box>}
          </Text>
        )}
      </Box>
    </Flex>
  )
);
