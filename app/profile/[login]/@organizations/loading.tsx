import { Flex, Skeleton } from '@/components';

import OrganizationItemSkeleton from './OrganizationItemSkeleton';

const OrganizationsLoading = () => (
  <>
    <Skeleton height={25} width='20%' />
    <Flex direction='column' gap='sm' w='100%'>
      {Array.from({ length: 3 }).map((_el, index) => (
        <OrganizationItemSkeleton key={index} />
      ))}
    </Flex>
  </>
);

export default OrganizationsLoading;
