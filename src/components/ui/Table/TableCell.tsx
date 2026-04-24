import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { TableCellProps } from '@/types/ui';
import { TableCellBase } from './Table.style';
import { resolveTableCellVariant, useTableRootContext, useTableSection } from './TableContext';

/**
 * Ячейка `th` / `td`.
 * @param props.align - Выравнивание содержимого
 * @param props.component - Явный тег (`th`, `td`, …)
 * @param props.variant - `head` рендерит `th` по умолчанию; иначе наследует секцию (`thead` → `th`)
 * @param props.padding - Отступы (`checkbox` — узкая колонка выбора)
 * @param props.activeColumn - Усиленная нижняя граница у заголовка активной колонки сортировки
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      align = 'inherit',
      component,
      variant: variantProp,
      padding = 'normal',
      activeColumn = false,
      className,
      children,
      style,
      colSpan,
      rowSpan,
      scope,
      ...rest
    },
    ref,
  ) => {
    const section = useTableSection();
    const { size } = useTableRootContext();
    const resolvedVariant = useMemo(
      () => resolveTableCellVariant(section, variantProp),
      [section, variantProp],
    );
    const isHead = resolvedVariant === 'head';
    const Comp = useMemo(() => {
      if (component) {
        return component;
      }
      return isHead ? 'th' : 'td';
    }, [component, isHead]);

    return (
      <TableCellBase
        ref={ref}
        as={Comp}
        className={clsx(className)}
        style={style}
        scope={isHead ? (scope ?? (colSpan == null || colSpan === 1 ? 'col' : undefined)) : scope}
        colSpan={colSpan}
        rowSpan={rowSpan}
        $align={align}
        $padding={padding}
        $isHead={isHead}
        $size={size}
        $activeSortColumn={isHead ? activeColumn : false}
        {...rest}
      >
        {children}
      </TableCellBase>
    );
  },
);

TableCell.displayName = 'TableCell';
