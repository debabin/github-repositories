import { IconBook2, IconStar, IconGitFork } from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge, Flex, Text, Progress, Card, Box, Avatar, Tooltip } from '@/components';
import { gql } from '@/gql';
import { ROUTES } from '@/utils/constants';

interface RepositoryModalProps {
  params: { login: string; repository: string };
}

const Repository = async ({ params }: RepositoryModalProps) => {
  const { repository } = await gql.Repository({ owner: params.login, name: params.repository });

  if (!repository) return notFound();

  return (
    <>
      <Flex gap='lg'>
        <Card withBorder mt='sm' padding='lg' radius='md'>
          <Badge size='sm'>{repository.isPrivate ? 'private' : 'public'}</Badge>
          <Flex align='center' gap='3px'>
            <IconBook2 size='15px' stroke={1.5} />
            <a href={repository.url as string} rel='noreferrer' target='_blank'>
              <Text fw={500} fz='md'>
                {repository.name}
              </Text>
            </a>
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

        {!!repository.languages?.edges?.length && !!repository.languages?.totalSize && (
          <Card withBorder mt='sm' padding='lg' radius='md' w='30%'>
            <Box>
              <Text fz='xs'>Languages</Text>
              <Progress
                fz='xs'
                mt='lg'
                radius='xs'
                size={10}
                sections={repository.languages.edges.map((language) => {
                  const value = (language.size / repository.languages.totalSize) * 100;

                  return {
                    value,
                    color: language.node.color ?? 'gray',
                    tooltip: `${language.node.name} ${Math.round(value * 100) / 100}%`
                  };
                })}
              />

              <Flex columnGap='sm' mt='md' rowGap='5px' wrap='wrap'>
                {repository.languages.edges.map((language) => {
                  const value = (language.size / repository.languages.totalSize) * 100;

                  return (
                    <Flex align='center' gap='3px'>
                      <Box
                        sx={{
                          backgroundColor: language.node.color,
                          width: '5px',
                          height: '5px',
                          borderRadius: '100%'
                        }}
                      />
                      <Text fz='xs'>
                        {language.node.name} {Math.round(value * 100) / 100}%
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          </Card>
        )}
      </Flex>

      {!!repository.issues.nodes?.length && (
        <Box mt='lg'>
          <Flex gap='sm'>
            <Text fz='xs'>Issues</Text>
            <Badge>{repository.issues.totalCount}</Badge>
          </Flex>

          <Flex direction='column' gap='lg' mt='md'>
            {repository.issues.nodes.map((issue) => (
              <Card padding='lg' pos='relative' radius='md'>
                {issue.author && (
                  <Tooltip label={issue.author.login}>
                    <Avatar
                      component='a'
                      href={ROUTES.PROFILE(issue.author.login)}
                      radius='lg'
                      size='sm'
                      src={issue.author.avatarUrl as string}
                      sx={{ position: 'absolute', top: '10px', right: '10px' }}
                    />
                  </Tooltip>
                )}

                <Flex direction='column' gap='md'>
                  <Flex align='center' gap='3px'>
                    <Link href={issue.url as string}>
                      <Text fw={500} fz='md'>
                        {issue.title}
                      </Text>
                    </Link>
                    <Badge color={issue.closed ? 'red' : 'green'} size='xs'>
                      {issue.closed ? 'closed' : 'open'}
                    </Badge>
                  </Flex>

                  {issue.labels?.nodes?.length && (
                    <Flex gap='sm' wrap='wrap'>
                      {issue.labels.nodes.map((label) => (
                        <Badge key={label.id} size='xs'>
                          {label.name}
                        </Badge>
                      ))}
                    </Flex>
                  )}

                  <Text fz='xs'>{issue.bodyText}</Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Repository;
