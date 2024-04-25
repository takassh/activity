import { Text } from '@chakra-ui/react';
import { InlineTextProps } from './inline_text';

export function InlineStrikethrough({ children, ...props }: InlineTextProps) {
  return (
    <Text as="s" {...props}>
      {children}
    </Text>
  );
}
