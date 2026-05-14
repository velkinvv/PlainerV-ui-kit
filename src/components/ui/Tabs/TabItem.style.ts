import styled, { css } from 'styled-components';
import {
  TabsDirection,
  TabsVariant,
  TabItemTextPosition,
  TabsVerticalPosition,
} from '../../../types/ui';
import type { TabItemTextOrientation } from '../../../types/ui';
import { ThemeMode } from '../../../types/theme';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';
import type { PillSegmentMetrics } from './pillSegmentTrack/pillSegmentMetricsTypes';

/** Отступ трека pill от краёв сегментов; участвует в calc скругления оболочки вместе с темой. */
const pillTrackInset = '3px';

/** Трек группы табов: контейнер списка + контента */
export const TabItemGroupContainer = styled.div<{
  $direction: TabsDirection;
  $tabsPosition?: TabsVerticalPosition;
}>`
  display: flex;
  flex-direction: ${({ $direction, $tabsPosition }) => {
    if ($direction === TabsDirection.VERTICAL) {
      return $tabsPosition === TabsVerticalPosition.END ? 'row-reverse' : 'row';
    }
    return 'column';
  }};
`;

/**
 * Список триггеров вкладок
 * @property $direction — горизонтальный или вертикальный ряд сегментов
 * @property $variant — pill, line или underline (только линия-индикатор без фона кнопки)
 */
export const TabItemGroupListRoot = styled.div<{
  $direction: TabsDirection;
  $variant: TabsVariant;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === TabsDirection.VERTICAL ? 'column' : 'row')};

  ${({ $variant, $direction, theme }) =>
    $variant === TabsVariant.PILL
      ? css`
          position: relative;
          align-items: stretch;
          box-sizing: border-box;
          gap: ${pillTrackInset};
          padding: ${pillTrackInset};
          overflow: hidden;
          border-radius: calc(${BorderRadiusHandler(theme.borderRadius)} + ${pillTrackInset});
          border: none;
          background: ${theme.mode === ThemeMode.DARK
            ? '#1c1c1c'
            : theme.colors.backgroundTertiary};
        `
      : $variant === TabsVariant.UNDERLINE
        ? css`
            align-items: stretch;
            box-sizing: border-box;
            gap: ${$direction === TabsDirection.HORIZONTAL ? '8px' : '0'};
            padding: 0;
            border: none;
            background: transparent;
          `
        : css`
            border-bottom: ${$direction === TabsDirection.HORIZONTAL
              ? `1px solid ${theme.colors.borderSecondary}`
              : 'none'};
            border-right: ${$direction === TabsDirection.VERTICAL
              ? `1px solid ${theme.colors.borderSecondary}`
              : 'none'};
            background: ${theme.colors.backgroundSecondary};
          `}

  ${({ $direction }) =>
    $direction === TabsDirection.HORIZONTAL
      ? css`
          width: 100%;
        `
      : ''}
`;

/**
 * Подвижная «капля» под активным сегментом pill-трека (анимируется между вкладками).
 * @property $metrics — позиция и размер относительно TabItemGroupListRoot; null до первого замера
 */
export const PillSegmentThumb = styled.div<{ $metrics: PillSegmentMetrics | null }>`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  box-sizing: border-box;
  left: 0;
  top: 0;
  opacity: ${({ $metrics }) => ($metrics ? 1 : 0)};
  width: ${({ $metrics }) => ($metrics ? `${$metrics.width}px` : '0px')};
  height: ${({ $metrics }) => ($metrics ? `${$metrics.height}px` : '0px')};
  transform: translate(
    ${({ $metrics }) => ($metrics ? `${$metrics.offsetX}px` : '0px')},
    ${({ $metrics }) => ($metrics ? `${$metrics.offsetY}px` : '0px')}
  );
  transition:
    transform 0.46s cubic-bezier(0.34, 1.18, 0.46, 1),
    width 0.46s cubic-bezier(0.34, 1.18, 0.46, 1),
    height 0.46s cubic-bezier(0.34, 1.18, 0.46, 1),
    opacity 0.16s ease;

  ${({ theme }) =>
    theme.mode === ThemeMode.DARK
      ? css`
          border-radius: ${BorderRadiusHandler(theme.borderRadius)};
          background: #444444;
          box-shadow: none;
        `
      : css`
          border-radius: ${BorderRadiusHandler(theme.borderRadius)};
          background: ${theme.colors.backgroundSecondary};
          box-shadow: ${theme.boxShadow.sm};
        `}
`;

/** Обёртка для вертикального текста с позицией RIGHT (разворот содержимого) */
export const TabItemVerticalTextWrap = styled.span`
  display: inline-block;
  transform: rotate(180deg);
