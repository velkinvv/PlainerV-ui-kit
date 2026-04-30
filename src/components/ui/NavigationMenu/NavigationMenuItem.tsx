import React, { useCallback } from 'react';
import { clsx } from 'clsx';
import type { NavigationMenuItemProps } from '@/types/ui';
import { getNavigationMenuItemDisplayTitle } from './NavigationMenu.handlers';
import { useNavigationMenuContext } from './NavigationMenuContext';
import {
  NavigationMenuRow,
  NavigationMenuItemButton,
  NavigationMenuItemAnchor,
  NavigationMenuItemIconWrap,
  NavigationMenuItemBadge,
  NavigationMenuItemLabel,
  NavigationMenuItemSuffix,
} from './NavigationMenu.style';

/**
 * Пункт меню навигации (`NavigationMenu`). Поддерживает иконку, бейдж, суффикс и режим collapsed.
 * @param id — совпадает с `activeId` родительского `NavigationMenu` при выборе
 * @param label — основной текст
 * @param icon — иконка слева
 * @param badge — красный бейдж
 * @param suffix — элемент справа (например шеврон)
 * @param disabled — блокирует клики и обновление active
 * @param href — режим ссылки (не используется вместе с `disabled`: при `disabled` рендерится кнопка)
 * @param title — подсказка; в collapsed полезно при `label` не строка
 * @param onClick — дополнительный обработчик после логики выбора
 * @param className — класс на интерактивном элементе
 * @param children — доп. содержимое строки (между подписью и бейджем)
 */
export const NavigationMenuItem = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  NavigationMenuItemProps
>(
  (
    {
      id,
      label,
      icon,
      badge,
      suffix,
      disabled = false,
      href,
      className,
      title,
      children,
      onClick,
    },
    ref,
  ) => {
    const { collapsed, activeId, setActiveId, activeAppearance } = useNavigationMenuContext();
    const active = activeId === id;

    const resolvedTitle = getNavigationMenuItemDisplayTitle(collapsed, label, title);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        onClick?.(event);
        if (disabled || event.defaultPrevented) {
          return;
        }
        setActiveId(id);
      },
      [disabled, id, onClick, setActiveId],
    );

    const showFloatingBadge = !!(collapsed && badge != null && badge !== false);
    const showInlineBadge = !!(!collapsed && badge != null && badge !== false);
    const useLink = Boolean(href) && !disabled;

    const inner = (
      <>
        {icon != null || showFloatingBadge ? (
          <NavigationMenuItemIconWrap>
            {icon}
            {showFloatingBadge ? (
              <NavigationMenuItemBadge $floating>{badge}</NavigationMenuItemBadge>
            ) : null}
          </NavigationMenuItemIconWrap>
        ) : null}
        <NavigationMenuItemLabel $collapsed={collapsed}>{label}</NavigationMenuItemLabel>
        {children}
        {showInlineBadge ? <NavigationMenuItemBadge>{badge}</NavigationMenuItemBadge> : null}
        {!collapsed && suffix ? (
          <NavigationMenuItemSuffix>{suffix}</NavigationMenuItemSuffix>
        ) : null}
      </>
    );

    const commonSurface = {
      $collapsed: collapsed,
      $active: active,
      $disabled: !!disabled,
      $appearance: activeAppearance,
      className: clsx('ui-navigation-menu-item', className),
      'aria-current': active ? ('page' as const) : undefined,
      title: resolvedTitle,
    };

    if (useLink && href) {
      return (
        <NavigationMenuRow>
          <NavigationMenuItemAnchor
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            {...commonSurface}
            onClick={handleClick}
          >
            {inner}
          </NavigationMenuItemAnchor>
        </NavigationMenuRow>
      );
    }

    return (
      <NavigationMenuRow>
        <NavigationMenuItemButton
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          {...commonSurface}
          onClick={handleClick}
        >
          {inner}
        </NavigationMenuItemButton>
      </NavigationMenuRow>
    );
  },
);

NavigationMenuItem.displayName = 'NavigationMenuItem';
