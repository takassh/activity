import { Icon, Tooltip, forwardRef } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClientIconProps } from './icon';

const CustomIcon = forwardRef<ClientIconProps, 'svg'>((props, ref) => (
  <Icon ref={ref} as={FontAwesomeIcon} {...props} />
));

interface ToolTipIconProps extends ClientIconProps {
  tooltip: string;
}

export function ToolTipIcon({ tooltip, ...props }: ToolTipIconProps) {
  return (
    <Tooltip label={tooltip}>
      <CustomIcon {...props} />
    </Tooltip>
  );
}
