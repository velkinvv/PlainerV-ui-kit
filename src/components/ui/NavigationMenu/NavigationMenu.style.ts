import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeMode, type ThemeType } from '@/types/theme';
import { NavigationMenuActiveAppearance, type NavigationMenuItemStatus } from '@/types/ui';
import { getNavigationMenuItemStatusBackgroundTint } from '@/handlers/navigationMenuItemStatusHandlers';

/** Корневой контейнер меню навигации */
export const NavigationMenuNav = styled.nav`
  width: 100%;

  /*
   * Tooltip / Hint / Popover используют inline-block на промежуточных узлах — без полной ширины
   * кнопка в collapsed с justify-content: center «плавает» по горизонтали между строками.
   */
  .ui-tooltip-trigger,
  .ui-hint-anchor,
  .ui-hint-trigger,
  .ui-popover-anchor {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`;

/** Список пунктов меню навигации */
export const NavigationMenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

/** Обёртка одного пункта в списке */
export const NavigationMenuRow = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
`;

/**
 * Строка с анимированным сворачиванием: grid 1fr/0fr убирает пункт из потока
 * @property $isVisible — false: строка схлопывается
 */
export const NavigationMenuRowCollapse = styled.li<{ $isVisible: boolean }>`
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-rows: ${({ $isVisible }) => ($isVisible ? '1fr' : '0fr')};
  transition: grid-template-rows 0.22s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

/** Внутренний слой для корректного overflow при grid collapse */
export const NavigationMenuRowCollapseInner = styled.div`
  min-height: 0;
  overflow: hidden;
  width: 100%;
`;

/** Обёртка содержимого пункта: анимация opacity / offset */
export const NavigationMenuItemContentMotion = styled(motion.div)`
  min-height: 0;
  width: 100%;
`;

/** Плейсхолдер скелетона: те же отступы и min-height, что у кнопки пункта; одна полоса на всю ширину */
export const NavigationMenuItemSkeletonSurface = styled.div<{
  $collapsed: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 40px;
  padding: ${({ $collapsed }) => ($collapsed ? '10px' : '10px 12px')};
  border-radius: 6px;
  box-sizing: border-box;
  pointer-events: none;
`;

/** Слот спиннера при loading */
export const NavigationMenuItemLoadingSlot = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const navigationMenuItemSurface = (p: {
  theme: ThemeType;
  $collapsed: boolean;
  $active: boolean;
  $disabled: boolean;
  $appearance: NavigationMenuActiveAppearance;
  $status?: NavigationMenuItemStatus;
}) => {
  const { theme, $collapsed, $active, $disabled, $appearance, $status } = p;
  const primary = theme.colors.primary;
  const isDark = theme.mode === ThemeMode.DARK;

  const defaultBg = isDark ? '#1f1f1f' : theme.colors.backgroundSecondary;
  const hoverBg = isDark ? '#2a2a2a' : '#f5f5f5';

  const statusTintActive = !$disabled && $status != null;
  const baseBg = statusTintActive
    ? getNavigationMenuItemStatusBackgroundTint(theme, $status, defaultBg, 12)
    : defaultBg;
  const interactiveHoverBg = statusTintActive
    ? getNavigationMenuItemStatusBackgroundTint(theme, $status, hoverBg, 9)
    : hoverBg;

  const activeBarText = primary;
  const activeHighlightBg =
    theme.mode === ThemeMode.DARK
      ? `color-mix(in srgb, ${primary} 18%, ${defaultBg})`
      : `color-mix(in srgb, ${primary} 12%, ${theme.colors.backgroundSecondary})`;

  return css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: ${$collapsed ? 'center' : 'flex-start'};
    gap: 8px;
    width: 100%;
    min-height: 40px;
    padding: ${$collapsed ? '10px' : '10px 12px'};
    border: none;
    border-radius: 6px;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    text-decoration: none;
    cursor: ${$disabled ? 'not-allowed' : 'pointer'};
    color: ${theme.colors.text};
    background: ${baseBg};
    transition:
      background 0.15s ease,
      color 0.15s ease,
      opacity 0.15s ease;

    ${$disabled
      ? css`
          opacity: 0.45;
          color: ${theme.colors.textDisabled};
        `
      : css`
          &:hover {
            background: ${interactiveHoverBg};
          }
        `}

    ${!$disabled && $active && $appearance === NavigationMenuActiveAppearance.BAR
      ? css`
          color: ${activeBarText};
          background: ${defaultBg};
        `
      : ''}

    ${!$disabled && $active && $appearance === NavigationMenuActiveAppearance.HIGHLIGHTED
      ? css`
          color: ${activeBarText};
          background: ${activeHighlightBg};
        `
      : ''}

    ${!$disabled && $active && $appearance === NavigationMenuActiveAppearance.SOLID
      ? css`
          color: #ffffff;
          background: ${primary};

          &:hover:enabled {
            background: ${theme.colors.primaryHover};
          }
        `
      : ''}

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 3px;
      border-radius: 0 2px 2px 0;
      background: transparent;
      transition: background 0.15s ease;
    }

    ${!$disabled && $active && $appearance !== NavigationMenuActiveAppearance.SOLID
      ? css`
          &::before {
            background: ${primary};
          }
        `
      : ''}

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid ${primary};
      outline-offset: 2px;
    }
  `;
};

