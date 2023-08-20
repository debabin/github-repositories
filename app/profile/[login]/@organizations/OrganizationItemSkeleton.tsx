import { Card, Avatar, Group, Skeleton } from '@/components';

const OrganizationItemSkeleton = () => (
  <Card padding='lg' radius='md' w='100%'>
    <Group position='apart'>
      <Avatar component={Skeleton} size='md' />
    </Group>

    <Skeleton height={6} mt={5} radius='xl' width='20%' />

    <Skeleton height={6} mt={5} radius='xl' />
    <Skeleton height={6} mt={5} radius='xl' />
    <Skeleton height={6} mt={5} radius='xl' width='70%' />
  </Card>
);

export default OrganizationItemSkeleton;
