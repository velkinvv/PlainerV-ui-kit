import styled, { css } from 'styled-components';
import { PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR, tableBorderRadiusFromTheme } from './tableThemeRadiusHandlers';
import type { ThemeType } from '@/types/theme';
import type { TablePaginationToolbarAlign, TableSize } from '@/types/ui';

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
  border-radius: ${({ theme }) => tableBorderRadiusFromTheme(theme)};
  border: ${({ theme }) => theme.tables.shell.border};
  background: ${({ theme }) => theme.tables.shell.background};
  ${({ theme, $elevated }) =>
    $elevated &&
    css`
      box-shadow: ${theme.boxShadow?.md ?? theme.colors.shadow};
      /* Вертикальный зазор: у родителей с overflow (Canvas Storybook) иначе обрезается тень сверху/снизу. */
      margin: 8px 0;
    `}
`;

/**
 * Скругление углов сетки. Раньше здесь стояло `overflow: hidden` — оно **ломает** `position: sticky` у `thead`
 * относительно родителя со скроллом (липкая шапка «уезжает» вместе с телом). Для корректного sticky
 * нужен `overflow: visible` по вертикали; горизонтальный скролл широкой таблицы остаётся в `TableContainerScrollTrack`.
 * Если заметите артефакты скругления на очень широких таблицах — можно точечно добавить `clip-path` к теме.
 * Если сразу ниже идёт `TablePagination` с `embeddedInTableCard`, передайте `$embeddedPaginationBelow` —
 * тогда скругление только сверху; иначе — со всех сторон (таблица без встроенного футера).
 */
export const TableContainerScrollClip = styled.div.withConfig({
  shouldForwardProp: prop => prop !== '$embeddedPaginationBelow',
})<{ $embeddedPaginationBelow?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: visible;

  ${({ theme, $embeddedPaginationBelow }) =>
    $embeddedPaginationBelow
      ? css`
          border-top-left-radius: ${tableBorderRadiusFromTheme(theme)};
          border-top-right-radius: ${tableBorderRadiusFromTheme(theme)};
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `
      : css`
          border-radius: ${tableBorderRadiusFromTheme(theme)};
        `}
`;

/**
 * Горизонтальный скролл только для `<table>`. Родитель — `TableContainerScrollClip`.
 * Без `max-height`: `overflow-y: clip` вместе с `overflow-x: auto` — иначе по CSS вторая ось
 * превращается в `auto`, трек становится вертикальным scroll-контейнером, и `position: sticky` у
 * `th` цепляется к треку (высота ≈ таблицы), а внешний `overflow: auto` крутит всю разметку — шапка «уезжает».
 * С `max-height` — единая область `overflow: auto` внутри трека, липкая шапка относительно неё.
 */
export const TableContainerScrollTrack = styled.div.withConfig({
  shouldForwardProp: prop => prop !== '$scrollAreaMaxHeight',
})<{
  /**
   * Максимальная высота области с вертикальным скроллом (число — пиксели). Без пропа вертикальная
   * прокрутка ожидается у внешнего предка; трек не должен «красть» липкость у шапки.
   */
  $scrollAreaMaxHeight?: string | number;
}>`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  border-radius: inherit;

  ${({ $scrollAreaMaxHeight }) =>
    $scrollAreaMaxHeight != null && $scrollAreaMaxHeight !== ''
      ? css`
          max-height: ${typeof $scrollAreaMaxHeight === 'number'
            ? `${$scrollAreaMaxHeight}px`
            : $scrollAreaMaxHeight};
          overflow: auto;
        `
      : css`
          overflow-x: auto;
          overflow-y: clip;
        `}
`;

