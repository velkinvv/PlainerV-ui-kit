import React, { forwardRef } from 'react';
import { GridWrapper } from './Grid.style';

import { type GridProps, GridMode } from '../../../types/ui';
// import { useTheme } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      mode = GridMode.CONTAINER,
      container = false,
      columns,
      rows,
      gap = Size.MD,
      rowGap = Size.MD,
      columnGap = Size.MD,
      justifyContent,
      alignItems,
      width,
      height,
      minHeight,
      maxHeight,
      autoFit = false,
      autoFill = false,
      minColumnWidth,
      maxColumnWidth,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // const theme = useTheme();

    return (
      <GridWrapper
        ref={ref}
        mode={mode}
        container={container}
        columns={columns}
        rows={rows}
        gap={gap}
        rowGap={rowGap}
        columnGap={columnGap}
        justifyContent={justifyContent}
        alignItems={alignItems}
        width={width}
        height={height}
        minHeight={minHeight}
        maxHeight={maxHeight}
        autoFit={autoFit}
        autoFill={autoFill}
        minColumnWidth={minColumnWidth}
        maxColumnWidth={maxColumnWidth}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </GridWrapper>
    );
  },
);

Grid.displayName = 'Grid';
