import styled, { css } from 'styled-components';
import { Size } from '@/types/sizes';

/**
 * Корневой контейнер Rating.
 * @param $size — размер из темы
 * @param $disabled — muted-состояние
 */
export const RatingRoot = styled.div<{ $size: Size; $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme, $size }) => theme.ratings.sizes[$size].gap};
  opacity: ${({ $disabled, theme }) => ($disabled ? theme.ratings.colors.disabled === theme.ratings.colors.empty ? 0.55 : 0.55 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

/**
 * Числовая подпись рядом с рейтингом.
 */
export const RatingValueLabel = styled.span<{ $size: Size }>`
  font-family: Montserrat, sans-serif;
  font-size: ${({ $size }) =>
    $size === Size.XS || $size === Size.SM ? '12px' : $size === Size.LG || $size === Size.XL ? '16px' : '14px'};
  font-weight: 500;
  color: ${({ theme }) => theme.ratings.colors.label};
  min-width: 1.5em;
`;

/**
 * Список иконок / лиц / точек.
 */
export const RatingItemsList = styled.div<{ $size: Size }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme, $size }) => theme.ratings.sizes[$size].gap};
`;

/**
 * Скрытый radio для a11y.
 */
export const RatingVisuallyHiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/**
 * Кнопка-слот иконки рейтинга.
 * @param $size — размер
 * @param $interactive — можно кликать
 */
export const RatingIconButton = styled.span<{ $size: Size; $interactive: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme, $size }) => theme.ratings.sizes[$size].iconSize};
  height: ${({ theme, $size }) => theme.ratings.sizes[$size].iconSize};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.ratings.colors.empty};

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

/**
 * Слой иконки (empty или filled clip).
 * @param $fillPercent — ширина заливки 0–100
 * @param $color — цвет слоя
 * @param $clipped — обрезать по ширине fill
 */
export const RatingIconLayer = styled.span<{
  $fillPercent: number;
  $color: string;
  $clipped?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  line-height: 0;

  ${({ $clipped, $fillPercent }) =>
    $clipped
      ? css`
          position: absolute;
          inset: 0;
          overflow: hidden;
          width: ${$fillPercent}%;
          justify-content: flex-start;

          > * {
            flex-shrink: 0;
          }
        `
      : ''}
`;

/**
 * Трек бара.
 * @param $size — размер
 * @param $interactive — кликабельность
 */
export const RatingBarTrack = styled.div<{ $size: Size; $interactive: boolean }>`
  position: relative;
  width: ${({ theme, $size }) => theme.ratings.sizes[$size].barWidth};
  height: ${({ theme, $size }) => theme.ratings.sizes[$size].barHeight};
  border-radius: 999px;
  background: ${({ theme }) => theme.ratings.colors.track};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/**
 * Заливка бара.
 * @param $fillPercent — процент ширины
 * @param $fillColor — цвет
 */
export const RatingBarFill = styled.div<{ $fillPercent: number; $fillColor: string }>`
  height: 100%;
  width: ${({ $fillPercent }) => `${$fillPercent}%`};
  background: ${({ $fillColor }) => $fillColor};
  border-radius: inherit;
  transition: width 0.15s ease, background-color 0.2s ease;
`;

/**
 * Кнопка лица.
 * @param $size — размер
 * @param $active — выбрано / в диапазоне
 * @param $muted — приглушено
 * @param $interactive — клик
 * @param $activeColor — цвет активного
 */
export const RatingFaceButton = styled.label<{
  $size: Size;
  $active: boolean;
  $muted: boolean;
  $interactive: boolean;
  $activeColor: string;
  $emptyColor: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme, $size }) => theme.ratings.sizes[$size].iconSize};
  height: ${({ theme, $size }) => theme.ratings.sizes[$size].iconSize};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  color: ${({ $active, $muted, $activeColor, $emptyColor }) =>
    $muted ? $emptyColor : $active ? $activeColor : $emptyColor};
  opacity: ${({ $muted }) => ($muted ? 0.35 : 1)};
  transition: color 0.15s ease, opacity 0.15s ease, transform 0.15s ease;
  transform: ${({ $active, $muted }) => ($active && !$muted ? 'scale(1.08)' : 'scale(1)')};

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

/**
 * Точка рейтинга.
 * @param $size — размер
 * @param $active — активна
 * @param $color — цвет активной
 * @param $emptyColor — цвет неактивной
 * @param $interactive — клик
 */
export const RatingDot = styled.label<{
  $size: Size;
  $active: boolean;
  $color: string;
  $emptyColor: string;
  $interactive: boolean;
}>`
  display: inline-block;
  width: ${({ theme, $size }) => theme.ratings.sizes[$size].dotSize};
  height: ${({ theme, $size }) => theme.ratings.sizes[$size].dotSize};
  border-radius: 50%;
  background: ${({ $active, $color, $emptyColor }) => ($active ? $color : $emptyColor)};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition: background-color 0.15s ease, transform 0.15s ease;
  transform: ${({ $active }) => ($active ? 'scale(1.1)' : 'scale(1)')};

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
