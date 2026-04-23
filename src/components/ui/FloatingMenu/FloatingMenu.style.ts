import styled, { css } from 'styled-components';
import { ThemeMode } from '@/types/theme';
import { FloatingMenuGroupVariant } from '@/types/ui';

/** Корневая фиксированная панель */
export const FloatingMenuRoot = styled.div<{ $isDragging?: boolean }>`
  position: fixed;
  box-sizing: border-box;
  max-width: calc(100vw - 32px);
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'default')};
`;

/** Белая «пилюля» с тенью (макет Figma) */
export const FloatingMenuBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  padding: 6px 10px;
  border-radius: 9999px;
  background: ${({ theme }) =>
    theme.mode === ThemeMode.DARK ? theme.colors.backgroundSecondary : '#ffffff'};
  border: 1px solid
    ${({ theme }) => (theme.mode === ThemeMode.DARK ? theme.colors.borderSecondary : '#e8e8e8')};
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.06);
`;

/** Ряд группы кнопок */
export const FloatingMenuGroupInner = styled.div<{ $variant: FloatingMenuGroupVariant }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;

  ${({ $variant, theme }) =>
    $variant === FloatingMenuGroupVariant.INSET
      ? css`
          padding: 4px;
          border-radius: 10px;
          background: ${theme.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, 0.06)' : '#f0f0f0'};
        `
      : ''}
`;

/**
 * Кнопка пункта панели.
 * @property $active — выбранное состояние
 * @property $disabled — disabled
 * @property $insetGroup — стили активного пункта внутри inset-группы (белый квадрат)
 */
export const FloatingMenuItemButton = styled.button<{
  $active: boolean;
  $disabled: boolean;
  $insetGroup: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 36px;
  min-height: 36px;
  padding: 0 6px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled ? 'transparent' : theme.mode === ThemeMode.DARK ? 'rgba(255,255,255,0.08)' : '#f5f5f5'};
  }

  ${({ $active, $insetGroup, theme }) =>
    $active && !$insetGroup
      ? css`
          background: ${theme.colors.primary};
          color: #ffffff;

          &:hover {
            background: ${theme.colors.primaryHover};
            color: #ffffff;
          }
        `
      : ''}

  ${({ $active, $insetGroup, theme }) =>
    $active && $insetGroup
      ? css`
          background: ${theme.mode === ThemeMode.DARK ? theme.colors.backgroundSecondary : '#ffffff'};
          color: ${theme.colors.text};
          box-shadow: 0 0 0 1px
            ${theme.mode === ThemeMode.DARK ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'};

          &:hover {
            background: ${theme.mode === ThemeMode.DARK ? theme.colors.backgroundSecondary : '#ffffff'};
          }
        `
      : ''}

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Иконка + шеврон */
export const FloatingMenuItemIconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
`;

export const FloatingMenuItemChevron = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  line-height: 1;
  opacity: 0.75;
  margin-left: 1px;
`;

/** Вертикальный разделитель между группами */
export const FloatingMenuDivider = styled.div`
  align-self: stretch;
  width: 1px;
  min-height: 28px;
  margin: 0 4px;
  background: ${({ theme }) => theme.colors.borderSecondary};
  flex-shrink: 0;
`;

/** Панель выпадающего меню (портал) */
export const FloatingMenuDropdownPanel = styled.div<{ $zIndex: number }>`
  position: fixed;
  z-index: ${({ $zIndex }) => $zIndex};
  min-width: 180px;
  max-width: min(320px, calc(100vw - 24px));
  padding: 8px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.06);
`;

/** Узел-заглушка «грип» по умолчанию */
export const FloatingMenuDragHandleGrip = styled.span`
  font-size: 14px;
  letter-spacing: -2px;
  user-select: none;
`;

/** Зона «хваталки» для перетаскивания */
export const FloatingMenuDragHandleRoot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  margin-right: 2px;
  border-radius: 8px;
  cursor: grab;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    background: ${({ theme }) =>
      theme.mode === ThemeMode.DARK ? 'rgba(255,255,255,0.08)' : '#f0f0f0'};
  }

  &:active {
    cursor: grabbing;
  }
`;
