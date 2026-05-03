import React from 'react';
import type {
  DataGridColumnFilterClickParams,
  DataGridColumnFilterIconPosition,
  DataGridColumnFilterIconProps,
  DataGridSortDirection,
} from '@/types/ui';
import { Icon } from '../../Icon/Icon';
import { TableSortLabel, TableCellHeadLineClamp } from '../basicTable';
import { TableHeaderFilterIconButton } from '../basicTable/tableHeaderFilterIconButton.style';
import { DataGridColumnHeaderLabelSlot, DataGridColumnHeaderRow } from './DataGrid.style';
import { mergeDataGridColumnFilterIconProps } from './dataGridColumnFilterIconHandlers';

export type DataGridColumnHeaderContentProps = {
  /** Поле колонки (`field`) */
  field: string;
  /** Текст или узел заголовка по умолчанию */
  headerFallback: React.ReactNode;
  /** Колонка сортируема и передан `onSortChange` */
  sortable: boolean;
  /** Колонка участвует в текущей сортировке */
  sortActive: boolean;
  /** Направление при активной сортировке; `false` — нейтральная иконка */
  sortDirection: DataGridSortDirection | false;
  /** При мульти-сортировке: порядковый номер (1…n) у шевронов */
  sortPriority?: number;
  /** Клик по `TableSortLabel` */
  onSortClick: () => void;
  /** Сырое значение `headerMaxLines` для колонки/грида (до нормализации) */
  mergedHeaderMaxLinesRaw: number | undefined;
  /** Нормализованное число строк clamp или `null`, если одна строка nowrap */
  columnHeaderClampLines: number | null;
  /** Выравнивание заголовка по горизонтали */
  headerAlign: 'left' | 'center' | 'right';
  /** Показать кнопку фильтра (и `onColumnFilterClick` задан у грида) */
  showFilterButton: boolean;
  /** Подсветка иконки (`theme.colors.info`), если по колонке уже применён фильтр */
  filterApplied: boolean;
  /** Свой узел внутри кнопки фильтра вместо стандартной `Icon` */
  filterIcon?: React.ReactNode;
  /** Частичные пропсы `Icon` для встроенной иконки */
  filterIconProps?: DataGridColumnFilterIconProps;
  /** Мерж поверх `filterIconProps`, когда `filterApplied` */
  filterIconPropsApplied?: DataGridColumnFilterIconProps;
  /** Клик по иконке фильтра */
  onColumnFilterClick?: (params: DataGridColumnFilterClickParams) => void;
  /**
   * Расположение кнопки фильтра относительно заголовка.
   * @defaultValue `trailing`
   */
  filterIconPosition?: DataGridColumnFilterIconPosition;
};

/**
 * Заголовок ячейки колонки: сортировка и/или clamp, опционально кнопка фильтра.
 */
export function DataGridColumnHeaderContent({
  field,
  headerFallback,
  sortable,
  sortActive,
  sortDirection,
  sortPriority,
  onSortClick,
  mergedHeaderMaxLinesRaw,
  columnHeaderClampLines,
  headerAlign,
  showFilterButton,
  filterApplied,
  filterIcon,
  filterIconProps,
  filterIconPropsApplied,
  onColumnFilterClick,
  filterIconPosition = 'trailing',
}: DataGridColumnHeaderContentProps): React.ReactElement {
  let labelBlock: React.ReactNode;
  if (sortable) {
    labelBlock = (
      <TableSortLabel
        active={sortActive}
        direction={sortDirection}
        sortPriority={sortPriority}
        maxLines={mergedHeaderMaxLinesRaw}
        onClick={onSortClick}
      >
        {headerFallback}
      </TableSortLabel>
    );
  } else if (columnHeaderClampLines != null) {
    labelBlock = (
      <TableCellHeadLineClamp $maxLines={columnHeaderClampLines}>
        {headerFallback as React.ReactNode}
      </TableCellHeadLineClamp>
    );
  } else {
    labelBlock = <>{headerFallback}</>;
  }

  if (!showFilterButton) {
    return <>{labelBlock}</>;
  }

  const filterButton = (
    <TableHeaderFilterIconButton
      type="button"
      tabIndex={0}
      aria-label={
        filterApplied ? `Фильтр по колонке ${field}, фильтр активен` : `Фильтр по колонке ${field}`
      }
      $filterApplied={filterApplied}
      onClick={event => {
        event.stopPropagation();
        onColumnFilterClick?.({ field, nativeEvent: event });
      }}
    >
      {filterIcon ?? (
        <Icon
          {...mergeDataGridColumnFilterIconProps({
            filterApplied,
            filterIconProps,
            filterIconPropsApplied,
          })}
        />
      )}
    </TableHeaderFilterIconButton>
  );

  const isLeading = filterIconPosition === 'leading';

  return (
    <DataGridColumnHeaderRow $filterIconPosition={filterIconPosition}>
      {isLeading ? filterButton : null}
      <DataGridColumnHeaderLabelSlot $align={headerAlign} $filterIconPosition={filterIconPosition}>
        {labelBlock}
      </DataGridColumnHeaderLabelSlot>
      {isLeading ? null : filterButton}
    </DataGridColumnHeaderRow>
  );
}

DataGridColumnHeaderContent.displayName = 'DataGridColumnHeaderContent';
