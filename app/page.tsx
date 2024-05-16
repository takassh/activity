import '@/app/extensions/date';
import { Flex, Show, Stack } from '@chakra-ui/react';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getEvents, getPages } from './api/data';
import { Main } from './main';
import { RecentActivity } from './recent_activity';

export const revalidate = Number(process.env.REVALIDATE);

export const metadata: Metadata = {
  title: 'Home',
  icons: './favicon.ico',
};

export default async function Page() {
  const [all, rust, nextjs, flutter, golang, aws, web3, ml, business, events] =
    await Promise.all([
      getPages(0, 20, ''),
      getPages(0, 20, 'rust'),
      getPages(0, 20, 'nextjs'),
      getPages(0, 20, 'flutter'),
      getPages(0, 20, 'golang'),
      getPages(0, 20, 'aws'),
      getPages(0, 20, 'web3'),
      getPages(0, 20, 'ml'),
      getPages(0, 20, 'business'),
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
            'ML',
            'NextJs',
            'Flutter',
            'Golang',
            'AWS',
            'Web3',
            'Business',
          ]}
          initialPages={[
            all,
            rust,
            ml,
            nextjs,
            flutter,
            golang,
            aws,
            web3,
            business,
          ]}
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
