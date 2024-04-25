import { Text, TextProps } from '@chakra-ui/react';

export interface InlineTextProps extends TextProps {
  children: React.ReactNode;
}

export function InlineText({ children, ...props }: InlineTextProps) {
  return (
    <Text as="span" {...props}>
      {children}
    </Text>
  );
}
