'use client';
import { Box, Button, Stack, StackDivider, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import { getPages } from './api/data';
import { isFileTypeExternal, isFileTypeHosted } from './types/file';
import {
  IsPagePropertyTypeMultiSelect,
  IsPagePropertyTypeRichText,
  IsPagePropertyTypeTitle,
  Page,
} from './types/notion_page';
import { RichText } from './types/rich_text';
import ArticleItem from './ui/article_item';

const LIMIT: number = 20;

export function ArticleTabPanel({
  category,
  initialPages,
}: {
  category: string;
  initialPages: Page[];
}) {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadMore = async () => {
    const page = Math.floor(pages.length / LIMIT);
    const newPages = await getPages(page, LIMIT, category);
    setPages([...pages, ...newPages]);
    setHasMore(newPages.length === LIMIT);
  };

  return (
    <TabPanel>
      <Stack divider={<StackDivider />}>
        {pages.map((page, i) => {
          let coverUrl = '';
          let title: RichText[] = [];
          let summary: RichText[] = [];
          let tags: string[] = [];

          if (isFileTypeExternal(page.cover)) {
            coverUrl = page.cover.external.url;
          }
          if (isFileTypeHosted(page.cover)) {
            coverUrl = page.cover.file.url;
          }
          if (IsPagePropertyTypeTitle(page.properties.name)) {
            title = page.properties.name.title;
          }
          if (IsPagePropertyTypeRichText(page.properties.summary)) {
            summary = page.properties.summary.rich_text;
          }
          if (IsPagePropertyTypeMultiSelect(page.properties.tags)) {
            tags = page.properties.tags.multi_select.map((tag) => tag.name!);
          }

          return (
            <Box key={`page-${page.id}`} py={2}>
              <ArticleItem
                href={`/${page.id}`}
                id={page.id}
                title={title}
                summary={summary}
                imageUrl={coverUrl}
                tags={tags}
                readTime={''}
                createdAt={page.created_time}
              />
            </Box>
          );
        })}
        {hasMore && (
          <Button my={4} onClick={loadMore}>
            Load more
          </Button>
        )}
      </Stack>
    </TabPanel>
  );
}
