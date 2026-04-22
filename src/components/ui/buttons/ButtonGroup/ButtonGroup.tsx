import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { ButtonGroupProps } from '@/types/ui';
import { ButtonGroupRoot } from './ButtonGroup.style';

/**
 * Группа кнопок: общий `role="group"`, горизонталь или вертикаль, опционально склеенные границы (`attached`).
 * @param props - Пропсы `ButtonGroupProps`.
 * @param ref - Ref на корневой `div`.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      attached = false,
      fullWidth = false,
      role = 'group',
      ariaLabel,
      className,
    },
    ref,
  ) => (
    <ButtonGroupRoot
      ref={ref}
      className={clsx(className)}
      role={role}
      aria-label={ariaLabel}
      $orientation={orientation}
      $attached={attached}
      $fullWidth={fullWidth}
    >
      {children}
    </ButtonGroupRoot>
  ),
);

ButtonGroup.displayName = 'ButtonGroup';
