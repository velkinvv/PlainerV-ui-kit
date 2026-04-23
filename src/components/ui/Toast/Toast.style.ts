import styled, { css } from 'styled-components';
import type { ToastPlacement } from '@/types/ui';
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
export const ToastStack = styled.div<{ $placement: ToastPlacement }>`
  position: fixed;
  z-index: ${({ theme }) => (theme.zIndex?.modal ?? 2000) + 50};
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  max-width: min(560px, calc(100vw - 32px));
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

/**
 * Корень «пилюли»: белая капсула, тень, кнопка закрытия с перекрытием угла
 * @property $tokens - Палитра из {@link getToastPillVisualTokens}
 */
export const ToastPillRoot = styled.article<{ $tokens: ToastPillVisualTokens }>`
  pointer-events: auto;
  position: relative;
  display: block;
  padding: 12px 20px 12px 16px;
  border-radius: 999px;
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
  padding-right: 8px;
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
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/**
 * Круглая кнопка закрытия, частично выходит за границы карточки (макет Figma)
 * @property $bg - Фон круга
 */
export const ToastPillDismiss = styled.button<{ $bg: string }>`
  position: absolute;
  top: -6px;
  right: -6px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

  &:hover {
    filter: brightness(1.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
