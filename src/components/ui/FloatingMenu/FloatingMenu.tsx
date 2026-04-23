import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import {
  FloatingMenuDragSource,
  FloatingMenuPlacement,
  type FloatingMenuProps,
} from '@/types/ui';
import {
  FloatingMenuRootContext,
  type FloatingMenuRootContextValue,
} from './FloatingMenuContext';
import { FloatingMenuBar, FloatingMenuRoot } from './FloatingMenu.style';
import { clampFloatingMenuToViewport, getFloatingMenuFixedStyles } from './handlers';
import { FloatingMenuDivider } from './FloatingMenuDivider';
import { FloatingMenuDragHandle } from './FloatingMenuDragHandle';
import { FloatingMenuGroup } from './FloatingMenuGroup';
import { FloatingMenuGroupItem } from './FloatingMenuGroupItem';

const DEFAULT_Z = 1200;
const SAFE = 16;

/**
 * Плавающая дополнительная панель инструментов (макет Figma): группы, разделители, закрепление по краям или перетаскивание.
 * @property placement — фиксация у края экрана (по умолчанию снизу по центру)
 * @property draggable — свободное перемещение (`position: fixed` по offset)
 * @property dragSource — перетаскивание за всю панель или за `FloatingMenu.DragHandle`
 * @property defaultOffset — начальная позиция в px при `draggable`
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
  zIndex = DEFAULT_Z,
  'aria-label': ariaLabel,
  className,
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; ox: number; oy: number; sx: number; sy: number } | null>(
    null,
  );

  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [hasDragHandle, setHasDragHandle] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const effectiveDragSource =
    dragSource === FloatingMenuDragSource.HANDLE && !hasDragHandle
      ? FloatingMenuDragSource.BAR
      : dragSource;

  useLayoutEffect(() => {
    if (!draggable || !rootRef.current) {
      return;
    }
    if (defaultOffset) {
      setOffset(defaultOffset);
      return;
    }
    const el = rootRef.current;
    const apply = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      const x = Math.round(window.innerWidth / 2 - rect.width / 2);
      const y = Math.round(window.innerHeight - SAFE - rect.height);
      setOffset(clampFloatingMenuToViewport(x, y, rect.width, rect.height, SAFE));
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

  const rootCtx = useMemo<FloatingMenuRootContextValue>(
    () => ({
      draggable,
      dragSource: effectiveDragSource,
      zIndex,
      openDropdownId,
      setOpenDropdownId,
      hasDragHandle,
      setHasDragHandle,
    }),
    [draggable, effectiveDragSource, zIndex, openDropdownId, hasDragHandle],
  );

  const onPointerMove = useCallback((e: PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId || !rootRef.current) {
      return;
    }
    const rect = rootRef.current.getBoundingClientRect();
    const nx = d.sx + (e.clientX - d.ox);
    const ny = d.sy + (e.clientY - d.oy);
    setOffset(clampFloatingMenuToViewport(nx, ny, rect.width, rect.height, SAFE));
  }, []);

  const endDrag = useCallback(
    (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d || d.pointerId !== e.pointerId) {
        return;
      }
      dragRef.current = null;
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      try {
        rootRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    },
    [onPointerMove],
  );

  const tryStartDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!draggable || e.button !== 0) {
        return;
      }
      const target = e.target as HTMLElement | null;
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
      const sx = offset?.x ?? Math.round(rect.left + window.scrollX);
      const sy = offset?.y ?? Math.round(rect.top + window.scrollY);
      if (!offset) {
        setOffset({ x: sx, y: sy });
      }
      dragRef.current = {
        pointerId: e.pointerId,
        ox: e.clientX,
        oy: e.clientY,
        sx,
        sy,
      };
      setIsDragging(true);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [draggable, effectiveDragSource, endDrag, offset, onPointerMove],
  );

  useEffect(() => {
    if (!draggable || !offset || !rootRef.current) {
      return;
    }
    const onResize = () => {
      const el = rootRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      setOffset(prev =>
        prev ? clampFloatingMenuToViewport(prev.x, prev.y, rect.width, rect.height, SAFE) : prev,
      );
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draggable, offset]);

  return (
    <FloatingMenuRootContext.Provider value={rootCtx}>
      <FloatingMenuRoot
        ref={rootRef}
        className={clsx('ui-floating-menu', className)}
        style={draggable ? floatStyles : fixedStyles}
        role="toolbar"
        aria-label={ariaLabel}
        $isDragging={isDragging}
        onPointerDown={draggable ? tryStartDrag : undefined}
      >
        <FloatingMenuBar>{children}</FloatingMenuBar>
      </FloatingMenuRoot>
    </FloatingMenuRootContext.Provider>
  );
};

FloatingMenu.displayName = 'FloatingMenu';
FloatingMenu.Group = FloatingMenuGroup;
FloatingMenu.GroupItem = FloatingMenuGroupItem;
FloatingMenu.Divider = FloatingMenuDivider;
FloatingMenu.DragHandle = FloatingMenuDragHandle;
