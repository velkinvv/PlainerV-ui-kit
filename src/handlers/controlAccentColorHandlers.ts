import type { DefaultTheme } from 'styled-components';
import type { ControlColor } from '../types/ui';

/** Пресеты `color` у Switch / Checkbox / RadioButton (мапятся на токены темы). */
export const CONTROL_COLOR_PRESETS: readonly ControlColor[] = [
  'primary',
  'success',
  'error',
  'warning',
  'info',
] as const;

/**
 * Цвета активного (checked) акцента контрола.
 * @property checked - Основной цвет (заливка / обводка)
 * @property checkedHover - Hover в активном состоянии
 * @property focusRing - Кольцо фокуса
 */
export type ControlAccentColors = {
  checked: string;
  checkedHover: string;
  focusRing: string;
};

/**
 * Является ли значение пресетом `ControlColor`.
 * @param color - Значение пропа `color`
 */
export const isControlColorPreset = (color?: string): color is ControlColor =>
  Boolean(color && (CONTROL_COLOR_PRESETS as readonly string[]).includes(color));

/**
 * Резолв акцентных цветов по пресету или произвольному CSS-цвету.
 * Без `color` → `success` (историческое поведение Switch / Checkbox / Radio).
 * @param theme - Тема styled-components
 * @param color - Пресет или CSS-цвет (`#hex`, `rgb()`, …)
 */
export const resolveControlAccentColors = (
  theme: DefaultTheme,
  color?: ControlColor | string,
): ControlAccentColors => {
  const themeColors = theme?.colors;
  const resolvedKey = color ?? 'success';

  if (resolvedKey === 'primary') {
    return {
      checked: themeColors?.primary ?? '#1976d2',
      checkedHover: themeColors?.primaryHover ?? themeColors?.primary ?? '#1565c0',
      focusRing: themeColors?.primary ?? '#1976d2',
    };
  }

  if (resolvedKey === 'info') {
    return {
      checked: themeColors?.info ?? themeColors?.primary ?? '#1976d2',
      checkedHover:
        themeColors?.infoHover ?? themeColors?.primaryHover ?? themeColors?.info ?? '#1565c0',
      focusRing: themeColors?.info ?? themeColors?.primary ?? '#1976d2',
    };
  }

  if (resolvedKey === 'success') {
    return {
      checked: themeColors?.success ?? '#2e7d32',
      checkedHover: themeColors?.successHover ?? themeColors?.success ?? '#1b5e20',
      focusRing: themeColors?.success ?? '#2e7d32',
    };
  }

  if (resolvedKey === 'error') {
    return {
      checked: themeColors?.danger ?? '#d32f2f',
      checkedHover: themeColors?.dangerHover ?? themeColors?.danger ?? '#c62828',
      focusRing: themeColors?.danger ?? '#d32f2f',
    };
  }

  if (resolvedKey === 'warning') {
    return {
      checked: themeColors?.warning ?? '#ed6c02',
      checkedHover: themeColors?.warning ?? '#ed6c02',
      focusRing: themeColors?.warning ?? '#ed6c02',
    };
  }

  return {
    checked: resolvedKey,
    checkedHover: `color-mix(in srgb, ${resolvedKey} 85%, black)`,
    focusRing: resolvedKey,
  };
};

/** @deprecated Используйте `CONTROL_COLOR_PRESETS` */
export const SWITCH_COLOR_PRESETS = CONTROL_COLOR_PRESETS;

/** @deprecated Используйте `ControlAccentColors` */
export type SwitchCheckedTrackColors = ControlAccentColors;

/** @deprecated Используйте `isControlColorPreset` */
export const isSwitchColorPreset = isControlColorPreset;

/** @deprecated Используйте `resolveControlAccentColors` */
export const resolveSwitchCheckedTrackColors = resolveControlAccentColors;
