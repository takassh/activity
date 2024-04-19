import { RichText } from '@/app/types/rich_text';
import { Box, TextProps } from '@chakra-ui/react';
import { InlineCode } from '../inlines/inline_code';
import { InlineItalic } from '../inlines/inline_italic';
import { InlineStrikethrough } from '../inlines/inline_strikethrough';
import { InlineText } from '../inlines/inline_text';
import { InlineUnderline } from '../inlines/inline_underline';
import { EmptyBlock } from './empty';

interface ParagraphProps extends TextProps {
  id: string;
  text: RichText[];
}

export function Paragraph({ id, text, ...props }: ParagraphProps) {
  if (text.length != 0) {
    const paragraph = text
      .map((v, i) => {
        let child = <></>;
        if (v.annotations?.bold) {
          child = (
            <InlineText
              {...props}
              key={`bold-${i}`}
              href={v.href}
              fontWeight="bold"
            >
              {v.plain_text}
            </InlineText>
          );
        } else {
          child = (
            <InlineText {...props} key={`normal-${i}`} href={v.href}>
              {v.plain_text}
            </InlineText>
          );
        }

        if (v.annotations?.italic) {
          child = (
            <InlineItalic {...props} key={`italic-${i}`} href={v.href}>
              {child}
            </InlineItalic>
          );
        }
        if (v.annotations?.strikethrough) {
          child = (
            <InlineStrikethrough
              {...props}
              key={`strikethrough-${i}`}
              href={v.href}
            >
              {child}
            </InlineStrikethrough>
          );
        }
        if (v.annotations?.underline) {
          child = (
            <InlineUnderline {...props} key={`underline-${i}`} href={v.href}>
              {child}
            </InlineUnderline>
          );
        }
        if (v.annotations?.code) {
          child = (
            <InlineCode {...props} key={`inline-code-${i}`} href={v.href}>
              {child}
            </InlineCode>
          );
        }

        return child;
      })
      .flat();

    return <Box key={`paragraph-${id}`}>{paragraph}</Box>;
  } else {
    return (
      <Box key={`empty-${id}`}>
        <EmptyBlock />
      </Box>
    );
  }
}
