import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { ListIconProps } from '../../../types/ui';
import { IconSize, Size } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { useListContext } from './ListContext';
import { ListIconRoot } from './List.style';
import { getListGeometry } from './handlers';

/**
 * Иконка-маркер пункта списка при `markerStyle="icon"`.
 *
 * @param props.name - Имя иконки из набора `Icon`
 * @param props.color - Цвет (по умолчанию secondary из темы через слот)
 * @param props.children - Произвольный контент вместо `name`
 * @param ref - Ref на обёртку иконки
 */
export const ListIcon = forwardRef<HTMLSpanElement, ListIconProps>(
  ({ name, color, children, className, ...rest }, ref) => {
    const listContext = useListContext();
    const geometry = getListGeometry(listContext?.size);
    const iconPixelSize = geometry.iconSize === Size.SM ? IconSize.SM : IconSize.MD;

    return (
      <ListIconRoot
        ref={ref}
        className={clsx('ui-list-icon', className)}
        $slotSize={geometry.markerSlotSize}
        aria-hidden
        {...rest}
      >
        {children != null
          ? children
          : name != null
            ? (
                <Icon name={name} size={iconPixelSize} color={color ?? 'currentColor'} />
              )
            : null}
      </ListIconRoot>
    );
  },
);

ListIcon.displayName = 'List.Icon';
