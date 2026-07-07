import { useCallback, useMemo, useState } from 'react';
import { ActionBarSize, type ActionBarItemDefinition } from '../../../types/ui';
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
 */
export function mapActionBarDemoItems(
  actionRows: ActionBarDemoActionItem[],
): ActionBarItemDefinition[] {
  return actionRows.map(({ itemId, withDivider }) => ({
    itemId,
    withDivider,
  }));
}

/**
 * Хук конфигурации ActionBar для сторис: рендеры кнопок и overflow-меню.
 * @param actionRows — список демо-действий
 * @param barSize — размер панели
 * @param onActionClick — колбэк клика по действию (для интерактивных сторис)
 */
export function useActionBarDemoConfig(
  actionRows: ActionBarDemoActionItem[],
  barSize: ActionBarSize = ActionBarSize.XL,
  onActionClick?: (itemId: string, label: string) => void,
) {
  const items = useMemo(() => mapActionBarDemoItems(actionRows), [actionRows]);

  const findActionItem = useCallback(
    (itemId: string) => actionRows.find((row) => row.itemId === itemId),
    [actionRows],
  );

  const renderActionBarItem = useCallback(
    (itemId: string) => {
      const actionItem = findActionItem(itemId);

      if (!actionItem) {
        return null;
      }

      return (
        <ActionBar.ItemWithTooltip
          barSize={barSize}
          tooltipText={actionItem.label}
          aria-label={actionItem.label}
          disabled={actionItem.disabled}
          icon={<Icon name={actionItem.iconName} size={IconSize.SM} color="currentColor" />}
          onClick={() => onActionClick?.(itemId, actionItem.label)}
        />
      );
    },
    [barSize, findActionItem, onActionClick],
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
