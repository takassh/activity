'use client';
import {
  Box,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabsProps,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArticleTabPanel } from './article_tab_panel';
import { Page } from './types/notion_page';

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedTab = searchParams.get('tab');
  let initialTab = 0;
  if (selectedTab) {
    const index = tabNames.indexOf(selectedTab);
    if (index >= 0) {
      initialTab = index;
    }
  }

  return (
    <Tabs
      onChange={(idx) => {
        router.push(`${pathname}?tab=${tabNames[idx].toLowerCase()}`);
      }}
      isFitted
      defaultIndex={initialTab}
      {...props}
      width="100%"
      variant="unstyled"
    >
      <Box position="sticky" top={0} zIndex={100} bg="bg">
        <TabList overflowX="scroll" overflowY="hidden">
          {tabNames.map((tabName, i) => {
            return (
              <Tab
                fontSize={['lg']}
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
      </TabPanels>
    </Tabs>
  );
}
