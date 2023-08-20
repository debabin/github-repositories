import { Flex, SearchBox, Title } from '@/components';

export const Header = () => (
  <Flex align='center' gap='lg' justify='space-between'>
    <Title order={1} size='h4'>
      ⭐️ Github Repositories
    </Title>
    <SearchBox />
  </Flex>
);
