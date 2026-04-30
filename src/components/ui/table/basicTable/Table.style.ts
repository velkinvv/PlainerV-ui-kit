import styled, { css } from 'styled-components';
import { ThemeMode } from '@/types/theme';
import type { TablePaginationToolbarAlign, TableSize } from '@/types/ui';
import type { TableSortChevronTone } from './handlers';

/** Скругление контейнера таблицы по макету (~12px). */
const TABLE_CONTAINER_RADIUS = '12px';

/**
 * Вертикальные отступы ячейки по размеру таблицы.
 * @param size - `sm` | `md`
 */
function tableCellVerticalPadding(size: TableSize): string {
  return size === 'sm' ? '8px' : '12px';
}

/**
 * Горизонтальные отступы ячейки (кроме режима `checkbox` / `none`).
 * @param size - Размер таблицы
 */
function tableCellHorizontalPadding(size: TableSize): string {
  return size === 'sm' ? '12px' : '16px';
}

/** Обёртка с горизонтальным скроллом и «карточным» фоном. */
export const TableContainerRoot = styled.div<{ $elevated: boolean }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  border-radius: ${TABLE_CONTAINER_RADIUS};
  background: ${({ theme }) => theme.colors.card};
  ${({ theme, $elevated }) =>
    $elevated &&
    css`
      box-shadow: ${theme.boxShadow?.md ?? theme.colors.shadow};
    `}
`;

export const StyledTable = styled.table<{ $stickyHeader: boolean; $striped: boolean }>`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};

  ${({ $stickyHeader }) =>
    $stickyHeader &&
    css`
      thead th {
        position: sticky;
        top: 0;
        z-index: 2;
      }
    `}

  ${({ theme, $striped }) =>
    $striped &&
    css`
      tbody tr:nth-child(odd) {
        background: ${theme.mode === ThemeMode.DARK
          ? 'rgba(255, 255, 255, 0.02)'
          : theme.colors.backgroundTertiary};
      }
    `}
`;

export const StyledThead = styled.thead`
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const StyledTbody = styled.tbody``;

export const StyledTfoot = styled.tfoot`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const StyledTr = styled.tr<{
  $section: 'head' | 'body' | 'footer';
  $selected: boolean;
  $disabled: boolean;
  $hoverable: boolean;
}>`
  ${({ $section, theme, $selected, $disabled, $hoverable }) =>
    $section === 'body' &&
    css`
      border-bottom: 1px solid ${theme.colors.border};

      ${$selected &&
      css`
        background: ${theme.mode === ThemeMode.DARK
          ? 'rgba(255, 255, 255, 0.08)'
          : `color-mix(in srgb, ${theme.colors.primary} 10%, ${theme.colors.card})`};
      `}

      ${$disabled &&
      css`
        opacity: 0.45;
        pointer-events: none;
      `}

      ${$hoverable &&
      !$disabled &&
      !$selected &&
      css`
        transition: background-color 0.15s ease;
        &:hover {
          background: ${theme.mode === ThemeMode.DARK
            ? 'rgba(255, 255, 255, 0.04)'
            : `color-mix(in srgb, ${theme.colors.primary} 6%, ${theme.colors.card})`};
        }
      `}
    `}
`;

const cellPadding = (size: TableSize, padding: 'normal' | 'checkbox' | 'none') => {
  if (padding === 'none') {
    return '0';
  }
  if (padding === 'checkbox') {
    return `${tableCellVerticalPadding(size)} 12px`;
  }
  return `${tableCellVerticalPadding(size)} ${tableCellHorizontalPadding(size)}`;
};

export const TableCellBase = styled('td').withConfig({
  shouldForwardProp: prop =>
    !['$align', '$padding', '$isHead', '$size', '$activeSortColumn'].includes(String(prop)),
})<{
  $align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  $padding: 'normal' | 'checkbox' | 'none';
  $isHead: boolean;
  $size: TableSize;
  /** Нижняя граница «активной» колонки в шапке (макет Figma). */
  $activeSortColumn?: boolean;
}>`
  box-sizing: border-box;
  text-align: ${({ $align }) => ($align === 'inherit' ? 'start' : $align)};
  vertical-align: middle;
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  line-height: ${({ theme }) => theme.lineHeights?.normal ?? 1.4};
  color: ${({ theme, $isHead }) => ($isHead ? theme.colors.textSecondary : theme.colors.text)};
  font-weight: ${({ theme, $isHead }) => ($isHead ? theme.fontWeights?.semiBold ?? 600 : theme.fontWeights?.regular ?? 400)};
  padding: ${({ $size, $padding }) => cellPadding($size, $padding)};
  border-bottom: ${({ $isHead, theme, $activeSortColumn }) =>
    $isHead
      ? $activeSortColumn
        ? `3px solid ${theme.colors.text}`
        : `1px solid ${theme.colors.border}`
      : 'none'};

  ${({ $isHead, theme }) =>
    $isHead &&
    css`
      white-space: nowrap;
      &:first-of-type {
        border-top-left-radius: 0;
      }
    `}
