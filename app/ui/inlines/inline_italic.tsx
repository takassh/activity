import { Text } from '@chakra-ui/react';
import { InlineTextProps } from './inline_text';

export function InlineItalic({ children, ...props }: InlineTextProps) {
  return (
    <Text as="i" {...props}>
      {children}
    </Text>
  );
}
