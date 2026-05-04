import styled, { css } from 'styled-components';
import type { SnackbarPlacement } from '@/types/ui';
import type { SnackbarSurfaceTokens } from './handlers';

const placementMixin = ($placement: SnackbarPlacement) => {
  switch ($placement) {
    case 'bottom-left':
      return css`
        left: 16px;
        bottom: 16px;
        align-items: flex-start;
      `;
    case 'bottom-right':
      return css`
        right: 16px;
        bottom: 16px;
        align-items: flex-end;
      `;
    case 'bottom-center':
    default:
      return css`
        left: 50%;
        bottom: 16px;
        transform: translateX(-50%);
        align-items: center;
      `;
  }
};

/**
 * Фиксированный стек snackbar у нижнего края (`column-reverse`: новый элемент ближе к краю).
 * @property $placement - Выравнивание колонки
 */
export const SnackbarStack = styled.div<{ $placement: SnackbarPlacement }>`
  position: fixed;
  z-index: ${({ theme }) => (theme.zIndex?.modal ?? 2000) + 40};
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  max-width: min(560px, calc(100vw - 32px));
  pointer-events: none;
  ${({ $placement }) => placementMixin($placement)}
`;

/**
 * Компактная полоса snackbar.
 * @property $tokens - Цвета из `getSnackbarSurfaceTokens`
 */
export const SnackbarBar = styled.div<{ $tokens: SnackbarSurfaceTokens }>`
  pointer-events: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  min-height: 48px;
  padding: 12px 12px 12px 16px;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadow.notification};
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ $tokens }) => $tokens.surface};
  color: ${({ $tokens }) => $tokens.messageColor};
  width: 100%;
`;

/**
 * Текст сообщения.
 * `color: inherit` — иначе глобальное правило `p { color: theme.colors.text }` перебивает цвет с плашки и текст сливается с фоном.
 */
export const SnackbarMessage = styled.p`
  flex: 1;
  margin: 0;
  min-width: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  color: inherit;
`;

/**
 * Кнопка текстового действия (Material-подобная)
 * @property $color - Цвет акцента действия
 */
export const SnackbarAction = styled.button<{ $color: string }>`
  flex-shrink: 0;
  margin: 0;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: ${({ $color }) => $color};
  cursor: pointer;
  text-transform: none;

  &:hover {
    filter: brightness(1.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ $color }) => $color};
    outline-offset: 2px;
  }
`;

/**
 * Иконка закрытия
 */
export const SnackbarDismiss = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: -4px 0 -4px 0;
  padding: 4px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  color: inherit;
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;
