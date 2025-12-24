import React, { forwardRef } from 'react';
import type { GridItemProps } from '../../../types/ui';
import { GridItemWrapper } from './GridItem.style';

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      children,
      column,
      row,
      columnSpan,
      rowSpan,
      justifySelf,
      alignSelf,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <GridItemWrapper
        ref={ref}
        column={column}
        row={row}
        columnSpan={columnSpan}
        rowSpan={rowSpan}
        justifySelf={justifySelf}
        alignSelf={alignSelf}
        width={width}
        height={height}
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </GridItemWrapper>
    );
  },
);

GridItem.displayName = 'GridItem';
