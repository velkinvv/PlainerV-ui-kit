import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { offScreenPanelLayerTransition } from '@/handlers/offScreenPanelMotionHandlers';
import {
  SidemenuHorizontalPlacement,
  SidemenuVerticalAlignment,
} from '@/types/ui';
import {
  resolveSidemenuFixedHorizontalInset,
  resolveSidemenuOffScreenHiddenOffsetX,
  resolveSidemenuOffScreenHiddenRotateY,
  resolveSidemenuOffScreenRowAlignItems,
  resolveSidemenuOffScreenTransformOrigin,
  resolveSidemenuFixedVerticalPosition,
} from '@/handlers/sidemenuPlacementHandlers';

/** Скрытое состояние: лёгкая «глубина» и наклон листа (как у системных сайдбаров) */
const OFF_SCREEN_PANEL_HIDDEN_OPACITY = 0.9;
const OFF_SCREEN_PANEL_HIDDEN_SCALE = 0.968;

const OffScreenRoot = styled.div<{
  $zIndex: number;
  $totalWidthPx: number;
  $horizontalPlacement: SidemenuHorizontalPlacement;
  $verticalAlignment: SidemenuVerticalAlignment;
}>`
  position: fixed;
  height: 100vh;
  width: ${({ $totalWidthPx }) => $totalWidthPx}px;
  overflow: hidden;
  box-sizing: border-box;
  z-index: ${({ $zIndex }) => $zIndex};
  pointer-events: none;

  ${({ $horizontalPlacement }) => {
    const horizontal = resolveSidemenuFixedHorizontalInset($horizontalPlacement);
    return css`
      left: ${horizontal.left ?? 'auto'};
      right: ${horizontal.right ?? 'auto'};
    `;
  }}

  ${({ $verticalAlignment }) => {
    const vertical = resolveSidemenuFixedVerticalPosition($verticalAlignment);
    return css`
      top: ${vertical.top === '50%' ? 0 : (vertical.top ?? 0)};
      bottom: ${vertical.bottom ?? 'auto'};
    `;
  }}
`;

/** Строка: полоса края + колонка под выезжающую панель; при закрытии клики только у полосы */
const OffScreenInnerRow = styled.div<{
  $pointerEvents: 'auto' | 'none';
  $horizontalPlacement: SidemenuHorizontalPlacement;
  $verticalAlignment: SidemenuVerticalAlignment;
}>`
  display: flex;
  flex-direction: ${({ $horizontalPlacement }) =>
    $horizontalPlacement === SidemenuHorizontalPlacement.RIGHT ? 'row-reverse' : 'row'};
  align-items: ${({ $verticalAlignment }) =>
    resolveSidemenuOffScreenRowAlignItems($verticalAlignment)};
  height: 100%;
  min-height: 0;
  width: 100%;
  pointer-events: ${({ $pointerEvents }) => $pointerEvents};

  ${({ $verticalAlignment }) =>
    $verticalAlignment === SidemenuVerticalAlignment.CENTER
      ? css`
          min-height: 100vh;
        `
      : ''}
`;

/** Hover-зона у левого края экрана — всегда ловит наведение для раскрытия */
const OffScreenEdgeHitZone = styled.div<{ $edgeWidthPx: number }>`
  flex-shrink: 0;
  width: ${({ $edgeWidthPx }) => $edgeWidthPx}px;
  height: 100%;
  min-height: 100%;
  pointer-events: auto;
  background: ${({ theme }) =>
    theme?.colors?.border != null
      ? `color-mix(in srgb, ${theme.colors.border} 28%, transparent)`
      : 'rgba(0, 0, 0, 0.04)'};
`;

/** Колонка шириной панели: обрезка + perspective для лёгкого 3D при уезде */
const OffScreenPanelColumn = styled.div<{
  $panelWidthPx: number;
  $isInteractive: boolean;
  $horizontalPlacement: SidemenuHorizontalPlacement;
}>`
  flex-shrink: 0;
  width: ${({ $panelWidthPx }) => $panelWidthPx}px;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  pointer-events: ${({ $isInteractive }) => ($isInteractive ? 'auto' : 'none')};
  perspective: 1400px;
  perspective-origin: ${({ $horizontalPlacement }) =>
    resolveSidemenuOffScreenTransformOrigin($horizontalPlacement).perspectiveOrigin};
`;

const OffScreenPanelMotion = styled(motion.div)<{
  $panelWidthPx: number;
  $horizontalPlacement: SidemenuHorizontalPlacement;
}>`
  flex-shrink: 0;
  width: ${({ $panelWidthPx }) => $panelWidthPx}px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  transform-origin: ${({ $horizontalPlacement }) =>
    resolveSidemenuOffScreenTransformOrigin($horizontalPlacement).transformOrigin};
  transform-style: preserve-3d;
  will-change: transform, opacity;
`;

/** Задержка скрытия по умолчанию после ухода курсора с меню (1.5 с) */
export const DEFAULT_OFF_SCREEN_HIDE_DELAY_MS = 1500;

