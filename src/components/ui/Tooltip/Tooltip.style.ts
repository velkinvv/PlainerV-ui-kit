import styled, { css } from 'styled-components';
import { TooltipPosition } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { ZIndexHandler } from '../../../handlers/uiHandlers';

/**
 * Контейнер для триггера тултипа
 */
export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

/**
 * Контент тултипа
 * @param position - позиция тултипа
 * @param placement - размещение тултипа
 * @param isVisible - видимость тултипа
 * @param size - размер тултипа
 */
export const TooltipContent = styled.div<{
  $position: { x: number; y: number };
  $placement: TooltipPosition;
  $isVisible: boolean;
  $size: Size;
}>`
  position: fixed;
  /* Фон и стрелка: theme.colors.info (яркий синий), не theme.colors.primary (палитра blue — тёмная) */
  background: ${({ theme }) => theme.colors.info};
  /* Белый текст на ярком info */
  color: #ffffff;
  border-radius: 16px; // Border radius из макета
  font-family: ${({ theme }) => theme.fonts.primary}; // Montserrat из макета
  font-weight: 500; // Medium из макета
  white-space: nowrap;
  z-index: ${ZIndexHandler('tooltip')};
  pointer-events: none;
  user-select: none;
  word-wrap: break-word;
  white-space: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; // Gap из макета

  /* Размеры согласно макету */
  ${({ $size }) => {
    switch ($size) {
      case Size.SM:
        return css`
          font-size: 12px;
          line-height: 1.3333333333333333em;
          padding: 6px 10px;
        `;
      case Size.LG:
        return css`
          font-size: 16px;
          line-height: 1.5em;
          padding: 6px 10px;
        `;
      case Size.MD:
      default:
        return css`
          font-size: 14px;
          line-height: 1.4285714285714286em;
          padding: 6px 10px;
        `;
    }
  }}

  /* Анимация появления */
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: ${({ $placement, $isVisible }) => {
    const baseTransform = (() => {
      if ($placement === TooltipPosition.TOP) {
        return 'translateX(-50%) translateY(-100%)';
      }
      if ($placement === TooltipPosition.BOTTOM) {
        return 'translateX(-50%)';
      }
      if ($placement === TooltipPosition.LEFT) {
        return 'translateY(-50%) translateX(-100%)';
      }
      if ($placement === TooltipPosition.RIGHT) {
        return 'translateY(-50%)';
      }
      return 'translate(-50%, -50%)';
    })();

    const scale = $isVisible ? 'scale(1)' : 'scale(0.8)';
    return `${baseTransform} ${scale}`;
  }};
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out,
    transform 0.2s ease-in-out;

  /* Позиционирование */
  left: ${({ $position, $placement }) => {
    if ($placement.includes('left')) {
      return `${$position.x}px`;
    }
    if ($placement.includes('right')) {
      return `${$position.x}px`;
    }
    return `${$position.x}px`;
  }};
  top: ${({ $position, $placement }) => {
    if ($placement.includes('top')) {
      return `${$position.y}px`;
    }
    if ($placement.includes('bottom')) {
      return `${$position.y}px`;
    }
    return `${$position.y}px`;
  }};

  /* Стрелка */
  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;

    ${({ theme, $placement }) => {
      const arrowColor = theme.colors.info;

      if ($placement === TooltipPosition.TOP) {
        return css`
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid ${arrowColor};
        `;
      }
      if ($placement === TooltipPosition.BOTTOM) {
        return css`
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid ${arrowColor};
        `;
      }
      if ($placement === TooltipPosition.LEFT) {
        return css`
          right: 0px;
          top: 50%;
          transform: translateY(-50%) translateX(50%);
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid ${arrowColor};
        `;
      }
      if ($placement === TooltipPosition.RIGHT) {
        return css`
          left: 0px;
          top: 50%;
          transform: translateY(-50%) translateX(-50%);
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid ${arrowColor};
        `;
      }
      return '';
    }}
  }
`;

/**
 * Триггер тултипа
 */
export const TooltipTrigger = styled.div`
  display: inline-block;
  cursor: help;
`;
