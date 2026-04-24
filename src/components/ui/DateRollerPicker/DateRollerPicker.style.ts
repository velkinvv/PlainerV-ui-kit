import styled from 'styled-components';
import { Size } from '../../../types/sizes';

/** Высота одной строки роллера в px */
export const DATE_ROLLER_ITEM_PX = 40;

/** Высота видимой области колонки */
export const DATE_ROLLER_VIEWPORT_PX = 160;

const columnGap = (size: Size | undefined): string => {
  switch (size) {
    case Size.SM:
      return '4px';
    case Size.LG:
      return '10px';
    default:
      return '8px';
  }
};

/**
 * Три колонки роллера в ряд.
 * @property $size — отступы между колонками.
 */
export const DateRollerRoot = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$size',
})<{ $size?: Size }>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: ${({ $size }) => columnGap($size)};
  margin-bottom: 12px;
  width: 100%;
`;

/**
 * Колонка: маска «линза» + прокрутка.
 * @property $size — не используется в v1, зарезервировано под размеры шрифта.
 */
export const DateRollerColumn = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$size',
})<{ $size?: Size }>`
  position: relative;
  flex: 1;
  min-width: 0;
  z-index: 0;
`;

/**
 * Вертикальная прокрутка со snap к центру строки.
 */
export const DateRollerViewport = styled.div`
  position: relative;
  z-index: 1;
  height: ${DATE_ROLLER_VIEWPORT_PX}px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 14%,
    black 86%,
    transparent 100%
  );
`;

/**
 * Строка значения (день / месяц / год).
 * @property $active — выровнено по центру «линзы».
 * @property $disabled — опция недоступна.
 */
export const DateRollerOption = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$active', '$disabled'].includes(prop),
})<{ $active?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${DATE_ROLLER_ITEM_PX}px;
  margin: 0;
  padding: 0 4px;
  border: none;
  background: transparent;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  font: inherit;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  line-height: 1.2;
  color: ${({ theme, $active, $disabled }) => {
    if ($disabled) {
      return theme.colors.textTertiary;
    }
    /* Активная строка — тот же синий акцент, что у выбранного дня в сетке календаря */
    return $active ? theme.colors.info : theme.colors.textSecondary;
  }};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  flex-shrink: 0;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.info};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.info};
    outline-offset: -2px;
  }
`;

/** Центральная подсветка-линза (не кликабельна) */
export const DateRollerLens = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: ${DATE_ROLLER_ITEM_PX}px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.backgroundTertiary}66;
  z-index: 0;
`;
