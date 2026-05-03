import styled, { css } from 'styled-components';
import { BorderRadiusHandler } from '@/handlers/uiHandlers';
import { tableInteractiveBorderRadiusFromTheme } from './tableThemeRadiusHandlers';
import { Size } from '@/types/sizes';
import { ThemeMode, type ThemeType } from '@/types/theme';
import type { TablePaginationToolbarAlign, TableSize } from '@/types/ui';

/**
 * Скругление контейнера таблицы-карточки из темы (как у `Card` размера MD).
 * @param theme — активная тема styled-components
 */
const tableContainerBorderRadiusFromTheme = (theme: ThemeType): string =>
  theme.cards?.sizes?.[Size.MD]?.borderRadius ?? BorderRadiusHandler(theme.borderRadius);

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

/**
 * Минимальная высота ячейки в `thead` и `tfoot` одной таблицы (по умолчанию совпадают: шапка с полужирным текстом и иконками сортировки не выше строки подвала).
 * @param size - плотность таблицы `sm` | `md`
 */
function tableHeadFootCellMinHeight(size: TableSize): string {
  return size === 'sm' ? '40px' : '48px';
}

/**
 * Обёртка «карточки» таблицы: без горизонтального overflow — иначе по спецификации CSS
 * вторая ось становится не `visible`, и обрезаются тени у футера/пагинации внутри карточки.
 * Горизонтальный скролл выносите в `TableContainerScroll` только вокруг `<Table>`.
 */
