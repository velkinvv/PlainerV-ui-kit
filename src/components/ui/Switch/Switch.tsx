import React, { forwardRef, useCallback, useId, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { SwitchProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { ErrorText } from '../inputs/shared';
import { getSwitchGeometry } from './handlers';
import {
  SwitchInput,
  SwitchLabelText,
  SwitchOuter,
  SwitchRoot,
  SwitchThumb,
  SwitchTrack,
} from './Switch.style';

/**
 * Переключатель (Switch): трек с бегунком, подпись, состояния disabled и ошибки.
 * @param props - Пропсы `SwitchProps`.
 * @param ref - Ref на скрытый `input` (для форм и фокуса).
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      label,
      labelPosition = 'left',
      disabled = false,
      size = Size.MD,
      error,
      fullWidth = false,
      className,
      id: idProp,
      name,
      ...rest
    },
    ref,
  ) => {
    const reactId = useId();
    const inputId = idProp ?? `switch-${reactId}`;
    const geometry = useMemo(() => getSwitchGeometry(size), [size]);
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(() => Boolean(defaultChecked));
    const isOn = isControlled ? Boolean(checked) : internalChecked;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalChecked(e.target.checked);
        }
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    const labelNode =
      label != null && label !== false ? (
        <SwitchLabelText as="span" $disabled={disabled}>
          {label}
        </SwitchLabelText>
      ) : null;

    const trackNode = (
      <SwitchTrack as="span" aria-hidden $checked={isOn} $disabled={disabled} $geometry={geometry}>
        <SwitchThumb as="span" $checked={isOn} $disabled={disabled} $geometry={geometry} />
      </SwitchTrack>
    );

    const inputNode = (
      <SwitchInput
        ref={ref}
        id={inputId}
        name={name}
        disabled={disabled}
        checked={isControlled ? Boolean(checked) : internalChecked}
        onChange={handleChange}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
    );

    return (
      <SwitchOuter $fullWidth={fullWidth} className="ui-switch-outer">
        <SwitchRoot
          htmlFor={inputId}
          $fullWidth={fullWidth}
          className={clsx('ui-switch', className)}
        >
          {inputNode}
          {labelPosition === 'left' ? labelNode : null}
          {trackNode}
          {labelPosition === 'right' ? labelNode : null}
        </SwitchRoot>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </SwitchOuter>
    );
  },
);

Switch.displayName = 'Switch';
