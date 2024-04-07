import {
  Block,
  isBlockTypeBulletedListItem,
  isBlockTypeCode,
  isBlockTypeHeading1,
  isBlockTypeHeading2,
  isBlockTypeHeading3,
  isBlockTypeImage,
  isBlockTypeNumberedListItem,
  isBlockTypeParagraph,
  isBlockTypeQuote,
  isBlockTypeToggle,
} from '@/app/types/block';
import { isFileTypeExternal, isFileTypeHosted } from '@/app/types/file';
import { BulletedListItem } from './bulleted_list_item';
import { CodeBlock } from './code';
import { H1 } from './h1';
import { H2 } from './h2';
import { H3 } from './h3';
import { ImageBlock } from './image';
import { NumberedListItem } from './numbered_list_item';
import { Paragraph } from './paragraph';
import { Quote } from './quote';
import { ToggleBlock } from './toggle';

export function Blocks({ blocks }: { blocks: Block[] }) {
  let numberListCounter = 0;
  const mapping = blocks.map((v, i) => {
    if (isBlockTypeParagraph(v)) {
      numberListCounter = 0;
      return (
        <Paragraph
          key={`paragraph-${i}`}
          id={v.id}
          text={v.paragraph?.rich_text ?? []}
          fontSize={['sm', 'md']}
          fontWeight="normal"
        />
      );
    }
    if (isBlockTypeHeading1(v)) {
      numberListCounter = 0;
      return (
        <H1 key={`heading_1-${i}`} id={v.id} text={v.heading_1.rich_text} />
      );
    }
    if (isBlockTypeHeading2(v)) {
      numberListCounter = 0;
      return (
        <H2 key={`heading_2-${i}`} id={v.id} text={v.heading_2.rich_text} />
      );
    }
    if (isBlockTypeHeading3(v)) {
      numberListCounter = 0;
      return (
        <H3 key={`heading_3-${i}`} id={v.id} text={v.heading_3.rich_text} />
      );
    }
    if (isBlockTypeQuote(v)) {
      numberListCounter = 0;
      return <Quote key={`quote-${i}`} id={v.id} text={v.quote.rich_text} />;
    }
    if (isBlockTypeBulletedListItem(v)) {
      numberListCounter = 0;

      return (
        <BulletedListItem
          key={`bulleted_list_item-${i}`}
          id={v.id}
          text={v.bulleted_list_item.rich_text}
          blocks={v.bulleted_list_item.children}
        />
      );
    }
    if (isBlockTypeNumberedListItem(v)) {
      numberListCounter += 1;
      return (
        <NumberedListItem
          key={`numbered_list_item-${i}`}
          id={v.id}
          text={v.numbered_list_item.rich_text}
          number={numberListCounter}
        />
      );
    }
    if (isBlockTypeCode(v)) {
      numberListCounter = 0;
      const code = v.code.rich_text[0].plain_text ?? '';
      return <CodeBlock key={`code-${i}`} text={code} />;
    }
    if (isBlockTypeImage(v)) {
      numberListCounter = 0;
      if (isFileTypeExternal(v.image)) {
        return <ImageBlock key={`image-${i}`} url={v.image.external.url} />;
      }
      if (isFileTypeHosted(v.image)) {
        return <ImageBlock key={`image-${i}`} url={v.image.file.url} />;
      }
    }
    if (isBlockTypeToggle(v)) {
      numberListCounter = 0;
      return (
        <ToggleBlock
          key={`toggle-${i}`}
          id={v.id}
          text={v.toggle.rich_text}
          blocks={v.toggle.children}
        />
      );
    }

    return;
  });

  return mapping.flat();
}