import React from 'react';
import { clsx } from 'clsx';
import { ActionBarSize, type ActionBarDropMenuItemProps } from '../../../types/ui';
import { ActionBarDropMenuItemContent } from './ActionBar.style';

/**
 * Содержимое строки overflow-меню ActionBar (иконка и подпись в одной строке).
 * @param barSize — размер иконки в пункте меню
 * @param children — иконка и текст действия
 * @param className — дополнительный CSS-класс
 */
export const ActionBarDropMenuItem: React.FC<ActionBarDropMenuItemProps> = ({
  barSize = ActionBarSize.XL,
  children,
  className,
}) => (
  <ActionBarDropMenuItemContent
    $barSize={barSize}
    className={clsx('ui-action-bar-drop-menu-item', className)}
  >
    {children}
  </ActionBarDropMenuItemContent>
);

ActionBarDropMenuItem.displayName = 'ActionBarDropMenuItem';
