import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { ButtonGroupProps } from '@/types/ui';
import { Size } from '@/types/sizes';
import { ButtonGroupRoot } from './ButtonGroup.style';

/**
 * Группа кнопок: общий `role="group"`, горизонталь или вертикаль, опционально склеенные границы (`attached`) по макету Figma.
 * @param props - Пропсы `ButtonGroupProps`.
 * @param ref - Ref на корневой `div`.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      attached = false,
      size = Size.MD,
      attachedShape = 'segment',
      fullWidth = false,
      role = 'group',
      ariaLabel,
      className,
    },
    ref,
  ) => (
    <ButtonGroupRoot
      ref={ref}
      className={clsx('ui-button-group', className)}
      role={role}
      aria-label={ariaLabel}
      $orientation={orientation}
      $attached={attached}
      $size={size}
      $attachedShape={attachedShape}
      $fullWidth={fullWidth}
    >
      {children}
    </ButtonGroupRoot>
  ),
);

ButtonGroup.displayName = 'ButtonGroup';
