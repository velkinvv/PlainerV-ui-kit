import styled, { css } from 'styled-components';
import {
  TabsDirection,
  TabsVariant,
  TabItemTextPosition,
  TabsVerticalPosition,
} from '../../../types/ui';
import type { TabItemTextOrientation } from '../../../types/ui';
import { ThemeMode } from '../../../types/theme';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';

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
 * @property $variant — line (подчёркивание) или pill (сегментированный трек)
 */
export const TabItemGroupList = styled.div<{
  $direction: TabsDirection;
  $variant: TabsVariant;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === TabsDirection.VERTICAL ? 'column' : 'row')};

  ${({ $variant, $direction, theme }) =>
    $variant === TabsVariant.PILL
      ? css`
          align-items: stretch;
          gap: 4px;
          padding: 4px;
          border-radius: 9999px;
          border: none;
          background: ${theme.mode === ThemeMode.DARK ? '#1c1c1c' : theme.colors.backgroundTertiary};
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

/** Обёртка для вертикального текста с позицией RIGHT (разворот содержимого) */
export const TabItemVerticalTextWrap = styled.span`
  display: inline-block;
  transform: rotate(180deg);
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

/**
 * Бейдж уведомления на сегменте (макет: красный круг, белый текст)
 * @property children — число или краткая метка
 */
export const TabItemBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  margin-left: 6px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
  background: #ff3b30;
  flex-shrink: 0;
`;

/**
 * TabItemTrigger — кнопка сегмента вкладки
 * @property $isActive — выбранный сегмент
 * @property $direction — ось списка табов
 * @property $variant — pill или line
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
  $textOrientation?: TabItemTextOrientation;
  $textPosition?: TabItemTextPosition;
  $hasIcons?: boolean;
  $flexDirection?: string;
  $gap?: string;
}>`
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
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
          padding: ${$direction === TabsDirection.VERTICAL ? '10px 12px' : '8px 16px'};
          min-height: ${$direction === TabsDirection.VERTICAL ? 'auto' : '40px'};
          border-radius: 10px;
          flex: ${$direction === TabsDirection.HORIZONTAL ? '1' : '0 0 auto'};
          width: ${$direction === TabsDirection.VERTICAL ? '100%' : 'auto'};
          box-shadow: none;
          border-bottom: none;
          border-right: none;

          ${$disabled
            ? css`
                background: transparent;
                color: ${theme.colors.textDisabled};
                box-shadow: none;
              `
            : $isActive
              ? theme.mode === ThemeMode.DARK
                ? css`
                    background: #444444;
                    color: ${theme.colors.text};
                    box-shadow: none;
                  `
                : css`
                    background: ${theme.colors.backgroundSecondary};
                    color: ${theme.colors.text};
                    box-shadow: ${theme.boxShadow.sm};
                  `
              : theme.mode === ThemeMode.DARK
                ? css`
                    background: transparent;
                    color: ${theme.colors.textSecondary};
                  `
                : css`
                    background: transparent;
                    color: ${theme.colors.textSecondary};
                  `}

          &:hover:enabled {
            ${!$disabled && !$isActive
              ? theme.mode === ThemeMode.DARK
                ? css`
                    background: transparent;
                    color: ${theme.colors.text};
                  `
                : css`
                    background: transparent;
                    color: ${theme.colors.text};
                  `
              : ''}
            ${!$disabled && $isActive
              ? theme.mode === ThemeMode.DARK
                ? css`
                    background: #4a4a4a;
                    color: ${theme.colors.text};
                  `
                : css`
                    background: ${theme.colors.backgroundSecondary};
                    color: ${theme.colors.text};
                  `
              : ''}
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
            outline-offset: 2px;
          }
        `
      : css`
          padding: 12px 24px;
          background: ${$isActive && !$disabled ? theme.colors.primary : 'transparent'};
          color: ${$isActive && !$disabled ? '#ffffff' : $disabled ? theme.colors.textDisabled : theme.colors.textSecondary};
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
