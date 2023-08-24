import { IconStar, IconGitFork, IconBook2 } from '@tabler/icons-react';
import Link from 'next/link';

import { Card, Badge, Text, Flex } from '@/components';
import type { RepositoryType } from '@/gql';
import { ROUTES } from '@/utils/constants';

interface RepositoryItemProps {
  login: string;
  repository: RepositoryType;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ login, repository }) => (
  <Card withBorder padding='lg' radius='md' w='100%'>
    <Badge
      size='sm'
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px'
      }}
    >
      {repository.isPrivate ? 'private' : 'public'}
    </Badge>

    <Flex align='center' gap='3px'>
      <IconBook2 size='15px' stroke={1.5} />

      <Link href={ROUTES.REPOSITORY(login, repository.name)} prefetch={false}>
        <Text fw={500} fz='md'>
          {repository.name}
        </Text>
      </Link>
    </Flex>
    {repository.description && (
      <Text c='dimmed' fz='sm' mt={5}>
        {repository.description}
      </Text>
    )}

    {(!!repository.stargazerCount || !!repository.forkCount) && (
      <Flex align='center' fz='xs' gap='sm' mt='sm'>
        {!!repository.stargazerCount && (
          <Flex align='center' gap='2px'>
            <IconStar size='12px' stroke={1.5} />
            <Text color='gray.3'>{repository.stargazerCount}</Text>
          </Flex>
        )}
        {!!repository.forkCount && (
          <Flex align='center' gap='2px'>
            <IconGitFork size='12px' stroke={1.5} />
            <Text color='gray.3'>{repository.forkCount}</Text>
          </Flex>
        )}
      </Flex>
    )}
  </Card>
);

export default RepositoryItem;
