import type {
  DropdownMenuItemValue,
  DropdownProps,
  DropMenuProps,
} from '../../../types/ui';

/**
 * Результат маппинга публичных пропсов `DropMenu` → пропсы `Dropdown`.
 */
export type MappedDropMenuDropdownProps = Pick<
  DropdownProps,
  'value' | 'isMenuOpen' | 'onMenuOpenChange' | 'onSelect' | 'triggerWrapClickToggle'
>;

type MapDropMenuPropsToDropdownParams = {
  /** Проп `value` DropMenu */
  value?: DropMenuProps['value'];
  /** Алиас выбранного значения */
  selected?: DropMenuProps['selected'];
  /** Controlled видимость */
  isVisible?: boolean;
  /** Колбэк смены видимости */
  onVisibilityChange?: DropMenuProps['onVisibilityChange'];
  /** Канонический колбэк выбора */
  onSelectItem?: DropMenuProps['onSelectItem'];
  /** Алиас выбора (как у Dropdown) */
  onSelect?: DropMenuProps['onSelect'];
  /** Используется ли кастомный render-триггер (отключает клик-обёртку Dropdown) */
  usesRenderContentProp: boolean;
};

/**
 * Маппит алиасы DropMenu на пропсы Dropdown.
 * @param params - Исходные пропсы и флаги
 */
export const mapDropMenuPropsToDropdown = (
  params: MapDropMenuPropsToDropdownParams,
): MappedDropMenuDropdownProps => {
  const {
    value,
    selected,
    isVisible,
    onVisibilityChange,
    onSelectItem,
    onSelect,
    usesRenderContentProp,
  } = params;

  const resolvedValue = value !== undefined ? value : selected;

  const handleSelect: DropdownProps['onSelect'] = (selectedValue, event) => {
    onSelectItem?.(selectedValue, event);
    onSelect?.(selectedValue, event);
  };

  return {
    value: resolvedValue,
    isMenuOpen: isVisible,
    onMenuOpenChange: onVisibilityChange,
    onSelect: onSelectItem || onSelect ? handleSelect : undefined,
    triggerWrapClickToggle: usesRenderContentProp ? false : undefined,
  };
};

/**
 * Нужно ли открывать меню по клавише на триггере.
 * @param key - Код клавиши
 */
export const isDropMenuTriggerOpenKey = (key: string): boolean =>
  key === 'Enter' || key === ' ' || key === 'ArrowDown';

/**
 * Нормализует значение выбора к массиву (для проверок в тестах/хелперах).
 * @param value - Строка, число или массив
 */
export const normalizeDropMenuSelectedToArray = (
  value: DropdownMenuItemValue | DropdownMenuItemValue[] | undefined,
): DropdownMenuItemValue[] => {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};
