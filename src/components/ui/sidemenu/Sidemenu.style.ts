import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Size } from '@/types/sizes';
import { BorderRadiusHandler, BoxShadowHandler } from '@/handlers/uiHandlers';

/**
 * Корневая панель {@link Sidemenu}: карточка или колонна у левого края экрана.
 * @property $edgeAttached — без радиуса/тени, на всю высоту вьюпорта, граница только справа
 */
export const SidemenuPanelRoot = styled(motion.div)<{ $edgeAttached: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme?.colors?.backgroundSecondary};
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;

  ${({ $edgeAttached, theme }) =>
    $edgeAttached
      ? css`
          border-radius: 0;
          box-shadow: none;
          border: none;
          border-right: 1px solid ${theme?.colors?.border};
          padding: 0 0 30px 0;
          min-height: 100vh;
          height: 100%;
          align-self: stretch;
        `
      : css`
          border-radius: ${BorderRadiusHandler(theme?.borderRadius ?? theme?.globalSize)};
          border: 1px solid ${theme?.colors?.border};
          padding: 0 0 30px 0;
          height: 741px;
          box-shadow: ${BoxShadowHandler(Size.LG)};
        `}
`;

/** Средняя колонка основного меню; верхний отступ, если шапка не рендерится */
export const SidemenuMenuItemsContainer = styled.div<{ $leadPaddingTopPx: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: ${({ $leadPaddingTopPx }) => `${$leadPaddingTopPx}px 10px 0`};
  min-height: 0;
`;

/**
 * Горизонтальный разделитель между зонами панели (та же линия, что под шапкой).
 * @property $expanded — ширина линии как у развёрнутой / компактной панели
 * @property $placement — отступы: под шапкой или над нижним слотом
 * @property $edgeAttached — линия на всю ширину панели без боковых отступов
 */
export const SidemenuSectionDivider = styled.div<{
  $expanded: boolean;
  $placement: 'afterHeader' | 'beforeFooter';
  $edgeAttached?: boolean;
}>`
  width: ${({ $expanded, $edgeAttached }) =>
    $edgeAttached ? '100%' : $expanded ? '200px' : '50px'};
  height: 1px;
  flex-shrink: 0;
  background: ${({ theme }) => theme?.colors?.border};
  margin: ${({ $placement, $edgeAttached }) => {
    if ($edgeAttached) {
      return $placement === 'afterHeader' ? '0 0 10px' : '10px 0 10px';
    }
    return $placement === 'afterHeader' ? '0 10px 10px' : '10px 10px 10px';
  }};
`;

/** Колонка шапки: строка лого и разделитель (для **slotStyles.header**) */
export const SidemenuHeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
`;

/**
 * Строка шапки: логотип и опционально кнопка раскрытия панели.
 * Без блока лого, но с кнопкой — строка по центру (кнопка не уезжает вправо).
 */
export const SidemenuLogoRow = styled.div<{
  $withToggle: boolean;
  $hasLogoBlock: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $withToggle, $hasLogoBlock }) => {
    if (!$withToggle) {
      return 'center';
    }
    if (!$hasLogoBlock) {
      return 'center';
    }
    return 'space-between';
  }};
  gap: 12px;
  padding: 30px 12px;
  width: 100%;
  box-sizing: border-box;
`;

/** Левая часть шапки: слот **logoSlot** или иконка + заголовок из **logo** */
export const SidemenuLogoRowStart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-width: 0;
`;

export const SidemenuLogoIconSlot = styled.div`
  width: 24px;
  height: 21px;
  color: ${({ theme }) => theme?.colors?.textSecondary};
`;

export const SidemenuLogoTitleText = styled.h1`
  font-family: ${({ theme }) => theme?.fonts?.primary};
  font-weight: 500;
  font-size: 12px;
  line-height: 1.219em;
  text-transform: uppercase;
  color: ${({ theme }) => theme?.colors?.text};
  margin: 0;
`;

/**
 * Обёртка кастомной или встроенной кнопки раскрытия.
 * @property $standaloneToggle — только кнопка в строке (нет лого): не растягиваем на всю ширину, кнопка по центру
 */
export const SidemenuExpandToggleSlot = styled.div<{ $standaloneToggle: boolean }>`
  display: flex;
  min-width: 0;
  flex: ${({ $standaloneToggle }) => ($standaloneToggle ? '0 1 auto' : '1 1 auto')};
  justify-content: ${({ $standaloneToggle }) => ($standaloneToggle ? 'center' : 'flex-end')};
  align-items: center;
`;

/** Встроенная кнопка сворачивания / разворачивания панели навигации */
export const SidemenuExpandToggleButton = styled.button`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme?.colors?.textSecondary};
  background: transparent;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme?.colors?.border};
    color: ${({ theme }) => theme?.colors?.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme?.colors?.primary};
    outline-offset: 2px;
  }
`;

/**
 * Обёртка шеврона кнопки раскрытия панели.
 * @property $expanded — панель развёрнута
 * @property $chevronAxis — **vertical**: вверх/вниз (0° ↔ 180°); **horizontal**: вправо/влево (−90° ↔ 90°), для режима **TOGGLE_BUTTON**
 */
export const SidemenuExpandToggleIconWrap = styled.span<{
  $expanded: boolean;
  $chevronAxis?: 'vertical' | 'horizontal';
}>`
  display: inline-flex;
  transform: ${({ $expanded, $chevronAxis }) => {
    const axis = $chevronAxis ?? 'vertical';
    if (axis === 'horizontal') {
      return $expanded ? 'rotate(90deg)' : 'rotate(-90deg)';
    }
    return $expanded ? 'rotate(180deg)' : 'none';
  }};
  transition: transform 0.2s ease;
`;

/**
 * Фиксированный размер иконки в нижнем слоте (**footer**), если нужна сетка как у прежних контролов в футере.
 */
export const SidemenuBottomIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme?.colors?.text};
`;

/**
 * Область нижнего слота: разделитель + контент; **margin-top: auto** прижимает блок к низу панели.
 */
export const SidemenuFooterRegion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: auto;
  flex-shrink: 0;
  box-sizing: border-box;
`;

/** Внутренняя обёртка содержимого **footer** (для **slotStyles.footer**) */
export const SidemenuFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
`;
