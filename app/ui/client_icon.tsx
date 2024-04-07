'use client';

import { Icon, IconProps } from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ClientIconProps extends IconProps {
  icon: IconProp;
}

export function ClientIcon({ icon, ...props }: ClientIconProps) {
  return <Icon as={FontAwesomeIcon} icon={icon} {...props} />;
}
