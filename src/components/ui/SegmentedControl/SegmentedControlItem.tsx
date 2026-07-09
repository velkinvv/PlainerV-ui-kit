import React, { forwardRef, useId } from 'react';
import { clsx } from 'clsx';
import type { SegmentedControlItemProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { useSegmentedControlContext } from './SegmentedControlContext';
import {
  SegmentedControlItemIconSlot,
  SegmentedControlItemInput,
  SegmentedControlItemLabel,
  SegmentedControlItemSpinner,
  SegmentedControlItemSurface,
} from './SegmentedControl.style';
import {
  getSegmentedControlGeometry,
  getSegmentedInputType,
  isSegmentedValueSelected,
} from './handlers';

/**
 * Сегмент контрола (radio/checkbox + визуальная поверхность).
 *
 * @param props.value - Значение сегмента
 * @param props.checked / defaultChecked - Выбранность (если группа не controlled)
 * @param props.disabled - Блокировка
 * @param props.loading - Спиннер
 * @param props.leftIcon / rightIcon - Иконки
 * @param props.displayAsSquare - Квадратный сегмент
 * @param props.children - Подпись
 * @param props.onChange - Доп. колбэк change
 * @param ref - Ref на native input
 */
export const SegmentedControlItem = forwardRef<HTMLInputElement, SegmentedControlItemProps>(
  (
    {
      value,
      checked: checkedProp,
      defaultChecked,
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      displayAsSquare = false,
      children,
      onChange,
      className,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const groupContext = useSegmentedControlContext();
    const generatedId = useId();
    const inputId = idProp ?? `segmented-control-item-${generatedId}`;

    const selectionMode = groupContext?.selectionMode ?? 'single';
    const appearance = groupContext?.appearance ?? 'outline';
    const size = groupContext?.size ?? Size.MD;
    const geometry = getSegmentedControlGeometry(size);
    const inputType = getSegmentedInputType(selectionMode);

    const isInsideGroup = groupContext != null;
    const checked = isInsideGroup
      ? isSegmentedValueSelected(selectionMode, groupContext.selectedValue, value)
      : checkedProp;
    const isDisabled = disabled || loading;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) {
        return;
      }
      groupContext?.onSegmentChange(value, event.target.checked, event);
      onChange?.(event);
    };

    return (
      <SegmentedControlItemLabel
        className={clsx('ui-segmented-control-item', className)}
        data-disabled={isDisabled || undefined}
        data-checked={checked || undefined}
        $disabled={isDisabled}
        htmlFor={inputId}
        {...rest}
      >
        <SegmentedControlItemInput
          ref={ref}
          id={inputId}
          type={inputType}
          name={groupContext?.name}
          value={value}
          checked={isInsideGroup || checkedProp !== undefined ? checked : undefined}
          defaultChecked={
            isInsideGroup || checkedProp !== undefined ? undefined : defaultChecked
          }
          disabled={isDisabled}
          onChange={handleChange}
        />
        <SegmentedControlItemSurface
          className="ui-segmented-control-item__surface"
          $geometry={geometry}
          $appearance={appearance}
          $checked={Boolean(checked)}
          $disabled={isDisabled}
          $displayAsSquare={displayAsSquare}
        >
          {loading ? (
            <SegmentedControlItemSpinner aria-hidden />
          ) : (
            <>
              {leftIcon ? (
                <SegmentedControlItemIconSlot aria-hidden>{leftIcon}</SegmentedControlItemIconSlot>
              ) : null}
              {!displayAsSquare && children != null ? <span>{children}</span> : null}
              {rightIcon ? (
                <SegmentedControlItemIconSlot aria-hidden>{rightIcon}</SegmentedControlItemIconSlot>
              ) : null}
            </>
          )}
        </SegmentedControlItemSurface>
      </SegmentedControlItemLabel>
    );
  },
);

SegmentedControlItem.displayName = 'SegmentedControl.Item';
