import React, { forwardRef, useCallback, useMemo } from 'react';
import { clsx } from 'clsx';
import type { PillProps, PillStatus } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { PillRoot, PillIndicator, PillLoadingIndicator, PillText } from './Pill.style';
import { PillSkeletonRoot } from './PillSkeleton.style';
import {
  getPillGeometry,
  getPillSkeletonDefaultWidthPx,
  getPillSkeletonMinHeightPx,
} from './handlers';

/**
 * Чип «Pill» с индикатором как у радио: состояния из макета Figma (hover, active, selected, disabled),
 * семантические статусы, загрузка и скелетон.
 *
 * @param props.children - Подпись (при `skeleton` не отображается, но нужна для типизации сторис)
 * @param props.selected - Визуально выбранное состояние
 * @param props.size - SM / MD / LG (XS трактуется как MD по геометрии)
 * @param props.disabled - Блокировка
 * @param props.status - Семантический акцент выбранного состояния (`default` — primary)
 * @param props.loading - Загрузка: клик блокируется, `aria-busy`, спиннер вместо точки
 * @param props.skeleton - Шиммер вместо кнопки (`span`, `aria-busy`)
 * @param props.skeletonWidth - Ширина скелетона в px
 * @param props.type - По умолчанию `button`
 * @param props.role - При `role="radio"` внутри `radiogroup` выставляется `aria-checked`, иначе для переключателя — `aria-pressed`
 * @param props.onChange - Колбэк нового `selected` по клику (см. `PillProps`)
 * @param ref - Ref на `button` или на `span` при `skeleton`
 */
export const Pill = forwardRef<HTMLElement, PillProps>(
  (
    {
      children,
      selected = false,
      size = Size.MD,
      disabled = false,
      status = 'default',
      loading = false,
      skeleton = false,
      skeletonWidth,
      onChange,
      onClick,
      className,
      type = 'button',
      role,
      ...rest
    },
    ref,
  ) => {
    const geometry = useMemo(() => getPillGeometry(size), [size]);
    const isRadio = role === 'radio';
    const resolvedStatus: PillStatus = status ?? 'default';
    const isInteractionBlocked = disabled || loading;

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isInteractionBlocked) {
          return;
        }
        const nextSelected = isRadio ? true : !selected;
        onChange?.(nextSelected, event);
        onClick?.(event);
      },
      [isInteractionBlocked, isRadio, onChange, onClick, selected],
    );

    if (skeleton) {
      const widthPx = skeletonWidth ?? getPillSkeletonDefaultWidthPx(size);
      const minHeightPx = getPillSkeletonMinHeightPx(size);

      return (
        <PillSkeletonRoot
          ref={ref as React.Ref<HTMLSpanElement>}
          className={clsx('ui-pill', 'ui-pill--skeleton', className)}
          aria-busy="true"
          $borderRadius={geometry.borderRadius}
          $minHeightPx={minHeightPx}
          $widthPx={widthPx}
          data-status={resolvedStatus}
          {...rest}
        />
      );
    }

    return (
      <PillRoot
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isInteractionBlocked}
        role={role}
        aria-pressed={isRadio ? undefined : selected}
        aria-checked={isRadio ? selected : undefined}
        aria-busy={loading ? true : undefined}
        $g={geometry}
        $selected={selected}
        $status={resolvedStatus}
        data-status={resolvedStatus}
        className={clsx('ui-pill', className)}
        onClick={handleClick}
        {...rest}
      >
        {loading ? (
          <PillLoadingIndicator $g={geometry} $status={resolvedStatus} aria-hidden />
        ) : (
          <PillIndicator
            $g={geometry}
            $selected={selected}
            $disabled={disabled}
            $status={resolvedStatus}
            aria-hidden
          />
        )}
        <PillText>{children}</PillText>
      </PillRoot>
    );
  },
);

Pill.displayName = 'Pill';
