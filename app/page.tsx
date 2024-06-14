import '@/app/extensions/date';
import { Flex, Stack } from '@chakra-ui/react';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getEvents, getPages } from './api/data';
import { Main } from './main';
import { RecentActivity } from './recent_activity';
import styles from './recent_activity.module.css';

export const revalidate = Number(process.env.REVALIDATE);

export const metadata: Metadata = {
  title: 'Home',
  icons: './favicon.ico',
  openGraph: {
    images: 'https://bucket.takassh.com/background.png',
  },
};

export default async function Page() {
  const [all, language, ml, infra, backend, frontend, web3, business, events] =
    await Promise.all([
      getPages(0, 20, ''),
      getPages(0, 20, 'language'),
      getPages(0, 20, 'ml'),
      getPages(0, 20, 'infra'),
      getPages(0, 20, 'backend'),
      getPages(0, 20, 'frontend'),
      getPages(0, 20, 'web3'),
      getPages(0, 20, 'business'),
      getEvents(0, 50),
    ]);

  return (
    <Flex justifyContent="center" width="full">
      <Suspense>
        <Main
          categories={[
            '',
            'language',
            'ml',
            'infra',
            'backend',
            'frontend',
            'web3',
            'business',
          ]}
          tabNames={[
            'ALL',
            'Language',
            'ML',
            'Infra',
            'Backend',
            'Frontend',
            'Web3',
            'Business',
          ]}
          initialPages={[
            all,
            language,
            ml,
            infra,
            backend,
            frontend,
            web3,
            business,
          ]}
          maxW="700px"
        />
      </Suspense>
      <div className={styles.show_md}>
        <Stack direction="row">
          <RecentActivity initialEvents={events} mx={16} maxW="500px" />
        </Stack>
      </div>
    </Flex>
  );
}
