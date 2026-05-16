import styled, { type DefaultTheme } from 'styled-components';
import type { ProgressProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';

/**
 * Осветляет цвет для создания градиента
 * @param color - hex цвет (например, '#93E850' или 'rgba(148, 232, 80, 1)')
 * @param amount - количество осветления (0-1)
 * @returns осветленный цвет в формате rgba
 */
const lightenColor = (color: string, amount: number): string => {
  let r = 0;
  let g = 0;
  let b = 0;

  // Проверяем формат цвета
  if (color.startsWith('#')) {
    // Hex формат
    const hex = color.replace('#', '');
    if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else if (hex.length === 3) {
      // Короткий формат #RGB
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    }
  } else if (color.startsWith('rgba') || color.startsWith('rgb')) {
    // RGB/RGBA формат
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      r = parseInt(matches[0], 10);
      g = parseInt(matches[1], 10);
      b = parseInt(matches[2], 10);
    }
  } else {
    // Если цвет не распознан, возвращаем белый
    return 'rgba(255, 255, 255, 1)';
  }

  // Осветляем цвет, смешивая с белым
  const lightenR = Math.min(255, Math.round(r + (255 - r) * amount));
  const lightenG = Math.min(255, Math.round(g + (255 - g) * amount));
  const lightenB = Math.min(255, Math.round(b + (255 - b) * amount));

  return `rgba(${lightenR}, ${lightenG}, ${lightenB}, 1)`;
};

/**
 * Получить высоту прогресс-бара в зависимости от размера из темы
 * @param size - размер прогресс-бара
 * @param theme - тема приложения
 * @returns высота в пикселях
 */
const getProgressHeight = (size: Size | undefined, theme: DefaultTheme): string => {
  const sizeKey = size ?? Size.MD;
  return theme.progress.linearSizes[sizeKey].height;
};

/**
 * Получить размер кругового прогресса в зависимости от размера из темы
 * @param size - размер прогресс-бара
 * @param theme - тема приложения
 * @returns размер в пикселях
 */
export const getCircleSize = (size: Size | undefined, theme: DefaultTheme): number => {
  const sizeKey = size ?? Size.MD;
  return theme.progress.circularSizes[sizeKey].size;
};

/**
 * Получить толщину штриха кругового прогресса в зависимости от размера из темы
 * @param size - размер прогресс-бара
 * @param theme - тема приложения
 * @returns толщина в пикселях
 */
export const getCircleThickness = (size: Size | undefined, theme: DefaultTheme): number => {
  const sizeKey = size ?? Size.MD;
  return theme.progress.circularSizes[sizeKey].thickness;
};

export const ProgressRoot = styled.div<{ $variant?: string }>`
  display: flex;
  flex-direction: ${({ $variant }) => ($variant === 'linear' ? 'column' : 'row')};
  align-items: ${({ $variant }) => ($variant === 'linear' ? 'stretch' : 'center')};
  gap: ${({ theme, $variant }) =>
    $variant === 'linear'
      ? theme.progress.spacing.root.linear
      : theme.progress.spacing.root.circular};
  width: 100%;
`;

export const LinearContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.progress.spacing.container};
  width: 100%;
`;

export const ProgressLabel = styled.div<{ $statusColor?: string; $animated?: boolean }>`
  font-size: ${({ theme }) => theme.progress.typography.label.fontSize};
  font-weight: ${({ theme }) => theme.progress.typography.label.fontWeight};
  color: ${({ theme, $statusColor }) => $statusColor ?? theme.colors.text};
  text-align: left;
  line-height: ${({ theme }) => theme.progress.typography.label.lineHeight};
  ${({ $animated }) =>
    $animated &&
    `
    animation: fadeIn 0.3s ease-in;
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
`;

export const ProgressRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.progress.spacing.row};
  width: 100%;
