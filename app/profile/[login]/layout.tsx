import { Flex } from '@/components';

const ProfileLayout = ({
  children,
  repositories,
  organizations
}: {
  children: React.ReactNode;
  repositories: React.ReactNode;
  organizations: React.ReactNode;
}) => (
  <>
    {children}
    <Flex direction='column' gap='lg' mt='lg' w='100%'>
      {organizations}
      {repositories}
    </Flex>
  </>
);

export default ProfileLayout;
