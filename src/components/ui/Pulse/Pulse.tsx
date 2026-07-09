import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import type { PulseProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { PulseRoot } from './Pulse.style';
import { getPulseGeometry, resolvePulseColor } from './handlers';

/**
 * Статусная точка с расходящейся волной.
 *
 * @param props.size - SM / MD / LG
 * @param props.status - info | danger | success | warning
 * @param props.customColors - Кастомный цвет (`background` перекрывает status)
 * @param props.className - Доп. класс
 * @param ref - Ref на корневой `span`
 */
export const Pulse = forwardRef<HTMLSpanElement, PulseProps>(
  (
    {
      size = Size.MD,
      status = 'info',
      customColors,
      className,
      'aria-hidden': ariaHidden = true,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const geometry = useMemo(() => getPulseGeometry(size), [size]);
    const color = useMemo(
      () => resolvePulseColor(theme, status, customColors),
      [customColors, status, theme],
    );

    return (
      <PulseRoot
        ref={ref}
        className={clsx('ui-pulse', className)}
        data-status={status}
        data-size={size}
        aria-hidden={ariaHidden}
        $geometry={geometry}
        $color={color}
        {...rest}
      />
    );
  },
);

Pulse.displayName = 'Pulse';
