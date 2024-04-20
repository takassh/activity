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
import { Paragraph } from '@/app/ui/blocks/paragraph';
import { ToolTipIconModal } from '@/app/ui/tool_tip_icon_modal';
import { Box, Flex, Img, Stack, Text } from '@chakra-ui/react';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { Metadata, ResolvingMetadata } from 'next';

export const revalidate = Number(process.env.REVALIDATE);

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
    twitter: {
      card: 'summary',
      creator: '@octozuki',
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
  const created_date = new Date(page.created_time).formattedDateTime();
  const edited_date = new Date(page.last_edited_time).formattedDateTime();

  let coverUrl = '';
  let title: RichText[] = [];
  let summary: RichText[] = [];

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

  return (
    <Flex px={[4, 8]} direction="column" alignItems="center">
      <Box width={['full', '']} maxW={['', '1000']}>
        <Img
          shadow="2xl"
          rounded="lg"
          src={coverUrl}
          objectFit="cover"
          height={['200', '300']}
          width="100%"
        />
        <Box py={4} />
        <Flex alignItems="baseline">
          <H1 key={`title`} text={title} id={'title'} />
          <ToolTipIconModal
            ml={8}
            title="AIによる要約"
            icon={faGhost}
            fontSize={['md', 'xl']}
          >
            <Paragraph
              id="summary"
              text={summary}
              fontSize={['sm', 'md']}
              fontWeight="normal"
            />
          </ToolTipIconModal>
        </Flex>

        <Stack spacing={0}>
          <Text
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            作成 {created_date}
          </Text>
          <Text
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            編集 {edited_date}
          </Text>
        </Stack>

        <Box pt={8} />
        <Blocks blocks={blocks} />
      </Box>
    </Flex>
  );
}
