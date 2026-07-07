import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import type { TableCellProps } from '@/types/ui';
import type { ThemeType } from '@/types/theme';
import { resolveTableColumnBackgroundColor } from '@/handlers/tableRowColorHandlers';
import { TableCellBase } from './Table.style';
import { resolveTableCellVariant, useTableRootContext, useTableSection } from './TableContext';
import { normalizeTableHeaderMaxLines } from './tableHeaderClampHandlers';

/**
 * Ячейка `th` / `td`.
 * @param props.align - Выравнивание содержимого
 * @param props.component - Явный тег (`th`, `td`, …)
 * @param props.variant - `head` рендерит `th` по умолчанию; иначе наследует секцию (`thead` → `th`)
 * @param props.padding - Отступы (`checkbox` — узкая колонка выбора)
 * @param props.activeColumn - Усиленная нижняя граница у заголовка активной колонки сортировки
 * @param props.headerMaxLines - Для шапки: максимум строк текста заголовка с обрезкой (`line-clamp`)
 * @param props.columnColor - CSS-цвет фона ячейки (приоритетнее `columnColorKey`)
 * @param props.columnColorKey - Ключ из `columnColorMap` родительской `Table`
 */
function TableCellInner<ColumnColorKey extends string = string>(
  {
    align = 'inherit',
    component,
    variant: variantProp,
    padding = 'normal',
    activeColumn = false,
    headerMaxLines,
    columnColor,
    columnColorKey,
    className,
    children,
    style,
    colSpan,
    rowSpan,
    scope,
    ...rest
  }: TableCellProps<ColumnColorKey>,
  ref: React.ForwardedRef<HTMLTableCellElement>,
) {
  const theme = useTheme() as ThemeType;
  const tableRootContext = useTableRootContext<string, ColumnColorKey>();
  const section = useTableSection();
  const { size, columnDividers } = tableRootContext;
  const resolvedVariant = useMemo(
    () => resolveTableCellVariant(section, variantProp),
    [section, variantProp],
  );
  const isHead = resolvedVariant === 'head';
  const isFooter = resolvedVariant === 'footer';
  const normalizedHeaderMaxLines = useMemo(
    () => (isHead ? normalizeTableHeaderMaxLines(headerMaxLines) : undefined),
    [headerMaxLines, isHead],
  );
  const Comp = useMemo(() => {
    if (component) {
      return component;
    }
    return isHead ? 'th' : 'td';
  }, [component, isHead]);

  const resolvedColumnColor = useMemo(
    () =>
      resolveTableColumnBackgroundColor({
        columnColor,
        columnColorKey,
        columnColorMap: tableRootContext.columnColorMap,
        colors: theme.colors,
      }),
    [columnColor, columnColorKey, tableRootContext.columnColorMap, theme.colors],
  );

  const mergedStyle = resolvedColumnColor
    ? { ...style, backgroundColor: resolvedColumnColor }
    : style;

  return (
    <TableCellBase
      ref={ref}
      as={Comp}
      className={clsx(className)}
      style={mergedStyle}
      scope={isHead ? (scope ?? (colSpan == null || colSpan === 1 ? 'col' : undefined)) : scope}
      colSpan={colSpan}
      rowSpan={rowSpan}
      $align={align}
      $padding={padding}
      $isHead={isHead}
      $size={size}
      $activeSortColumn={isHead ? activeColumn : false}
      $headerMaxLines={normalizedHeaderMaxLines}
      $columnDividers={columnDividers}
      $isFooter={isFooter}
      {...rest}
    >
      {children}
    </TableCellBase>
  );
}

TableCellInner.displayName = 'TableCell';

export const TableCell = forwardRef(TableCellInner) as <ColumnColorKey extends string = string>(
  props: TableCellProps<ColumnColorKey> & { ref?: React.Ref<HTMLTableCellElement> },
) => React.ReactElement;
