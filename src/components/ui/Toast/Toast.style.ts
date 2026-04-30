import styled, { css } from 'styled-components';
import type { ToastPlacement } from '@/types/ui';
import { BorderRadiusHandler } from '@/handlers/uiHandlers';
import type { ToastPillVisualTokens, ToastSurfaceTokens } from './handlers';

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
export const ToastStack = styled.div<{ $placement: ToastPlacement; $stacked?: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => (theme.zIndex?.modal ?? 2000) + 50};
  display: flex;
  flex-direction: column;
  gap: ${({ $stacked }) => ($stacked ? 6 : 10)}px;
  align-items: stretch;
  max-width: min(560px, calc(100vw - 32px));
  pointer-events: none;
  ${({ $stacked }) =>
    $stacked
      ? css`
          & > * + * {
            margin-top: -2px;
          }
        `
      : ''}
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
  position: relative;
  overflow: hidden;
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
    outline: 2px solid ${({ theme }) => theme.colors.info};
    outline-offset: 2px;
  }
`;

/**
 * Корень «пилюли»: тонированный фон и цветная рамка по макету, скругление из темы.
 * @property $tokens - Палитра из {@link getToastPillVisualTokens}
 */
export const ToastPillRoot = styled.article<{ $tokens: ToastPillVisualTokens }>`
  pointer-events: auto;
  display: block;
  position: relative;
  overflow: hidden;
  padding: 14px 12px 14px 16px;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: ${({ $tokens }) => $tokens.surface};
  border: ${({ $tokens }) => $tokens.border};
  box-shadow: ${({ theme }) => theme.boxShadow.notification};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

/**
 * Ряд: иконка + текст + кнопка действия
 */
export const ToastPillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 36px;
`;

/**
 * Обёртка иконки с мягким цветным свечением (drop-shadow)
 * @property $glow - Цвет размытого свечения
 */
export const ToastPillIconWrap = styled.span<{ $glow: string }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px ${({ $glow }) => $glow});
`;

/**
 * Колонка заголовка и сообщения
 */
export const ToastPillTextCol = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

/**
 * Заголовок во внешнем виде «пилюля»
 * @property $color - Цвет текста
 */
export const ToastPillTitle = styled.p<{ $color: string }>`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ $color }) => $color};
`;

/**
 * Основной текст «пилюли»
 * @property $color - Цвет текста
 */
export const ToastPillMessage = styled.p<{ $color: string }>`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: ${({ $color }) => $color};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-word;
`;

/**
 * Кнопка действия (капсула справа)
 * @property $bg - Фон кнопки
 * @property $fg - Цвет текста
 */
export const ToastPillAction = styled.button<{ $bg: string; $fg: string }>`
  flex-shrink: 0;
  margin: 0;
  padding: 8px 16px;
  border: none;
  border-radius: 999px;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.info};
    outline-offset: 2px;
  }
`;

/**
 * Закрытие в строке (контурный крестик справа, как в макете).
 */
export const ToastPillDismiss = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: -4px -4px -4px 4px;
  padding: 4px;
  border: none;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: transparent;
  cursor: pointer;
  color: inherit;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.info};
    outline-offset: 2px;
  }
`;

/**
 * Трек нижнего индикатора времени автозакрытия.
 */
export const ToastProgressTrack = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.08);
`;

/**
 * Заполняемая полоса времени автозакрытия.
 * @property $color - Акцентный цвет типа уведомления.
 */
export const ToastProgressFill = styled.div<{ $color: string }>`
  height: 100%;
  width: 100%;
  background: ${({ $color }) => $color};
  transition: width 100ms linear;
`;
