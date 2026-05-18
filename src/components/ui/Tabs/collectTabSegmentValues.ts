import React from 'react';

/** Совпадает с **TabItem.displayName** — для обхода дерева без жёсткой связи по импорту типа */
export const TAB_ITEM_DISPLAY_NAME = 'TabItem';

type TabItemLikeProps = { value?: string; children?: React.ReactNode };

/**
 * Проверяет, что элемент — **TabItem** / **Tabs.Item** (по **displayName**, не по ссылке **child.type**).
 *
 * @param child — валидный React-элемент из **children** **Tabs**
 */
export function isTabItemElement(child: React.ReactElement): boolean {
  const componentType = child.type as React.ComponentType & { displayName?: string };
  const childProps = child.props as TabItemLikeProps;

  if (typeof childProps.value !== 'string') {
    return false;
  }

  if (componentType?.displayName === TAB_ITEM_DISPLAY_NAME) {
    return true;
  }

  if (typeof componentType === 'function' && componentType.name === TAB_ITEM_DISPLAY_NAME) {
    return true;
  }

  return false;
}

/**
 * Собирает порядок **value** у **TabItem** / **Tabs.Item** в дереве (**React.Fragment**, вложенность).
 *
 * @param node — дочерние узлы корня **Tabs** / **TabItem.Group** или содержимое списка
 */
export function collectTabSegmentValues(node: React.ReactNode): string[] {
  const values: string[] = [];

  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (child.type === React.Fragment) {
      const fragmentProps = child.props as { children?: React.ReactNode };
      values.push(...collectTabSegmentValues(fragmentProps.children));
      return;
    }

    if (isTabItemElement(child)) {
      values.push((child.props as TabItemLikeProps).value as string);
      return;
    }

    if (childProps.children != null) {
      values.push(...collectTabSegmentValues(childProps.children));
    }
  });

  return values;
}
