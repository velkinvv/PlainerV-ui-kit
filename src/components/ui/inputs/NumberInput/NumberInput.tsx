import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import type { NumberInputProps } from '../../../../types/ui';
import { Input } from '../Input/Input';
import { clampNumericStringOnBlur, parseOptionalBound, sanitizeNumericInput } from './handlers';

/**
 * Числовое поле с тем же оформлением и пропсами, что `Input`: допускаются только цифры
 * и (по настройкам) десятичная точка и ведущий минус. Рендерит `Input` с `type="text"`.
 * @param allowDecimal - Разрешить одну `.` (запятая нормализуется в точку).
 * @param allowNegative - Разрешить `-` только в начале значения.
 * @param clampOnBlur - При уходе фокуса применить `min`/`max`, если они заданы (по умолчанию `true`).
 * @param props - Остальные пропсы `Input`; `type` и `inputMode` задаёт компонент.
 * @param ref - Ссылка на нативный `HTMLInputElement`.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      allowDecimal = true,
      allowNegative = false,
      clampOnBlur = true,
      defaultValue,
      value: valueFromProps,
      onChange,
      onBlur,
      onClearIconClick,
      handleInput: externalHandleInput,
      readOnly = false,
      disabled = false,
      min,
      max,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const isControlled = valueFromProps !== undefined;

    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : '',
    );

    const displayValue = isControlled ? valueFromProps : uncontrolledValue;

    const mergedOnChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setUncontrolledValue(event.target?.value ?? '');
        }
        onChange?.(event);
      },
      [isControlled, onChange],
    );

    const mergedOnClearIconClick = useCallback(() => {
      if (!isControlled) {
        setUncontrolledValue('');
      }
      onClearIconClick?.();
    }, [isControlled, onClearIconClick]);

    const mergedHandleInput = useCallback(
      (rawValue: string, cursorPosition: number) => {
        const firstPass = sanitizeNumericInput({
          rawInput: rawValue,
          caretIndex: cursorPosition,
          allowDecimal,
          allowNegative,
        });

        if (externalHandleInput) {
          return externalHandleInput(firstPass.sanitizedValue, firstPass.caretIndex);
        }

        return {
          value: firstPass.sanitizedValue,
          cursorPosition: firstPass.caretIndex,
        };
      },
      [allowDecimal, allowNegative, externalHandleInput],
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!disabled && !readOnly) {
          // Исключаем экспоненцуальную запись и «+», чтобы ввод оставался текстовым числом
          if (event.key === 'e' || event.key === 'E' || event.key === '+') {
            event.preventDefault();
          }
        }
        onKeyDown?.(event);
      },
      [disabled, readOnly, onKeyDown],
    );

    const minBound = useMemo(() => parseOptionalBound(min), [min]);
    const maxBound = useMemo(() => parseOptionalBound(max), [max]);

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        const shouldClamp =
          clampOnBlur &&
          !readOnly &&
          !disabled &&
          (minBound !== undefined || maxBound !== undefined);

        if (shouldClamp) {
          const currentValue = event.target?.value ?? '';
          const clampedValue = clampNumericStringOnBlur(currentValue, minBound, maxBound);

          if (clampedValue !== currentValue) {
            if (!isControlled) {
              setUncontrolledValue(clampedValue);
            }

            const syntheticEvent = {
              ...event,
              target: { ...event.target, value: clampedValue },
              currentTarget: { ...event.currentTarget, value: clampedValue },
            } as React.ChangeEvent<HTMLInputElement>;

            onChange?.(syntheticEvent);
          }
        }

        onBlur?.(event);
      },
      [clampOnBlur, readOnly, disabled, minBound, maxBound, isControlled, onChange, onBlur],
    );

    const inputMode = allowDecimal ? 'decimal' : 'numeric';

    return (
      <Input
        ref={ref}
        {...rest}
        type="text"
        inputMode={inputMode}
        value={displayValue}
        defaultValue={undefined}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        onChange={mergedOnChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClearIconClick={mergedOnClearIconClick}
        handleInput={mergedHandleInput}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';
