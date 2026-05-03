import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import type { TooltipProps } from '../../../types/ui';
import { TooltipPosition } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { TooltipContent, TooltipTrigger } from './Tooltip.style';

export interface TooltipState {
  isVisible: boolean;
  position: { x: number; y: number };
  placement: TooltipPosition;
}

interface TooltipBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const Tooltip: React.FC<TooltipProps> = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = TooltipPosition.TOP,
      size = Size.MD,
      className,
      delay = 200,
      disabled = false,
    },
    _ref,
  ) => {
    const [tooltipState, setTooltipState] = useState<TooltipState>({
      isVisible: false,
      position: { x: 0, y: 0 },
      placement: position,
    });

    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const viewportPadding = 8;
    const tooltipOffset = 8;

    const getPositionForPlacement = useCallback(
      (triggerRect: DOMRect, placement: TooltipPosition): { x: number; y: number } => {
        if (placement === TooltipPosition.TOP) {
          return {
            x: triggerRect.left + triggerRect.width / 2,
            y: triggerRect.top - tooltipOffset,
          };
        }
        if (placement === TooltipPosition.BOTTOM) {
          return {
            x: triggerRect.left + triggerRect.width / 2,
            y: triggerRect.bottom + tooltipOffset,
          };
        }
        if (placement === TooltipPosition.LEFT) {
          return {
            x: triggerRect.left - tooltipOffset,
            y: triggerRect.top + triggerRect.height / 2,
          };
        }

        return {
          x: triggerRect.right + tooltipOffset,
          y: triggerRect.top + triggerRect.height / 2,
        };
      },
      [],
    );

    const getTooltipBounds = useCallback(
      (
        tooltipPosition: { x: number; y: number },
        placement: TooltipPosition,
        tooltipSize: { width: number; height: number },
      ): TooltipBounds => {
        if (placement === TooltipPosition.TOP) {
          return {
            left: tooltipPosition.x - tooltipSize.width / 2,
            right: tooltipPosition.x + tooltipSize.width / 2,
            top: tooltipPosition.y - tooltipSize.height,
            bottom: tooltipPosition.y,
          };
        }
        if (placement === TooltipPosition.BOTTOM) {
          return {
            left: tooltipPosition.x - tooltipSize.width / 2,
            right: tooltipPosition.x + tooltipSize.width / 2,
            top: tooltipPosition.y,
            bottom: tooltipPosition.y + tooltipSize.height,
          };
        }
        if (placement === TooltipPosition.LEFT) {
          return {
            left: tooltipPosition.x - tooltipSize.width,
            right: tooltipPosition.x,
            top: tooltipPosition.y - tooltipSize.height / 2,
            bottom: tooltipPosition.y + tooltipSize.height / 2,
          };
        }

        return {
          left: tooltipPosition.x,
          right: tooltipPosition.x + tooltipSize.width,
          top: tooltipPosition.y - tooltipSize.height / 2,
          bottom: tooltipPosition.y + tooltipSize.height / 2,
        };
      },
      [],
    );

    const clampPositionToViewport = useCallback(
      (
        tooltipPosition: { x: number; y: number },
        placement: TooltipPosition,
        tooltipSize: { width: number; height: number },
      ): { x: number; y: number } => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const bounds = getTooltipBounds(tooltipPosition, placement, tooltipSize);

        if (bounds.left < viewportPadding) {
          tooltipPosition.x += viewportPadding - bounds.left;
        }
        if (bounds.right > viewportWidth - viewportPadding) {
          tooltipPosition.x -= bounds.right - (viewportWidth - viewportPadding);
        }
        if (bounds.top < viewportPadding) {
          tooltipPosition.y += viewportPadding - bounds.top;
        }
        if (bounds.bottom > viewportHeight - viewportPadding) {
          tooltipPosition.y -= bounds.bottom - (viewportHeight - viewportPadding);
        }

        return tooltipPosition;
      },
      [getTooltipBounds],
    );

    const resolveTooltipGeometry = useCallback(
      (preferredPlacement: TooltipPosition) => {
        if (!triggerRef.current) {
          return {
            placement: preferredPlacement,
            position: { x: 0, y: 0 },
          };
        }

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current?.getBoundingClientRect();
        const tooltipSize = {
          width: tooltipRect?.width ?? 220,
          height: tooltipRect?.height ?? 40,
        };
        const fallbackPlacementMap: Record<TooltipPosition, TooltipPosition> = {
          [TooltipPosition.TOP]: TooltipPosition.BOTTOM,
          [TooltipPosition.BOTTOM]: TooltipPosition.TOP,
          [TooltipPosition.LEFT]: TooltipPosition.RIGHT,
          [TooltipPosition.RIGHT]: TooltipPosition.LEFT,
        };

        const preferredPosition = getPositionForPlacement(triggerRect, preferredPlacement);
        const preferredBounds = getTooltipBounds(preferredPosition, preferredPlacement, tooltipSize);
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const hasOverflowOnPrimaryAxis =
          (preferredPlacement === TooltipPosition.TOP &&
            preferredBounds.top < viewportPadding) ||
          (preferredPlacement === TooltipPosition.BOTTOM &&
            preferredBounds.bottom > viewportHeight - viewportPadding) ||
          (preferredPlacement === TooltipPosition.LEFT &&
            preferredBounds.left < viewportPadding) ||
          (preferredPlacement === TooltipPosition.RIGHT &&
            preferredBounds.right > viewportWidth - viewportPadding);

        const resolvedPlacement = hasOverflowOnPrimaryAxis
          ? fallbackPlacementMap[preferredPlacement]
          : preferredPlacement;
        const resolvedPosition = getPositionForPlacement(triggerRect, resolvedPlacement);

        return {
          placement: resolvedPlacement,
          position: clampPositionToViewport(resolvedPosition, resolvedPlacement, tooltipSize),
        };
      },
      [clampPositionToViewport, getPositionForPlacement, getTooltipBounds],
    );

    // Показать tooltip
    const showTooltip = useCallback(() => {
      if (disabled) return;

      timeoutRef.current = setTimeout(() => {
        const tooltipGeometry = resolveTooltipGeometry(position);
        setTooltipState({
          isVisible: true,
          position: tooltipGeometry.position,
          placement: tooltipGeometry.placement,
        });
      }, delay);
    }, [disabled, delay, position, resolveTooltipGeometry]);

    // Скрыть tooltip
    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setTooltipState(prev => ({ ...prev, isVisible: false }));
    }, []);

    // Обработчики событий
    const handleMouseEnter = () => {
      showTooltip();
    };

    const handleMouseLeave = () => {
      hideTooltip();
    };

    const handleFocus = () => {
      showTooltip();
    };

    const handleBlur = () => {
      hideTooltip();
    };

    // Очистка при размонтировании
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    // Обновляем позицию при изменении размера окна
    useEffect(() => {
      const updateTooltipPosition = () => {
        if (tooltipState.isVisible) {
          const tooltipGeometry = resolveTooltipGeometry(position);
          setTooltipState(prev => ({
            ...prev,
            position: tooltipGeometry.position,
            placement: tooltipGeometry.placement,
          }));
        }
      };

      window.addEventListener('resize', updateTooltipPosition);
      window.addEventListener('scroll', updateTooltipPosition, true);
      return () => {
        window.removeEventListener('resize', updateTooltipPosition);
        window.removeEventListener('scroll', updateTooltipPosition, true);
      };
    }, [tooltipState.isVisible, position, resolveTooltipGeometry]);

    // После монтирования тултипа пересчитываем точные координаты по реальным размерам.
    useEffect(() => {
      if (!tooltipState.isVisible) {
        return;
      }

      const tooltipGeometry = resolveTooltipGeometry(position);
      setTooltipState(prev => {
        if (
          prev.placement === tooltipGeometry.placement &&
          prev.position.x === tooltipGeometry.position.x &&
          prev.position.y === tooltipGeometry.position.y
        ) {
          return prev;
        }

        return {
          ...prev,
          position: tooltipGeometry.position,
          placement: tooltipGeometry.placement,
        };
      });
    }, [tooltipState.isVisible, position, resolveTooltipGeometry]);

    return (
      <>
        <TooltipTrigger
          ref={triggerRef}
          className={clsx('ui-tooltip-trigger', className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={disabled ? -1 : 0}
        >
          {children}
        </TooltipTrigger>

        {tooltipState.isVisible &&
          createPortal(
            <TooltipContent
              ref={tooltipRef}
              data-tooltip-content
              $position={tooltipState.position}
              $placement={tooltipState.placement}
              $isVisible={tooltipState.isVisible}
              $size={size}
            >
              {content}
            </TooltipContent>,
            document.body,
          )}
      </>
    );
  },
);

Tooltip.displayName = 'Tooltip';
