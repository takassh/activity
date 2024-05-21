import { getPagesMetadata } from '@/app/api/data';
import {
  Block,
  isBlockTypeBulletedListItem,
  isBlockTypeCallout,
  isBlockTypeCode,
  isBlockTypeDivider,
  isBlockTypeHeading1,
  isBlockTypeHeading2,
  isBlockTypeHeading3,
  isBlockTypeImage,
  isBlockTypeLinkToPage,
  isBlockTypeNumberedListItem,
  isBlockTypeParagraph,
  isBlockTypeQuote,
  isBlockTypeTable,
  isBlockTypeToggle,
  isBlockTypeVideo,
} from '@/app/types/block';
import { isFileTypeExternal, isFileTypeHosted } from '@/app/types/file';
import { Box } from '@chakra-ui/react';
import { headers } from 'next/headers';
import { OGP } from '../ogp';
import { BulletedListItem } from './bulleted_list_item';
import { CalloutBlock } from './callout';
import { CodeBlock } from './code';
import { CustomDivider } from './divider';
import { H1 } from './h1';
import { H2 } from './h2';
import { H3 } from './h3';
import { ImageBlock } from './image';
import { NumberedListItem } from './numbered_list_item';
import { Paragraph } from './paragraph';
import { Quote } from './quote';
import { TableBlock } from './table';
import { ToggleBlock } from './toggle';
import { VideoBlock } from './video';

export async function Blocks({
  blocks,
  is_plain_texts = false,
}: {
  blocks: Block[];
  is_plain_texts?: boolean;
}) {
  let numberListCounter = 0;
  let items = [];
  let plainTexts = '';
  for (const v of blocks) {
    if (isBlockTypeParagraph(v)) {
      numberListCounter = 0;
      items.push(
        <Paragraph
          key={`paragraph-${v.id}`}
          id={v.id}
          text={v.paragraph?.rich_text ?? []}
          fontSize={['sm', 'md']}
          fontWeight="normal"
        />,
      );
      plainTexts +=
        v.paragraph?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeHeading1(v)) {
      numberListCounter = 0;
      items.push(
        <H1 key={`heading_1-${v.id}`} id={v.id} text={v.heading_1.rich_text} />,
      );

      plainTexts +=
        v.heading_1?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeHeading2(v)) {
      numberListCounter = 0;
      items.push(
        <H2 key={`heading_2-${v.id}`} id={v.id} text={v.heading_2.rich_text} />,
      );
      plainTexts +=
        v.heading_2?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeHeading3(v)) {
      numberListCounter = 0;
      items.push(
        <H3 key={`heading_3-${v.id}`} id={v.id} text={v.heading_3.rich_text} />,
      );
      plainTexts +=
        v.heading_3?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeQuote(v)) {
      numberListCounter = 0;
      items.push(
        <Quote key={`quote-${v.id}`} id={v.id} text={v.quote.rich_text} />,
      );
      plainTexts += v.quote?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeBulletedListItem(v)) {
      numberListCounter = 0;

      items.push(
        <BulletedListItem
          key={`bulleted_list_item-${v.id}`}
          id={v.id}
          text={v.bulleted_list_item.rich_text}
          blocks={v.bulleted_list_item.children}
        />,
      );
      plainTexts +=
        v.bulleted_list_item?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeNumberedListItem(v)) {
      numberListCounter += 1;
      items.push(
        <NumberedListItem
          key={`numbered_list_item-${v.id}`}
          id={v.id}
          text={v.numbered_list_item.rich_text}
          number={numberListCounter}
        />,
      );
      plainTexts +=
        v.numbered_list_item?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeCode(v)) {
      numberListCounter = 0;
      const code = v.code.rich_text[0].plain_text ?? '';
      items.push(
        <CodeBlock
          id={v.id}
          key={`code-${v.id}`}
          text={code}
          language={v.code.language.toString()}
        />,
      );
    }
    if (isBlockTypeImage(v)) {
      numberListCounter = 0;
      if (isFileTypeExternal(v.image)) {
        items.push(
          <ImageBlock
            id={v.id}
            key={`image-${v.id}`}
            url={v.image.external.url}
          />,
        );
      }
      if (isFileTypeHosted(v.image)) {
        items.push(
          <ImageBlock id={v.id} key={`image-${v.id}`} url={v.image.file.url} />,
        );
      }
    }
    if (isBlockTypeVideo(v)) {
      numberListCounter = 0;
      if (isFileTypeExternal(v.video)) {
        items.push(
          <VideoBlock
            id={v.id}
            key={`image-${v.id}`}
            url={v.video.external.url}
          />,
        );
      }
    }
    if (isBlockTypeToggle(v)) {
      numberListCounter = 0;
      items.push(
        <ToggleBlock
          key={`toggle-${v.id}`}
          id={v.id}
          text={v.toggle.rich_text}
          blocks={v.toggle.children}
        />,
      );
      plainTexts += v.toggle?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeCallout(v)) {
      numberListCounter = 0;
      items.push(
        <CalloutBlock
          key={`callout-${v.id}`}
          id={v.id}
          text={v.callout.rich_text}
          icon={v.callout.icon}
          bgColor={v.callout.color}
        />,
      );
      plainTexts +=
        v.callout?.rich_text.map((v) => v.plain_text).join('') ?? '';
      plainTexts += '\n';
    }
    if (isBlockTypeDivider(v)) {
      numberListCounter = 0;
      items.push(<CustomDivider key={`divider-${v.id}`} id={v.id} />);
    }
    if (isBlockTypeTable(v)) {
      numberListCounter = 0;
      items.push(
        <TableBlock
          key={`table-${v.id}`}
          id={v.id}
          blocks={v.table.children}
        />,
      );
    }
    if (isBlockTypeLinkToPage(v) && v.link_to_page.page_id) {
      numberListCounter = 0;

      const headersList = headers();
      const header_url = headersList.get('x-url') ?? '';
      const url = new URL(header_url);
      const href = `${url.protocol}//${url.host}/${v.link_to_page.page_id}`;
      const metadata = await getPagesMetadata(v.link_to_page.page_id);
      const image = (
        metadata.openGraph?.images as Array<{ url: string | URL }>
      )[0];
      items.push(
        <OGP
          key={`ogp-${v.id}`}
          host={url.hostname}
          title={metadata.title as string}
          summary={metadata.description ?? ''}
          imageUrl={image.url as string}
          faviconUrl={`${url.protocol}//${url.host}/favicon.ico`}
          href={href}
        />,
      );
    }
  }

  if (is_plain_texts) {
    return plainTexts;
  }

  return items.map((v, i) => (
    <Box key={`box-${i}`} my={2}>
      {v}
    </Box>
  ));
}
