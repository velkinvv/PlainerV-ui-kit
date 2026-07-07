import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import type { TableRowProps } from '@/types/ui';
import type { ThemeType } from '@/types/theme';
import { resolveTableRowBackgroundColor } from '@/handlers/tableRowColorHandlers';
import { StyledTr } from './Table.style';
import { useTableRootContext, useTableSection } from './TableContext';
import { useResolvedTableSurfaceBackgrounds } from './tableSurfaceBackgroundHooks';

/**
 * Строка таблицы (`tr`).
 * @param props.selected - Выбранная строка (фон по макету)
 * @param props.hover — подсветка при наведении (по умолчанию true для `tbody`)
 * @param props.disabled — строка неактивна (пониженная непрозрачность)
 * @param props.dragging — строка перетаскивается (источник DnD)
 * @param props.rowColor - CSS-цвет фона строки (приоритетнее `rowColorKey`)
 * @param props.rowColorKey - Ключ из `rowColorMap` родительской `Table`
 */
function TableRowInner<RowColorKey extends string = string>(
  {
    selected = false,
    hover,
    disabled = false,
    dragging = false,
    rowColor,
    rowColorKey,
    className,
    children,
    style,
    onClick,
    ...rest
  }: TableRowProps<RowColorKey>,
  ref: React.ForwardedRef<HTMLTableRowElement>,
) {
  const theme = useTheme() as ThemeType;
  const tableRootContext = useTableRootContext<RowColorKey>();
  const section = useTableSection();
  const isBody = section === 'body';
  const hoverable = hover ?? isBody;
  const resolvedSurfaces = useResolvedTableSurfaceBackgrounds();

  const resolvedRowColor = useMemo(
    () =>
      resolveTableRowBackgroundColor({
        rowColor,
        rowColorKey,
        rowColorMap: tableRootContext.rowColorMap,
        colors: theme.colors,
      }),
    [rowColor, rowColorKey, tableRootContext.rowColorMap, theme.colors],
  );

  const mergedStyle = resolvedRowColor
    ? { ...style, backgroundColor: resolvedRowColor }
    : style;

  return (
    <StyledTr
      ref={ref}
      className={clsx(className)}
      style={mergedStyle}
      $section={section}
      $selected={selected}
      $disabled={disabled}
      $dragging={dragging && isBody}
      $hoverable={hoverable && !disabled && !(dragging && isBody)}
      $surfaces={resolvedSurfaces}
      data-selected={selected ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-dragging={dragging && isBody ? 'true' : undefined}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </StyledTr>
  );
}

TableRowInner.displayName = 'TableRow';

export const TableRow = forwardRef(TableRowInner) as <RowColorKey extends string = string>(
  props: TableRowProps<RowColorKey> & { ref?: React.Ref<HTMLTableRowElement> },
) => React.ReactElement;
