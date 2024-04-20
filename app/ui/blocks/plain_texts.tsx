import { RichText } from '@/app/types/rich_text';
import { Text, TextProps } from '@chakra-ui/react';

interface PlainTextsProps extends TextProps {
  id: string;
  text: RichText[];
}

export function PlainTexts({ id, text, ...props }: PlainTextsProps) {
  let plainTexts = '';
  for (let item of text) {
    plainTexts += item.plain_text ?? '';
  }

  return (
    <Text as="span" {...props} id={id} key={`plain-texts-${id}`}>
      {plainTexts}
    </Text>
  );
}
