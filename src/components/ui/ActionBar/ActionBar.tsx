import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import {
  ActionBarOrientation,
  ActionBarSize,
  type ActionBarItemDefinition,
  type ActionBarProps,
} from '../../../types/ui';
import {
  DEFAULT_ACTION_BAR_DYNAMIC_SIZE_INSET_PX,
  resolveActionBarDynamicMaxSizeCss,
  resolveActionBarLayoutOptions,
} from '@/handlers/actionBarOrientationHandlers';
import { ACTION_BAR_SIZE_ANIMATION_RELEASE_MS } from '@/handlers/actionBarItemPresenceHandlers';
import {
  ActionBarRoot,
  ActionBarVerticalRoot,
  ActionBarMotionRoot,
} from './ActionBar.style';
import { ActionBarDivider } from './ActionBarDivider';
import { ActionBarDropMenuItem } from './ActionBarDropMenuItem';
import { ActionBarItem, ActionBarItemWithTooltip } from './ActionBarItem';
import { ActionBarLayoutProvider } from './ActionBarLayoutContext';
import { ActionBarOverflowMenu } from './ActionBarOverflowMenu';
import { ActionBarVisibleItemMotion } from './ActionBarVisibleItemMotion';
import {
  getActionBarDividerSlotWidthPx,
  getActionBarItemSizePx,
  splitActionBarItemsByContainerWidth,
} from './handlers';

const DEFAULT_OVERFLOW_MENU_ARIA_LABEL = 'Дополнительные действия';

/**
 * Панель действий: горизонтальный или вертикальный ряд иконок с группировкой и overflow-меню.
 */
