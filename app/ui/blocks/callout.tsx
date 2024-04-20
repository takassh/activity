import {
  Icon,
  TextColor,
  isIconTypeEmoji,
  isIconTypeFile,
} from '@/app/types/block';
import { RichText } from '@/app/types/rich_text';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Paragraph } from './paragraph';

export function CalloutBlock({
  id,
  icon,
  text,
  bgColor,
}: {
  id: string;
  icon: Icon;
  text: RichText[];
  bgColor: TextColor;
}) {
  let call = <></>;
  if (isIconTypeFile(icon)) {
    call = (
      <Image
        height={['0.875rem', '1rem']}
        width={['0.875rem', '1rem']}
        fit="fill"
        src={icon.file.url}
        alt="call icon"
      />
    );
  }
  if (isIconTypeEmoji(icon)) {
    call = <Text as="span">{icon.emoji}</Text>;
  }
  return (
    <Flex
      direction="row"
      alignItems="baseline"
      id={id}
      rounded="md"
      fontSize={['xs', 'sm']}
      width="full"
      marginY={['4']}
      padding={['2', '4']}
      bgColor={`notion_${bgColor.toString()}`}
    >
      {call}
      <Box ml={[2, 4]}>
        <Paragraph
          id={id}
          text={text}
          fontSize={['sm', 'md']}
          fontWeight="normal"
        />
      </Box>
    </Flex>
  );
}
