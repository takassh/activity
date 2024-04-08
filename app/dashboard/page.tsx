import '@/app/extensions/date';
import { Box, Divider, Flex, Link, Show, Stack } from '@chakra-ui/react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getEvents, getPages } from '../api/data';
import { ClientIcon } from '../ui/client_icon';
import { Main } from './main';
import { RecentActivity } from './recent_activity';

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {
  const [all, rust, nextjs, flutter, golang, aws, web3, events] =
    await Promise.all([
      getPages(0, 20, ''),
      getPages(0, 20, 'rust'),
      getPages(0, 20, 'nextjs'),
      getPages(0, 20, 'flutter'),
      getPages(0, 20, 'golang'),
      getPages(0, 20, 'aws'),
      getPages(0, 20, 'web3'),
      getEvents(0, 50),
    ]);

  return (
    <Flex justifyContent="center" width="full">
      <Show above="sm">
        <Flex>
          <Box my={10} mx={4}>
            <Stack spacing="4" position="sticky" top={10}>
              <Link href="https://github.com/takassh">
                <ClientIcon fontSize={['3xl']} icon={faGithub} />
              </Link>
              <Link href="https://twitter.com/octozuki">
                <ClientIcon fontSize={['3xl']} icon={faX} />
              </Link>
              <Link href="https://www.linkedin.com/in/takashi-kasai-217a1722b/">
                <ClientIcon fontSize={['3xl']} icon={faLinkedin} />
              </Link>
            </Stack>
          </Box>
          <Divider orientation="vertical" />
        </Flex>
      </Show>
      <Suspense>
        <Main
          categories={[
            '',
            'rust',
            'nextjs',
            'flutter',
            'golang',
            'aws',
            'web3',
          ]}
          tabNames={[
            'ALL',
            'Rust',
            'NextJs',
            'Flutter',
            'Golang',
            'AWS',
            'Web3',
          ]}
          initialPages={[all, rust, nextjs, flutter, golang, aws, web3]}
          maxW="600px"
        />
      </Suspense>
      <Show above="sm">
        <Stack direction="row">
          <Divider orientation="vertical" />
          <RecentActivity initialEvents={events} mr={4} maxW="500px" />
        </Stack>
      </Show>
    </Flex>
  );
}
