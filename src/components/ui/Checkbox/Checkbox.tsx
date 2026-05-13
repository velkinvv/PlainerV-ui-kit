import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef } from 'react';
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
import {
  AdditionalLabel,
  ErrorText,
  ExtraText,
  HelperText,
  InputContainer,
  Label,
  RequiredIndicator,
  SuccessText,
} from '../inputs/shared';

/** Блок текстов под полем в том же порядке и с той же логикой, что у Input. */
function renderTextsBelowCheckboxInput({
  error,
  success,
  helperText,
  extraText,
  errorDomIdentifier,
  helperDomIdentifier,
  successDomIdentifier,
}: {
  error?: string;
  success?: boolean;
  helperText?: string;
  extraText?: string;
  errorDomIdentifier: string;
  helperDomIdentifier: string;
  successDomIdentifier: string;
}): React.ReactNode {
  return (
    <>
      {error ? <ErrorText id={errorDomIdentifier}>{error}</ErrorText> : null}
      {success ? <SuccessText id={successDomIdentifier}>Успешно</SuccessText> : null}
      {helperText && !error && !success ? (
        <HelperText id={helperDomIdentifier}>{helperText}</HelperText>
      ) : null}
      {extraText ? <ExtraText>{extraText}</ExtraText> : null}
    </>
  );
}

/**
 * Чекбокс с опциональным `indeterminate` (частичный выбор в таблицах и т.п.).
 * Подпись над полем (`fieldLabel` / `additionalLabel`) и тексты под полем — как у текстовых полей.
 *
 * @param props.checked - Включён ли чекбокс
 * @param props.indeterminate - Промежуточное состояние; для DOM `input.indeterminate`
 * @param props.onChange - Событие изменения
 * @param props.label - Подпись рядом с квадратом чекбокса
 * @param props.fieldLabel - Подпись над элементом управления — аналог `label` из Input/TextArea
 * @param props.additionalLabel - Строка под `fieldLabel`, как у Input
 * @param props.formRequired - Звезда у `fieldLabel` и атрибут `required` у input
 * @param props.fullWidth - Растянуть контейнер поля по ширине родителя
 * @param props.error — сообщение об ошибке под полем
 * @param props.success — успешное состояние («Успешно» под полем)
 * @param props.helperText — подсказка под полем
 * @param props.extraText — дополнительный текст под блоком ошибок/подсказок
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
      fieldLabel,
      additionalLabel,
      formRequired = false,
      fullWidth = false,
      disabled = false,
      size = Size.MD,
      className,
      id: idProp,
      error,
      success = false,
      helperText,
      extraText,
      ...restProps
    },
    ref,
  ) => {
    const checkboxIdStable = useId();
    const checkboxDomId = idProp ?? checkboxIdStable;
    const checkboxErrorDomIdentifier = useId();
    const checkboxHelperDomIdentifier = useId();
    const checkboxSuccessDomIdentifier = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    /** После синтетического onChange в indeterminate нативный change иногда всё равно приходит с «включить» — один раз глушим. */
    const skipNextNativeChangeRef = useRef(false);

    const hasFooterTexts = Boolean(error || success || helperText || extraText);

    const ariaDescribedByForInput = useMemo(() => {
      const identifiers: string[] = [];
      if (error) {
        identifiers.push(checkboxErrorDomIdentifier);
      }
      if (success) {
        identifiers.push(checkboxSuccessDomIdentifier);
      }
      if (helperText && !error && !success) {
        identifiers.push(checkboxHelperDomIdentifier);
      }
      return identifiers.filter(Boolean).join(' ') || undefined;
    }, [
      checkboxErrorDomIdentifier,
      checkboxHelperDomIdentifier,
      checkboxSuccessDomIdentifier,
      error,
      helperText,
      success,
    ]);

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
      if (skipNextNativeChangeRef.current) {
        skipNextNativeChangeRef.current = false;
        return;
      }
      if (!disabled && onChange) {
        onChange(event);
      }
    };

    const emitSyntheticCheckboxChange = (nextChecked: boolean) => {
      if (!disabled && onChange) {
        onChange({
          target: { checked: nextChecked },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      if (disabled || !onChange) {
        return;
      }
      if (indeterminate) {
        event.preventDefault();
        skipNextNativeChangeRef.current = true;
        emitSyntheticCheckboxChange(false);
        queueMicrotask(() => {
          if (skipNextNativeChangeRef.current) {
            skipNextNativeChangeRef.current = false;
          }
        });
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (disabled || !onChange) {
          return;
        }
        if (indeterminate) {
          skipNextNativeChangeRef.current = true;
          emitSyntheticCheckboxChange(false);
          queueMicrotask(() => {
            if (skipNextNativeChangeRef.current) {
              skipNextNativeChangeRef.current = false;
            }
          });
          return;
        }
        emitSyntheticCheckboxChange(!checked);
      }
    };

    const buildCheckboxBody = (containerClassSuffix?: string) => (
      <CheckboxContainer
        htmlFor={checkboxDomId}
        disabled={disabled}
        className={clsx('ui-checkbox', containerClassSuffix)}
        onKeyDown={handleKeyDown}
        onClick={handleLabelClick}
        tabIndex={disabled ? -1 : 0}
      >
        <CheckboxInput
          ref={setInputRef}
          {...restProps}
          id={checkboxDomId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={Boolean(formRequired)}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedByForInput}
        />
        <CheckboxBox
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          size={size}
        >
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
                <path d="M2 6H10" stroke={neutral[10]} strokeWidth="1.5" strokeLinecap="round" />
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

    const footerTexts = hasFooterTexts
      ? renderTextsBelowCheckboxInput({
          error,
          success,
          helperText,
          extraText,
          errorDomIdentifier: checkboxErrorDomIdentifier,
          helperDomIdentifier: checkboxHelperDomIdentifier,
          successDomIdentifier: checkboxSuccessDomIdentifier,
        })
      : null;

    /** Оболочка поля: заголовки, ширина и/или текстовые хвосты как у инпутов */
    const useStructuredFieldWrapper = Boolean(
      fieldLabel || additionalLabel || fullWidth || hasFooterTexts,
    );

    if (!useStructuredFieldWrapper) {
      return (
        <>
          {buildCheckboxBody(className)}
          {footerTexts}
        </>
      );
    }

    return (
      <InputContainer fullWidth={fullWidth} className={clsx('ui-checkbox-field', className)}>
        {fieldLabel ? (
          <Label htmlFor={checkboxDomId}>
            {fieldLabel}
            {formRequired ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {buildCheckboxBody(undefined)}
        {footerTexts}
      </InputContainer>
    );
  },
);

Checkbox.displayName = 'Checkbox';