`;

export const ProgressLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProgressValue = styled.span<{
  $variant?: string;
  $statusColor?: string;
  $animated?: boolean;
}>`
  font-size: ${({ theme, $variant }) =>
    $variant === 'linear'
      ? theme.progress.typography.value.linear.fontSize
      : theme.progress.typography.value.circular.fontSize};
  font-weight: ${({ theme, $variant }) =>
    $variant === 'linear'
      ? theme.progress.typography.value.linear.fontWeight
      : theme.progress.typography.value.circular.fontWeight};
  font-family: ${({ theme, $variant }) =>
    $variant === 'linear' ? theme.progress.typography.value.linear.fontFamily : 'inherit'};
  color: ${({ theme, $variant, $statusColor }) => {
    if ($statusColor) return $statusColor;
    return $variant === 'linear' ? theme.progress.colors.value : theme.colors.textSecondary;
  }};
  text-align: right;
  line-height: 1em;
  white-space: nowrap;
  ${({ $animated }) =>
    $animated &&
    `
    animation: fadeIn 0.3s ease-in;
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateX(-4px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}
`;

export const LinearTrack = styled.div<Pick<ProgressProps, 'size'> & { $trackColor?: string }>`
  flex: 1 1 200px;
  min-width: ${({ theme }) => theme.progress.settings.minWidth};
  max-width: 100%;
  height: ${({ theme, size }) => getProgressHeight(size, theme)};
  background: ${({ theme, $trackColor }) => $trackColor ?? theme.progress.colors.track};
  border-radius: ${({ theme, size }) => {
    const sizeKey = size ?? Size.MD;
    return theme.progress.linearSizes[sizeKey].borderRadius;
  }};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.progress.settings.trackShadow.dark
      : theme.progress.settings.trackShadow.light};
`;

export const LinearFill = styled.div<{
  $progress: number;
  $color?: string;
  $animated?: boolean;
  $animationDuration?: number;
  $indeterminate?: boolean;
  $loading?: boolean;
  $gradient?: boolean;
  $size?: Size;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress, $indeterminate }) => ($indeterminate ? '30%' : `${$progress}%`)};
  background: ${({ theme, $color, $gradient }) => {
    const baseColor = $color ?? theme.progress.colors.fill;
    if ($gradient) {
      // Создаем градиент от основного цвета к более светлому
      const lightenedColor = lightenColor(
        baseColor,
        theme.progress.settings.gradient.lightenAmount,
      );
      // Используем явные проценты для более плавного градиента
      return `linear-gradient(${theme.progress.settings.gradient.direction}, ${baseColor} 0%, ${lightenedColor} 100%)`;
    }
    return baseColor;
  }};
  border-radius: ${({ theme, $size }) => {
    const sizeKey = $size ?? Size.MD;
    return theme.progress.linearSizes[sizeKey].borderRadius;
  }};
  box-shadow: ${({ theme }) => theme.progress.settings.fillShadow};
  transition: ${({ theme, $animated, $animationDuration, $indeterminate, $loading, $gradient }) => {
    // Не применяем transition для indeterminate и loading (они используют animation)
    if ($indeterminate || $loading) return 'none';
    // Если animated явно false, не применяем transition
    if ($animated === false) return 'none';
    // По умолчанию animated = true, применяем transition
    const duration = $animationDuration
      ? `${$animationDuration}ms`
      : `${theme.progress.animations.defaultDuration}ms`;
    // Для градиента не применяем transition к background, только к width
    if ($gradient) {
      return `width ${duration} cubic-bezier(0.4, 0, 0.2, 1)`;
    }
    return `width ${duration} cubic-bezier(0.4, 0, 0.2, 1), background-color ${duration} cubic-bezier(0.4, 0, 0.2, 1)`;
  }};
  ${({ $indeterminate }) =>
    $indeterminate &&
    `
    animation: indeterminate 1.5s ease-in-out infinite;
    @keyframes indeterminate {
      0% {
        left: -30%;
      }
      50% {
        left: 100%;
      }
      100% {
        left: 100%;
      }
    }
  `}
  ${({ $loading, $indeterminate }) =>
    $loading &&
    !$indeterminate &&
    `
    animation: loadingPulse 1.5s ease-in-out infinite;
    @keyframes loadingPulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
      }
    }
  `}
  ${({ $gradient, $loading, $indeterminate }) =>
    $gradient &&
    $loading &&
    !$indeterminate &&
    `
    background-size: 200% 100%;
    animation: gradientShimmer 2s linear infinite;
    @keyframes gradientShimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `}