`;

export const TableSortLabelButton = styled.button.withConfig({
  shouldForwardProp: prop => !['$disabled'].includes(String(prop)),
})<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  color: inherit;
  font: inherit;
  text-align: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const TableSortLabelInner = styled.span`
  display: inline-flex;
  align-items: center;
`;

/** Контейнер двух шевронов сортировки (вверх / вниз). */
export const SortChevronStack = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  margin-inline-start: 6px;
`;

const chevronColor = (
  theme: { colors: { text: string; textTertiary: string; border: string } },
  tone: TableSortChevronTone,
) => {
  switch (tone) {
    case 'active':
      return theme.colors.text;
    case 'muted':
      return theme.colors.textTertiary;
    case 'idle':
    default:
      return theme.colors.border;
  }
};

/** Верхний шеврон (стрелка вверх). */
export const SortChevronUp = styled.span<{ $tone: TableSortChevronTone }>`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 5px solid ${({ theme, $tone }) => chevronColor(theme, $tone)};
`;

/** Нижний шеврон (стрелка вниз). */
export const SortChevronDown = styled.span<{ $tone: TableSortChevronTone }>`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid ${({ theme, $tone }) => chevronColor(theme, $tone)};
`;

export const TablePaginationRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

/**
 * `justify-content` для строки футера с учётом `row-reverse` (чтобы left/right оставались привязкой к краю экрана).
 * @param align - Выравнивание группы контролов
 * @param reverse - Обратный порядок элементов в строке (`flex-direction: row-reverse`)
 */
function paginationToolbarJustifyContent(
  align: TablePaginationToolbarAlign,
  reverse: boolean,
): 'flex-start' | 'center' | 'flex-end' {
  if (align === 'center') {
    return 'center';
  }
  if (reverse) {
    return align === 'right' ? 'flex-start' : 'flex-end';
  }
  return align === 'left' ? 'flex-start' : 'flex-end';
}

/** Строка футера: селект «строк на странице», поле «страница», `Pagination` (`$toolbarReverse` — зеркальный порядок). */
export const TablePaginationRow = styled.div<{
  $toolbarAlign: TablePaginationToolbarAlign;
  $toolbarReverse?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $toolbarReverse }) => ($toolbarReverse ? 'row-reverse' : 'row')};
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ $toolbarAlign, $toolbarReverse }) =>
    paginationToolbarJustifyContent($toolbarAlign, Boolean($toolbarReverse))};
  gap: 12px 16px;
  width: 100%;
  align-self: stretch;
`;

export const TablePaginationRowsSelect = styled.label<{ $compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $compact }) => ($compact ? '6px' : '8px')};
  font-size: ${({ theme, $compact }) =>
    $compact ? theme.fontSizes?.xs ?? '12px' : theme.fontSizes?.sm ?? '14px'};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TablePaginationSelect = styled.select<{ $compact?: boolean }>`
  font: inherit;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ $compact }) => ($compact ? '6px' : '8px')};
  padding: ${({ $compact }) => ($compact ? '4px 8px' : '6px 10px')};
  min-height: ${({ $compact }) => ($compact ? '28px' : 'auto')};
  background: ${({ theme }) => theme.colors.input};
`;

/** Подпись + поле «перейти к странице» (слева от плашки `Pagination`). */
export const TablePaginationPageJump = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Числовой ввод номера страницы (1-based, как в подписи к плашке). */
export const TablePaginationPageJumpInput = styled.input`
  box-sizing: border-box;
  width: 3.25rem;
  min-height: 36px;
  font: inherit;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 6px 4px;
  background: ${({ theme }) => theme.colors.input};

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
