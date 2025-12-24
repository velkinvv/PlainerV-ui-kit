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
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Функция для вычисления позиции tooltip
    const calculatePosition = useCallback((placement: TooltipPosition) => {
      if (!triggerRef.current) return { x: 0, y: 0 };

      const rect = triggerRef.current.getBoundingClientRect();
      const offset = 8; // Отступ от элемента

      let x = 0;
      let y = 0;

      // Определяем основное направление
      if (placement === TooltipPosition.TOP) {
        // Для top позиции tooltip должен быть выше элемента
        y = rect.top - offset;
        x = rect.left + rect.width / 2; // центрируем по горизонтали
      } else if (placement === TooltipPosition.BOTTOM) {
        // Для bottom позиции tooltip должен быть ниже элемента
        y = rect.bottom + offset;
        x = rect.left + rect.width / 2; // центрируем по горизонтали
      } else if (placement === TooltipPosition.LEFT) {
        // Для left позиции tooltip должен быть слева от элемента
        x = rect.left - offset;
        y = rect.top + rect.height / 2; // центрируем по вертикали
      } else if (placement === TooltipPosition.RIGHT) {
        // Для right позиции tooltip должен быть справа от элемента
        x = rect.right + offset;
        y = rect.top + rect.height / 2; // центрируем по вертикали
      }

      return { x, y };
    }, []);

    // Показать tooltip
    const showTooltip = useCallback(() => {
      if (disabled) return;

      timeoutRef.current = setTimeout(() => {
        const newPosition = calculatePosition(position);
        setTooltipState({
          isVisible: true,
          position: newPosition,
          placement: position,
        });
      }, delay);
    }, [disabled, delay, position, calculatePosition]);

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
      const handleResize = () => {
        if (tooltipState.isVisible) {
          const newPosition = calculatePosition(tooltipState.placement);
          setTooltipState(prev => ({ ...prev, position: newPosition }));
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [tooltipState.isVisible, tooltipState.placement, calculatePosition]);

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
