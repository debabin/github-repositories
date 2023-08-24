import { Flex, Text } from '@/components';
import { gql } from '@/gql';

import RepositoryItem from './RepositoryItem';

interface RepositoriesProps {
  params: { login: string };
}

const Repositories = async ({ params }: RepositoriesProps) => {
  const repositories = await gql.Repositories({ login: params.login });

  if (!repositories.user?.repositories.nodes?.length) return null;

  return (
    <>
      <Text size='lg'>Repositories</Text>
      <Flex direction='column' gap='sm' w='100%'>
        {repositories.user.repositories.nodes.map((node) => {
          if (!node) return null;
          return <RepositoryItem key={node.id} login={params.login} repository={node} />;
        })}
      </Flex>
    </>
  );
};

export default Repositories;