`;

/** Подпись вкладки на триггере; при **loading** слегка приглушена */
export const TabItemTriggerLabel = styled.span<{ $loading?: boolean }>`
  opacity: ${({ $loading }) => ($loading ? 0.72 : 1)};
`;

/** Слот спиннера при **loading** у вкладки */
export const TabItemLoadingSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/**
 * Корень плейсхолдера **skeleton**: те же отступы, что у триггера, без интерактива (pill-метрики по **HTMLElement**).
 * @property $direction — горизонтальный или вертикальный ряд табов
 * @property $variant — вариант оформления (отступы как у **TabItemTrigger**)
 */
export const TabItemSkeletonRoot = styled.div<{
  $direction: TabsDirection;
  $variant: TabsVariant;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  pointer-events: none;
  user-select: none;

  ${({ $variant, $direction }) =>
    $variant === TabsVariant.PILL
      ? css`
          padding: ${$direction === TabsDirection.VERTICAL ? '10px 12px' : '8px 16px'};
          min-height: ${$direction === TabsDirection.VERTICAL ? 'auto' : '40px'};
          flex: ${$direction === TabsDirection.HORIZONTAL ? '1' : '0 0 auto'};
          width: ${$direction === TabsDirection.VERTICAL ? '100%' : 'auto'};
        `
      : $variant === TabsVariant.UNDERLINE
        ? css`
            padding: ${$direction === TabsDirection.VERTICAL ? '10px 10px' : '10px 8px'};
            flex: 0 0 auto;
            width: ${$direction === TabsDirection.VERTICAL ? '100%' : 'auto'};
          `
        : css`
            padding: 12px 24px;
            flex: ${$direction === TabsDirection.HORIZONTAL ? '0 0 auto' : '0 0 auto'};
            width: ${$direction === TabsDirection.VERTICAL ? '100%' : 'auto'};
          `}
`;

/** Слот иконки: наследует цвет текста сегмента */
export const TabItemIconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: currentColor;

  & svg {
    display: block;
  }