export const StyledTable = styled.table<{ $stickyHeader: boolean; $striped: boolean }>`
  width: 100%;
  border-spacing: 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.tables.cell.text};

  ${({ $stickyHeader }) =>
    $stickyHeader
      ? css`
          /* border-collapse: collapse ломает position: sticky у th в WebKit/Chromium. */
          border-collapse: separate;
        `
      : css`
          border-collapse: collapse;
        `}

  ${({ $stickyHeader, theme }) =>
    $stickyHeader &&
    css`
      /*
       * Две строки в thead (например панель headerToolbar + заголовки колонок в DataGrid):
       * первая липнет к верху, вторая — ниже первой (смещение — CSS-переменная plainer-sticky-thead-second-row-top в DataGrid).
       * У ячеек явный фон — иначе при прокрутке контент «просвечивает» под sticky.
       */
      thead tr:first-child th {
        position: sticky;
        top: 0;
        z-index: 3;
        background: ${`var(${PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR}, ${theme.tables.header.background})`};
      }

      thead tr:nth-child(2) th {
        position: sticky;
        top: var(--plainer-sticky-thead-second-row-top, 0px);
        z-index: 2;
        background: ${`var(${PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR}, ${theme.tables.header.background})`};
      }
    `}

  ${({ theme, $striped }) =>
    $striped &&
    css`
      tbody tr:nth-child(odd) {
        background: ${theme.tables.zebra.oddRowBackground};
      }

      /* Строка-деталь раскрытия не ломает подсчёт «зебры» у основных строк (см. DataGrid). */
      @supports selector(:nth-child(odd of *)) {
        tbody tr:nth-child(odd) {
          background: transparent;
        }
        tbody tr:nth-child(odd of :not([data-datagrid-expanded-detail])) {
          background: ${theme.tables.zebra.oddRowBackground};
        }
      }
    `}
`;

/** Шапка: фон и границы из `theme.tables` (фон можно переопределить через CSS-переменную на `<table>`). */
export const StyledThead = styled.thead`
  background: ${({ theme }) =>
    `var(${PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR}, ${theme.tables.header.background})`};
  border-bottom: ${({ theme }) => theme.tables.header.borderBottom};
  /* Скругление верхних углов совпадает с клипом и единым токеном theme.tables.borderRadius. */
  border-top-left-radius: ${({ theme }) => tableBorderRadiusFromTheme(theme)};
  border-top-right-radius: ${({ theme }) => tableBorderRadiusFromTheme(theme)};
`;

export const StyledTbody = styled.tbody``;

export const StyledTfoot = styled.tfoot`
  background: ${({ theme }) => theme.tables.footerSection.background};
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
      border-bottom: 1px solid ${theme.tables.body.rowBorder};

      ${$selected &&
      css`
        background: ${theme.tables.row.selectedBackground};
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
        outline: 2px dashed ${theme.tables.row.draggingOutline};
        outline-offset: -2px;
        box-shadow: ${theme.tables.row.draggingBoxShadow};
        background: ${theme.tables.row.draggingBackground};
      `}

      ${$hoverable &&
      !$disabled &&
      !$selected &&
      !$dragging &&
      css`
        transition: background-color 0.15s ease;
        &:hover {
          background: ${theme.tables.row.hoverBackground};
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
  color: ${({ theme, $isHead }) =>
    $isHead ? theme.tables.cell.textHead : theme.tables.cell.text};
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
        ? theme.tables.cell.headActiveSortBorderBottom
        : theme.tables.cell.headBorderBottom
      : 'none'};

  ${({ $columnDividers, theme }) =>
    $columnDividers &&
    css`
      &:not(:last-child) {
        border-inline-end: 1px solid ${theme.tables.cell.headColumnDivider};
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
    border-radius: ${({ theme }) => tableBorderRadiusFromTheme(theme)};
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
      border-top: ${theme.tables.pagination.borderTop};
      box-sizing: border-box;
      background: ${theme.tables.shell.background};
      border-bottom-left-radius: ${tableBorderRadiusFromTheme(theme)};
      border-bottom-right-radius: ${tableBorderRadiusFromTheme(theme)};
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
  color: ${({ theme }) => theme.tables.pagination.textSecondary};
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
  color: ${({ theme }) => theme.tables.pagination.textSecondary};
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