export const TableContainerRoot = styled.div<{ $elevated: boolean }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
  border-radius: ${({ theme }) => tableContainerBorderRadiusFromTheme(theme)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  ${({ theme, $elevated }) =>
    $elevated &&
    css`
      box-shadow: ${theme.boxShadow?.md ?? theme.colors.shadow};
      /* Вертикальный зазор: у родителей с overflow (Canvas Storybook) иначе обрезается тень сверху/снизу. */
      margin: 8px 0;
    `}
`;

/**
 * Скругление + `overflow: hidden` у сетки: без клипа фон `thead` ломает верхний радиус карточки.
 * Если сразу ниже идёт `TablePagination` с `embeddedInTableCard`, передайте `$embeddedPaginationBelow` —
 * тогда скругление только сверху; иначе — со всех сторон (таблица без встроенного футера).
 * Горизонтальный скролл — во внутреннем `TableContainerScrollTrack`.
 */
export const TableContainerScrollClip = styled.div.withConfig({
  shouldForwardProp: prop => prop !== '$embeddedPaginationBelow',
})<{ $embeddedPaginationBelow?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;

  ${({ theme, $embeddedPaginationBelow }) =>
    $embeddedPaginationBelow
      ? css`
          border-top-left-radius: ${tableContainerBorderRadiusFromTheme(theme)};
          border-top-right-radius: ${tableContainerBorderRadiusFromTheme(theme)};
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `
      : css`
          border-radius: ${tableContainerBorderRadiusFromTheme(theme)};
        `}
`;

/**
 * Горизонтальный скролл только для `<table>`. Родитель — `TableContainerScrollClip`.
 */
export const TableContainerScrollTrack = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  /* Совпадает со скруглением clip — корректнее стык плашки скролла и радиуса в WebKit/Chromium. */
  border-radius: inherit;
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

      /* Строка-деталь раскрытия не ломает подсчёт «зебры» у основных строк (см. DataGrid). */
      @supports selector(:nth-child(odd of *)) {
        tbody tr:nth-child(odd) {
          background: transparent;
        }
        tbody tr:nth-child(odd of :not([data-datagrid-expanded-detail])) {
          background: ${theme.mode === ThemeMode.DARK
            ? 'rgba(255, 255, 255, 0.02)'
            : theme.colors.backgroundTertiary};
        }
      }
    `}
`;

/** Шапка: отличный от строк и от «зебры» фон (`tbody` odd использует `backgroundTertiary`). */
export const StyledThead = styled.thead`
  background: ${({ theme }) =>
    theme.mode === ThemeMode.DARK
      ? theme.colors.backgroundQuinary
      : theme.colors.backgroundQuaternary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  /* Скругление верхних углов шапки по токену карточки (визуально заметно при светлом фоне страницы). */
  border-top-left-radius: ${({ theme }) => tableContainerBorderRadiusFromTheme(theme)};
  border-top-right-radius: ${({ theme }) => tableContainerBorderRadiusFromTheme(theme)};
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
  $dragging: boolean;
}>`
  ${({ $section, theme, $selected, $disabled, $hoverable, $dragging }) =>
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

      ${$dragging &&
      !$disabled &&
      css`
        position: relative;
        z-index: 2;
        opacity: 0.48;
        outline: 2px dashed ${theme.colors.primary};
        outline-offset: -2px;
        box-shadow: ${theme.boxShadow?.md ?? `0 8px 24px ${theme.colors.shadow}`};
        background: ${theme.mode === ThemeMode.DARK
          ? 'rgba(255, 255, 255, 0.06)'
          : `color-mix(in srgb, ${theme.colors.primary} 14%, ${theme.colors.card})`};
      `}

      ${$hoverable &&
      !$disabled &&
      !$selected &&
      !$dragging &&
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
    ![
      '$align',
      '$padding',
      '$isHead',
      '$isFooter',
      '$size',
      '$activeSortColumn',
      '$headerMaxLines',
      '$columnDividers',
    ].includes(String(prop)),
})<{
  $align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  $padding: 'normal' | 'checkbox' | 'none';
  $isHead: boolean;
  /** Ячейка в `tfoot` — та же минимальная высота строки, что и у шапки */
  $isFooter: boolean;
  $size: TableSize;
  /** Нижняя граница «активной» колонки в шапке (макет Figma). */
  $activeSortColumn?: boolean;
  /** Число строк для `line-clamp` в шапке (только при $isHead) */
  $headerMaxLines?: number;
  /** Вертикальный разделитель справа от ячейки, кроме последней в строке */
  $columnDividers?: boolean;
}>`
  box-sizing: border-box;
  text-align: ${({ $align }) => ($align === 'inherit' ? 'start' : $align)};
  vertical-align: middle;
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  line-height: ${({ theme }) => theme.lineHeights?.normal ?? 1.4};
  color: ${({ theme, $isHead }) => ($isHead ? theme.colors.textSecondary : theme.colors.text)};
  font-weight: ${({ theme, $isHead }) => ($isHead ? theme.fontWeights?.semiBold ?? 600 : theme.fontWeights?.regular ?? 400)};
  padding: ${({ $size, $padding }) => cellPadding($size, $padding)};
  ${({ $isHead, $isFooter, $size }) =>
    ($isHead || $isFooter) &&
    css`
      min-height: ${tableHeadFootCellMinHeight($size)};
    `}
  border-bottom: ${({ $isHead, theme, $activeSortColumn }) =>
    $isHead
      ? $activeSortColumn
        ? `3px solid ${theme.colors.text}`
        : `1px solid ${theme.colors.border}`
      : 'none'};

  ${({ $columnDividers, theme }) =>
    $columnDividers &&
    css`
      &:not(:last-child) {
        border-inline-end: 1px solid ${theme.colors.borderSecondary ?? theme.colors.border};
      }
    `}

  ${({ $isHead, theme, $headerMaxLines }) =>
    $isHead &&
    css`
      &:first-of-type {
        border-top-left-radius: 0;
      }
      ${$headerMaxLines != null && $headerMaxLines >= 1
        ? css`
            white-space: normal;
            vertical-align: top;
            min-width: 0;
          `
        : css`
            white-space: nowrap;
          `}
    `}
`;

export const TableSortLabelButton = styled.button.withConfig({
  shouldForwardProp: prop => !['$disabled', '$headerClampLayout'].includes(String(prop)),
})<{ $disabled?: boolean; $headerClampLayout?: boolean }>`
  display: ${({ $headerClampLayout }) => ($headerClampLayout ? 'flex' : 'inline-flex')};
  align-items: ${({ $headerClampLayout }) => ($headerClampLayout ? 'flex-start' : 'center')};
  gap: ${({ $headerClampLayout }) => ($headerClampLayout ? '6px' : '0')};
  width: ${({ $headerClampLayout }) => ($headerClampLayout ? '100%' : 'auto')};
  min-width: ${({ $headerClampLayout }) => ($headerClampLayout ? '0' : 'auto')};
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
    border-radius: ${({ theme }) => tableInteractiveBorderRadiusFromTheme(theme)};
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
  gap: 6px;
`;

/** Текст сортируемого заголовка при ограничении числа строк (`maxLines` у `TableSortLabel`). */
export const TableSortLabelTextClamp = styled.span<{ $maxLines: number }>`
  flex: 1 1 0;
  min-width: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $maxLines }) => $maxLines};
  overflow: hidden;
  overflow-wrap: anywhere;
  word-break: break-word;
  text-align: inherit;
`;

/** Заголовок без `TableSortLabel`: многострочный текст с обрезкой по числу строк. */
export const TableCellHeadLineClamp = styled.div<{ $maxLines: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $maxLines }) => $maxLines};
  overflow: hidden;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
  min-width: 0;
  width: 100%;
