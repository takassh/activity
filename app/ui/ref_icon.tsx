'use client';

import { Icon, IconProps, forwardRef } from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface RefIconProps extends IconProps {
  icon: IconProp;
}

export const RefIcon = forwardRef<RefIconProps, 'svg'>(
  ({ icon, ...props }, ref) => (
    <Icon ref={ref} as={FontAwesomeIcon} icon={icon} {...props} />
  ),
);
