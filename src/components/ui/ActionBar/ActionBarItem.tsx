import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ActionBarSize, ButtonVariant, type ActionBarItemProps } from '../../../types/ui';
import { IconButton } from '../buttons/IconButton/IconButton';
import { ActionBarItemSlot } from './ActionBar.style';
import { resolveActionBarIconButtonSize } from './handlers';

/**
 * Кнопка действия на панели ActionBar (IconButton в фиксированном слоте).
 * @param barSize — размер панели (влияет на габариты)
 * @param variant — вариант кнопки (по умолчанию ghost)
 * @param icon — иконка действия
 * @param showTooltip — показывать подсказку при наведении
 * @param tooltipText — текст подсказки
 */
export const ActionBarItem = forwardRef<HTMLButtonElement, ActionBarItemProps>(
  (
    {
      barSize = ActionBarSize.XL,
      variant = ButtonVariant.GHOST,
      className,
      size,
      ...iconButtonProps
    },
    ref,
  ) => {
    const resolvedSize = size ?? resolveActionBarIconButtonSize(barSize);

    return (
      <ActionBarItemSlot $barSize={barSize} className={clsx('ui-action-bar-item', className)}>
        <IconButton ref={ref} variant={variant} size={resolvedSize} {...iconButtonProps} />
      </ActionBarItemSlot>
    );
  },
);

ActionBarItem.displayName = 'ActionBarItem';

/**
 * Кнопка ActionBar с обязательной подсказкой при наведении.
 * @param tooltipText — текст подсказки (обязателен)
 */
export const ActionBarItemWithTooltip = forwardRef<
  HTMLButtonElement,
  ActionBarItemProps & { tooltipText: string }
>(({ tooltipText, showTooltip = true, ...itemProps }, ref) => (
  <ActionBarItem
    ref={ref}
    showTooltip={showTooltip}
    tooltipText={tooltipText}
    {...itemProps}
  />
));

ActionBarItemWithTooltip.displayName = 'ActionBarItemWithTooltip';
