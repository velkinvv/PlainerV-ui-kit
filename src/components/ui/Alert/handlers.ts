import type { ReactNode } from 'react';
import type { DefaultTheme } from 'styled-components';
import type { IconName } from '../../../icons';
import type {
  AlertIconMapping,
  AlertSeverity,
  AlertVariant,
  ControlColor,
} from '../../../types/ui';
import { resolveControlAccentColors } from '../../../handlers/controlAccentColorHandlers';
import { resolveOnAccentTextColor } from '../../../handlers/onAccentColorHandlers';
import { Size } from '../../../types/sizes';

/**
 * Дефолтная иконка по severity (имена из набора Icon).
 * @param severity - Семантика Alert
 */
export const getAlertDefaultIconName = (severity: AlertSeverity): IconName => {
  switch (severity) {
    case 'success':
      return 'IconPlainerCheck';
    case 'error':
      return 'IconExDanger';
    case 'warning':
      return 'IconPlainerWarning';
    case 'info':
    default:
      return 'IconExInfoCircle';
  }
};

/**
 * Резолв иконки: `false` → null; кастом → он; иначе mapping или default по severity.
 * @param options.severity - Семантика
 * @param options.icon - Проп icon
 * @param options.iconMapping - Частичный map
 */
export const resolveAlertIconNode = (options: {
  severity: AlertSeverity;
  icon?: ReactNode | false;
  iconMapping?: AlertIconMapping;
}): ReactNode | null => {
  if (options.icon === false) {
    return null;
  }
  if (options.icon != null) {
    return options.icon;
  }
  const mapped = options.iconMapping?.[options.severity];
  if (mapped != null) {
    return mapped;
  }
  return null;
};

/**
 * Нужна ли дефолтная Icon по имени (когда кастом/mapping не заданы и icon !== false).
 * @param options.icon - Проп icon
 * @param options.iconMapping - Map
 * @param options.severity - Severity
 */
export const shouldUseAlertDefaultIconName = (options: {
  severity: AlertSeverity;
  icon?: ReactNode | false;
  iconMapping?: AlertIconMapping;
}): boolean => {
  if (options.icon === false || options.icon != null) {
    return false;
  }
  return options.iconMapping?.[options.severity] == null;
};

/**
 * Палитра поверхности Alert.
 * @property accent - Основной цвет (иконка / рамка / filled bg)
 * @property background - Фон
 * @property border - Обводка (outlined / standard)
 * @property text - Цвет текста
 * @property title - Цвет заголовка
 */
export type AlertSurfaceTokens = {
  accent: string;
  background: string;
  border: string;
  text: string;
  title: string;
};

/**
 * Ключ палитры: явный `color` или severity.
 * @param severity - Семантика
 * @param color - Override
 */
export const resolveAlertPaletteKey = (
  severity: AlertSeverity,
  color?: ControlColor | string,
): ControlColor | string => color ?? severity;

/**
 * Токены поверхности по variant + палитре темы.
 * @param theme - Тема
 * @param variant - standard | filled | outlined
 * @param paletteKey - severity или color override
 */
export const resolveAlertSurfaceTokens = (
  theme: DefaultTheme,
  variant: AlertVariant,
  paletteKey: ControlColor | string,
): AlertSurfaceTokens => {
  const accentColors = resolveControlAccentColors(theme, paletteKey);
  const accent = accentColors.checked;
  const baseText = theme.colors?.text ?? '#212121';
  const inputBg = theme.colors?.input ?? theme.colors?.background ?? '#ffffff';
  const onAccentText = resolveOnAccentTextColor(theme);

  if (variant === 'filled') {
    return {
      accent,
      background: accent,
      border: accent,
      text: onAccentText,
      title: onAccentText,
    };
  }

  if (variant === 'outlined') {
    return {
      accent,
      background: inputBg,
      border: accent,
      text: baseText,
      title: accent,
    };
  }

  // standard — мягкий фон
  return {
    accent,
    background: `color-mix(in srgb, ${accent} 12%, ${inputBg})`,
    border: `color-mix(in srgb, ${accent} 35%, transparent)`,
    text: baseText,
    title: accent,
  };
};

/**
 * Размер иконки Alert по Size.
 * @param size - Размер компонента
 */
export const resolveAlertIconSizePx = (size: Size): number => {
  switch (size) {
    case Size.XS:
      return 16;
    case Size.SM:
      return 18;
    case Size.LG:
      return 24;
    case Size.XL:
      return 28;
    case Size.MD:
    default:
      return 20;
  }
};

/**
 * Hit-area кнопки закрытия Alert по Size.
 * @param size - Размер компонента
 */
export const resolveAlertCloseHitAreaPx = (size: Size): number => {
  switch (size) {
    case Size.XS:
      return 24;
    case Size.SM:
      return 28;
    case Size.LG:
      return 36;
    case Size.XL:
      return 40;
    case Size.MD:
    default:
      return 32;
  }
};
