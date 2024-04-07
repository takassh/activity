import { getBlock, getPage } from '@/app/api/data';
import '@/app/extensions/date';
import { isFileTypeExternal, isFileTypeHosted } from '@/app/types/file';
import { IsPagePropertyTypeTitle } from '@/app/types/page';
import { RichText } from '@/app/types/rich_text';
import { Block } from '@/app/ui/blocks/block';
import { H1 } from '@/app/ui/blocks/h1';
import { Flex, Img, Text } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Article',
};

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
      <Block blocks={blocks} />
    </Flex>
  );
}