`;

export const CircularWrapper = styled.div<{ $size?: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.progress.spacing.circularWrapper};
  width: ${({ $size }) => ($size ? `${$size}px` : 'auto')};
  height: ${({ $size }) => ($size ? `${$size}px` : 'auto')};
`;

export const CircularSvg = styled.svg`
  transform: rotate(-90deg);
`;

export const CircularTrack = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.progress.colors.track};
  stroke-width: 6;
`;

export const CircularProgressArc = styled.circle<{
  $color?: string;
  $animated?: boolean;
  $animationDuration?: number;
  $indeterminate?: boolean;
  $loading?: boolean;
  $circumference?: number;
  $animationId?: string;
}>`
  fill: none;
  stroke: ${({ theme, $color }) => $color ?? theme.progress.colors.fill};
  stroke-width: 6;
  stroke-linecap: round;
  transition: ${({ theme, $animated, $animationDuration, $indeterminate, $loading }) => {
    if ($indeterminate || $loading) return 'none';
    if ($animated) {
      const duration = $animationDuration
        ? `${$animationDuration}ms`
        : `${theme.progress.animations.defaultDuration}ms`;
      return `stroke-dashoffset ${duration} ease, stroke ${duration} ease`;
    }
    return 'none';
  }};
  ${({ $indeterminate }) =>
    $indeterminate &&
    `
    animation: circularIndeterminate 1.5s linear infinite;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    @keyframes circularIndeterminate {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  `}
  ${({ $loading, $indeterminate, $circumference, $animationId }) =>
    $loading &&
    !$indeterminate &&
    $circumference &&
    $animationId &&
    `
    animation: ${$animationId} 1.5s linear infinite;
    @keyframes ${$animationId} {
      0% {
        stroke-dashoffset: 0;
      }
      100% {
        stroke-dashoffset: -${$circumference}px;
      }
    }
  `}
`;

export const CircularCenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4px;
`;

export const CircularDescription = styled.div`
  font-size: ${({ theme }) => theme.progress.typography.description.fontSize};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: ${({ theme }) => theme.progress.typography.description.lineHeight};
`;

export const CircularRightLabel = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

export const CircularWithRightLabel = styled.div`
  display: flex;
  align-items: center;
`;

// Стили для степпера
export const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.progress.spacing.stepper.container};
  width: 100%;
