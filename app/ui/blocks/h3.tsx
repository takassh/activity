import { RichText } from '@/app/types/rich_text';
import { Box } from '@chakra-ui/react';
import { Paragraph } from './paragraph';

export function H3({ id, text }: { id: string; text: RichText[] }) {
  return (
    <Box marginY="2">
      <Paragraph id={id} text={text} fontSize="xl" fontWeight="bold" />
    </Box>
  );
}
