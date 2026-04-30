import React from 'react';
import { clsx } from 'clsx';
import type { MenuItemProps } from '@/types/ui';
import { useMenuListPresentationContext } from './MenuListPresentationContext';
import { MenuItemRow, MenuItemControl } from './Menu.style';

/**
 * Пункт выпадающего списка (`Menu`): кнопка с `role="menuitem"`.
 * @param children — содержимое строки
 * @param disabled — отключить пункт и исключить из стрелок на клавиатуре
 * @param selected — подсветка выбранного пункта
 * @param destructive — цвет для деструктивного действия
 * @param onClick — обработчик клика
 * @param className — дополнительный класс на кнопке
 */
export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    { children, disabled = false, selected = false, destructive = false, onClick, className },
    ref,
  ) => {
    const { dense } = useMenuListPresentationContext();

    return (
      <MenuItemRow role="presentation">
        <MenuItemControl
          ref={ref}
          type="button"
          role="menuitem"
          disabled={disabled}
          tabIndex={-1}
          $dense={dense}
          $selected={!!selected}
          $destructive={!!destructive}
          className={clsx('ui-surface-menu-item', className)}
          onClick={onClick}
        >
          {children}
        </MenuItemControl>
      </MenuItemRow>
    );
  },
);

MenuItem.displayName = 'MenuItem';
