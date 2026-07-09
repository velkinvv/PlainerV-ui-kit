import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import type { ChipsProps, ChipsSelectionMode } from '../../../types/ui';
import { ChipGroupProvider, type ChipGroupContextValue } from './ChipContext';
import { ChipsRoot } from './Chips.style';
import { getChipsGroupRole, getNextChipFocusIndex, getNextChipsSelectionValue } from './handlers';

/**
 * Группа чипов: layout, дефолты через context, выбор single/multiple и клавиатура.
 *
 * @param props.selectionMode - `none` | `single` | `multiple`
 * @param props.value - Controlled значение
 * @param props.defaultValue - Uncontrolled начальное значение
 * @param props.onChange - Колбэк нового значения
 * @param props.disabled - Блокировка группы
 * @param props.size - Дефолтный размер дочерних `Chip`
 * @param props.appearance - Дефолтный вид дочерних `Chip`
 * @param props.children - Элементы `Chip`
 * @param ref - Ref на корневой контейнер
 */
export const Chips = forwardRef<HTMLDivElement, ChipsProps>(
  (
    {
      selectionMode = 'none',
      value: valueProp,
      defaultValue,
      onChange,
      disabled = false,
      size,
      appearance,
      children,
      className,
      role: roleProp,
      onKeyDown: onKeyDownProp,
      ...rest
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string | string[] | undefined>(
      defaultValue,
    );
    const selectedValue = isControlled ? valueProp : uncontrolledValue;

    const focusElementsRef = useRef<Map<string, HTMLElement>>(new Map());
    const focusOrderRef = useRef<string[]>([]);

    const commitSelection = useCallback(
      (nextValue: string | string[]) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onChange?.(nextValue);
      },
      [isControlled, onChange],
    );

    const onSelectChip = useCallback(
      (chipValue: string) => {
        if (disabled || selectionMode === 'none') {
          return;
        }
        const nextValue = getNextChipsSelectionValue(selectionMode, selectedValue, chipValue);
        if (nextValue === undefined) {
          return;
        }
        commitSelection(nextValue);
      },
      [commitSelection, disabled, selectedValue, selectionMode],
    );

    const registerChipFocusElement = useCallback(
      (chipValue: string, element: HTMLElement | null) => {
        if (!element) {
          focusElementsRef.current.delete(chipValue);
          focusOrderRef.current = focusOrderRef.current.filter((entry) => entry !== chipValue);
          return;
        }
        focusElementsRef.current.set(chipValue, element);
        if (!focusOrderRef.current.includes(chipValue)) {
          focusOrderRef.current = [...focusOrderRef.current, chipValue];
        }
      },
      [],
    );

    const unregisterChipFocusElement = useCallback((chipValue: string) => {
      focusElementsRef.current.delete(chipValue);
      focusOrderRef.current = focusOrderRef.current.filter((entry) => entry !== chipValue);
    }, []);

    const focusChipByOffset = useCallback((chipValue: string, direction: -1 | 1) => {
      const order = focusOrderRef.current;
      const currentIndex = order.indexOf(chipValue);
      const nextIndex = getNextChipFocusIndex(currentIndex, order.length, direction);
      if (nextIndex < 0) {
        return;
      }
      const nextValue = order[nextIndex];
      const nextElement = nextValue != null ? focusElementsRef.current.get(nextValue) : undefined;
      nextElement?.focus();
    }, []);

    const contextValue = useMemo<ChipGroupContextValue>(
      () => ({
        selectionMode: selectionMode as ChipsSelectionMode,
        selectedValue,
        disabled,
        size,
        appearance,
        onSelectChip,
        registerChipFocusElement,
        unregisterChipFocusElement,
        focusChipByOffset,
      }),
      [
        appearance,
        disabled,
        focusChipByOffset,
        onSelectChip,
        registerChipFocusElement,
        selectedValue,
        selectionMode,
        size,
        unregisterChipFocusElement,
      ],
    );

    const groupRole = roleProp ?? getChipsGroupRole(selectionMode);

    return (
      <ChipGroupProvider value={contextValue}>
        <ChipsRoot
          ref={ref}
          role={groupRole}
          aria-disabled={disabled || undefined}
          className={clsx('ui-chips', className)}
          onKeyDown={onKeyDownProp}
          {...rest}
        >
          {children}
        </ChipsRoot>
      </ChipGroupProvider>
    );
  },
);

Chips.displayName = 'Chips';