type NavigationMenuItemSurfaceProps = {
  $collapsed: boolean;
  $active: boolean;
  $disabled: boolean;
  $appearance: NavigationMenuActiveAppearance;
  $status?: NavigationMenuItemStatus;
};

/** Интерактивная поверхность пункта (кнопка) */
export const NavigationMenuItemButton = styled.button<NavigationMenuItemSurfaceProps>`
  ${(props) => navigationMenuItemSurface(props)}
`;

/** Интерактивная поверхность пункта (ссылка) */
export const NavigationMenuItemAnchor = styled.a<NavigationMenuItemSurfaceProps>`
  ${(props) => navigationMenuItemSurface(props)}
`;

/** Обёртка иконки (для «плавающего» бейджа в collapsed) */
export const NavigationMenuItemIconWrap = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: currentColor;
`;

/**
 * Обёртка для {@link Badge} у иконки в компактном режиме навигации
 */
export const NavigationMenuBadgeFloatRoot = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

/**
 * Обёртка для {@link Badge} в конце строки в развёрнутом режиме
 */
export const NavigationMenuBadgeInlineRoot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex-shrink: 0;
`;

/** Текстовая подпись пункта */
export const NavigationMenuItemLabel = styled.span<{ $collapsed?: boolean }>`
  flex: 1;
  min-width: 0;

  ${({ $collapsed }) =>
    $collapsed
      ? css`
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        `
      : ''}
`;

/** Суффикс (стрелка и т.п.) */
export const NavigationMenuItemSuffix = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  margin-left: 4px;
  color: currentColor;
`;

/** Корневая li ветки: строка + вложенный список */
export const NavigationMenuBranchRoot = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

/** Сворачивание строки внутри ветки (не li — обёртка внутри NavigationMenuBranchRoot) */
export const NavigationMenuRowCollapseDiv = styled.div<{ $isVisible: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isVisible }) => ($isVisible ? '1fr' : '0fr')};
  transition: grid-template-rows 0.22s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: 100%;
`;

/** Раскрытие вложенного подсписка */
export const NavigationMenuNestedCollapse = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: 100%;
  min-height: 0;
`;

export const NavigationMenuNestedCollapseInner = styled.div`
  min-height: 0;
  overflow: hidden;
`;

/** Вложенный уровень навигации */
export const NavigationMenuNestedList = styled.ul<{ $inFlyout?: boolean }>`
  list-style: none;
  margin: 0;
  padding: ${({ $inFlyout }) => ($inFlyout ? '0' : '0 0 0 12px')};
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
`;

/** Шеврон раскрытия ветки */
export const NavigationMenuBranchChevron = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 4px;
  color: currentColor;
  transition: transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);
`;