`;

/** Обёртка **Badge** на триггере вкладки (выравнивание в flex-ряду/колонке) */
export const TabItemBadgeWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/**
 * TabItemTrigger — кнопка сегмента вкладки
 * @property $isActive — выбранный сегмент
 * @property $direction — ось списка табов
 * @property $variant — pill, line или underline (минимальный вид)
 * @property $disabled — неактивное состояние (без клика)
 * @property $textOrientation — горизонтальный или вертикальный текст внутри сегмента
 * @property $textPosition — выравнивание при вертикальном тексте
 * @property $hasIcons — влияет на отступы (legacy, для line)
 * @property $flexDirection — направление иконок и подписи
 * @property $gap — зазор между иконкой и текстом
 */
export const TabItemTrigger = styled.button<{
  $isActive: boolean;
  $direction: TabsDirection;
  $variant: TabsVariant;
  $disabled?: boolean;
  $loading?: boolean;
  $textOrientation?: TabItemTextOrientation;
  $textPosition?: TabItemTextPosition;
  $hasIcons?: boolean;
  $flexDirection?: string;
  $gap?: string;
}>`
  border: none;
  cursor: ${({ $disabled, $loading }) =>
    $loading ? 'wait' : $disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  font-weight: 500;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.18s ease;
  will-change: transform, background-color, color;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ $flexDirection }) => $flexDirection || 'row'};
  gap: ${({ $gap }) => $gap || '0'};
  font-family: inherit;

  ${({ $variant, $direction, $isActive, $disabled, theme }) =>
    $variant === TabsVariant.PILL
      ? css`
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          padding: ${$direction === TabsDirection.VERTICAL ? '10px 12px' : '8px 16px'};
          min-height: ${$direction === TabsDirection.VERTICAL ? 'auto' : '40px'};
          border-radius: ${BorderRadiusHandler(theme.borderRadius)};
          flex: ${$direction === TabsDirection.HORIZONTAL ? '1' : '0 0 auto'};
          width: ${$direction === TabsDirection.VERTICAL ? '100%' : 'auto'};
          box-shadow: none;
          border-bottom: none;
          border-right: none;
          background: transparent;

          ${$disabled
            ? css`
                color: ${theme.colors.textDisabled};
              `
            : $isActive
              ? css`
                  color: ${theme.colors.text};
                `
              : css`
                  color: ${theme.colors.textSecondary};
                `}

          &:hover:enabled {
            ${!$disabled && !$isActive
              ? css`
                  color: ${theme.colors.text};
                `
              : ''}
            ${!$disabled && $isActive
              ? css`
                  color: ${theme.colors.text};
                `
              : ''}
          }
          /* Без translateY/scale: сегменты не «выпрыгивают» из pill-трека с overflow: hidden */

          &:focus {
            outline: none;
          }

          &:focus-visible {
            outline: 2px solid ${theme.colors.primary};
            outline-offset: -2px;
          }
        `
      : $variant === TabsVariant.UNDERLINE
        ? css`
            box-sizing: border-box;
            padding: ${$direction === TabsDirection.VERTICAL ? '10px 10px' : '10px 8px'};
            min-height: auto;
            border-radius: 0;
            flex: 0 0 auto;
            width: ${$direction === TabsDirection.VERTICAL ? '100%' : 'auto'};
            box-shadow: none;
            background: transparent;

            border-bottom: ${$direction === TabsDirection.HORIZONTAL
              ? `1px solid ${$isActive && !$disabled ? theme.colors.primary : 'transparent'}`
              : 'none'};
            border-right: ${$direction === TabsDirection.VERTICAL
              ? `1px solid ${$isActive && !$disabled ? theme.colors.primary : 'transparent'}`
              : 'none'};

            ${$disabled
              ? css`
                  color: ${theme.colors.textDisabled};
                `
              : $isActive
                ? css`
                    color: ${theme.colors.primary};
                  `
                : css`
                    color: ${theme.colors.textSecondary};
                  `}

            &:hover:enabled {
              background: transparent;
              color: ${$disabled
                ? theme.colors.textDisabled
                : $isActive
                  ? theme.colors.primary
                  : theme.colors.text};
            }

            &:focus {
              outline: none;
            }

            &:focus-visible {
              outline: 2px solid ${theme.colors.primary};
              outline-offset: 2px;
            }
          `
        : css`
          padding: 12px 24px;
          background: ${$isActive && !$disabled ? theme.colors.primary : 'transparent'};
          color: ${$isActive && !$disabled
            ? '#ffffff'
            : $disabled
              ? theme.colors.textDisabled
              : theme.colors.textSecondary};
          border-bottom: ${$direction === TabsDirection.HORIZONTAL
            ? `2px solid ${$isActive && !$disabled ? theme.colors.primary : 'transparent'}`
            : 'none'};
          border-right: ${$direction === TabsDirection.VERTICAL
            ? `2px solid ${$isActive && !$disabled ? theme.colors.primary : 'transparent'}`
            : 'none'};
          border-radius: 0;

          &:hover:enabled {
            background: ${$isActive ? theme.colors.primary : theme.colors.backgroundTertiary};
            color: ${$isActive ? '#ffffff' : theme.colors.text};
          }
          ${buildHoverPressMotionCss({
            hoverSelector: '&:hover:enabled',
            activeSelector: '&:active:enabled',
            hoverTransform: !$disabled ? 'translateY(-1px)' : 'none',
            activeTransform: !$disabled ? 'scale(0.98)' : 'none',
          })}

          &:focus {
            outline: none;
          }

          &:focus-visible {
            outline: 2px solid ${theme.colors.primary};
            outline-offset: -2px;
          }
        `}

  /* Поворот текста (вертикальная подпись внутри сегмента) */
  ${({ $textOrientation, $textPosition, $variant }) => {
    if ($variant === TabsVariant.PILL) {
      return '';
    }
    if ($textOrientation === 'vertical') {
      const position = $textPosition || TabItemTextPosition.RIGHT;
      if (position === TabItemTextPosition.RIGHT) {
        return css`
          writing-mode: vertical-rl;
          text-orientation: mixed;
        `;
      }
      return css`
        writing-mode: vertical-lr;
        text-orientation: mixed;
      `;
    }
    return '';
  }}

  ${({ $textOrientation, $textPosition, $variant }) => {
    if ($variant === TabsVariant.PILL || $textOrientation !== 'vertical') {
      return '';
    }
    const position = $textPosition || TabItemTextPosition.RIGHT;
    if (position === TabItemTextPosition.LEFT) {
      return css`
        justify-content: flex-start;
      `;
    }
    if (position === TabItemTextPosition.RIGHT) {
      return css`
        justify-content: flex-end;
      `;
    }
    return css`
      justify-content: flex-end;
    `;
  }}
`;

/**
 * TabItemContent — панель контента выбранной вкладки
 * @property $isActive — показывать или скрывать блок
 * @property $direction — влияет на flex-раскладку рядом с вертикальным списком
 */
export const TabItemContent = styled.div<{
  $isActive: boolean;
  $direction: TabsDirection;
}>`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  padding: 16px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};

  ${({ $direction }) =>
    $direction === TabsDirection.VERTICAL
      ? css`
          flex: 1;
          min-width: 0;
        `
      : css`
          width: 100%;
        `}
`;
