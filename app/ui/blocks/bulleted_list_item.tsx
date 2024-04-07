import { Block as BlockType, IsBlocks } from '@/app/types/block';
import { RichText } from '@/app/types/rich_text';
import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import { Blocks } from './block';
import { Paragraph } from './paragraph';

export function BulletedListItem({
  id,
  text,
  blocks,
}: {
  id: string;
  text: RichText[];
  blocks?: BlockType[];
}) {
  if (!IsBlocks(blocks)) {
    return (
      <UnorderedList paddingX="2" paddingY={['0.5', '1']}>
        <ListItem>
          <Paragraph
            id={id}
            text={text}
            fontSize={['sm', 'md']}
            fontWeight="normal"
          />
        </ListItem>
      </UnorderedList>
    );
  } else {
    return (
      <UnorderedList paddingX="2" paddingY={['0.5', '1']}>
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
      </UnorderedList>
    );
  }
}
