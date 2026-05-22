import React from 'react';
import type { SelectProps } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { Select } from '../Select/Select';

/**
 * Проверяет, нужен ли составной layout Input (InputEx): prefix и/или suffix.
 * @param prefix - React-узел слева от поля ввода.
 * @param suffix - React-узел справа от поля ввода.
 */
export const hasInputCompositeAddons = (
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
): boolean => Boolean(prefix || suffix);

/**
 * Подготавливает addon для составного поля: для `Select` (в т.ч. `mode="searchSelect"`) включает режим без собственной оболочки.
 * @param addon - Переданный prefix или suffix.
 * @param options.fieldSize - Размер родительского Input.
 * @param options.fieldDisabled - Отключено ли родительское поле.
 */
export const prepareInputCompositeAddon = (
  addon: React.ReactNode,
  options: {
    fieldSize: Size;
    fieldDisabled?: boolean;
  },
): React.ReactNode => {
  if (!addon || !React.isValidElement(addon)) {
    return addon;
  }

  const elementType = addon.type as { displayName?: string };
  const isSelectComponent =
    addon.type === Select ||
    elementType?.displayName === 'Select' ||
    elementType?.displayName === 'SelectPanel';

  if (!isSelectComponent) {
    return addon;
  }

  const selectElement = addon as React.ReactElement<SelectProps>;

  return React.cloneElement(selectElement, {
    embeddedInCompositeField: true,
    size: selectElement.props.size ?? options.fieldSize,
    fullWidth: true,
    label: undefined,
    additionalLabel: undefined,
    helperText: undefined,
    error: undefined,
    success: undefined,
    status: undefined,
    extraText: undefined,
    skeleton: false,
    disabled: options.fieldDisabled ?? selectElement.props.disabled,
  });
};