`;

export const TablePaginationRoot = styled.div<{ $embeddedInTableCard?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.primary};

  ${({ $embeddedInTableCard, theme }) =>
    $embeddedInTableCard &&
    css`
      margin-top: 0;
      padding: 12px 16px;
      border-top: 1px solid ${theme.colors.border};
      box-sizing: border-box;
    `}
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

/**
 * Общая оболочка `InputWrapper` для селекта «строк на странице» и поля «Страница»:
 * одинаковая высота, паддинги и шрифт числа (у Select текст в `button`, у Input — в `input`).
 */
function cssPaginationNumericControlShell(theme: ThemeType) {
  return css`
    box-sizing: border-box !important;
    width: 100% !important;
    min-height: 40px !important;
    height: 40px !important;
    padding: 6px 8px !important;
    display: flex !important;
    align-items: center !important;

    & button,
    & input {
      font-family: ${theme.fonts.primary};
      font-size: ${theme.fontSizes.sm};
      font-weight: ${theme.fontWeights.regular};
      line-height: 1.25;
    }
  `;
}

/**
 * Класс для `Select` в пагинации: узкие отступы у обёртки поля (`InputWrapper`), без правок самого `Select`.
 */
export const TABLE_PAGINATION_ROWS_SELECT_INPUT_CLASS = 'plainerv-ui-table-pagination-rows-select';

/**
 * Обёртка над `Select` в футере пагинации: ограничение ширины и компактные отступы у триггера (число + шеврон).
 * @property $compact — уже блок под подпись «На стр.:»
 */
export const TablePaginationSelectField = styled.div<{ $compact?: boolean }>`
  flex: 0 1 auto;
  min-width: 0;
  width: max-content;
  max-width: ${({ $compact }) => ($compact ? '3.5rem' : '4.25rem')};

  & .${TABLE_PAGINATION_ROWS_SELECT_INPUT_CLASS} {
    ${({ theme }) => cssPaginationNumericControlShell(theme)}
  }

  /* Шеврон справа — чуть ближе к цифре, чтобы ширина блока совпадала с макетом */
  & .${TABLE_PAGINATION_ROWS_SELECT_INPUT_CLASS} > div:last-child {
    margin-left: 4px !important;
  }
`;

/** Подпись + поле «перейти к странице» (слева от плашки `Pagination`). */
export const TablePaginationPageJump = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Класс для `Input` прыжка по странице: сужаем `InputWrapper` (иначе дефолт ~335px).
 */
export const TABLE_PAGINATION_PAGE_JUMP_INPUT_CLASS = 'plainerv-ui-table-pagination-page-jump';

/**
 * Обёртка над полем «Страница:» — ширина и высота как у селекта «строк на странице» (тот же ряд футера).
 */
export const TablePaginationPageJumpField = styled.div`
  flex: 0 1 auto;
  min-width: 0;
  width: max-content;
  max-width: 4.25rem;

  & .${TABLE_PAGINATION_PAGE_JUMP_INPUT_CLASS} {
    ${({ theme }) => cssPaginationNumericControlShell(theme)}
    max-width: 4rem;
  }
`;
