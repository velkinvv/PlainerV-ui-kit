import React, { useCallback } from 'react';
import { clsx } from 'clsx';
import type { MenuItemProps } from '@/types/ui';
import { useMenuContext } from './MenuContext';
import {
  MenuRow,
  MenuItemButton,
  MenuItemAnchor,
  MenuItemIconWrap,
  MenuItemBadge,
  MenuItemLabel,
  MenuItemSuffix,
} from './Menu.style';

/**
 * Пункт вертикального меню (`Menu`). Поддерживает иконку, бейдж, суффикс и режим collapsed.
 * @property id — совпадает с `activeId` родительского `Menu` при выборе
 * @property label — основной текст
 * @property icon — иконка слева
 * @property badge — красный бейдж
 * @property suffix — элемент справа (например шеврон)
 * @property disabled — блокирует клики и обновление active
 * @property href — режим ссылки (не используется вместе с `disabled`: при `disabled` рендерится кнопка)
 * @property title — подсказка; в collapsed полезно при `label` не строка
 * @property onClick — дополнительный обработчик после логики выбора
 * @property className — класс на интерактивном элементе
 * @property children — доп. содержимое строки (между подписью и бейджем)
 */
export const MenuItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, MenuItemProps>(
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
    const { collapsed, activeId, setActiveId, activeAppearance } = useMenuContext();
    const active = activeId === id;

    const resolvedTitle =
      title ?? (collapsed && typeof label === 'string' ? label : undefined);

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
          <MenuItemIconWrap>
            {icon}
            {showFloatingBadge ? <MenuItemBadge $floating>{badge}</MenuItemBadge> : null}
          </MenuItemIconWrap>
        ) : null}
        <MenuItemLabel $collapsed={collapsed}>{label}</MenuItemLabel>
        {children}
        {showInlineBadge ? <MenuItemBadge>{badge}</MenuItemBadge> : null}
        {!collapsed && suffix ? <MenuItemSuffix>{suffix}</MenuItemSuffix> : null}
      </>
    );

    const commonSurface = {
      $collapsed: collapsed,
      $active: active,
      $disabled: !!disabled,
      $appearance: activeAppearance,
      className: clsx('ui-menu-item', className),
      'aria-current': active ? ('page' as const) : undefined,
      title: resolvedTitle,
    };

    if (useLink && href) {
      return (
        <MenuRow>
          <MenuItemAnchor
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            {...commonSurface}
            onClick={handleClick}
          >
            {inner}
          </MenuItemAnchor>
        </MenuRow>
      );
    }

    return (
      <MenuRow>
        <MenuItemButton
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          {...commonSurface}
          onClick={handleClick}
        >
          {inner}
        </MenuItemButton>
      </MenuRow>
    );
  },
);

MenuItem.displayName = 'MenuItem';
