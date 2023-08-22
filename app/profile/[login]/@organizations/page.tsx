import { Flex, Text } from '@/components';
import { gql } from '@/gql';

import OrganizationItem from './OrganizationItem';

interface OrganizationsProps {
  params: { login: string };
}

const Organizations = async ({ params }: OrganizationsProps) => {
  const organizations = await gql.Orgranizations({ login: params.login });

  // eslint-disable-next-line no-promise-executor-return
  await (() => new Promise((res) => setTimeout(res, 10000)))();

  if (params.login === 'debabin')
    throw new Error(`failed to download data from github for user ${params.login}`);

  if (!organizations.user?.organizations.nodes?.length) return null;

  return (
    <>
      <Text size='lg'>Organizations</Text>
      <Flex direction='column' gap='sm' w='100%'>
        {organizations.user?.organizations.nodes?.map((organization) => (
          <OrganizationItem key={organization.id} organization={organization} />
        ))}
      </Flex>
    </>
  );
};

export default Organizations;
