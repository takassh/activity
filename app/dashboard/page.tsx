import '@/app/extensions/date';
import { Flex, Show, Stack } from '@chakra-ui/react';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getEvents, getPages } from '../api/data';
import { Main } from './main';
import { RecentActivity } from './recent_activity';

export const revalidate = Number(process.env.REVALIDATE);

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
          maxW="700px"
        />
      </Suspense>
      <Show above="sm">
        <Stack direction="row">
          <RecentActivity initialEvents={events} mx={16} maxW="500px" />
        </Stack>
      </Show>
    </Flex>
  );
}
