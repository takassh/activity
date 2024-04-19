import { Text } from '@chakra-ui/react';
import { InlineLink } from './inline_link';
import { InlineTextProps } from './inline_text';

export function InlineItalic({ children, href, ...props }: InlineTextProps) {
  const child = (
    <Text as="i" {...props}>
      {children}
    </Text>
  );
  if (href == null) {
    return child;
  } else {
    return <InlineLink href={href}>{child}</InlineLink>;
  }
}
