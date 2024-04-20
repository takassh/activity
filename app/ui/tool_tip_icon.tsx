import { Tooltip } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { RefIcon, RefIconProps } from './ref_icon';

export interface ToolTipIconProps extends RefIconProps {
  tooltip: string;
  onClick?: MouseEventHandler;
}

export function ToolTipIcon({ tooltip, onClick, ...props }: ToolTipIconProps) {
  return (
    <Tooltip label={tooltip}>
      <RefIcon {...props} onClick={onClick} />
    </Tooltip>
  );
}
