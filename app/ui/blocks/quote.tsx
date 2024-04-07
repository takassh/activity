import { RichText } from '@/app/types/rich_text';
import { Divider, Stack } from '@chakra-ui/react';
import { Paragraph } from './paragraph';

export function Quote({ id, text }: { id: string; text: RichText[] }) {
  return (
    <Stack direction="row">
      {/* TODO: show vertical divider */}
      <Divider orientation="vertical" borderLeftWidth={4} />
      <Paragraph
        id={id}
        text={text}
        fontSize={['sm', 'md']}
        fontWeight="normal"
      />
    </Stack>
  );
}
