import React from 'react';
import type { TableCellFormattedProps } from '@/types/ui';
import { formatTableCellValue } from '@/handlers/tableCellFormat';
import { TableCell } from './TableCell';

/**
 * Ячейка таблицы с декларативным форматированием (`columns[].format` в гриде или ручная сборка).
 * @param props.value — значение для форматирования
 * @param props.row — строка данных (для шаблонов ссылок и кастомных форматтеров)
 * @param props.field — ключ поля для контекста (по умолчанию пустая строка)
 * @param props.rowIndex — индекс строки (по умолчанию 0)
 * @param props.format — пресет или кастомный формат из `TableCellFormat`
 * @param props.children — если передано — выводится как есть, без применения `format`; иначе используется `format`
 * @param props — остальные пропсы `TableCell` (`align`, `padding`, …)
 */
export function TableCellFormatted<Row = unknown>(
  props: TableCellFormattedProps<Row>,
): React.ReactElement {
  const { value, row, field = '', rowIndex = 0, format, children, ...tableCellRest } = props;

  const cellContent =
    children !== undefined
      ? children
      : format != null
        ? formatTableCellValue({
            value,
            row,
            field,
            rowIndex,
            format,
          })
        : null;

  return <TableCell {...tableCellRest}>{cellContent}</TableCell>;
}

TableCellFormatted.displayName = 'TableCellFormatted';
