import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { FloatingMenuDragSource, FloatingMenuOrientation, FloatingMenuPlacement, type FloatingMenuProps } from '@/types/ui';
import {
  DEFAULT_FLOATING_MENU_DYNAMIC_SIZE_INSET_PX,
  resolveFloatingMenuDynamicMaxSizeCss,
  resolveFloatingMenuOrientation,
} from '@/handlers/floatingMenuOrientationHandlers';
import { FLOATING_MENU_SIZE_ANIMATION_RELEASE_MS } from '@/handlers/floatingMenuItemPresenceHandlers';
import { FloatingMenuRootContext, type FloatingMenuRootContextValue } from './FloatingMenuContext';
import {
  FloatingMenuBar,
  FloatingMenuMotionBar,
  FloatingMenuRoot,
} from './FloatingMenu.style';
import { clampFloatingMenuToViewport, getFloatingMenuFixedStyles } from './handlers';
import { FloatingMenuDivider } from './FloatingMenuDivider';
import { FloatingMenuDragHandle } from './FloatingMenuDragHandle';
import { FloatingMenuGroup } from './FloatingMenuGroup';
import { FloatingMenuGroupItem } from './FloatingMenuGroupItem';

const DEFAULT_Z = 1200;
const SAFE = 16;

/**
 * Суммирует количество пунктов во всех зарегистрированных группах.
 * @param groupItemCounts — карта groupId → число пунктов
 */
function sumFloatingMenuGroupItemCounts(groupItemCounts: Map<string, number>): number {
  let totalCount = 0;
  groupItemCounts.forEach((itemCount) => {
    totalCount += itemCount;
  });
  return totalCount;
}

/**
 * Плавающая дополнительная панель инструментов (макет Figma): группы, разделители, закрепление по краям или перетаскивание.
 * @property placement — фиксация у края экрана (по умолчанию снизу по центру)
 * @property draggable — свободное перемещение (`position: fixed` по offset)
 * @property dragSource — перетаскивание за всю панель или за `FloatingMenu.DragHandle`
 * @property defaultOffset — начальная позиция в px при `draggable`
 * @property dynamicSize — динамическая ширина и sync-анимация пунктов в группах
 * @property dynamicSizeInsetPx — отступ для max-width при dynamicSize (px)
 * @property zIndex — слой панели
 * @property aria-label — подпись для `role="toolbar"`
 * @property className — класс на корневом контейнере
 * @property children — группы, разделители, пункты (`FloatingMenu.Group`, `Divider`, `GroupItem`)
 */
