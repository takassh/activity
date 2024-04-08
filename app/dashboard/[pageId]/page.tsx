import { getBlock, getPage } from '@/app/api/data';
import '@/app/extensions/date';
import { isFileTypeExternal, isFileTypeHosted } from '@/app/types/file';
import {
  IsPagePropertyTypeRichText,
  IsPagePropertyTypeTitle,
} from '@/app/types/notion_page';
import { RichText } from '@/app/types/rich_text';
import { Blocks } from '@/app/ui/blocks/block';
import { H1 } from '@/app/ui/blocks/h1';
import { Flex, Img, Text } from '@chakra-ui/react';
import { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 3600

export async function generateMetadata(
  { params }: { params: { pageId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page = await getPage(params.pageId);

  let title = '';
  let summary = '';
  let coverUrl = '';
  if (IsPagePropertyTypeTitle(page.properties.name)) {
    title = page.properties.name.title
      .map((text) => text.plain_text ?? '')
      .join('');
  }
  if (IsPagePropertyTypeRichText(page.properties.summary)) {
    summary = page.properties.summary.rich_text
      .map((text) => text.plain_text ?? '')
      .join('');
  }
  if (isFileTypeExternal(page.cover)) {
    coverUrl = page.cover.external.url;
  }
  if (isFileTypeHosted(page.cover)) {
    coverUrl = page.cover.file.url;
  }

  return {
    title: title,
    description: summary,
    openGraph: {
      images: [
        {
          url: coverUrl,
        },
      ],
    },
  };
}

export default async function Page({
  params: { pageId },
}: {
  params: { pageId: string };
}) {
  const page = await getPage(pageId);
  const blocks = await getBlock(pageId);
  const date = new Date(page.created_time).formattedDateTime();

  let coverUrl = '';
  let title: RichText[] = [];

  if (isFileTypeExternal(page.cover)) {
    coverUrl = page.cover.external.url;
  }
  if (isFileTypeHosted(page.cover)) {
    coverUrl = page.cover.file.url;
  }
  if (IsPagePropertyTypeTitle(page.properties.name)) {
    title = page.properties.name.title;
  }

  return (
    <Flex py={[2, 8]} px={[2, 8]} direction="column" width="full">
      <Img
        shadow="2xl"
        rounded="lg"
        src={coverUrl}
        objectFit="cover"
        height="300"
      />
      <H1 key={`title`} text={title} id={'title'} />
      <Text
        mb={4}
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        {date}
      </Text>
      <Blocks blocks={blocks} />
    </Flex>
  );
}
