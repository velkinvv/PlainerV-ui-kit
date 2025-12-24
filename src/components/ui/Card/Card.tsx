import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { type CardProps, CardVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
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
        whileHover={hoverable ? { y: -2 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        {...props}
      >
        {children}
      </StyledCard>
    );
  },
);

Card.displayName = 'Card';
