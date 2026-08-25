import React, { type ReactNode } from 'react';
import type { InputLabelVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { resolveInputLabelVariant } from '../../../../handlers/inputFieldCaptionHandlers';
import { AdditionalLabel, Label, RequiredIndicator } from './InputStyles';
import {
  FloatingCaptionRow,
  FloatingLeftLabel,
  FloatingRightLabel,
} from './InputFieldCaption.style';

/**
 * @param label - основной лейбл поля
 * @param additionalLabel - дополнительная подпись (как у Input: под лейблом в режиме `field`)
 * @param labelVariant - `field` (по умолчанию) или `floating`
 * @param htmlFor - id контрола для `label` в режиме `field`
 * @param required - индикатор обязательности в режиме `field`
 * @param focused - состояние фокуса для `floating`
 * @param disabled - disabled для `floating`
 * @param error - ошибка для `floating`
 * @param size - размер для `floating`
 */
export type InputFieldCaptionProps = {
  label?: ReactNode;
  additionalLabel?: string;
  labelVariant?: InputLabelVariant;
  htmlFor?: string;
  required?: boolean;
  focused?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: Size;
};

/**
 * Подпись поля: по умолчанию как у Input / Select; `floating` — прежний absolute-ряд.
 */
export const InputFieldCaption = ({
  label,
  additionalLabel,
  labelVariant,
  htmlFor,
  required = false,
  focused = false,
  disabled = false,
  error = false,
  size,
}: InputFieldCaptionProps) => {
  if (!label && !additionalLabel) {
    return null;
  }

  if (resolveInputLabelVariant(labelVariant) === 'floating') {
    return (
      <FloatingCaptionRow data-input-label-variant="floating">
        {label ? (
          <FloatingLeftLabel focused={focused} disabled={disabled} error={error} size={size}>
            {label}
          </FloatingLeftLabel>
        ) : null}
        {additionalLabel ? (
          <FloatingRightLabel focused={focused} disabled={disabled} error={error} size={size}>
            {additionalLabel}
          </FloatingRightLabel>
        ) : null}
      </FloatingCaptionRow>
    );
  }

  return (
    <>
      {label ? (
        <Label htmlFor={htmlFor} as={htmlFor ? 'label' : 'span'}>
          {label}
          {required ? <RequiredIndicator>*</RequiredIndicator> : null}
        </Label>
      ) : null}
      {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}
    </>
  );
};
