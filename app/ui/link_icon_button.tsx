import { Link } from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconButton } from './icon_button';

export function LinkIconButton({
  icon,
  href,
}: {
  icon: IconProp;
  href: string;
}) {
  return (
    <Link style={{ textDecoration: 'none' }}>
      <IconButton icon={icon} />
    </Link>
  );
}
