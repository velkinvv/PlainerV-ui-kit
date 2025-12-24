import React, { forwardRef } from 'react';
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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked = false, onChange, label, disabled = false, size = Size.MD, className, ...props },
    ref,
  ) => {
    const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onChange) {
        onChange(event);
      }
    };

    const handleLabelClick = () => {
      if (!disabled && onChange) {
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
          ref={ref}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <CheckboxBox checked={checked} disabled={disabled} size={size}>
          <CheckIcon checked={checked} size={size}>
            {checked && (
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
            )}
          </CheckIcon>
        </CheckboxBox>
        {label && <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>}
      </CheckboxContainer>
    );
  },
);

Checkbox.displayName = 'Checkbox';
