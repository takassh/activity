import { RichText } from '@/app/types/rich_text';
import { ListItem, OrderedList } from '@chakra-ui/react';
import { Paragraph } from './paragraph';

export function NumberedListItem({
  id,
  text,
  number,
}: {
  id: string;
  text: RichText[];
  number: number;
}) {
  return (
    <OrderedList start={number} paddingX="2" paddingY={['0.5', '1']}>
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
}
