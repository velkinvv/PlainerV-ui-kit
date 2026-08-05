import React from 'react';
import { Hint } from '../Hint/Hint';
import { Tooltip } from '../Tooltip/Tooltip';
import type { HintProps, TooltipProps } from '../../../types/ui';

/**
 * Оборачивает строку узла Tree в Hint или Tooltip (как NavigationMenu.Item).
 * Hint приоритетнее Tooltip.
 * @param content - Строка узла (TreeRow)
 * @param hint - Конфиг Hint без children
 * @param tooltip - Конфиг Tooltip без children
 */
export const wrapTreeItemOverlays = (
  content: React.ReactElement,
  hint: Omit<HintProps, 'children'> | undefined,
  tooltip: Omit<TooltipProps, 'children'> | undefined,
): React.ReactElement => {
  if (hint != null) {
    return <Hint {...hint}>{content}</Hint>;
  }
  if (tooltip != null) {
    return <Tooltip {...tooltip}>{content}</Tooltip>;
  }
  return content;
};
