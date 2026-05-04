import type { ReactNode } from 'react';

/**
 * Значение атрибута `title` у пункта меню навигации: явный `title` или строковый `label` в режиме `collapsed`.
 * @param collapsed — компактный режим (только иконки)
 * @param label — основной текст пункта
 * @param title — явная подсказка с родителя
 */
export function getNavigationMenuItemDisplayTitle(
  collapsed: boolean,
  label: ReactNode,
  title: string | undefined,
): string | undefined {
  return title ?? (collapsed && typeof label === 'string' ? label : undefined);
}
