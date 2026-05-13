import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';
import { ThemeMode } from '../../../types/theme';
import grey from '../../../variables/colors/grey';
import { neutral } from '../../../variables/colors/neutral';
import { success } from '../../../variables/colors/success';
import { getSwitchThumbTranslateX, type SwitchGeometry } from './handlers';

/**
 * Обёртка колонки: строка переключателя + текст ошибки.
 * @property $fullWidth - Растянуть на ширину родителя.
 */
export const SwitchOuter = styled.span<{ $fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

/**
 * Корневая строка: скрытый input, подпись и трек (порядок задаётся в разметке).
 * @property $fullWidth - На всю ширину flex-контейнера.
 */
export const SwitchRoot = styled.label<{ $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  justify-content: ${({ $fullWidth }) => ($fullWidth ? 'space-between' : 'flex-start')};
  cursor: pointer;
  user-select: none;

  &:has(input:disabled) {
    cursor: not-allowed;
  }
`;

/**
 * Скрытый чекбокс с ролью switch для доступности.
 */
export const SwitchInput = styled.input.attrs({ type: 'checkbox', role: 'switch' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
`;

/**
 * Подпись переключателя.
 * @property $disabled - Состояние disabled.
 */
export const SwitchLabelText = styled.span<{ $disabled?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.43;
  color: ${({ theme, $disabled }) => {
    if ($disabled) {
      return neutral[400];
    }
    return theme.mode === ThemeMode.DARK ? neutral[10] : neutral[800];
  }};
`;

/**
 * Трек (фон) переключателя.
 * @property $checked - Включён.
 * @property $disabled - Отключён.
 * @property $geometry - Размеры из хендлера.
 */
export const SwitchTrack = styled.span<{
  $checked: boolean;
  $disabled?: boolean;
  $geometry: SwitchGeometry;
}>`
  position: relative;
  flex-shrink: 0;
  width: ${({ $geometry }) => $geometry.trackWidth}px;
  height: ${({ $geometry }) => $geometry.trackHeight}px;
  border-radius: 999px;
  transition: ${TransitionHandler()};
  will-change: transform, background-color;
  background: ${({ theme, $checked, $disabled }) => {
    if ($disabled) {
      return theme.mode === ThemeMode.DARK ? grey[700] : grey[200];
    }
    if ($checked) {
      return success[600];
    }
    return theme.mode === ThemeMode.DARK ? grey[600] : grey[300];
  }};

  ${({ $disabled, $checked, theme }) =>
    !$disabled &&
    css`
      &:hover {
        background: ${$checked
          ? success[500]
          : theme.mode === ThemeMode.DARK
            ? grey[500]
            : grey[200]};
      }

      &:active {
      }
      ${buildHoverPressMotionCss({
        hoverSelector: '&:hover',
        activeSelector: '&:active',
        hoverTransform: 'none',
        activeTransform: 'scale(0.98)',
      })}
    `}
`;

/**
 * Бегунок переключателя.
 * @property $checked - Включён (сдвиг вправо для LTR).
 * @property $disabled - Отключён.
 * @property $geometry - Размеры.
 */
export const SwitchThumb = styled.span<{
  $checked: boolean;
  $disabled?: boolean;
  $geometry: SwitchGeometry;
}>`
  position: absolute;
  top: ${({ $geometry }) => $geometry.padding}px;
  left: ${({ $geometry }) => $geometry.padding}px;
  width: ${({ $geometry }) => $geometry.thumbSize}px;
  height: ${({ $geometry }) => $geometry.thumbSize}px;
  border-radius: 50%;
  background: ${({ $disabled, theme }) =>
    $disabled ? (theme.mode === ThemeMode.DARK ? grey[400] : grey[100]) : neutral[10]};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  transition: ${TransitionHandler()};
  will-change: transform;
  transform: ${({ $checked, $geometry }) =>
    `translateX(${getSwitchThumbTranslateX($checked, $geometry)}px)`};

  ${SwitchRoot}:focus-within & {
    box-shadow:
      0 0 0 2px ${success.bg},
      0 1px 2px rgba(0, 0, 0, 0.12);
  }
`;
