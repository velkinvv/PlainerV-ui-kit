import React from 'react';
import { clsx } from 'clsx';
import { ActionBarSize, type ActionBarDividerProps } from '../../../types/ui';
import { ActionBarDividerLine, ActionBarDividerWrap } from './ActionBar.style';

/**
 * Вертикальный разделитель между группами действий на ActionBar.
 * @param barSize — высота линии (согласована с размером панели)
 * @param className — дополнительный CSS-класс
 */
export const ActionBarDivider: React.FC<ActionBarDividerProps> = ({
  barSize = ActionBarSize.XL,
  className,
}) => (
  <ActionBarDividerWrap
    $barSize={barSize}
    className={clsx('ui-action-bar-divider', className)}
    aria-hidden
  >
    <ActionBarDividerLine $barSize={barSize} />
  </ActionBarDividerWrap>
);

ActionBarDivider.displayName = 'ActionBarDivider';
