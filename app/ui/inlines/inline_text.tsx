import { LinkProps, Text, TextProps } from '@chakra-ui/react';
import { InlineLink } from './inline_link';

export interface InlineTextProps extends TextProps {
  children: React.ReactNode;
  href: LinkProps['href'];
}

export function InlineText({ children, href, ...props }: InlineTextProps) {
  const child = (
    <Text as="span" {...props}>
      {children}
    </Text>
  );
  if (href == undefined) {
    return child;
  } else {
    return <InlineLink href={href}>{child}</InlineLink>;
  }
}
