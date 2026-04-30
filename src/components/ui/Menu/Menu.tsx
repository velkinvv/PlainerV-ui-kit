import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { clsx } from 'clsx';
import type { MenuProps } from '@/types/ui';
import { handleMenuListKeyboardNavigation, MENU_FOCUSABLE_ITEM_SELECTOR } from './Menu.handlers';
import { MenuSurface, MenuList } from './Menu.style';
import { MenuItem } from './MenuItem';
import {
  MenuListPresentationContext,
  type MenuListPresentationContextValue,
} from './MenuListPresentationContext';

/**
 * Поверхность списка действий (содержимое выпадающего меню): `role="menu"`, клавиатура, скролл.
 * Позиционирование у якоря не входит в компонент — оборачивайте в портал/Popper снаружи.
 * @param children — обычно только `MenuItem`
 * @param className — класс на внешней обёртке
 * @param aria-label — подпись для списка меню
 * @param id — id списка
 * @param maxHeight — ограничение высоты с прокруткой
 * @param dense — компактные пункты
 * @param autoFocusFirstItem — сфокусировать первый доступный пункт после монтирования
 */
export const Menu: React.FC<MenuProps> & { Item: typeof MenuItem } = ({
  children,
  className,
  id,
  maxHeight,
  dense = false,
  autoFocusFirstItem = true,
  'aria-label': ariaLabel,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const presentationValue = useMemo<MenuListPresentationContextValue>(
    () => ({ dense: !!dense }),
    [dense],
  );

  const onListKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      handleMenuListKeyboardNavigation(listRef.current, event);
    },
    [],
  );

  useEffect(() => {
    if (!autoFocusFirstItem) {
      return;
    }
    const listElement = listRef.current;
    if (!listElement) {
      return;
    }
    const firstItem = listElement.querySelector<HTMLElement>(MENU_FOCUSABLE_ITEM_SELECTOR);
    firstItem?.focus();
  }, [autoFocusFirstItem, children]);

  return (
    <MenuSurface className={clsx('ui-surface-menu', className)}>
      <MenuListPresentationContext.Provider value={presentationValue}>
        <MenuList
          ref={listRef}
          id={id}
          role="menu"
          aria-label={ariaLabel}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          $maxHeight={maxHeight}
        >
          {children}
        </MenuList>
      </MenuListPresentationContext.Provider>
    </MenuSurface>
  );
};

Menu.displayName = 'Menu';
Menu.Item = MenuItem;
