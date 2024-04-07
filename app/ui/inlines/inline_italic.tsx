import { Text } from '@chakra-ui/react';
import { InlineLink } from './inline_link';

export function InlineItalic({
  children,
  href,
  fontSize,
  fontWeight,
}: {
  children: React.ReactNode;
  href: string | null;
  fontSize: string[] | string;
  fontWeight: string[] | string;
}) {
  const child = (
    <Text as="i" fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </Text>
  );
  if (href == null) {
    return child;
  } else {
    return <InlineLink href={href}>{child}</InlineLink>;
  }
}
