import { IconError404 } from '@tabler/icons-react';

import { Center, Title, Flex, Text } from '@/components';

const NotFound = () => (
  <Center>
    <Flex align='center' direction='column' gap='xs' mt='md'>
      <IconError404 opacity='30%' size='200' stroke={1.5} />
      <Title order={1} size='h1'>
        Not found
      </Title>

      <Text fz='xs' td='underline'>
        we couldnot find this page
      </Text>
    </Flex>
  </Center>
);

export default NotFound;
