import { Block as BlockType, IsBlocks } from '@/app/types/block';
import { RichText } from '@/app/types/rich_text';
import { Box, ListItem, OrderedList } from '@chakra-ui/react';
import { Blocks } from './block';
import { Paragraph } from './paragraph';

export function NumberedListItem({
  id,
  text,
  number,
  blocks,
}: {
  id: string;
  text: RichText[];
  number: number;
  blocks?: BlockType[];
}) {
  if (!IsBlocks(blocks)) {
    return (
      <OrderedList start={number} paddingX="2">
        <ListItem>
          <Paragraph
            id={id}
            text={text}
            fontSize={['sm', 'md']}
            fontWeight="normal"
          />
        </ListItem>
      </OrderedList>
    );
  } else {
    return (
      <OrderedList start={number} paddingX="2">
        <ListItem>
          <Paragraph
            id={id}
            text={text}
            fontSize={['sm', 'md']}
            fontWeight="normal"
          />
        </ListItem>
        <Box marginLeft="xs">
          <Blocks blocks={blocks} />
        </Box>
      </OrderedList>
    );
  }
}