export const ActionBar: React.FC<ActionBarProps> & {
  Item: typeof ActionBarItem;
  ItemWithTooltip: typeof ActionBarItemWithTooltip;
  Divider: typeof ActionBarDivider;
  DropMenuItem: typeof ActionBarDropMenuItem;
} = ({
  size = ActionBarSize.XL,
  orientation: orientationProp,
  dynamicSize: dynamicSizeProp,
  dynamicSizeInsetPx = DEFAULT_ACTION_BAR_DYNAMIC_SIZE_INSET_PX,
  items,
  renderActionBarItem,
  renderDropMenuItem,
  itemIsDisabled = () => false,
  overflowMenuAriaLabel = DEFAULT_OVERFLOW_MENU_ARIA_LABEL,
  dynamicHeight = false,
  dynamicHeightInsetPx,
  className,
  'aria-label': ariaLabel,
  ...htmlProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState<ActionBarItemDefinition[]>(items);
  const [hiddenItems, setHiddenItems] = useState<ActionBarItemDefinition[]>([]);
  const [sizeAnimating, setSizeAnimating] = useState(false);
  const previousItemsLengthRef = useRef<number | null>(null);
  const sizeAnimationReleaseTimerRef = useRef<number | null>(null);

  const { orientation, dynamicSize } = resolveActionBarLayoutOptions({
    orientation: orientationProp,
    dynamicSize: dynamicSizeProp,
    dynamicHeight,
  });

  const insetPx = dynamicHeightInsetPx ?? dynamicSizeInsetPx;
  const isHorizontalStatic =
    orientation === ActionBarOrientation.HORIZONTAL && !dynamicSize;
  const isVerticalStatic =
    orientation === ActionBarOrientation.VERTICAL && !dynamicSize;

  const itemSizePx = getActionBarItemSizePx(size);
  const dividerSlotWidthPx = getActionBarDividerSlotWidthPx();

  const dynamicSizeMaxCss = useMemo(
    () => resolveActionBarDynamicMaxSizeCss(orientation, insetPx),
    [orientation, insetPx],
  );

  const beginSizeAnimation = useCallback(() => {
    if (!dynamicSize) {
      return;
    }

    setSizeAnimating(true);

    if (sizeAnimationReleaseTimerRef.current != null) {
      window.clearTimeout(sizeAnimationReleaseTimerRef.current);
    }

    sizeAnimationReleaseTimerRef.current = window.setTimeout(() => {
      setSizeAnimating(false);
      sizeAnimationReleaseTimerRef.current = null;
    }, ACTION_BAR_SIZE_ANIMATION_RELEASE_MS);
  }, [dynamicSize]);

  const endSizeAnimation = useCallback(() => {
    if (sizeAnimationReleaseTimerRef.current != null) {
      window.clearTimeout(sizeAnimationReleaseTimerRef.current);
      sizeAnimationReleaseTimerRef.current = null;
    }

    setSizeAnimating(false);
  }, []);

  useLayoutEffect(() => {
    if (!dynamicSize) {
      return undefined;
    }

    if (previousItemsLengthRef.current === null) {
      previousItemsLengthRef.current = items.length;
      return undefined;
    }

    if (previousItemsLengthRef.current !== items.length) {
      previousItemsLengthRef.current = items.length;
      beginSizeAnimation();
    }

    return () => {
      if (sizeAnimationReleaseTimerRef.current != null) {
        window.clearTimeout(sizeAnimationReleaseTimerRef.current);
      }
    };
  }, [beginSizeAnimation, dynamicSize, items.length]);

  useLayoutEffect(() => {
    if (!isHorizontalStatic) {
      setVisibleItems(items);
      setHiddenItems([]);
      return;
    }

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
  }, [isHorizontalStatic, items]);

  useLayoutEffect(() => {
    if (!isHorizontalStatic) {
      return;
    }

    const splitResult = splitActionBarItemsByContainerWidth(
      items,
      containerWidth,
      itemSizePx,
      dividerSlotWidthPx,
    );

    setVisibleItems(splitResult.visibleItems);
    setHiddenItems(splitResult.hiddenItems);
  }, [containerWidth, dividerSlotWidthPx, isHorizontalStatic, itemSizePx, items]);

  const renderVisibleItemContent = (item: ActionBarItemDefinition) => (
    <>
      {renderActionBarItem(item.itemId)}
      {item.withDivider ? <ActionBarDivider barSize={size} /> : null}
    </>
  );

  const renderVisibleItem = (item: ActionBarItemDefinition, itemIndex: number, itemsList: ActionBarItemDefinition[]) => {
    if (dynamicSize) {
      return (
        <ActionBarVisibleItemMotion
          key={item.itemId}
          orientation={orientation}
          isLastItem={itemIndex === itemsList.length - 1}
        >
          {renderVisibleItemContent(item)}
        </ActionBarVisibleItemMotion>
      );
    }

    return (
      <React.Fragment key={item.itemId}>{renderVisibleItemContent(item)}</React.Fragment>
    );
  };

  const visibleItemsContent = dynamicSize ? (
    <AnimatePresence initial={false} mode="sync" onExitComplete={endSizeAnimation}>
      {visibleItems.map((item, itemIndex) => renderVisibleItem(item, itemIndex, visibleItems))}
    </AnimatePresence>
  ) : (
    visibleItems.map((item, itemIndex) => renderVisibleItem(item, itemIndex, visibleItems))
  );

  const rootClassName = clsx(
    'ui-action-bar',
    orientation === ActionBarOrientation.VERTICAL
      ? 'ui-action-bar--vertical'
      : 'ui-action-bar--horizontal',
    dynamicSize && 'ui-action-bar--dynamic-size',
    className,
  );

  return (
    <ActionBarLayoutProvider orientation={orientation}>
      {dynamicSize ? (
        <ActionBarMotionRoot
          ref={containerRef}
          $barSize={size}
          $orientation={orientation}
          $dynamicSizeMaxCss={dynamicSizeMaxCss}
          $sizeAnimating={sizeAnimating}
          layout={false}
          role="toolbar"
          aria-label={ariaLabel}
          className={rootClassName}
        >
          {visibleItemsContent}
        </ActionBarMotionRoot>
      ) : isVerticalStatic ? (
        <ActionBarVerticalRoot
          ref={containerRef}
          $barSize={size}
          role="toolbar"
          aria-label={ariaLabel}
          className={rootClassName}
          {...htmlProps}
        >
          {visibleItemsContent}
        </ActionBarVerticalRoot>
      ) : (
        <ActionBarRoot
          ref={containerRef}
          $barSize={size}
          role="toolbar"
          aria-label={ariaLabel}
          className={rootClassName}
          {...htmlProps}
        >
          {visibleItemsContent}
          <ActionBarOverflowMenu
            barSize={size}
            hiddenItems={hiddenItems}
            renderDropMenuItem={renderDropMenuItem}
            itemIsDisabled={itemIsDisabled}
            overflowMenuAriaLabel={overflowMenuAriaLabel}
          />
        </ActionBarRoot>
      )}
    </ActionBarLayoutProvider>
  );
};

ActionBar.displayName = 'ActionBar';
ActionBar.Item = ActionBarItem;
ActionBar.ItemWithTooltip = ActionBarItemWithTooltip;
ActionBar.Divider = ActionBarDivider;
ActionBar.DropMenuItem = ActionBarDropMenuItem;
