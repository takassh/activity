'use client';
import { roboto_mono } from '@/theme';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { InlineLink } from './inline_link';
import { InlineTextProps } from './inline_text';

export function InlineCode({ children, href, ...props }: InlineTextProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const child = (
    <Text
      {...props}
      rounded="sm"
      as="span"
      backgroundColor={bgColor}
      padding="1"
      fontSize="sm"
      fontFamily={roboto_mono.style.fontFamily}
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
