import { useCallback, useMemo, useState } from 'react';
import {
  ActionBarSize,
  ButtonVariant,
  type ActionBarItemDefinition,
} from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { ActionBar } from './ActionBar';

/** Демо-иконка действия на панели */
export type ActionBarDemoIconName =
  | 'IconPlainerSearch'
  | 'IconPlainerPlus'
  | 'IconPlainerCheck'
  | 'IconPlainerCalendar'
  | 'IconPlainerClock'
  | 'IconPlainerClose'
  | 'IconPlainerArrowRight'
  | 'IconPlainerWarning'
  | 'IconPlainerUser'
  | 'IconPlainerMoon';

/** Конфигурация одного действия в демо-сторис */
export type ActionBarDemoActionItem = {
  itemId: string;
  withDivider?: boolean;
  label: string;
  disabled?: boolean;
  iconName: ActionBarDemoIconName;
};

/** Опции mapActionBarDemoItems */
export type MapActionBarDemoItemsOptions = {
  /** id пункта с кратковременным пульсом */
  highlightedItemId?: string | null;
};

/** Опции useActionBarDemoConfig */
export type UseActionBarDemoConfigOptions = {
  /** Выбранное действие — подсветка variant SECONDARY */
  activeItemId?: string;
  /** id пункта с highlightPulse (если не задано в items) */
  highlightedItemId?: string | null;
  /** Колбэк выбора действия кликом */
  onSelectItem?: (itemId: string) => void;
  /** Колбэк клика с подписью (интерактивные сторис) */
  onActionClick?: (itemId: string, label: string) => void;
};

/** Полный набор действий для overflow-демо */
export const actionBarDemoActionsFull: ActionBarDemoActionItem[] = [
  { itemId: 'search', label: 'Поиск', iconName: 'IconPlainerSearch' },
  { itemId: 'edit', label: 'Редактировать', iconName: 'IconPlainerPlus' },
  { itemId: 'archive', withDivider: true, label: 'Архив', iconName: 'IconPlainerCalendar' },
  { itemId: 'favorite', label: 'Избранное', iconName: 'IconPlainerCheck' },
  { itemId: 'schedule', label: 'Расписание', iconName: 'IconPlainerClock' },
  { itemId: 'share', withDivider: true, label: 'Поделиться', iconName: 'IconPlainerArrowRight' },
  { itemId: 'notify', label: 'Уведомления', disabled: true, iconName: 'IconPlainerWarning' },
  { itemId: 'profile', label: 'Профиль', iconName: 'IconPlainerUser' },
  { itemId: 'theme', label: 'Тема', iconName: 'IconPlainerMoon' },
  { itemId: 'delete', label: 'Удалить', iconName: 'IconPlainerClose' },
];

/** Короткий набор — все кнопки помещаются без overflow */
export const actionBarDemoActionsShort: ActionBarDemoActionItem[] = [
  { itemId: 'search', label: 'Поиск', iconName: 'IconPlainerSearch' },
  { itemId: 'edit', label: 'Редактировать', iconName: 'IconPlainerPlus' },
  { itemId: 'archive', withDivider: true, label: 'Архив', iconName: 'IconPlainerCalendar' },
  { itemId: 'delete', label: 'Удалить', iconName: 'IconPlainerClose' },
];

/**
 * Преобразует демо-конфиг в массив `items` для ActionBar.
 * @param actionRows — строки демо-действий
 * @param options — highlightedItemId для highlightPulse
 */
export function mapActionBarDemoItems(
  actionRows: ActionBarDemoActionItem[],
  options?: MapActionBarDemoItemsOptions,
): ActionBarItemDefinition[] {
  const highlightedItemId = options?.highlightedItemId;

  return actionRows.map(({ itemId, withDivider }) => ({
    itemId,
    withDivider,
    highlightPulse: highlightedItemId != null && highlightedItemId === itemId,
  }));
}

