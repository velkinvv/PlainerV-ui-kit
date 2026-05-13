import React, { forwardRef, useMemo } from 'react';
import {
  SpinnerContainer,
  SpinnerWrapper,
  SpinnerLabel,
  SpinnerDots,
  SpinnerBars,
} from './Spinner.style';
import { clsx } from 'clsx';
import type { SpinnerProps } from '../../../types/ui';
import { SpinnerVariant } from '../../../types/ui';

/** Нормализованные числовые параметры анимации спиннера */
interface SpinnerMotionProps {
  speed: number;
  thickness: number;
}

/**
 * Валидирует скорость и толщину линии спиннера
 * @param props — частичные пропсы со `speed` и `thickness`
 */
const validateMotionProps = (
  props: Pick<SpinnerProps, 'speed' | 'thickness'>,
): SpinnerMotionProps => {
  const speed = props.speed ?? 1;
  const thickness = props.thickness ?? 2;

  return {
    speed: Math.max(0.1, Math.min(5, speed)),
    thickness: Math.max(1, Math.min(10, thickness)),
  };
};

/**
 * Компонент спиннера для отображения состояния загрузки
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size,
      color = '#68d5f8',
      variant = SpinnerVariant.CIRCLE,
      speed = 1,
      thickness = 2,
      label,
      labelPosition = 'bottom',
      centered = false,
      ariaLabel,
      className,
      style,
    },
    ref,
  ) => {
    // Валидация и нормализация пропсов
    const validatedProps = useMemo(
      () =>
        validateMotionProps({
          speed,
          thickness,
        }),
      [speed, thickness],
    );

    // ARIA-атрибуты: `aria-label` только строка (`label` может быть `ReactNode`)
    const ariaAttributes = useMemo(() => {
      const labelForAria =
        typeof label === 'string' || typeof label === 'number' ? String(label) : undefined;
      return {
        role: 'status' as const,
        'aria-label': ariaLabel ?? labelForAria ?? 'Загрузка',
        'aria-busy': true as const,
      };
    }, [ariaLabel, label]);

    // Рендерим спиннер в зависимости от варианта
    const renderSpinner = () => {
      switch (variant) {
        case SpinnerVariant.DOTS:
          return (
            <SpinnerDots
              $size={size}
              $color={color}
              $speed={validatedProps.speed}
              $thickness={validatedProps.thickness}
              className={clsx('ui-spinner', className)}
              style={style}
              {...ariaAttributes}
              ref={ref}
            >
              <span />
              <span />
              <span />
            </SpinnerDots>
          );

        case SpinnerVariant.BARS:
          return (
            <SpinnerBars
              $size={size}
              $color={color}
              $speed={validatedProps.speed}
              $thickness={validatedProps.thickness}
              className={clsx('ui-spinner', className)}
              style={style}
              {...ariaAttributes}
              ref={ref}
            >
              <span />
              <span />
              <span />
            </SpinnerBars>
          );

        default:
          return (
            <SpinnerContainer
              $variant={variant}
              $size={size}
              $color={color}
              $speed={validatedProps.speed}
              $thickness={validatedProps.thickness}
              className={clsx('ui-spinner', className)}
              style={style}
              {...ariaAttributes}
              ref={
                variant === SpinnerVariant.CIRCLE || variant === SpinnerVariant.PULSE
                  ? ref
                  : undefined
              }
            />
          );
      }
    };

    const spinner = renderSpinner();

    // Если есть label, оборачиваем в контейнер
    if (label) {
      return (
        <SpinnerWrapper
          $centered={centered}
          $labelPosition={labelPosition}
          className={clsx('ui-spinner-wrapper', className)}
        >
          {labelPosition === 'top' && (
            <SpinnerLabel $position={labelPosition}>{label}</SpinnerLabel>
          )}
          {labelPosition === 'left' && (
            <SpinnerLabel $position={labelPosition}>{label}</SpinnerLabel>
          )}
          {spinner}
          {labelPosition === 'right' && (
            <SpinnerLabel $position={labelPosition}>{label}</SpinnerLabel>
          )}
          {labelPosition === 'bottom' && (
            <SpinnerLabel $position={labelPosition}>{label}</SpinnerLabel>
          )}
        </SpinnerWrapper>
      );
    }

    // Если нужно центрировать, оборачиваем в контейнер
    if (centered) {
      return (
        <SpinnerWrapper $centered={centered} className={clsx('ui-spinner-wrapper', className)}>
          {spinner}
        </SpinnerWrapper>
      );
    }

    return spinner;
  },
);

Spinner.displayName = 'Spinner';
