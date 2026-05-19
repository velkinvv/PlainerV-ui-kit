import { forwardRef } from 'react';
import type { SliderInputProps, SliderInputRangeProps, SliderInputSingleProps } from '../../../../types/ui';
import { SliderInputRange } from './SliderInputRange';
import { SliderInputSingle } from './SliderInputSingle';

/**
 * Слайдер с числовым полем в оболочке `Input`.
 * `range={false}` (по умолчанию) — одно значение; `range={true}` — диапазон «от / до» (как `DateInput` с `range`).
 */
export const SliderInput = forwardRef<HTMLInputElement, SliderInputProps>((props, ref) => {
  if (props.range) {
    return <SliderInputRange ref={ref} {...(props as SliderInputRangeProps)} />;
  }
  return <SliderInputSingle ref={ref} {...(props as SliderInputSingleProps)} />;
});

SliderInput.displayName = 'SliderInput';
