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
} from './Breadcrumb.style';
import { isBreadcrumbCurrentPage } from './handlers';

const DEFAULT_ARIA_LABEL = 'Навигационная цепочка';

/**
 * Рендерит одну «крошку»: ссылка, кнопка или текст текущей страницы.
 * @param item - Данные пункта
 * @param isCurrent - Флаг текущей страницы (`aria-current`)
 */
const renderCrumb = (item: BreadcrumbItem, isCurrent: boolean) => {
  if (isCurrent) {
    return (
      <BreadcrumbCrumbText aria-current="page" $muted={false}>
        {item.label}
      </BreadcrumbCrumbText>
    );
  }

  if (item.disabled && item.href) {
    return (
      <BreadcrumbCrumbText $muted aria-disabled="true">
        {item.label}
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
        onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {item.label}
      </BreadcrumbCrumbLink>
    );
  }

  if (item.onClick) {
    return (
      <BreadcrumbCrumbButton type="button" onClick={item.onClick} disabled={item.disabled}>
        {item.label}
      </BreadcrumbCrumbButton>
    );
  }

  return <BreadcrumbCrumbText $muted>{item.label}</BreadcrumbCrumbText>;
};

/**
 * Хлебные крошки: семантический `nav` + `ol`/`li`, разделитель, текущая страница с `aria-current`.
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