`;

export const StepperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StepperCurrentStepLabel = styled.div<{ $clickable?: boolean }>`
  font-size: ${({ theme }) => theme.progress.typography.stepper.currentStep.fontSize};
  font-weight: ${({ theme }) => theme.progress.typography.stepper.currentStep.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  `}
`;

export const StepperStepCounter = styled.div`
  font-size: ${({ theme }) => theme.progress.typography.stepper.stepCounter.fontSize};
  font-weight: ${({ theme }) => theme.progress.typography.stepper.stepCounter.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

export const StepperProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const StepperStep = styled.div<{
  $completed: boolean;
  $active: boolean;
  $isNext?: boolean;
  $isFuture?: boolean;
  $size?: Size;
}>`
  flex: 1;
  height: ${({ theme, $size }) => getProgressHeight($size, theme)};
  background: ${({ theme, $completed, $active, $isNext, $isFuture }) => {
    if ($completed || $active) return theme.progress.colors.fill;
    if ($isNext) {
      // Следующий шаг - светло-зеленый (50% прозрачности)
      // Конвертируем hex в rgba для прозрачности
      const hex = theme.progress.colors.fill.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    }
    if ($isFuture) {
      // Будущие шаги - очень светлый (20% прозрачности)
      const hex = theme.progress.colors.fill.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.2)`;
    }
    return theme.progress.colors.track;
  }};
  border-radius: 2px;
  transition: background 0.3s ease;
  position: relative;

  &:first-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  &:last-child {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`;

export const StepperCircularStep = styled.div<{ $completed: boolean; $active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const StepperStepCircle = styled.div<{
  $completed: boolean;
  $active: boolean;
  $size?: Size;
}>`
  width: ${({ $size }: { $size?: Size }) => {
    const sizeMap: Record<Size, string> = {
      [Size.XS]: '24px',
      [Size.SM]: '32px',
      [Size.MD]: '40px',
      [Size.LG]: '48px',
      [Size.XL]: '56px',
    };
    return $size ? sizeMap[$size] : sizeMap[Size.MD];
  }};
  height: ${({ $size }: { $size?: Size }) => {
    const sizeMap: Record<Size, string> = {
      [Size.XS]: '24px',
      [Size.SM]: '32px',
      [Size.MD]: '40px',
      [Size.LG]: '48px',
      [Size.XL]: '56px',
    };
    return $size ? sizeMap[$size] : sizeMap[Size.MD];
  }};
  border-radius: 50%;
  background: ${({ theme, $completed, $active }) => {
    if ($completed) return theme.progress.colors.fill;
    if ($active) return theme.progress.colors.fill;
    return theme.progress.colors.track;
  }};
  border: 2px solid
    ${({ theme, $completed, $active }) => {
      if ($completed || $active) return theme.progress.colors.fill;
      return theme.progress.colors.track;
    }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }: { $size?: Size }) => {
    const sizeMap: Record<Size, string> = {
      [Size.XS]: '10px',
      [Size.SM]: '12px',
      [Size.MD]: '14px',
      [Size.LG]: '16px',
      [Size.XL]: '18px',
    };
    return $size ? sizeMap[$size] : sizeMap[Size.MD];
  }};
  font-weight: 600;
  color: ${({ theme, $completed, $active }) => {
    if ($completed || $active) return '#ffffff';
    return theme.colors.textSecondary;
  }};
  transition: all 0.3s ease;
`;

export const StepperStepLabel = styled.div<{ $active: boolean }>`
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  text-align: center;
  line-height: 1.2;
`;

export const StepperStepDescription = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 1.2;
  margin-top: 0px;
`;

export const StepperConnector = styled.div<{ $completed: boolean; $size?: Size }>`
  width: 8px;
  height: ${({ theme, $size }) => getProgressHeight($size, theme)};
  background: ${({ theme, $completed }) =>
    $completed ? theme.progress.colors.fill : theme.progress.colors.track};
  transition: background 0.3s ease;
  flex-shrink: 0;
`;

export const StepperNextStepInfo = styled.div`
  font-size: ${({ theme }) => theme.progress.typography.stepper.nextStepInfo.fontSize};
  font-weight: ${({ theme }) => theme.progress.typography.stepper.nextStepInfo.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

export const CircularCheckmark = styled.div<{ $size: number; $animated?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.backgroundSecondary || '#ffffff'};
  z-index: 1;

  svg {
    width: ${({ theme, $size }) => `${$size * theme.progress.settings.checkmarkSize}px`};
    height: ${({ theme, $size }) => `${$size * theme.progress.settings.checkmarkSize}px`};
    stroke: currentColor;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  ${({ $animated }) =>
    $animated
      ? `
    animation: checkmarkAppear 0.4s ease-out;
    @keyframes checkmarkAppear {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
      50% {
        transform: translate(-50%, -50%) scale(1.2);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `
      : `
    opacity: 0;
    animation: fadeInCheckmark 0.3s ease-out forwards;
    @keyframes fadeInCheckmark {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `}
`;

export const CircularInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.progress.spacing.circularInfoCard};
  padding: 16px;
  background: ${({ theme }) => theme.colors.backgroundSecondary || '#f5f5f5'};
  border-radius: 8px;
  min-width: 200px;
`;

export const CircularInfoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

export const CircularInfoTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const CircularInfoValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const CircularInfoDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Индикатор загрузки (spinner) для статуса loading
 */
export const LoadingSpinner = styled.div<{ $size?: number; $color?: string }>`
  width: ${({ $size }) => ($size ? `${$size}px` : '20px')};
  height: ${({ $size }) => ($size ? `${$size}px` : '20px')};
  border: 2px solid
    ${({ theme, $color }) => ($color ? `${$color}30` : theme.colors.borderSecondary)};
  border-top: 2px solid ${({ theme, $color }) => $color ?? theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Контейнер для спиннера в линейном варианте
 */
export const LinearLoadingSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;
