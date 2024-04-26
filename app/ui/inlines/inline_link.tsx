import '@/app/extensions/notion';
import { Link, LinkProps } from '@chakra-ui/react';

export function InlineLink({
  href,
  children,
}: {
  href: LinkProps['href'];
  children: React.ReactNode;
}) {
  let _href = href;
  if (href?.startsWith('/')) {
    _href = `/${href!.separateNotionPageId()}`;
  }

  return (
    <Link href={_href} color="teal.500">
      {children}
    </Link>
  );
}
