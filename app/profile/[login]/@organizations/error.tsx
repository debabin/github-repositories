'use client';

import { IconAlertCircle } from '@tabler/icons-react';

import { Alert, Button, Flex, Text } from '@/components';

interface OrganizationsErrorProps {
  error: Error;
  reset: () => void;
}

const OrganizationsError: React.FC<OrganizationsErrorProps> = ({ error, reset }) => (
  <>
    <Text size='lg'>Organizations</Text>
    <Alert
      color='red'
      icon={<IconAlertCircle size='1rem' />}
      radius='md'
      title='Something went wrong'
      w='100%'
    >
      <Flex direction='column' gap='xs'>
        <Text>{error.message}</Text>

        <Button color='red' size='xs' variant='outline' onClick={() => reset()}>
          Try again
        </Button>
      </Flex>
    </Alert>
  </>
);

export default OrganizationsError;
