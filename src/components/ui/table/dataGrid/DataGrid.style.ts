import styled, { css } from 'styled-components';
import type { DataGridColumnFilterIconPosition } from '@/types/ui';
import { tableBorderRadiusFromTheme } from '../basicTable/tableThemeRadiusHandlers';
import { buildReducedMotionTransitionDurationCss } from '../../../../handlers/uiMotionStyleHandlers';

/**
 * Смещение второй строки липкой шапки вниз от первой (строка `headerToolbar`).
 * Должно совпадать с фактической высотой первой строки `thead` (примерно min-height слота + отступы).
 */
export const DATA_GRID_HEADER_TOOLBAR_STICKY_TOP_OFFSET = '48px';

/** Контейнер таблицы с возможностью наложения оверлея загрузки */
export const DataGridRoot = styled.div`
  position: relative;
  width: 100%;
`;

/**
 * Внутренняя область строки `headerToolbar`: иконки и прочие действия над заголовками колонок.
 * @property $align — `justify-content` (соответствует `headerToolbarAlign` у грида)
 * @property $background — фон панели; совпадает с фоном шапки колонок (`tableHeaderVariant` / `tableHeaderBackground` у грида)
 */
export const DataGridHeaderToolbarInner = styled.div<{
  $align: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  $background: string;
}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ $align }) => $align};
  gap: 4px;
  box-sizing: border-box;
  min-height: 36px;
  padding: 6px 12px;
  background: ${({ $background }) => $background};
  border-bottom: ${({ theme }) => theme.tables.cell.headBorderBottom};
`;

/** Полупрозрачный оверлей при `isLoading` */
export const DataGridLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.tables.loadingOverlay.background};
  border-radius: inherit;
  pointer-events: all;
`;

/** Обёртка шеврона раскрытия строки: поворот на 180° при открытой строке (`IconPlainerChevronDown`) */
export const DataGridChevronWrap = styled.span<{ $open: boolean }>`
  display: inline-flex;
  line-height: 0;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.38s cubic-bezier(0.33, 1, 0.68, 1);
  ${buildReducedMotionTransitionDurationCss()}
`;

/** Длительность и кривая раскрытия блока детализации строки (одна ось анимации — без скачка на открытии). */
const datagridExpandedEaseMs = '0.42s';
const datagridExpandedEaseCurve = 'cubic-bezier(0.33, 1, 0.68, 1)';

/**
 * Раскрытие только через max-height: при смешении grid 0fr→1fr и мгновенном снятии max-height: 0
 * получался скачок на половину строки, затем догоняла анимация дорожки.
 * Верхняя граница по высоте — запас под длинный контент; после полного показа строки лишнее «пустое» время не видно.
 * @property $open — развернуто ли содержимое
 */
export const DataGridExpandedSlot = styled.div<{ $open: boolean }>`
  overflow: hidden;
  min-height: 0;
  max-height: ${({ $open }) => ($open ? 'min(100vh, 3200px)' : '0')};
  transition: max-height ${datagridExpandedEaseMs} ${datagridExpandedEaseCurve};
  ${buildReducedMotionTransitionDurationCss()}
`;

/**
 * Внутренний блок раскрытой области: отступы как у ячейки; те же transition, что у слота — без мгновенного padding при открытии.
 * @property $tableSize — плотность строк (`sm` | `md`)
 * @property $open — свёрнуто: padding 0
 */
export const DataGridExpandedInner = styled.div<{ $tableSize: 'sm' | 'md'; $open: boolean }>`
  overflow: hidden;
  min-height: 0;
  min-width: 0;
  padding: ${({ $open, $tableSize }) =>
    !$open ? '0' : $tableSize === 'sm' ? '8px 12px' : '12px 16px'};
  transition: padding ${datagridExpandedEaseMs} ${datagridExpandedEaseCurve};
  ${buildReducedMotionTransitionDurationCss()}
`;

/** Центрированный индикатор загрузки только в области раскрытия (не путать с оверлеем всей таблицы) */
export const DataGridExpandedLoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  box-sizing: border-box;
`;

/** Ручка перетаскивания строки */
export const DataGridRowDragHandle = styled.span<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};

  &:active {
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grabbing')};
  }
`;

/**
 * Ручка изменения ширины колонки на правом краю заголовка (`enableColumnResize`).
 * Кнопка без визуального chrome: зона захвата ~10px, курсор `col-resize`.
 */
export const DataGridColumnResizeHandle = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  box-sizing: border-box;
  width: 10px;
  height: 100%;
  min-height: 32px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: col-resize;
  touch-action: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

/** Строка заголовка колонки: подпись + опциональная кнопка фильтра */
export const DataGridColumnHeaderRow = styled.div<{
  $filterIconPosition: DataGridColumnFilterIconPosition;
}>`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  ${({ $filterIconPosition }) =>
    $filterIconPosition === 'inlineTitle' &&
    css`
      justify-content: flex-start;
    `}
`;

/** Область подписи/сортировки в заголовке (ширина зависит от `filterIconPosition`) */
export const DataGridColumnHeaderLabelSlot = styled.div<{
  $align: 'left' | 'center' | 'right';
  $filterIconPosition: DataGridColumnFilterIconPosition;
}>`
  min-width: 0;
  text-align: ${({ $align }) => $align};
  ${({ $filterIconPosition }) =>
    $filterIconPosition === 'inlineTitle'
      ? css`
          flex: 0 1 auto;
        `
      : css`
          flex: 1 1 0;
        `}
`;

/** Реэкспорт общей кнопки фильтра заголовка (`TableHeaderFilterIconButton`). */
export { TableHeaderFilterIconButton as DataGridColumnFilterIconButton } from '../basicTable/tableHeaderFilterIconButton.style';

/** Кнопка раскрытия строки (иконка-шеврон) */
export const DataGridExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2px;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: inherit;
  border-radius: ${({ theme }) => tableBorderRadiusFromTheme(theme)};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