/**
 * Нормализует аргумент options / legacy onActionClick.
 * @param options — объект опций или legacy-колбэк
 */
function resolveActionBarDemoConfigOptions(
  options?: UseActionBarDemoConfigOptions | ((itemId: string, label: string) => void),
): UseActionBarDemoConfigOptions {
  if (typeof options === 'function') {
    return { onActionClick: options };
  }

  return options ?? {};
}

/**
 * Хук конфигурации ActionBar для сторис: рендеры кнопок и overflow-меню.
 * @param actionRows — список демо-действий
 * @param barSize — размер панели
 * @param options — activeItemId, highlightPulse, onSelectItem, onActionClick
 */
export function useActionBarDemoConfig(
  actionRows: ActionBarDemoActionItem[],
  barSize: ActionBarSize = ActionBarSize.XL,
  options?: UseActionBarDemoConfigOptions | ((itemId: string, label: string) => void),
) {
  const resolvedOptions = resolveActionBarDemoConfigOptions(options);

  const items = useMemo(
    () =>
      mapActionBarDemoItems(actionRows, {
        highlightedItemId: resolvedOptions.highlightedItemId,
      }),
    [actionRows, resolvedOptions.highlightedItemId],
  );

  const findActionItem = useCallback(
    (itemId: string) => actionRows.find((row) => row.itemId === itemId),
    [actionRows],
  );

  const findItemDefinition = useCallback(
    (itemId: string) => items.find((entry) => entry.itemId === itemId),
    [items],
  );

  const renderActionBarItem = useCallback(
    (itemId: string) => {
      const actionItem = findActionItem(itemId);
      const itemDefinition = findItemDefinition(itemId);

      if (!actionItem) {
        return null;
      }

      const isActive = resolvedOptions.activeItemId === itemId;

      return (
        <ActionBar.ItemWithTooltip
          barSize={barSize}
          variant={isActive ? ButtonVariant.SECONDARY : ButtonVariant.GHOST}
          highlightPulse={Boolean(itemDefinition?.highlightPulse)}
          tooltipText={actionItem.label}
          aria-label={actionItem.label}
          aria-pressed={isActive}
          disabled={actionItem.disabled}
          icon={<Icon name={actionItem.iconName} size={IconSize.SM} color="currentColor" />}
          onClick={() => {
            resolvedOptions.onSelectItem?.(itemId);
            resolvedOptions.onActionClick?.(itemId, actionItem.label);
          }}
        />
      );
    },
    [barSize, findActionItem, findItemDefinition, resolvedOptions],
  );

  const renderDropMenuItem = useCallback(
    (itemId: string) => {
      const actionItem = findActionItem(itemId);

      if (!actionItem) {
        return null;
      }

      return (
        <ActionBar.DropMenuItem barSize={barSize}>
          <Icon name={actionItem.iconName} size={IconSize.SM} color="currentColor" />
          {actionItem.label}
        </ActionBar.DropMenuItem>
      );
    },
    [barSize, findActionItem],
  );

  const itemIsDisabled = useCallback(
    (itemId: string) => Boolean(findActionItem(itemId)?.disabled),
    [findActionItem],
  );

  return {
    items,
    renderActionBarItem,
    renderDropMenuItem,
    itemIsDisabled,
  };
}

/**
 * Хук последнего выбранного действия для интерактивных сторис.
 */
export function useActionBarLastActionState() {
  const [lastActionLabel, setLastActionLabel] = useState<string | null>(null);

  const handleActionClick = useCallback((_itemId: string, label: string) => {
    setLastActionLabel(label);
  }, []);

  return {
    lastActionLabel,
    handleActionClick,
  };
}

/** Подпись демо-действия по itemId */
export function resolveActionBarDemoItemLabel(
  itemId: string,
  actionRows: ActionBarDemoActionItem[] = actionBarDemoActionsFull,
): string {
  const actionItem = actionRows.find((entry) => entry.itemId === itemId);
  return actionItem?.label ?? itemId;
}
