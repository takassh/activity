import { RichText } from '@/app/types/rich_text';
import { Box, Stack, StackDivider } from '@chakra-ui/react';
import { Paragraph } from './paragraph';

export function Quote({ id, text }: { id: string; text: RichText[] }) {
  return (
    <Stack divider={<StackDivider borderWidth={2} />} direction="row">
      <Box />
      <Paragraph
        id={id}
        text={text}
        fontSize={['sm', 'md']}
        fontWeight="normal"
      />
    </Stack>
  );
}
