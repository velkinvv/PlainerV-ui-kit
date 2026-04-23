import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { PillProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { PillRoot, PillIndicator, PillText } from './Pill.style';
import { getPillGeometry } from './handlers';

/**
 * Чип «Pill» с индикатором как у радио: состояния из макета Figma (hover, active, selected, disabled).
 * Для группы взаимоисключающих опций оберните в контейнер с `role="radiogroup"` и задайте дочерним кнопкам `role="radio"`, `aria-checked={selected}` (по умолчанию `aria-pressed` дублирует выбор для переключателей).
 *
 * @param props.children - Подпись
 * @param props.selected - Визуально выбранное состояние
 * @param props.size - SM / MD / LG (XS трактуется как MD по геометрии)
 * @param props.disabled - Блокировка
 * @param props.type - По умолчанию `button`
 * @param props.role - При `role="radio"` внутри `radiogroup` выставляется `aria-checked`, иначе для переключателя — `aria-pressed`
 * @param ref - Ref на элемент `button`
 */
export const Pill = forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      children,
      selected = false,
      size = Size.MD,
      disabled = false,
      className,
      type = 'button',
      role,
      ...rest
    },
    ref,
  ) => {
    const geometry = useMemo(() => getPillGeometry(size), [size]);
    const isRadio = role === 'radio';

    return (
      <PillRoot
        ref={ref}
        type={type}
        disabled={disabled}
        role={role}
        aria-pressed={isRadio ? undefined : selected}
        aria-checked={isRadio ? selected : undefined}
        $g={geometry}
        $selected={selected}
        className={clsx('ui-pill', className)}
        {...rest}
      >
        <PillIndicator $g={geometry} $selected={selected} $disabled={disabled} aria-hidden />
        <PillText>{children}</PillText>
      </PillRoot>
    );
  },
);

Pill.displayName = 'Pill';