export const FloatingMenu: React.FC<FloatingMenuProps> & {
  Group: typeof FloatingMenuGroup;
  GroupItem: typeof FloatingMenuGroupItem;
  Divider: typeof FloatingMenuDivider;
  DragHandle: typeof FloatingMenuDragHandle;
} = ({
  placement = FloatingMenuPlacement.BOTTOM_CENTER,
  draggable = false,
  dragSource = FloatingMenuDragSource.BAR,
  defaultOffset,
  dynamicSize = false,
  dynamicSizeInsetPx = DEFAULT_FLOATING_MENU_DYNAMIC_SIZE_INSET_PX,
  orientation: orientationProp,
  zIndex = DEFAULT_Z,
  'aria-label': ariaLabel,
  className,
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    ox: number;
    oy: number;
    sx: number;
    sy: number;
  } | null>(null);
  const groupItemCountsRef = useRef<Map<string, number>>(new Map());
  const previousTotalItemCountRef = useRef<number | null>(null);
  const sizeAnimationReleaseTimerRef = useRef<number | null>(null);

  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [hasDragHandle, setHasDragHandle] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sizeAnimating, setSizeAnimating] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const effectiveDragSource =
    dragSource === FloatingMenuDragSource.HANDLE && !hasDragHandle
      ? FloatingMenuDragSource.BAR
      : dragSource;

  const orientation = resolveFloatingMenuOrientation(orientationProp);

  const dynamicSizeMaxCss = useMemo(
    () => resolveFloatingMenuDynamicMaxSizeCss(orientation, dynamicSizeInsetPx),
    [dynamicSizeInsetPx, orientation],
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
    }, FLOATING_MENU_SIZE_ANIMATION_RELEASE_MS);
  }, [dynamicSize]);

  const endSizeAnimation = useCallback(() => {
    if (sizeAnimationReleaseTimerRef.current != null) {
      window.clearTimeout(sizeAnimationReleaseTimerRef.current);
      sizeAnimationReleaseTimerRef.current = null;
    }

    setSizeAnimating(false);
  }, []);

  const refreshTotalItemCount = useCallback(() => {
    const nextTotal = sumFloatingMenuGroupItemCounts(groupItemCountsRef.current);
    setTotalItemCount(nextTotal);
    return nextTotal;
  }, []);

  const registerGroupItemCount = useCallback(
    (groupId: string, itemCount: number) => {
      groupItemCountsRef.current.set(groupId, itemCount);
      refreshTotalItemCount();
    },
    [refreshTotalItemCount],
  );

  const unregisterGroupItemCount = useCallback(
    (groupId: string) => {
      groupItemCountsRef.current.delete(groupId);
      refreshTotalItemCount();
    },
    [refreshTotalItemCount],
  );

  useLayoutEffect(() => {
    if (!dynamicSize) {
      return undefined;
    }

    if (previousTotalItemCountRef.current === null) {
      previousTotalItemCountRef.current = totalItemCount;
      return undefined;
    }

    if (previousTotalItemCountRef.current !== totalItemCount) {
      previousTotalItemCountRef.current = totalItemCount;
      beginSizeAnimation();
    }

    return () => {
      if (sizeAnimationReleaseTimerRef.current != null) {
        window.clearTimeout(sizeAnimationReleaseTimerRef.current);
      }
    };
  }, [beginSizeAnimation, dynamicSize, totalItemCount]);

  useLayoutEffect(() => {
    if (!draggable || !rootRef.current) {
      return;
    }
    if (defaultOffset) {
      setOffset(defaultOffset);
      return;
    }
    const element = rootRef.current;
    const apply = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      const positionX = Math.round(window.innerWidth / 2 - rect.width / 2);
      const positionY = Math.round(window.innerHeight - SAFE - rect.height);
      setOffset(clampFloatingMenuToViewport(positionX, positionY, rect.width, rect.height, SAFE));
    };
    apply();
    requestAnimationFrame(apply);
  }, [draggable, defaultOffset]);

  const fixedStyles = useMemo(
    () => (!draggable ? getFloatingMenuFixedStyles(placement, zIndex) : undefined),
    [draggable, placement, zIndex],
  );

  const floatStyles = useMemo(() => {
    if (!draggable) {
      return undefined;
    }
    if (!offset) {
      return {
        position: 'fixed' as const,
        left: -9999,
        top: 0,
        zIndex,
        visibility: 'hidden' as const,
        pointerEvents: 'none' as const,
      };
    }
    return {
      position: 'fixed' as const,
      left: offset.x,
      top: offset.y,
      zIndex,
      transform: 'none' as const,
      visibility: 'visible' as const,
      pointerEvents: 'auto' as const,
    };
  }, [draggable, offset, zIndex]);

  const rootContextValue = useMemo<FloatingMenuRootContextValue>(
    () => ({
      draggable,
      dragSource: effectiveDragSource,
      zIndex,
      orientation,
      dynamicSize,
      dynamicSizeMaxCss,
      sizeAnimating,
      openDropdownId,
      setOpenDropdownId,
      hasDragHandle,
      setHasDragHandle,
      registerGroupItemCount,
      unregisterGroupItemCount,
      endSizeAnimation,
    }),
    [
      draggable,
      dynamicSize,
      dynamicSizeMaxCss,
      effectiveDragSource,
      endSizeAnimation,
      hasDragHandle,
      openDropdownId,
      orientation,
      registerGroupItemCount,
      sizeAnimating,
      unregisterGroupItemCount,
      zIndex,
    ],
  );

  const onPointerMove = useCallback((pointerEvent: PointerEvent) => {
    const dragState = dragRef.current;
    if (!dragState || dragState.pointerId !== pointerEvent.pointerId || !rootRef.current) {
      return;
    }
    const rect = rootRef.current.getBoundingClientRect();
    const nextX = dragState.sx + (pointerEvent.clientX - dragState.ox);
    const nextY = dragState.sy + (pointerEvent.clientY - dragState.oy);
    setOffset(clampFloatingMenuToViewport(nextX, nextY, rect.width, rect.height, SAFE));
  }, []);

  const endDrag = useCallback(
    (pointerEvent: PointerEvent) => {
      const dragState = dragRef.current;
      if (!dragState || dragState.pointerId !== pointerEvent.pointerId) {
        return;
      }
      dragRef.current = null;
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      try {
        rootRef.current?.releasePointerCapture(pointerEvent.pointerId);
      } catch {
        /* ignore */
      }
    },
    [onPointerMove],
  );

  const tryStartDrag = useCallback(
    (pointerEvent: React.PointerEvent) => {
      if (!draggable || pointerEvent.button !== 0) {
        return;
      }
      const target = pointerEvent.target as HTMLElement | null;
      if (!target || !rootRef.current) {
        return;
      }
      if (target.closest('button') || target.closest('[data-floating-menu-dropdown-panel]')) {
        return;
      }
      if (effectiveDragSource === FloatingMenuDragSource.HANDLE) {
        if (!target.closest('[data-floating-menu-drag-handle]')) {
          return;
        }
      }
      const rect = rootRef.current.getBoundingClientRect();
      const startX = offset?.x ?? Math.round(rect.left + window.scrollX);
      const startY = offset?.y ?? Math.round(rect.top + window.scrollY);
      if (!offset) {
        setOffset({ x: startX, y: startY });
      }
      dragRef.current = {
        pointerId: pointerEvent.pointerId,
        ox: pointerEvent.clientX,
        oy: pointerEvent.clientY,
        sx: startX,
        sy: startY,
      };
      setIsDragging(true);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
      (pointerEvent.currentTarget as HTMLElement).setPointerCapture(pointerEvent.pointerId);
    },
    [draggable, effectiveDragSource, endDrag, offset, onPointerMove],
  );

  useEffect(() => {
    if (!draggable || !offset || !rootRef.current) {
      return;
    }
    const onResize = () => {
      const element = rootRef.current;
      if (!element) {
        return;
      }
      const rect = element.getBoundingClientRect();
      setOffset((previousOffset) =>
        previousOffset
          ? clampFloatingMenuToViewport(previousOffset.x, previousOffset.y, rect.width, rect.height, SAFE)
          : previousOffset,
      );
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draggable, offset]);

  const barContent = dynamicSize ? (
    <FloatingMenuMotionBar
      $orientation={orientation}
      $dynamicSizeMaxCss={dynamicSizeMaxCss}
      $sizeAnimating={sizeAnimating}
      layout={false}
    >
      {children}
    </FloatingMenuMotionBar>
  ) : (
    <FloatingMenuBar $orientation={orientation}>{children}</FloatingMenuBar>
  );

  return (
    <FloatingMenuRootContext.Provider value={rootContextValue}>
      <FloatingMenuRoot
        ref={rootRef}
        className={clsx(
          'ui-floating-menu',
          orientation === FloatingMenuOrientation.VERTICAL
            ? 'ui-floating-menu--vertical'
            : 'ui-floating-menu--horizontal',
          dynamicSize && 'ui-floating-menu--dynamic-size',
          className,
        )}
        style={draggable ? floatStyles : fixedStyles}
        role="toolbar"
        aria-label={ariaLabel}
        $isDragging={isDragging}
        $orientation={orientation}
        onPointerDown={draggable ? tryStartDrag : undefined}
      >
        {barContent}
      </FloatingMenuRoot>
    </FloatingMenuRootContext.Provider>
  );
};

FloatingMenu.displayName = 'FloatingMenu';
FloatingMenu.Group = FloatingMenuGroup;
FloatingMenu.GroupItem = FloatingMenuGroupItem;
FloatingMenu.Divider = FloatingMenuDivider;
FloatingMenu.DragHandle = FloatingMenuDragHandle;
