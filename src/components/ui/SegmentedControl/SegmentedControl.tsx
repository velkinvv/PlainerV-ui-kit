import React, { forwardRef, useCallback, useId, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { SegmentedControlProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { SegmentedControlProvider } from './SegmentedControlContext';
import { SegmentedControlRoot } from './SegmentedControl.style';
import { SegmentedControlItem } from './SegmentedControlItem';
import {
  getNextSegmentedControlValue,
  getSegmentedControlGeometry,
} from './handlers';

type SegmentedControlComponent = React.ForwardRefExoticComponent<
  SegmentedControlProps & React.RefAttributes<HTMLFieldSetElement>
> & {
  Item: typeof SegmentedControlItem;
};

/**
 * Сегментированный контрол: single/multiple выбор, outline/filled, options или Item.
 *
 * @param props.appearance - outline | filled
 * @param props.size - Размер сегментов
 * @param props.selectionMode - single | multiple
 * @param props.value / defaultValue - Controlled / uncontrolled
 * @param props.onChange - Смена значения
 * @param props.name - Имя группы input
 * @param props.options - Data-driven опции
 * @param props.children - Составной API
 * @param props.ariaLabel - Подпись группы
 * @param props.fullWidth - На всю ширину
 * @param ref - Ref на fieldset
 */
const SegmentedControlBase = forwardRef<HTMLFieldSetElement, SegmentedControlProps>(
  (
    {
      appearance = 'outline',
      size = Size.MD,
      selectionMode = 'single',
      value: valueProp,
      defaultValue,
      onChange,
      name: nameProp,
      options,
      children,
      ariaLabel,
      fullWidth = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedName = useId();
    const name = nameProp ?? `segmented-control-${generatedName}`;
    const isValueControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string | string[] | undefined>(
      defaultValue,
    );
    const selectedValue = isValueControlled ? valueProp : uncontrolledValue;
    const geometry = useMemo(() => getSegmentedControlGeometry(size), [size]);

    const onSegmentChange = useCallback(
      (
        segmentValue: string,
        nextChecked: boolean,
        event: React.ChangeEvent<HTMLInputElement>,
      ) => {
        const nextValue = getNextSegmentedControlValue(
          selectionMode,
          selectedValue,
          segmentValue,
          nextChecked,
        );
        if (!isValueControlled) {
          setUncontrolledValue(nextValue);
        }
        onChange?.(nextValue, event);
      },
      [isValueControlled, onChange, selectedValue, selectionMode],
    );

    const contextValue = useMemo(
      () => ({
        appearance,
        size,
        selectionMode,
        name,
        selectedValue,
        isValueControlled,
        onSegmentChange,
      }),
      [
        appearance,
        isValueControlled,
        name,
        onSegmentChange,
        selectedValue,
        selectionMode,
        size,
      ],
    );

    const hasOptions = Boolean(options && options.length > 0);

    return (
      <SegmentedControlProvider value={contextValue}>
        <SegmentedControlRoot
          ref={ref}
          className={clsx('ui-segmented-control', className)}
          aria-label={ariaLabel}
          data-appearance={appearance}
          data-size={size}
          $appearance={appearance}
          $fullWidth={fullWidth}
          $outerRadius={geometry.outerRadius}
          {...rest}
        >
          {hasOptions
            ? options?.map((option) => (
                <SegmentedControlItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  loading={option.loading}
                  leftIcon={option.leftIcon}
                  rightIcon={option.rightIcon}
                  displayAsSquare={option.displayAsSquare}
                >
                  {option.label}
                </SegmentedControlItem>
              ))
            : children}
        </SegmentedControlRoot>
      </SegmentedControlProvider>
    );
  },
);

SegmentedControlBase.displayName = 'SegmentedControl';

export const SegmentedControl = SegmentedControlBase as SegmentedControlComponent;
SegmentedControl.Item = SegmentedControlItem;
