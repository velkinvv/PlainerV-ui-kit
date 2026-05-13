import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { type CardProps, CardVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { useUiMotionPresets } from '../../../hooks/useUiMotion';
import { StyledCard } from './Card.style';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = CardVariant.ELEVATED,
      size = Size.MD,
      padding = Size.MD,
      hoverable = false,
      clickable = false,
      fullWidth = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const uiMotion = useUiMotionPresets();

    return (
      <StyledCard
        ref={ref}
        variant={variant}
        size={size}
        padding={padding}
        hoverable={hoverable}
        clickable={clickable}
        fullWidth={fullWidth}
        className={clsx('ui-card', className)}
        onClick={onClick}
        {...uiMotion.card({ hoverable, clickable })}
        {...props}
      >
        {children}
      </StyledCard>
    );
  },
);

Card.displayName = 'Card';