export interface SidemenuOffScreenHoverShellProps {
  /** Левый или правый край экрана */
  horizontalPlacement?: SidemenuHorizontalPlacement;
  /** Вертикальное положение полосы и панели */
  verticalAlignment?: SidemenuVerticalAlignment;
  /** Ширина полосы у края экрана (px) */
  edgeWidthPx: number;
  /** Текущая ширина панели меню (px), синхронно с анимацией ширины Sidemenu */
  panelWidthPx: number;
  /** Контролируемое «панель выехала» */
  revealed?: boolean;
  /** Начальное значение в неконтролируемом режиме */
  defaultRevealed?: boolean;
  /** Запрос смены видимости (контролируемый режим) */
  onRevealedChange?: (revealed: boolean) => void;
  /** После появления панели */
  onShow?: () => void;
  /** После скрытия панели */
  onHide?: () => void;
  zIndex: number;
  className?: string;
  children: React.ReactNode;
  /**
   * Задержка перед скрытием после mouseleave с области меню (мс).
   * Пока таймер не сработал, повторный вход на полосу/панель отменяет скрытие.
   */
  hideDelayMs?: number;
}

/**
 * Оболочка: полоса у края раскрывает меню; при скрытии панель уезжает влево за экран (не схлопывается в ноль по ширине).
 */
export const SidemenuOffScreenHoverShell: React.FC<SidemenuOffScreenHoverShellProps> = ({
  horizontalPlacement = SidemenuHorizontalPlacement.LEFT,
  verticalAlignment = SidemenuVerticalAlignment.TOP,
  edgeWidthPx,
  panelWidthPx,
  revealed: revealedProp,
  defaultRevealed = false,
  onRevealedChange,
  onShow,
  onHide,
  zIndex,
  className,
  children,
  hideDelayMs = DEFAULT_OFF_SCREEN_HIDE_DELAY_MS,
}) => {
  const isControlled = revealedProp !== undefined;
  const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
  const revealed = isControlled ? revealedProp! : internalRevealed;

  const applyRevealed = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalRevealed(next);
      }
      onRevealedChange?.(next);
    },
    [isControlled, onRevealedChange],
  );

  const prevRevealedRef = useRef<boolean | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingHide = useCallback(() => {
    if (hideTimeoutRef.current != null) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearPendingHide();
    hideTimeoutRef.current = setTimeout(() => {
      hideTimeoutRef.current = null;
      applyRevealed(false);
    }, hideDelayMs);
  }, [applyRevealed, clearPendingHide, hideDelayMs]);

  useEffect(() => () => clearPendingHide(), [clearPendingHide]);

  useEffect(() => {
    if (prevRevealedRef.current === null) {
      prevRevealedRef.current = revealed;
      return;
    }
    if (prevRevealedRef.current === revealed) {
      return;
    }
    if (revealed) {
      onShow?.();
    } else {
      onHide?.();
    }
    prevRevealedRef.current = revealed;
  }, [revealed, onShow, onHide]);

  const totalInnerWidthPx = edgeWidthPx + panelWidthPx;

  const hiddenOffsetX = resolveSidemenuOffScreenHiddenOffsetX(
    horizontalPlacement,
    panelWidthPx,
  );
  const hiddenRotateY = resolveSidemenuOffScreenHiddenRotateY(horizontalPlacement);

  /** Скрыто: панель за краем + лёгкий fade/scale/наклон (spring в transition) */
  const panelMotionTarget = revealed
    ? {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
      }
    : {
        x: hiddenOffsetX,
        opacity: OFF_SCREEN_PANEL_HIDDEN_OPACITY,
        scale: OFF_SCREEN_PANEL_HIDDEN_SCALE,
        rotateY: hiddenRotateY,
      };

  return (
    <OffScreenRoot
      className={className}
      $zIndex={zIndex}
      $totalWidthPx={totalInnerWidthPx}
      $horizontalPlacement={horizontalPlacement}
      $verticalAlignment={verticalAlignment}
      role="presentation"
    >
      <OffScreenInnerRow
        $pointerEvents={revealed ? 'auto' : 'none'}
        $horizontalPlacement={horizontalPlacement}
        $verticalAlignment={verticalAlignment}
        onMouseEnter={clearPendingHide}
        onMouseLeave={scheduleHide}
      >
        <OffScreenEdgeHitZone
          $edgeWidthPx={edgeWidthPx}
          aria-hidden
          data-sidemenu-offscreen-edge
          onMouseEnter={() => {
            clearPendingHide();
            applyRevealed(true);
          }}
        />
        <OffScreenPanelColumn
          $panelWidthPx={panelWidthPx}
          $isInteractive={revealed}
          $horizontalPlacement={horizontalPlacement}
        >
          <OffScreenPanelMotion
            $panelWidthPx={panelWidthPx}
            $horizontalPlacement={horizontalPlacement}
            initial={false}
            animate={panelMotionTarget}
            transition={offScreenPanelLayerTransition}
          >
            {children}
          </OffScreenPanelMotion>
        </OffScreenPanelColumn>
      </OffScreenInnerRow>
    </OffScreenRoot>
  );
};
