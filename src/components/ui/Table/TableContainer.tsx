import React, { forwardRef } from 'react';
import type { TableContainerProps } from '@/types/ui';
import { TableContainerRoot } from './Table.style';

/**
 * Обёртка таблицы: скругление, фон карточки, горизонтальный скролл.
 * @param props.component - Корневой тег (по умолчанию `div`)
 * @param props.elevated - Показать тень
 * @param props.className - CSS-класс
 * @param props.children - Обычно `Table`
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ component, elevated = true, className, children, style, ...rest }, ref) => {
    const Root = (component ?? 'div') as React.ElementType;
    return (
      <TableContainerRoot ref={ref} as={Root} className={className} style={style} $elevated={elevated} {...rest}>
        {children}
      </TableContainerRoot>
    );
  },
);

TableContainer.displayName = 'TableContainer';
