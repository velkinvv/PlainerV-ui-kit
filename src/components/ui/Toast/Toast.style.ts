import styled, { css } from 'styled-components';
import type { ToastPlacement } from '@/types/ui';
import type { ToastSurfaceTokens } from './handlers';

const placementMixin = ($placement: ToastPlacement) => {
  switch ($placement) {
    case 'top-center':
      return css`
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'bottom-right':
      return css`
        bottom: 16px;
        right: 16px;
      `;
    case 'top-right':
    default:
      return css`
        top: 16px;
        right: 16px;
      `;
  }
};

/**
 * Фиксированная колонка стека уведомлений (портал в `document.body`).
 * @property $placement - Угол или верх по центру
 */
export const ToastStack = styled.div<{ $placement: ToastPlacement }>`
  position: fixed;
  z-index: ${({ theme }) => (theme.zIndex?.modal ?? 2000) + 50};
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  max-width: min(420px, calc(100vw - 32px));
  pointer-events: none;
  ${({ $placement }) => placementMixin($placement)}
`;

/**
 * Карточка одного уведомления.
 * @property $tokens - Цвета из {@link getToastSurfaceTokens}
 */
export const ToastCard = styled.article<{ $tokens: ToastSurfaceTokens }>`
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 12px 14px 16px;
  border-radius: 8px;
  background: ${({ $tokens }) => $tokens.surface};
  border-left: 4px solid ${({ $tokens }) => $tokens.accent};
  box-shadow: ${({ theme }) => theme.boxShadow.notification};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

/**
 * Строка: текст + кнопка закрытия
 */
export const ToastHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

/**
 * Блок текста (заголовок + сообщение)
 */
export const ToastTextBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

/**
 * Заголовок toast
 * @property $color - Цвет из токенов типа
 */
export const ToastTitle = styled.p<{ $color: string }>`
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ $color }) => $color};
`;

/**
 * Основной текст
 * @property $color - Цвет вторичного текста
 */
export const ToastMessage = styled.p<{ $color: string }>`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  color: ${({ $color }) => $color};
`;

/**
 * Кнопка закрытия (иконка)
 */
export const ToastDismiss = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: -4px -4px -4px 4px;
  padding: 4px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  color: inherit;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
