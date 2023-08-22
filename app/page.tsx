import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

import { Center, Title, Flex, Text, List, ListItem } from '@/components';

const Home = () => (
  <main>
    <Center>
      <Flex align='center' direction='column' gap='md'>
        <Flex align='center' direction='column' gap='xs' mt='md'>
          <Flex align='center' gap='xs'>
            <IconSearch opacity='30%' size='35' stroke={1.5} />
            <Title order={1} size='h1'>
              Find github entities
            </Title>
          </Flex>

          <Text fz='xs' td='underline'>
            best way to found github entities in this world
          </Text>
        </Flex>

        <Flex direction='column' gap='sm' mt='lg'>
          <Text fz='xs'>Join to community 😎</Text>
          <List size='xs'>
            <ListItem>
              <Link href='https://github.com/debabin/github-repositories' target='_blank'>
                Github Repository
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://www.twitch.tv/siberiacancode' target='_blank'>
                Twitch
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://www.youtube.com/c/siberiacancode' target='_blank'>
                Youtube
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://discord.gg/ceWVt2znzA' target='_blank'>
                Discord
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://t.me/siberiacancode' target='_blank'>
                Telegram
              </Link>
            </ListItem>
          </List>
        </Flex>
      </Flex>
    </Center>
  </main>
);

export default Home;
