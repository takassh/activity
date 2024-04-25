import { RichText } from '@/app/types/rich_text';
import { Box, TextProps } from '@chakra-ui/react';
import { InlineCode } from '../inlines/inline_code';
import { InlineItalic } from '../inlines/inline_italic';
import { InlineLink } from '../inlines/inline_link';
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
            <InlineText {...props} key={`bold-${i}`} fontWeight="bold">
              {v.plain_text}
            </InlineText>
          );
        } else {
          child = (
            <InlineText {...props} key={`normal-${i}`}>
              {v.plain_text}
            </InlineText>
          );
        }

        if (v.annotations?.italic) {
          child = (
            <InlineItalic {...props} key={`italic-${i}`}>
              {child}
            </InlineItalic>
          );
        }
        if (v.annotations?.strikethrough) {
          child = (
            <InlineStrikethrough {...props} key={`strikethrough-${i}`}>
              {child}
            </InlineStrikethrough>
          );
        }
        if (v.annotations?.underline) {
          child = (
            <InlineUnderline {...props} key={`underline-${i}`}>
              {child}
            </InlineUnderline>
          );
        }
        if (v.annotations?.code) {
          child = (
            <InlineCode {...props} key={`inline-code-${i}`}>
              {child}
            </InlineCode>
          );
        }

        // This should be the last one
        if (v.href != undefined) {
          child = (
            <InlineLink key={`link-${i}`} href={v.href}>
              {child}
            </InlineLink>
          );
        }
        return child;
      })
      .flat();

    return (
      <Box id={id} key={`paragraph-${id}`}>
        {paragraph}
      </Box>
    );
  } else {
    return (
      <Box id={id} key={`empty-${id}`}>
        <EmptyBlock />
      </Box>
    );
  }
}
