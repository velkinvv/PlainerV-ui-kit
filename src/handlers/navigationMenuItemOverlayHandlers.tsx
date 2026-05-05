import React from 'react';
import { Hint } from '@/components/ui/Hint/Hint';
import { Popover } from '@/components/ui/Popover/Popover';
import { Tooltip } from '@/components/ui/Tooltip/Tooltip';
import type { HintProps, PopoverProps, TooltipProps } from '@/types/ui';

export type NavigationMenuItemHintConfig = Omit<HintProps, 'children'>;

export type NavigationMenuItemTooltipConfig = Omit<TooltipProps, 'children'>;

export type NavigationMenuItemPopoverConfig = Omit<PopoverProps, 'trigger'>;

/**
 * Оборачивает интерактивный триггер пункта навигации в {@link Hint}, {@link Tooltip} и при необходимости {@link Popover}.
 * Порядок снаружи внутрь: **Popover** → **Hint** или **Tooltip** → триггер (кнопка/ссылка).
 * @param trigger — кнопка или ссылка пункта меню
 * @param hint — конфиг хинта (приоритетнее тултипа)
 * @param tooltip — конфиг тултипа, если хинт не задан
 * @param popover — конфиг поповера: `children` — содержимое панели, без `trigger` (подставляется текущая обёртка)
 */
export function wrapNavigationMenuItemTrigger(
  trigger: React.ReactElement,
  hint: NavigationMenuItemHintConfig | undefined,
  tooltip: NavigationMenuItemTooltipConfig | undefined,
  popover: NavigationMenuItemPopoverConfig | undefined,
): React.ReactElement {
  let wrapped: React.ReactElement = trigger;
  if (hint != null) {
    wrapped = <Hint {...hint}>{wrapped}</Hint>;
  } else if (tooltip != null) {
    wrapped = <Tooltip {...tooltip}>{wrapped}</Tooltip>;
  }
  if (popover != null) {
    return <Popover {...popover} trigger={wrapped} />;
  }
  return wrapped;
}
