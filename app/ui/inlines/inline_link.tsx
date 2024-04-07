import { Link } from '@chakra-ui/react';

export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} color="teal.500">
      {children}
    </Link>
  );
}
