'use client';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { InlineLink } from './inline_link';

export function InlineCode({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string | null;
}) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const child = (
    <Text
      rounded="sm"
      as="span"
      backgroundColor={bgColor}
      padding="1"
      fontSize="sm"
    >
      {children}
    </Text>
  );

  if (href == null) {
    return child;
  } else {
    return <InlineLink href={href}>{child}</InlineLink>;
  }
}
