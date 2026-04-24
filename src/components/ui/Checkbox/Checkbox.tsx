import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import type { CheckboxProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { neutral } from '../../../variables/colors/neutral';
import {
  CheckboxContainer,
  CheckboxInput,
  CheckboxBox,
  CheckIcon,
  CheckboxLabel,
} from './Checkbox.style';

/**
 * Чекбокс с опциональным `indeterminate` (частичный выбор в таблицах и т.п.).
 * @param props.checked - Включён ли чекбокс
 * @param props.indeterminate - Промежуточное состояние (визуально зелёный фон и «минус»)
 * @param props.onChange - Событие изменения
 * @param props.label - Подпись
 * @param props.disabled - Отключение
 * @param props.size - Размер
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      onChange,
      label,
      disabled = false,
      size = Size.MD,
      className,
      ...props
    },
    ref,
  ) => {
    const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
        if (node) {
          node.indeterminate = Boolean(indeterminate);
        }
      },
      [ref, indeterminate],
    );

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onChange) {
        onChange(event);
      }
    };

    const handleLabelClick = () => {
      if (!disabled && onChange) {
        // При indeterminate клик по макету обычно выбирает все
        if (indeterminate) {
          onChange({
            target: { checked: true },
          } as React.ChangeEvent<HTMLInputElement>);
          return;
        }
        const syntheticEvent = {
          target: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleLabelClick();
      }
    };

    return (
      <CheckboxContainer
        htmlFor={checkboxId}
        disabled={disabled}
        className={clsx('ui-checkbox', className)}
        onKeyDown={handleKeyDown}
        onClick={handleLabelClick}
        tabIndex={disabled ? -1 : 0}
      >
        <CheckboxInput
          ref={setInputRef}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <CheckboxBox checked={checked} indeterminate={indeterminate} disabled={disabled} size={size}>
          <CheckIcon checked={checked} indeterminate={indeterminate} size={size}>
            {indeterminate ? (
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M2 6H10"
                  stroke={neutral[10]}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : null}
            {!indeterminate && checked ? (
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke={neutral[10]}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </CheckIcon>
        </CheckboxBox>
        {label ? <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel> : null}
      </CheckboxContainer>
    );
  },
);

Checkbox.displayName = 'Checkbox';
