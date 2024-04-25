'use client';
import { roboto_mono } from '@/theme';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { InlineTextProps } from './inline_text';

export function InlineCode({ children, ...props }: InlineTextProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  return (
    <Text
      {...props}
      rounded="md"
      as="span"
      backgroundColor={bgColor}
      px={1}
      py={0.5}
      fontSize="sm"
      fontFamily={roboto_mono.style.fontFamily}
    >
      {children}
    </Text>
  );
}
