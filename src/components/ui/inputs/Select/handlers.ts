import type { ReactNode } from 'react';
import type { DropdownMenuItemProps, SelectOption, SelectProps } from '../../../../types/ui';
import { Size, IconSize } from '../../../../types/sizes';

/**
 * Итоговый статус обводки селекта по приоритету: явный `status`, затем `error` / `success`.
 * @param status - Явный статус из пропсов.
 * @param error - Текст ошибки (включает визуальный error).
 * @param success - Флаг успеха.
 * @returns Статус для `InputWrapper` или `undefined`.
 */
export const getSelectStatus = (
  status: SelectProps['status'],
  error?: SelectProps['error'],
  success?: SelectProps['success'],
): SelectProps['status'] => status || (error ? 'error' : success ? 'success' : undefined);

/**
 * Значение `defaultValue` для неконтролируемого нативного `select`.
 * @param placeholder - Текст пустой опции (только single).
 * @param defaultValue - Явный `defaultValue` из пропсов.
 * @param multiple - Режим множественного выбора.
 * @returns Значение для `defaultValue` атрибута или `undefined`.
 */
export const getSelectUncontrolledDefaultValue = (
  placeholder: string | undefined,
  defaultValue: SelectProps['defaultValue'],
  multiple?: boolean,
): string | string[] | undefined => {
  if (defaultValue !== undefined) {
    if (multiple) {
      return Array.isArray(defaultValue) ? defaultValue : [String(defaultValue)];
    }
    return Array.isArray(defaultValue) ? (defaultValue[0] ?? '') : String(defaultValue);
  }
  if (multiple) {
    return [];
  }
  if (placeholder) {
    return '';
  }
  return undefined;
};

/**
 * Преобразует опции селекта в элементы меню `Dropdown`.
 * @param options - Список опций компонента `Select`.
 * @returns Плоский список `DropdownMenuItemProps`.
 */
export const mapSelectOptionsToDropdownItems = (options: SelectOption[]): DropdownMenuItemProps[] =>
  options.map((opt) => ({
    label: opt.label,
    value: opt.value,
    disabled: opt.disabled,
  }));

/**
 * Строковое представление `label` опции для отображения в триггере.
 * @param label - `ReactNode` подписи опции.
 * @param value - Строковое значение опции (fallback).
 * @returns Текст для триггера.
 */
export const formatSelectOptionLabel = (label: ReactNode | undefined, value: string): string => {
  if (typeof label === 'string' || typeof label === 'number') {
    return String(label);
  }
  return value;
};

/**
 * Текст на триггере панельного селекта.
 * @param options - Опции.
 * @param value - Текущее значение (строка или массив при `multiple`).
 * @param multiple - Мультиселект.
 * @param placeholder - Текст при пустом выборе.
 * @returns Строка для кнопки-триггера; при `multiple` и ненулевом выборе — «Выбрано: N».
 */
export const getSelectPanelTriggerText = (
  options: SelectOption[],
  value: string | string[] | undefined,
  multiple: boolean,
  placeholder?: string,
): string => {
  if (multiple) {
    const arr = Array.isArray(value) ? value : value ? [String(value)] : [];
    if (arr.length === 0) {
      return placeholder ?? '';
    }
    // Формат триггера как в макете: «Выбрано: N» (мультиселект).
    return `Выбрано: ${arr.length}`;
  }
  const v = value === undefined || value === null ? '' : Array.isArray(value) ? '' : String(value);
  if (v === '') {
    return placeholder ?? '';
  }
  const opt = options.find((o) => o.value === v);
  return opt ? formatSelectOptionLabel(opt.label, opt.value) : v;
};

/**
 * Показывается ли на триггере плейсхолдер (для стиля `textTertiary`, как в макете).
 * @param value - Текущее значение.
 * @param multiple - Мультиселект.
 * @param placeholder - Текст плейсхолдера; без него всегда `false`.
 * @returns `true`, если выбор пустой и задан непустой плейсхолдер.
 */
export const getSelectTriggerShowsPlaceholder = (
  value: string | string[] | undefined,
  multiple: boolean,
  placeholder?: string,
): boolean => {
  if (!placeholder) {
    return false;
  }
  if (multiple) {
    const arr = Array.isArray(value) ? value : value ? [String(value)] : [];
    return arr.length === 0;
  }
  const v =
    value === undefined || value === null ? '' : Array.isArray(value) ? '' : String(value);
  return v === '';
};

/**
 * Количество выбранных значений для мультиселекта (длина массива или 0 / 1 для одиночной строки).
 * @param value - Текущее значение поля (`string[]` или при ошибочной передаче строка).
 * @returns Число выбранных пунктов.
 */
export const getSelectMultiSelectedCount = (value: string | string[] | undefined): number => {
  const arr = Array.isArray(value) ? value : value ? [String(value)] : [];
  return arr.length;
};

/**
 * Размер иконки-шеврона в зависимости от размера поля (согласовано с DateInput / TimeInput).
 * @param size - Размер из `SelectProps.size`.
 * @returns Значение `IconSize` для `Icon`.
 */
export const getSelectChevronIconSize = (size: Size | undefined): IconSize => {
  if (size === Size.SM || size === Size.XS) {
    return IconSize.XS;
  }
  if (size === Size.LG || size === Size.XL) {
    return IconSize.MD;
  }
  return IconSize.SM;
};

/**
 * Начальное значение неконтролируемого панельного селекта.
 * @param options - Опции (если нет placeholder и single — берётся первая опция).
 * @param defaultValue - Проп `defaultValue`.
 * @param multiple - Мультиселект.
 * @param placeholder - Плейсхолдер.
 * @returns Начальное значение состояния.
 */
export const getSelectPanelInitialValue = (
  options: SelectOption[],
  defaultValue: SelectProps['defaultValue'],
  multiple: boolean,
  placeholder?: string,
): string | string[] => {
  if (defaultValue !== undefined) {
    if (multiple) {
      return Array.isArray(defaultValue) ? defaultValue : [String(defaultValue)];
    }
    return Array.isArray(defaultValue) ? (defaultValue[0] ?? '') : String(defaultValue);
  }
  if (multiple) {
    return placeholder ? [] : [];
  }
  if (placeholder) {
    return '';
  }
  return options[0]?.value ?? '';
};

/**
 * Следующее значение после выбора пункта в панели.
 * @param current - Текущее значение.
 * @param selectedValue - `value` выбранного пункта меню.
 * @param multiple - Режим мультивыбора (toggle по клику).
 * @returns Новое значение поля.
 */
export const applySelectPanelSelection = (
  current: string | string[] | undefined,
  selectedValue: string | undefined,
  multiple: boolean,
): string | string[] => {
  const key = selectedValue ?? '';
  if (!multiple) {
    return key;
  }
  const arr = Array.isArray(current) ? [...current] : current ? [String(current)] : [];
  const idx = arr.indexOf(key);
  if (idx >= 0) {
    arr.splice(idx, 1);
    return arr;
  }
  arr.push(key);
  return arr;
};
