import React, { forwardRef, useMemo } from 'react';
import { useTheme } from 'styled-components';
import type { ThemeType } from '@/types/theme';
import type { TableContainerProps } from '@/types/ui';
import { TableContainerInset, TableContainerInsetSurface, TableContainerRoot } from './Table.style';
import { TableContainerAppearanceProvider } from './TableContainerAppearanceContext';
import { TableShellInsetProvider } from './TableShellInsetContext';
import { resolveTableShellInsetPadding } from './tableShellInsetHandlers';
import { normalizeTableSurfaceBackgrounds } from './tableSurfaceBackgroundHandlers';

/**
 * Обёртка таблицы: скругление, фон карточки, горизонтальный скролл.
 * @param props.component - Корневой тег (по умолчанию `div`)
 * @param props.elevated - Показать тень
 * @param props.shellVariant - `embedded` — без внешнего бордера и внутренних скруглений (родителю — `border-radius` + `overflow: hidden`)
 * @param props.shellInset - Внутренние отступы на белом фоне (бордер только у карточки, не у сетки)
 * @param props.shellInsetPadding - Переопределение отступа канавы (число — px)
 * @param props.surfaceBackgrounds - Прозрачные фоны по поверхностям или `'transparent'` для всех
 * @param props.className - CSS-класс
 * @param props.children - Обычно `TableContainerScroll` и опционально `TablePagination`
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  (
    {
      component,
      elevated = true,
      shellVariant = 'card',
      shellInset = false,
      shellInsetPadding,
      surfaceBackgrounds,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme() as ThemeType;
    const resolvedSurfaces = useMemo(
      () => normalizeTableSurfaceBackgrounds(surfaceBackgrounds),
      [surfaceBackgrounds],
    );
    const resolvedInsetPadding = useMemo(
      () => resolveTableShellInsetPadding(theme, shellInsetPadding),
      [theme, shellInsetPadding],
    );

    const Root = (component ?? 'div') as React.ElementType;
    const body = shellInset ? (
      <TableContainerInset $padding={resolvedInsetPadding}>
        <TableContainerInsetSurface $surfaces={resolvedSurfaces}>
          {children}
        </TableContainerInsetSurface>
      </TableContainerInset>
    ) : (
      children
    );

    return (
      <TableContainerAppearanceProvider
        shellVariant={shellVariant}
        surfaceBackgrounds={surfaceBackgrounds}
      >
        <TableShellInsetProvider shellInset={shellInset}>
          <TableContainerRoot
            ref={ref}
            as={Root}
            className={className}
            style={style}
            $elevated={elevated}
            $shellInset={shellInset}
            $shellVariant={shellVariant}
            $surfaces={resolvedSurfaces}
            {...rest}
          >
            {body}
          </TableContainerRoot>
        </TableShellInsetProvider>
      </TableContainerAppearanceProvider>
    );
  },
);

TableContainer.displayName = 'TableContainer';
