import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'styled-components';

import clsx from 'clsx';

import { Size } from '@/types/sizes';
import type { PopoverProps } from '@/types/ui';

import {
  handleClickOutsideEvent,
  isClickInsideDropdown,
} from '../Dropdown/handlers';
import { PopoverSurface } from './Popover.style';
import {
  resolveFloatingOverlayPortalRoot,
  resolveFloatingOverlayZIndex,
  getFloatingOverlayPlacementStyle,
} from '../../../handlers/floatingOverlayHandlers';
import { useFloatingOverlayLayer } from '../../../contexts/FloatingOverlayLayerContext';
import { useFloatingOverlayPosition } from '../../../hooks/useFloatingOverlayPosition';

/**
 * Всплывающая панель с произвольным содержимым у триггера.
 * Клик по обёртке триггера переключает открытие; клик снаружи и Escape закрывают.
 *
 * @param trigger - Область переключения (оборачивается в контейнер с ref)
 * @param children - Содержимое панели
 * @param open - Контролируемое открытие
 * @param defaultOpen - Начальное открытие (неконтролируемый режим)
 * @param onOpenChange - Колбэк при смене открытия
 * @param size - Размер панели из темы (`Size.SM` | `Size.MD` | `Size.LG`)
 * @param variant - Вариант из `theme.dropdowns.variants`
 * @param positioningMode - Подгонка к краям вьюпорта и flip
 * @param portalContainer - Узел портала (по умолчанию `document.body`)
 * @param offset - Отступ панели от триггера в px
 * @param closeOnEscape - Закрытие по Escape (по умолчанию `true`)
 * @param disabled - Блокировка открытия
 * @param className - Класс корневой обёртки триггера
 * @param contentClassName - Класс плавающей панели
 * @param onClickOutside - Обработчик клика вне компонента
 * @param boundaryElement - Для `inline`: якорь позиционирования
 * @param inline - Рендер панели `absolute` внутри границы без портала
 * @param contentWidth - Ширина панели
 * @param contentMaxHeight - Макс. высота с прокруткой
 * @param contentAriaLabel - `aria-label` панели для скринридеров
 * @param id - Атрибут `id` корневой обёртки
 * @param dataTestId - `data-testid` корневой обёртки
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  open: openControlled,
  defaultOpen = false,
  onOpenChange,
  size = Size.MD,
  variant = 'default',
  positioningMode = 'autoFlip',
  preferredPlacement = 'below',
  portalContainer,
  offset = 4,
  closeOnEscape = true,
  disabled = false,
  className,
  contentClassName,
  onClickOutside,
  boundaryElement,
  inline = false,
  contentWidth,
  contentMaxHeight,
  contentAriaLabel = 'Всплывающая панель',
  id,
  dataTestId,
  triggerWrapClickToggle = true,
  triggerWrapperProps,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const floatingOverlayLayer = useFloatingOverlayLayer();
  const floatingOverlayZIndex = resolveFloatingOverlayZIndex(
    floatingOverlayLayer.minimumZIndex,
    theme.dropdowns?.settings?.zIndex,
  );
  const isControlled = openControlled !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? Boolean(openControlled) : internalOpen;

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const overlayBoundaryRef = useRef<HTMLElement | null>(null);
  overlayBoundaryRef.current = boundaryElement ?? null;

  const { position: overlayPosition, isPositionReady: isOverlayPositionReady } =
    useFloatingOverlayPosition({
      isOpen,
      anchorRef: rootRef,
      overlayRef: surfaceRef,
      positioningMode,
      preferredPlacement,
      offset,
      inline,
      boundaryRef: overlayBoundaryRef,
    });

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpenState(false);
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, closeOnEscape, setOpenState]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onMouseDown = (event: MouseEvent) => {
      const triggerElement = rootRef.current;
      const menuElement = surfaceRef.current;
      if (!triggerElement || !menuElement) {
        return;
      }
      if (isClickInsideDropdown(event, rootRef, surfaceRef)) {
        return;
      }
      handleClickOutsideEvent(event, rootRef, surfaceRef, onClickOutside);
      setOpenState(false);
    };
    document.addEventListener('mousedown', onMouseDown, true);
    return () => document.removeEventListener('mousedown', onMouseDown, true);
  }, [isOpen, onClickOutside, setOpenState]);

  const handleRootClick = (event: React.MouseEvent) => {
    if (!triggerWrapClickToggle) {
      return;
    }
    if (disabled) {
      return;
    }
    const target = event.target as Node;
    if (surfaceRef.current?.contains(target)) {
      return;
    }
    setOpenState(!isOpen);
  };

  const {
    onClick: triggerWrapperOnClick,
    className: triggerWrapperClassName,
    style: triggerWrapperStyle,
    ...restTriggerWrapperProps
  } = triggerWrapperProps ?? {};

  const portalTarget = resolveFloatingOverlayPortalRoot(
    portalContainer,
    floatingOverlayLayer.portalRoot,
  );

  const positionMode = inline ? 'absolute' : 'fixed';

  const panel = isOpen ? (
    <PopoverSurface
      ref={surfaceRef}
      role="region"
      aria-label={contentAriaLabel}
      tabIndex={-1}
      className={clsx(contentClassName)}
      $size={size}
      $variant={variant}
      $positionMode={positionMode}
      $contentWidth={contentWidth}
      $contentMaxHeight={contentMaxHeight}
      $overlayZIndex={floatingOverlayZIndex}
      style={getFloatingOverlayPlacementStyle({
        position: overlayPosition,
        isPositionReady: isOverlayPositionReady,
        zIndex: floatingOverlayZIndex,
      })}
    >
      {children}
    </PopoverSurface>
  ) : null;

  return (
    <div
      ref={rootRef}
      id={id}
      data-testid={dataTestId}
      className={clsx('ui-popover-anchor', className, triggerWrapperClassName)}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        triggerWrapperOnClick?.(event);
        handleRootClick(event);
      }}
      style={{
        ...(inline ? { position: 'relative' as const } : {}),
        ...triggerWrapperStyle,
      }}
      {...restTriggerWrapperProps}
    >
      {trigger}
      {isOpen && inline && panel}
      {isOpen && !inline && portalTarget ? createPortal(panel, portalTarget) : null}
    </div>
  );
};
