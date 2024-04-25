import { Text } from '@chakra-ui/react';
import { InlineTextProps } from './inline_text';

export function InlineUnderline({ children, ...props }: InlineTextProps) {
  return (
    <Text as="u" {...props}>
      {children}
    </Text>
  );
}
