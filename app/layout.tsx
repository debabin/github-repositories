import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Box, Container, Paper, Center, Flex } from '@/components';

import { Header } from './Header';
import { Provider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Github Repositories',
  description: 'Github Repositories'
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const RootLayout = ({ children, modal }: RootLayoutProps) => (
  <html lang='en'>
    <Provider>
      <body className={inter.className}>
        <Container mt='lg' size='sm'>
          <Flex direction='column' gap='lg'>
            <Paper withBorder p='xl' radius='md'>
              <Header />
            </Paper>
            <Box color='gray.8'>{children}</Box>
          </Flex>
        </Container>
        {modal}
      </body>
    </Provider>
  </html>
);

export default RootLayout;
