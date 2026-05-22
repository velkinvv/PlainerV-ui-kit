import React, { type ComponentProps } from 'react';
import type { InputVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { InputWrapper } from '../shared';
import { InputCompositeAddon, InputCompositeFieldSegment } from './InputComposite.style';
import {
  hasInputCompositeAddons,
  prepareInputCompositeAddon,
} from './inputCompositeHandlers';

type InputWrapperPublicProps = ComponentProps<typeof InputWrapper>;

/**
 * Пропсы оболочки поля ввода: обычная рамка или составное поле (prefix/suffix).
 * @property borderShell - Компонент рамки вместо `InputWrapper` (например `TextAreaWrapper` для многострочного поля).
 * @property compositeMiddleAlign - Выравнивание содержимого среднего сегмента в составном режиме.
 */
export type InputFieldShellProps = {
  variant?: InputVariant;
  size?: Size;
  error?: string;
  success?: boolean;
  status?: 'error' | 'success' | 'warning';
  fullWidth?: boolean;
  focused?: boolean;
  readOnly?: boolean;
  className?: string;
  /** Addon слева от `<input>` (например Select или текст). */
  prefix?: React.ReactNode;
  /** Addon справа от `<input>` (например Select). */
  suffix?: React.ReactNode;
  disabled?: boolean;
  borderShell?: React.ComponentType<InputWrapperPublicProps>;
  compositeMiddleAlign?: 'center' | 'flex-start';
  children: React.ReactNode;
};

/**
 * Единая оболочка Input: `InputWrapper` или составной режим с разделителями между сегментами.
 * @param props - Пропсы оболочки и содержимое сегмента ввода (иконки, input, clear).
 */
export const InputFieldShell: React.FC<InputFieldShellProps> = ({
  variant,
  size = Size.SM,
  error,
  success,
  status,
  fullWidth,
  focused,
  readOnly,
  className,
  prefix,
  suffix,
  disabled,
  borderShell: BorderShellComponent,
  compositeMiddleAlign = 'center',
  children,
}) => {
  const isComposite = hasInputCompositeAddons(prefix, suffix);
  const BorderShell = BorderShellComponent ?? InputWrapper;

  const preparedPrefix = prepareInputCompositeAddon(prefix, {
    fieldSize: size,
    fieldDisabled: disabled,
  });
  const preparedSuffix = prepareInputCompositeAddon(suffix, {
    fieldSize: size,
    fieldDisabled: disabled,
  });

  const middleVerticalAlign = compositeMiddleAlign;

  if (!isComposite) {
    return (
      <BorderShell
        variant={variant}
        size={size}
        error={error}
        success={success}
        status={status}
        fullWidth={fullWidth}
        focused={focused}
        readOnly={readOnly}
        className={className}
      >
        {children}
      </BorderShell>
    );
  }

  return (
    <BorderShell
      variant={variant}
      size={size}
      error={error}
      success={success}
      status={status}
      fullWidth={fullWidth}
      focused={focused}
      readOnly={readOnly}
      className={className}
      $compositeMode
    >
      {preparedPrefix ? (
        <InputCompositeAddon $position="prefix" size={size}>
          {preparedPrefix}
        </InputCompositeAddon>
      ) : null}

      <InputCompositeFieldSegment size={size} $verticalAlign={middleVerticalAlign}>
        {children}
      </InputCompositeFieldSegment>

      {preparedSuffix ? (
        <InputCompositeAddon $position="suffix" size={size}>
          {preparedSuffix}
        </InputCompositeAddon>
      ) : null}
    </BorderShell>
  );
};
