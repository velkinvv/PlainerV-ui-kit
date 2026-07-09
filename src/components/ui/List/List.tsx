import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { ListProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { ListProvider } from './ListContext';
import { ListRoot } from './List.style';
import { ListItem } from './ListItem';
import { ListIcon } from './ListIcon';
import {
  getListGeometry,
  getListRootTag,
  listGapToCss,
  resolveListMarkerStyle,
  shouldRenderCssListMarker,
} from './handlers';

type ListComponent = React.ForwardRefExoticComponent<
  ListProps & React.RefAttributes<HTMLElement>
> & {
  Item: typeof ListItem;
  Icon: typeof ListIcon;
};

/**
 * Типографический список: ordered / unordered, маркеры, вложенность, иконки.
 *
 * @param props.variant - `ordered` (`ol`) или `unordered` (`ul`)
 * @param props.markerStyle - Стиль маркеров
 * @param props.size - `SM` | `MD`
 * @param props.gap - Расстояние между пунктами
 * @param props.children - `List.Item`
 * @param ref - Ref на корневой `ol` / `ul`
 */
const ListBase = forwardRef<HTMLElement, ListProps>(
  (
    {
      variant = 'unordered',
      markerStyle: markerStyleProp,
      size = Size.MD,
      gap,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const markerStyle = resolveListMarkerStyle(variant, markerStyleProp);
    const geometry = useMemo(() => getListGeometry(size), [size]);
    const gapCss = listGapToCss(gap);
    const rootTag = getListRootTag(variant);
    const showCssMarker = shouldRenderCssListMarker(markerStyle);

    const contextValue = useMemo(
      () => ({
        variant,
        markerStyle,
        size,
      }),
      [markerStyle, size, variant],
    );

    return (
      <ListProvider value={contextValue}>
        <ListRoot
          as={rootTag}
          ref={ref as React.Ref<HTMLUListElement>}
          className={clsx('ui-list', className)}
          data-variant={variant}
          data-marker-style={markerStyle}
          data-size={size}
          $gapCss={gapCss}
          $markerStyle={markerStyle}
          $markerSlotSize={geometry.markerSlotSize}
          $fontSize={geometry.fontSize}
          $lineHeight={geometry.lineHeight}
          $showCssMarker={showCssMarker}
          {...rest}
        >
          {children}
        </ListRoot>
      </ListProvider>
    );
  },
);

ListBase.displayName = 'List';

export const List = ListBase as ListComponent;
List.Item = ListItem;
List.Icon = ListIcon;
