import React from 'react';
import { clsx } from 'clsx';
import { DividerOrientation, type DividerProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DividerContainer } from './Divider.style';

export const Divider: React.FC<DividerProps> = ({
  orientation = DividerOrientation.HORIZONTAL,
  size = Size.MD,
  className,
}) => {
  return (
    <DividerContainer
      orientation={orientation}
      size={size}
      className={clsx('ui-divider', className)}
    />
  );
};
