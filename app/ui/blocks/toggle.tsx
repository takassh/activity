import { Block as BlockType, IsBlocks } from '@/app/types/block';
import { RichText } from '@/app/types/rich_text';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { Blocks } from './block';
import { Paragraph } from './paragraph';

export function ToggleBlock({
  id,
  text,
  blocks,
}: {
  id: string;
  text: RichText[];
  blocks?: BlockType[];
}) {
  return (
    <Accordion allowToggle>
      <AccordionItem style={{ border: 'none' }}>
        <AccordionButton paddingY={2} paddingX={0}>
          <AccordionIcon />
          <Paragraph
            id={id}
            text={text}
            fontSize={['sm', 'md']}
            fontWeight="normal"
          />
        </AccordionButton>
        <AccordionPanel>
          {IsBlocks(blocks) && (
            <Box>
              <Blocks blocks={blocks} />
            </Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
