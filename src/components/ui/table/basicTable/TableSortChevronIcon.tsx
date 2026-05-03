import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import type { TableSortDirection } from '@/types/ui';
import { getSortChevronTones, getTableSortChevronColor } from './handlers';
import { TableSortChevronMetaRow, TableSortLabelPriority } from './tableSortChevronIcon.style';

export type TableSortChevronIconProps = {
  /** Колонка участвует в сортировке */
  active: boolean;
  /** Направление при активной колонке; `false` — оба шеврона в нейтральном тоне */
  direction?: TableSortDirection | false;
  /** Выравнивание блока иконки при многострочном заголовке (`maxLines`) */
  dockStart?: boolean;
  /** При мульти-сортировке: порядковый номер (1…n) рядом с иконкой */
  sortPriority?: number;
};

/**
 * Два шеврона вверх/вниз (линии, как в макете таблицы): активное направление темнее, противоположное приглушено.
 */
export function TableSortChevronIcon({
  active,
  direction = false,
  dockStart = false,
  sortPriority,
}: TableSortChevronIconProps): React.ReactElement {
  const theme = useTheme();
  const tones = useMemo(() => getSortChevronTones(active, direction), [active, direction]);
  const upStroke = getTableSortChevronColor(theme, tones.up);
  const downStroke = getTableSortChevronColor(theme, tones.down);

  return (
    <TableSortChevronMetaRow $dockStart={dockStart}>
      <svg
        width="10"
        height="15"
        viewBox="0 0 10 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        style={{ display: 'block', flexShrink: 0 }}
      >
        <path
          d="M1 6 L5 2 L9 6"
          stroke={upStroke}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 9 L5 13 L9 9"
          stroke={downStroke}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {sortPriority != null && sortPriority > 0 ? (
        <TableSortLabelPriority>{sortPriority}</TableSortLabelPriority>
      ) : null}
    </TableSortChevronMetaRow>
  );
}

TableSortChevronIcon.displayName = 'TableSortChevronIcon';
