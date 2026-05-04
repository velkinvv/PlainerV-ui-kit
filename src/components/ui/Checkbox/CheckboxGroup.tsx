import React, { useId } from 'react';
import { clsx } from 'clsx';
import type { CheckboxGroupProps } from '../../../types/ui';
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

/**
 * Группа чекбоксов с общими подписью и подсказками как у полей ввода (`label` / `additionalLabel`).
 * Дочерние чекбоксы рекомендуется связывать по смыслу через `fieldset` уже внутри `role="group"`.
 *
 * @param props.label - заголовок над группой
 * @param props.additionalLabel — вторая строка под заголовком
 * @param props.required — показать звезду обязательности рядом с заголовком
 * @param props.fullWidth — растянуть на ширину контейнера
 * @param props.helperText — текст под блоком группы
 * @param props.error — ошибка группы
 * @param props.success — успешное состояние («Успешно»), как у Input
 * @param props.extraText — дополнительный текст под сообщениями, как у Input
 * @param props.children — дочерние `Checkbox`
 * @param props.className — класс контейнера
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  additionalLabel,
  required = false,
  fullWidth = false,
  helperText,
  error,
  success = false,
  extraText,
  children,
  className,
}) => {
  const groupHeadingId = useId();

  return (
    <InputContainer fullWidth={fullWidth} className={clsx('ui-checkbox-group', className)}>
      {label ? (
        <Label id={groupHeadingId}>
          {label}
          {required ? <RequiredIndicator>*</RequiredIndicator> : null}
        </Label>
      ) : null}

      {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

      <div role="group" aria-labelledby={label ? groupHeadingId : undefined}>
        {children}
      </div>

      {error ? <ErrorText>{error}</ErrorText> : null}

      {success ? <SuccessText>Успешно</SuccessText> : null}

      {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}

      {extraText ? <ExtraText>{extraText}</ExtraText> : null}
    </InputContainer>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
