import { ThemeColorScheme } from '../../types/theme';
import type { ThemeOverride } from '../../types/themeOverride';
import { Size } from '../../types/sizes';
import { createKidsBoxShadow, createKidsColors } from '../colors/kids';
import {
  getKidsThemePalette,
  type KidsAudienceVariant,
  type KidsPaletteVariant,
} from '../../variables/kids';
import { createKidsButtonThemeOverride } from './kidsButtonVariants';

/**
 * Создаёт частичное переопределение базовой темы для kids (8–11 лет).
 * @param audience — мальчики или девочки
 * @param paletteVariant — светлая или тёмная основа
 */
export function createKidsThemeOverride(
  audience: KidsAudienceVariant,
  paletteVariant: KidsPaletteVariant,
): ThemeOverride {
  const palette = getKidsThemePalette(audience, paletteVariant);
  const { surfaces } = palette;
  const kidsBoxShadow = createKidsBoxShadow(audience, paletteVariant);

  return {
    mode: paletteVariant === 'dark' ? ThemeColorScheme.DARK : ThemeColorScheme.LIGHT,
    borderRadius: Size.LG,
    pageBackground: palette.pageBackground,
    colors: createKidsColors(audience, paletteVariant),
    boxShadow: kidsBoxShadow,
    buttons: createKidsButtonThemeOverride(audience, paletteVariant),
    badges: {
      sizes: {
        [Size.SM]: { borderRadius: '12px' },
        [Size.MD]: { borderRadius: '14px' },
        [Size.LG]: { borderRadius: '18px' },
      },
    },
    cards: {
      variants: {
        elevated: {
          background: surfaces.card,
          border: `2px solid ${surfaces.borderSecondary}`,
          boxShadow: kidsBoxShadow.md,
        },
        outlined: {
          background: surfaces.card,
          border: `2px solid ${surfaces.border}`,
        },
        filled: {
          background: surfaces.backgroundTertiary,
          border: `2px solid ${surfaces.borderTertiary}`,
        },
      },
    },
    hints: {
      variants: {
        default: {
          background: surfaces.backgroundSecondary,
          color: surfaces.text,
          border: `2px solid ${surfaces.borderSecondary}`,
          boxShadow: kidsBoxShadow.sm,
        },
      },
    },
    modals: {
      overlay: {
        background: palette.overlay,
      },
    },
  };
}
