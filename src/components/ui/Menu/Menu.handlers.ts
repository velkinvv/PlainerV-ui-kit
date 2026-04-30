import type { KeyboardEvent } from 'react';

/** Селектор интерактивных пунктов меню для фокуса и клавиатурной навигации */
export const MENU_FOCUSABLE_ITEM_SELECTOR = 'button[role="menuitem"]:not([disabled])';

function getFocusableMenuItems(menuListElement: HTMLElement): HTMLElement[] {
  return Array.from(menuListElement.querySelectorAll<HTMLElement>(MENU_FOCUSABLE_ITEM_SELECTOR));
}

/**
 * Клавиатурная навигация по списку с `role="menu"` (стрелки, Home, End), в духе WAI-ARIA Menu.
 * @param menuListElement — корневой элемент списка (`ul`/`ol` с `role="menu"`)
 * @param event — событие `keydown` (может всплыть с `menuitem`)
 * @returns `true`, если клавиша обработана и для неё уже вызван `preventDefault`
 */
export function handleMenuListKeyboardNavigation(
  menuListElement: HTMLElement | null,
  event: KeyboardEvent<HTMLElement>,
): boolean {
  if (!menuListElement) {
    return false;
  }

  const items = getFocusableMenuItems(menuListElement);
  if (items.length === 0) {
    return false;
  }

  const { key } = event;
  const { activeElement } = document;
  const currentIndex = items.indexOf(activeElement as HTMLElement);

  if (key === 'ArrowDown') {
    event.preventDefault();
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % items.length : 0;
    items[nextIndex]?.focus();
    return true;
  }

  if (key === 'ArrowUp') {
    event.preventDefault();
    const nextIndex =
      currentIndex >= 0 ? (currentIndex - 1 + items.length) % items.length : items.length - 1;
    items[nextIndex]?.focus();
    return true;
  }

  if (key === 'Home') {
    event.preventDefault();
    items[0]?.focus();
    return true;
  }

  if (key === 'End') {
    event.preventDefault();
    items[items.length - 1]?.focus();
    return true;
  }

  return false;
}
