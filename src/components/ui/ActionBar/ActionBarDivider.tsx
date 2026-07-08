import React from 'react';
import { clsx } from 'clsx';
import { ActionBarSize, type ActionBarDividerProps, ActionBarOrientation } from '../../../types/ui';
import { ActionBarDividerLine, ActionBarDividerWrap } from './ActionBar.style';
import { useActionBarOrientation } from './ActionBarLayoutContext';

/**
 * Разделитель между группами действий на ActionBar.
 * @param barSize — высота/ширина линии (согласована с размером панели)
 * @param className — дополнительный CSS-класс
 */
export const ActionBarDivider: React.FC<ActionBarDividerProps> = ({
  barSize = ActionBarSize.XL,
  className,
}) => {
  const orientation = useActionBarOrientation();
  const verticalLayout = orientation === ActionBarOrientation.VERTICAL;

  return (
    <ActionBarDividerWrap
      $barSize={barSize}
      $verticalLayout={verticalLayout}
      className={clsx('ui-action-bar-divider', className)}
      aria-hidden
    >
      <ActionBarDividerLine $barSize={barSize} $verticalLayout={verticalLayout} />
    </ActionBarDividerWrap>
  );
};

ActionBarDivider.displayName = 'ActionBarDivider';
