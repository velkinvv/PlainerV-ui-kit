import React, { useMemo } from 'react';
import type { SkeletonProps } from '../../../types/ui';
import { SkeletonVariant, SkeletonGroupDirection } from '../../../types/ui';
import { SkeletonGroup, SkeletonWrapper } from './Skeleton.style';

/**
 * Преобразует значение размера в CSS-строку
 */
const getSizeValue = (value?: number | string, fallback?: string): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  if (typeof value === 'string') {
    return value;
  }
  return fallback || '';
};

/**
 * Получает предустановленные размеры для вариантов
 */
const getVariantDimensions = (
  variant?: SkeletonVariant | 'text' | 'avatar' | 'button' | 'custom',
): { width?: string; height?: string; shape?: 'rect' | 'circle' } => {
  switch (variant) {
    case 'text':
      return { width: '100%', height: '16px', shape: 'rect' };
    case 'avatar':
      return { width: '48px', height: '48px', shape: 'circle' };
    case 'button':
      return { width: '120px', height: '40px', shape: 'rect' };
    default:
      return {};
  }
};

/**
 * Валидирует и нормализует пропсы
 */
const validateProps = (props: SkeletonProps): SkeletonProps => {
  const { count = 1, gap = 8, animationSpeed = 1.5 } = props;

  return {
    ...props,
    count: Math.max(1, Math.floor(count || 1)),
    gap: Math.max(0, gap || 0),
    animationSpeed: Math.max(0.1, Math.min(5, animationSpeed || 1.5)),
  };
};

/**
 * Компонент скелетона для отображения состояния загрузки
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  shape = 'rect',
  animated = true,
  animationSpeed = 1.5,
  count = 1,
  inline = false,
  gap = 8,
  direction = SkeletonGroupDirection.COLUMN,
  variant,
  borderRadius,
  ariaLabel,
  className,
  style,
}) => {
  // Валидация и нормализация пропсов
  const validatedProps = useMemo(
    () =>
      validateProps({
        count,
        gap,
        animationSpeed,
      }),
    [count, gap, animationSpeed],
  );

  // Получаем размеры из варианта, если указан
  const variantDims = useMemo(() => getVariantDimensions(variant), [variant]);

  // Вычисляем финальные размеры
  const finalWidth = useMemo(
    () => getSizeValue(width || variantDims.width, variant ? undefined : '100%'),
    [width, variantDims.width, variant],
  );

  const finalHeight = useMemo(
    () => getSizeValue(height || variantDims.height, variant ? undefined : '16px'),
    [height, variantDims.height, variant],
  );

  const finalShape = useMemo(() => variantDims.shape || shape, [variantDims.shape, shape]);

  // Вычисляем border-radius
  const finalBorderRadius = useMemo(() => {
    if (borderRadius !== undefined) {
      return getSizeValue(borderRadius);
    }
    return finalShape === 'circle' ? '999px' : '12px';
  }, [borderRadius, finalShape]);

  // ARIA-атрибуты для доступности
  const ariaAttributes = useMemo(
    () => ({
      role: 'status',
      'aria-label': ariaLabel || 'Загрузка контента',
      'aria-busy': animated ? 'true' : 'false',
    }),
    [ariaLabel, animated],
  );

  // Рендерим один элемент
  if (validatedProps.count <= 1) {
    return (
      <SkeletonWrapper
        className={className}
        style={style}
        $width={finalWidth}
        $height={finalHeight}
        $shape={finalShape}
        $animated={animated}
        $animationSpeed={validatedProps.animationSpeed}
        $borderRadius={finalBorderRadius}
        $inline={inline}
        {...ariaAttributes}
      />
    );
  }

  // Рендерим группу элементов
  const items = useMemo(
    () =>
      Array.from({ length: validatedProps.count }, (_, index) => (
        <SkeletonWrapper
          key={`skeleton-${index}`}
          $width={finalWidth}
          $height={finalHeight}
          $shape={finalShape}
          $animated={animated}
          $animationSpeed={validatedProps.animationSpeed}
          $borderRadius={finalBorderRadius}
          $inline={inline}
        />
      )),
    [
      validatedProps.count,
      finalWidth,
      finalHeight,
      finalShape,
      animated,
      validatedProps.animationSpeed,
      finalBorderRadius,
      inline,
    ],
  );

  return (
    <SkeletonGroup
      className={className}
      style={style}
      $gap={validatedProps.gap}
      $direction={direction}
      {...ariaAttributes}
    >
      {items}
    </SkeletonGroup>
  );
};

Skeleton.displayName = 'Skeleton';
