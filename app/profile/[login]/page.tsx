import { IconUsers, IconBuilding } from '@tabler/icons-react';
import { notFound } from 'next/navigation';

import { Avatar, Badge, Box, Text, Stack, Group, Flex } from '@/components';
import { gql } from '@/gql';

import { Followers } from './Followers';

interface ProfileProps {
  params: { login: string };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const Profile = async ({ params }: ProfileProps) => {
  const profile = await gql.Profile({ login: params.login }).catch(notFound);

  if (!profile.user) return notFound();

  return (
    <Stack>
      <Box>
        <Group sx={{ position: 'relative' }}>
          {profile.user.company && (
            <Badge
              gradient={{ from: 'blue.5', to: 'violet.5' }}
              size='sm'
              variant='gradient'
              sx={{
                position: 'absolute',
                top: '3%',
                right: '3%'
              }}
            >
              <Flex align='center'>
                <IconBuilding size='12px' stroke={1.5} />
                {profile.user.company}
              </Flex>
            </Badge>
          )}

          <Flex gap='xl'>
            <Avatar
              alt={profile.user.login}
              radius='md'
              src={profile.user.avatarUrl as string}
              sx={{
                height: '150px',
                width: '150px'
              }}
            />

            <Flex align='flex-start' direction='column' gap='5px'>
              <Text fw={700} mt='xs'>
                {profile.user.login}
              </Text>

              <Flex align='center' fz='xs' gap='3px'>
                <IconUsers size='12px' stroke={1.5} />
                <Text>followers</Text>
                <Text color='gray.3'>{profile.user.followers.totalCount}</Text>
                <Text>following</Text>
                <Text color='gray.3'>{profile.user.following.totalCount}</Text>
              </Flex>

              {!!profile.user.followers.totalCount && (
                <Group mt='sm'>
                  <Text size='sm'>followers:</Text>
                  <Followers login={params.login} />
                </Group>
              )}
            </Flex>
          </Flex>
        </Group>
      </Box>
    </Stack>
  );
};

export default Profile;
