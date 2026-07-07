import React, { useLayoutEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import {
  ActionBarSize,
  type ActionBarItemDefinition,
  type ActionBarProps,
} from '../../../types/ui';
import { ActionBarRoot } from './ActionBar.style';
import { ActionBarDivider } from './ActionBarDivider';
import { ActionBarDropMenuItem } from './ActionBarDropMenuItem';
import { ActionBarItem, ActionBarItemWithTooltip } from './ActionBarItem';
import { ActionBarOverflowMenu } from './ActionBarOverflowMenu';
import {
  getActionBarDividerSlotWidthPx,
  getActionBarItemSizePx,
  splitActionBarItemsByContainerWidth,
} from './handlers';

const DEFAULT_OVERFLOW_MENU_ARIA_LABEL = 'Дополнительные действия';

/**
 * Панель действий: горизонтальный ряд иконок с группировкой разделителями и overflow-меню.
 * @param size — размер кнопок (XL / LG / MD / SM)
 * @param items — порядок действий
 * @param renderActionBarItem — рендер видимой кнопки
 * @param renderDropMenuItem — рендер строки overflow-меню
 * @param itemIsDisabled — disabled для overflow-пунктов
 * @param overflowMenuAriaLabel — подпись overflow-кнопки и меню
 * @param aria-label — подпись toolbar
 * @param className — CSS-класс корня
 */
export const ActionBar: React.FC<ActionBarProps> & {
  Item: typeof ActionBarItem;
  ItemWithTooltip: typeof ActionBarItemWithTooltip;
  Divider: typeof ActionBarDivider;
  DropMenuItem: typeof ActionBarDropMenuItem;
} = ({
  size = ActionBarSize.XL,
  items,
  renderActionBarItem,
  renderDropMenuItem,
  itemIsDisabled = () => false,
  overflowMenuAriaLabel = DEFAULT_OVERFLOW_MENU_ARIA_LABEL,
  className,
  'aria-label': ariaLabel,
  ...htmlProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState<ActionBarItemDefinition[]>(items);
  const [hiddenItems, setHiddenItems] = useState<ActionBarItemDefinition[]>([]);

  const itemSizePx = getActionBarItemSizePx(size);
  const dividerSlotWidthPx = getActionBarDividerSlotWidthPx();

  useLayoutEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setContainerWidth(entry.contentRect.width || 0);
      });
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const splitResult = splitActionBarItemsByContainerWidth(
      items,
      containerWidth,
      itemSizePx,
      dividerSlotWidthPx,
    );

    setVisibleItems(splitResult.visibleItems);
    setHiddenItems(splitResult.hiddenItems);
  }, [containerWidth, dividerSlotWidthPx, itemSizePx, items]);

  const renderVisibleItem = (item: ActionBarItemDefinition) => (
    <React.Fragment key={item.itemId}>
      {renderActionBarItem(item.itemId)}
      {item.withDivider ? <ActionBarDivider barSize={size} /> : null}
    </React.Fragment>
  );

  return (
    <ActionBarRoot
      ref={containerRef}
      $barSize={size}
      role="toolbar"
      aria-label={ariaLabel}
      className={clsx('ui-action-bar', className)}
      {...htmlProps}
    >
      {visibleItems.map(renderVisibleItem)}
      <ActionBarOverflowMenu
        barSize={size}
        hiddenItems={hiddenItems}
        renderDropMenuItem={renderDropMenuItem}
        itemIsDisabled={itemIsDisabled}
        overflowMenuAriaLabel={overflowMenuAriaLabel}
      />
    </ActionBarRoot>
  );
};

ActionBar.displayName = 'ActionBar';
ActionBar.Item = ActionBarItem;
ActionBar.ItemWithTooltip = ActionBarItemWithTooltip;
ActionBar.Divider = ActionBarDivider;
ActionBar.DropMenuItem = ActionBarDropMenuItem;
