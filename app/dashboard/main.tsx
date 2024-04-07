'use client';
import {
  Box,
  Center,
  Show,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabsProps,
  useColorMode,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Page } from '../types/notion_page';
import { Contacts } from '../ui/contacts';
import { ArticleTabPanel } from './article_tab_panel';

const tabs = ['all', 'rust', 'nextjs', 'flutter', 'golang', 'aws', 'web3'];

export interface MainProps extends Omit<TabsProps, 'children'> {
  tabNames: string[];
  categories: string[];
  initialPages: Page[][];
}

export function Main({
  tabNames,
  categories,
  initialPages,
  ...props
}: MainProps) {
  const { colorMode } = useColorMode();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedTab = searchParams.get('tab');
  let initialTab = 0;
  if (selectedTab) {
    const index = tabs.indexOf(selectedTab);
    if (index >= 0) {
      initialTab = index;
    }
  }

  return (
    <Tabs
      onChange={(idx) => {
        router.push(`${pathname}?tab=${tabs[idx]}`);
      }}
      isFitted
      defaultIndex={initialTab}
      {...props}
      width="100%"
    >
      <Box
        position="sticky"
        top={0}
        zIndex={100}
        bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
      >
        <Show below="sm">
          <Center pt={2}>
            <Contacts position="sticky" top={4} />
          </Center>
        </Show>
        <TabList overflowX="scroll" overflowY="hidden">
          {tabNames.map((tabName, i) => {
            return (
              <Tab
                key={`tab-${tabName}`}
                _hover={{ fontWeight: 'bold' }}
                _selected={{ fontWeight: 'bold' }}
              >
                {tabName}
              </Tab>
            );
          })}
        </TabList>
      </Box>
      <TabPanels>
        {initialPages.map((initialPage, i) => {
          return (
            <ArticleTabPanel
              key={`category-${categories[i]}`}
              category={categories[i]}
              initialPages={initialPage}
            />
          );
        })}
        {/* <form action={async () => {
                        "use server";
                        await signOut();
                    }}>
                        <button>logout</button>
                    </form> */}
      </TabPanels>
    </Tabs>
  );
}
