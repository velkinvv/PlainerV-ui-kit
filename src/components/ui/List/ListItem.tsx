import React, { Children, forwardRef, isValidElement } from 'react';
import { clsx } from 'clsx';
import type { ListItemProps } from '../../../types/ui';
import { ListItemContent, ListItemRoot } from './List.style';
import { ListIcon } from './ListIcon';

/**
 * Отделяет ведущие `List.Icon` от остального контента пункта.
 * @param children - Дочерние узлы пункта
 */
const splitListItemChildren = (children: React.ReactNode) => {
  const childArray = Children.toArray(children);
  const leadingIcons: React.ReactNode[] = [];
  const contentNodes: React.ReactNode[] = [];

  childArray.forEach((child) => {
    if (
      isValidElement(child) &&
      (child.type === ListIcon ||
        (typeof child.type === 'object' &&
          child.type != null &&
          'displayName' in child.type &&
          (child.type as { displayName?: string }).displayName === 'List.Icon'))
    ) {
      leadingIcons.push(child);
      return;
    }
    contentNodes.push(child);
  });

  return { leadingIcons, contentNodes };
};

/**
 * Пункт списка.
 *
 * @param props.children - Текст, `List.Icon` и/или вложенный `List`
 * @param ref - Ref на `li`
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, className, ...rest }, ref) => {
    const { leadingIcons, contentNodes } = splitListItemChildren(children);

    return (
      <ListItemRoot ref={ref} className={clsx('ui-list-item', className)} {...rest}>
        {leadingIcons}
        <ListItemContent className="ui-list-item__content">{contentNodes}</ListItemContent>
      </ListItemRoot>
    );
  },
);

ListItem.displayName = 'List.Item';
