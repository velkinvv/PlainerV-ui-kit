import React, { useCallback, useMemo } from 'react';
import { clsx } from 'clsx';
import type { BreadcrumbItem, BreadcrumbProps } from '../../../types/ui';
import { Size, IconSize } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { mergeAnchorRel } from '../../../handlers/linkHandlers';
import {
  BreadcrumbNav,
  BreadcrumbList,
  BreadcrumbListItem,
  BreadcrumbSeparator,
  BreadcrumbCrumbLink,
  BreadcrumbCrumbButton,
  BreadcrumbCrumbText,
  BreadcrumbCrumbRow,
  BreadcrumbCrumbIcon,
  BreadcrumbCrumbLabel,
  BreadcrumbEllipsisButton,
} from './Breadcrumb.style';
import { isBreadcrumbCurrentPage, shouldUseBreadcrumbPill } from './handlers';

const DEFAULT_ARIA_LABEL = 'Навигационная цепочка';

/**
 * Тело крошки: опциональная иконка + подпись.
 * @param item - Пункт
 * @param iconMuted - Приглушить иконку (disabled)
 */
const BreadcrumbCrumbBody: React.FC<{ item: BreadcrumbItem; iconMuted: boolean }> = ({
  item,
  iconMuted,
}) => (
  <BreadcrumbCrumbRow>
    {item.icon ? <BreadcrumbCrumbIcon $muted={iconMuted}>{item.icon}</BreadcrumbCrumbIcon> : null}
    <BreadcrumbCrumbLabel>{item.label}</BreadcrumbCrumbLabel>
  </BreadcrumbCrumbRow>
);

/**
 * Рендерит одну «крошку»: ссылка, кнопка, текст или сегмент «…».
 * @param item - Данные пункта
 * @param isCurrent - Флаг текущей страницы (`aria-current`)
 */
const renderCrumb = (item: BreadcrumbItem, isCurrent: boolean) => {
  const pill = shouldUseBreadcrumbPill(item, isCurrent);
  const iconMuted = Boolean(item.disabled);

  if (item.ellipsis) {
    return (
      <BreadcrumbEllipsisButton
        type="button"
        onClick={item.onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
        disabled={item.disabled}
        $disabled={item.disabled}
        aria-label={item.ellipsisAriaLabel ?? 'Показать скрытые уровни навигации'}
      >
        …
      </BreadcrumbEllipsisButton>
    );
  }

  if (isCurrent) {
    if (item.href && !item.disabled) {
      const safeRel = mergeAnchorRel(item.target, item.rel);
      return (
        <BreadcrumbCrumbLink
          href={item.href}
          target={item.target}
          rel={safeRel}
          $pill={pill}
          $muted={false}
          aria-current="page"
          onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
        >
          <BreadcrumbCrumbBody item={item} iconMuted={iconMuted} />
        </BreadcrumbCrumbLink>
      );
    }
    if (item.onClick && !item.disabled) {
      return (
        <BreadcrumbCrumbButton
          type="button"
          onClick={item.onClick}
          disabled={item.disabled}
          $pill={pill}
          $muted={false}
          aria-current="page"
        >
          <BreadcrumbCrumbBody item={item} iconMuted={iconMuted} />
        </BreadcrumbCrumbButton>
      );
    }
    return (
      <BreadcrumbCrumbText aria-current="page" $pill={pill} $muted={false}>
        <BreadcrumbCrumbBody item={item} iconMuted={iconMuted} />
      </BreadcrumbCrumbText>
    );
  }

  if (item.disabled && item.href) {
    return (
      <BreadcrumbCrumbText $pill={false} $muted aria-disabled="true">
        <BreadcrumbCrumbBody item={item} iconMuted />
      </BreadcrumbCrumbText>
    );
  }

  if (item.href) {
    const safeRel = mergeAnchorRel(item.target, item.rel);
    return (
      <BreadcrumbCrumbLink
        href={item.href}
        target={item.target}
        rel={safeRel}
        $pill={pill}
        $muted={false}
        onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        <BreadcrumbCrumbBody item={item} iconMuted={iconMuted} />
      </BreadcrumbCrumbLink>
    );
  }

  if (item.onClick) {
    return (
      <BreadcrumbCrumbButton
        type="button"
        onClick={item.onClick}
        disabled={item.disabled}
        $pill={pill}
        $muted={Boolean(item.disabled)}
      >
        <BreadcrumbCrumbBody item={item} iconMuted={iconMuted} />
      </BreadcrumbCrumbButton>
    );
  }

  return (
    <BreadcrumbCrumbText $pill={pill} $muted={Boolean(item.disabled)}>
      <BreadcrumbCrumbBody item={item} iconMuted={iconMuted} />
    </BreadcrumbCrumbText>
  );
};

/**
 * Хлебные крошки по макету Figma: `nav` + `ol`/`li`, шеврон, капсула у текущей страницы, иконка, сегмент «…».
 *
 * Пропсы — см. `BreadcrumbProps` и `BreadcrumbItem` в `types/ui`.
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  ariaLabel = DEFAULT_ARIA_LABEL,
  size = Size.MD,
  className,
}) => {
  const length = items?.length ?? 0;

  const defaultSeparator = useMemo(
    () => <Icon name="IconPlainerArrowRight" size={IconSize.SM} color="currentColor" />,
    [],
  );

  const resolvedSeparator = separator ?? defaultSeparator;

  const renderItem = useCallback(
    (item: BreadcrumbItem, index: number) => {
      const isLast = index === length - 1;
      const isCurrent = isBreadcrumbCurrentPage(item, index, length);
      const key = item.id ?? index;

      return (
        <BreadcrumbListItem key={key} className={item.className}>
          {renderCrumb(item, isCurrent)}
          {!isLast ? (
            <BreadcrumbSeparator aria-hidden>{resolvedSeparator}</BreadcrumbSeparator>
          ) : null}
        </BreadcrumbListItem>
      );
    },
    [length, resolvedSeparator],
  );

  if (!length) {
    return null;
  }

  return (
    <BreadcrumbNav
      aria-label={ariaLabel}
      className={clsx('ui-breadcrumb', className)}
      $size={size}
    >
      <BreadcrumbList>{items.map((item, index) => renderItem(item, index))}</BreadcrumbList>
    </BreadcrumbNav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
