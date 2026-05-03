import React, { useId } from 'react';
import { clsx } from 'clsx';
import {
  InputContainer,
  Label,
  AdditionalLabel,
  HelperText,
  ErrorText,
  SuccessText,
  ExtraText,
  RequiredIndicator,
} from '../inputs/shared';

/**
 * Оболочка слайдера: лейбл, доп. подпись и тексты под полем — как у `Input` / `TextArea`.
 *
 * @param enabled - Если `false`, рендерятся только `children` (прежний вид без полей)
 * @param className - Класс на `InputContainer`, когда `enabled`
 * @param label - Основной лейбл (`ReactNode`)
 * @param additionalLabel - Второстепенная подпись под лейблом
 * @param error - Текст ошибки
 * @param success - Показать зелёный «Успешно»
 * @param helperText - Подсказка (скрывается при `error` / `success`)
 * @param extraText - Доп. текст внизу (как `extraText` у инпута)
 * @param required - Звёздочка у `label`
 * @param fullWidth - Ширина колонки поля
 * @param children - Содержимое слайдера (`SliderRoot` + трек)
 */
export type SliderFieldShellProps = {
  enabled: boolean;
  className?: string;
  label?: React.ReactNode;
  additionalLabel?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  extraText?: string;
  required?: boolean;
  fullWidth?: boolean;
  /** Режим скелетона: `aria-busy` на контейнере */
  skeleton?: boolean;
  /** Цвет подсказки (`HelperText.status`), если показан `helperText` без error/success */
  helperStatus?: 'error' | 'success' | 'warning';
  children: React.ReactNode;
};

export const SliderFieldShell: React.FC<SliderFieldShellProps> = ({
  enabled,
  className,
  label,
  additionalLabel,
  error,
  success,
  helperText,
  extraText,
  required,
  fullWidth,
  skeleton = false,
  helperStatus,
  children,
}) => {
  const labelId = useId();

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <InputContainer
      fullWidth={fullWidth}
      className={clsx(className)}
      aria-busy={skeleton ? true : undefined}
    >
      {label ? (
        <Label as="div" id={labelId}>
          {label}
          {required ? <RequiredIndicator>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}
      <div
        role="group"
        aria-labelledby={label ? labelId : undefined}
        style={{
          minWidth: 0,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        {children}
      </div>
      {error ? <ErrorText>{error}</ErrorText> : null}
      {success ? <SuccessText>Успешно</SuccessText> : null}
      {helperText && !error && !success ? (
        <HelperText status={helperStatus}>{helperText}</HelperText>
      ) : null}
      {extraText ? <ExtraText>{extraText}</ExtraText> : null}
    </InputContainer>
  );
};

SliderFieldShell.displayName = 'SliderFieldShell';
