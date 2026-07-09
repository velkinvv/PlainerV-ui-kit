import type { ButtonTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { Size } from '../../types/sizes';
import {
  getKidsThemePalette,
  type KidsAudienceVariant,
  type KidsPaletteVariant,
} from '../../variables/kids';
import { neutral } from '../../variables/colors/neutral';

/** Скругления кнопок kids-темы — более мягкие и «дружелюбные» */
const kidsButtonRadiusBySize: Record<Size, string> = {
  [Size.XS]: '10px',
  [Size.SM]: '12px',
  [Size.MD]: '14px',
  [Size.LG]: '16px',
  [Size.XL]: '20px',
};

/**
 * Переопределение темы кнопок для kids-палитры.
 * @param audience — мальчики или девочки
 * @param paletteVariant — светлая или тёмная основа
 */
export function createKidsButtonThemeOverride(
  audience: KidsAudienceVariant,
  paletteVariant: KidsPaletteVariant,
): DeepPartial<ButtonTheme> {
  const palette = getKidsThemePalette(audience, paletteVariant);
  const { accents } = palette;
  const isDarkBase = paletteVariant === 'dark';
  const onPrimaryText = isDarkBase ? palette.surfaces.background : neutral[10];

  const roundedSizes = Object.fromEntries(
    Object.entries(kidsButtonRadiusBySize).map(([sizeKey, borderRadius]) => [
      sizeKey,
      { borderRadius },
    ]),
  ) as DeepPartial<ButtonTheme['sizes']>;

  const outlineHoverBackground =
    audience === 'boys'
      ? isDarkBase
        ? 'rgba(34, 211, 238, 0.15)'
        : 'rgba(37, 99, 235, 0.12)'
      : isDarkBase
        ? 'rgba(244, 114, 182, 0.15)'
        : 'rgba(236, 72, 153, 0.12)';

  return {
    sizes: roundedSizes,
    variants: {
      primary: {
        background: accents.primary,
        color: onPrimaryText,
        border: `2px solid ${accents.primary}`,
        hover: {
          background: accents.primaryHover,
          border: `2px solid ${accents.primaryHover}`,
        },
        active: {
          background: accents.primaryActive,
          border: `2px solid ${accents.primaryActive}`,
        },
        focus: {
          border: `2px solid ${accents.secondary}`,
        },
      },
      secondary: {
        background: accents.secondary,
        color: onPrimaryText,
        border: `2px solid ${accents.secondary}`,
        hover: {
          background: accents.secondaryHover,
          border: `2px solid ${accents.secondaryHover}`,
        },
      },
      success: {
        background: accents.success,
        border: `2px solid ${accents.success}`,
        hover: {
          background: accents.successHover,
          border: `2px solid ${accents.successHover}`,
        },
      },
      danger: {
        background: accents.danger,
        border: `2px solid ${accents.danger}`,
        hover: {
          background: accents.dangerHover,
          border: `2px solid ${accents.dangerHover}`,
        },
      },
      warning: {
        background: accents.warning,
        color: isDarkBase ? palette.surfaces.background : '#713F12',
        border: `2px solid ${accents.warning}`,
      },
      outline: {
        border: `2px solid ${accents.primary}`,
        color: accents.primary,
        hover: {
          background: outlineHoverBackground,
        },
      },
    },
  };
}
