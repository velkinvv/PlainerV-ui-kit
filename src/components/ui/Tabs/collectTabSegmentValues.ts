import React from 'react';

/** Совпадает с **TabItem.displayName** — для обхода дерева без жёсткой связи по импорту типа */
export const TAB_ITEM_DISPLAY_NAME = 'TabItem';

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

    const componentType = child.type as React.ComponentType & { displayName?: string };
    const displayName = componentType?.displayName;
    const childProps = child.props as { value?: string; children?: React.ReactNode };

    if (displayName === TAB_ITEM_DISPLAY_NAME && typeof childProps.value === 'string') {
      values.push(childProps.value);
      return;
    }

    if (childProps.children != null) {
      values.push(...collectTabSegmentValues(childProps.children));
    }
  });

  return values;
}
