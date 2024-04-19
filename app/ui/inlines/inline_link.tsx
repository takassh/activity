import { Link, LinkProps } from '@chakra-ui/react';

export function InlineLink({
  href,
  children,
}: {
  href: LinkProps['href'];
  children: React.ReactNode;
}) {
  return (
    <Link href={href} color="teal.500">
      {children}
    </Link>
  );
}
