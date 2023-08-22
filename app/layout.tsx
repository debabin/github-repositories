import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Box, Container, Paper, Flex } from '@/components';

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
    <body className={inter.className}>
      <Provider>
        <Container mt='lg' size='sm'>
          <Flex direction='column' gap='lg'>
            <Paper withBorder p='xl' radius='md'>
              <Header />
            </Paper>
            <Box color='gray.8'>{children}</Box>
          </Flex>
        </Container>
        {modal}
      </Provider>
    </body>
  </html>
);

export default RootLayout;
