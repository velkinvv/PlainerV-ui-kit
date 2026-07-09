/** Вариант kids-палитры: светлая или тёмная основа */
export type KidsPaletteVariant = 'light' | 'dark';

/** Аудитория детской темы */
export type KidsAudienceVariant = 'boys' | 'girls';

type KidsPaletteSet = Record<
  KidsPaletteVariant,
  {
    pageBackground: string;
    accents: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      secondary: string;
      secondaryHover: string;
      success: string;
      successHover: string;
      warning: string;
      danger: string;
      dangerHover: string;
      info: string;
      infoHover: string;
    };
    surfaces: {
      background: string;
      backgroundSecondary: string;
      backgroundTertiary: string;
      card: string;
      input: string;
      text: string;
      textSecondary: string;
      textTertiary: string;
      border: string;
      borderSecondary: string;
      borderTertiary: string;
    };
    shadowGlow: string;
    shadowSoft: string;
    overlay: string;
  }
>;

/** Палитры детских тем для мальчиков и девочек (8–11 лет) */
export const kidsThemePalettes: Record<KidsAudienceVariant, KidsPaletteSet> = {
  boys: {
    light: {
      pageBackground: `
        radial-gradient(ellipse 70% 50% at 15% 20%, rgba(56, 189, 248, 0.65) 0%, transparent 55%),
        radial-gradient(ellipse 60% 45% at 85% 15%, rgba(132, 204, 22, 0.55) 0%, transparent 50%),
        radial-gradient(ellipse 55% 40% at 80% 85%, rgba(249, 115, 22, 0.45) 0%, transparent 55%),
        radial-gradient(ellipse 50% 35% at 10% 80%, rgba(59, 130, 246, 0.35) 0%, transparent 50%),
        linear-gradient(160deg, #F0F9FF 0%, #ECFDF5 35%, #FFF7ED 65%, #DBEAFE 100%)
      `,
      accents: {
        primary: '#2563EB',
        primaryHover: '#1D4ED8',
        primaryActive: '#1E40AF',
        secondary: '#84CC16',
        secondaryHover: '#65A30D',
        success: '#22C55E',
        successHover: '#16A34A',
        warning: '#F59E0B',
        danger: '#EF4444',
        dangerHover: '#DC2626',
        info: '#0EA5E9',
        infoHover: '#0284C7',
      },
      surfaces: {
        background: '#F0F9FF',
        backgroundSecondary: '#FFFFFF',
        backgroundTertiary: '#E0F2FE',
        card: '#FFFFFF',
        input: '#FFFFFF',
        text: '#1E3A8A',
        textSecondary: '#475569',
        textTertiary: '#64748B',
        border: '#7DD3FC',
        borderSecondary: '#BAE6FD',
        borderTertiary: '#A7F3D0',
      },
      shadowGlow: 'rgba(37, 99, 235, 0.28)',
      shadowSoft: 'rgba(14, 165, 233, 0.2)',
      overlay: 'rgba(30, 58, 138, 0.35)',
    },
    dark: {
      pageBackground: `
        radial-gradient(ellipse 70% 50% at 20% 15%, rgba(34, 211, 238, 0.35) 0%, transparent 55%),
        radial-gradient(ellipse 60% 45% at 80% 20%, rgba(132, 204, 22, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse 55% 40% at 70% 85%, rgba(249, 115, 22, 0.25) 0%, transparent 55%),
        linear-gradient(165deg, #0F172A 0%, #0C4A6E 38%, #14532D 72%, #1E3A8A 100%)
      `,
      accents: {
        primary: '#22D3EE',
        primaryHover: '#06B6D4',
        primaryActive: '#0891B2',
        secondary: '#F97316',
        secondaryHover: '#EA580C',
        success: '#A3E635',
        successHover: '#84CC16',
        warning: '#FBBF24',
        danger: '#F87171',
        dangerHover: '#EF4444',
        info: '#38BDF8',
        infoHover: '#0EA5E9',
      },
      surfaces: {
        background: '#0F172A',
        backgroundSecondary: '#1E293B',
        backgroundTertiary: '#0C4A6E',
        card: '#1E293B',
        input: '#334155',
        text: '#F0F9FF',
        textSecondary: '#BAE6FD',
        textTertiary: '#7DD3FC',
        border: '#0284C7',
        borderSecondary: '#0369A1',
        borderTertiary: '#22D3EE',
      },
      shadowGlow: 'rgba(34, 211, 238, 0.35)',
      shadowSoft: 'rgba(14, 116, 144, 0.4)',
      overlay: 'rgba(15, 23, 42, 0.75)',
    },
  },
  girls: {
    light: {
      pageBackground: `
        radial-gradient(ellipse 70% 50% at 15% 20%, rgba(244, 114, 182, 0.6) 0%, transparent 55%),
        radial-gradient(ellipse 60% 45% at 85% 15%, rgba(192, 132, 252, 0.55) 0%, transparent 50%),
        radial-gradient(ellipse 55% 40% at 80% 85%, rgba(251, 191, 36, 0.4) 0%, transparent 55%),
        radial-gradient(ellipse 50% 35% at 10% 80%, rgba(249, 168, 212, 0.45) 0%, transparent 50%),
        linear-gradient(160deg, #FFF5F7 0%, #FAE8FF 35%, #FDF2F8 65%, #FFF1F2 100%)
      `,
      accents: {
        primary: '#EC4899',
        primaryHover: '#DB2777',
        primaryActive: '#BE185D',
        secondary: '#A855F7',
        secondaryHover: '#9333EA',
        success: '#22C55E',
        successHover: '#16A34A',
        warning: '#F59E0B',
        danger: '#EF4444',
        dangerHover: '#DC2626',
        info: '#D946EF',
        infoHover: '#C026D3',
      },
      surfaces: {
        background: '#FFF5F7',
        backgroundSecondary: '#FFFFFF',
        backgroundTertiary: '#FCE7F3',
        card: '#FFFFFF',
        input: '#FFFFFF',
        text: '#831843',
        textSecondary: '#9D174D',
        textTertiary: '#BE185D',
        border: '#F9A8D4',
        borderSecondary: '#FBCFE8',
        borderTertiary: '#E9D5FF',
      },
      shadowGlow: 'rgba(236, 72, 153, 0.28)',
      shadowSoft: 'rgba(168, 85, 247, 0.2)',
      overlay: 'rgba(131, 24, 67, 0.35)',
    },
    dark: {
      pageBackground: `
        radial-gradient(ellipse 70% 50% at 20% 15%, rgba(244, 114, 182, 0.4) 0%, transparent 55%),
        radial-gradient(ellipse 60% 45% at 80% 20%, rgba(192, 132, 252, 0.35) 0%, transparent 50%),
        radial-gradient(ellipse 55% 40% at 70% 85%, rgba(251, 191, 36, 0.25) 0%, transparent 55%),
        linear-gradient(165deg, #3B0764 0%, #701A75 38%, #831843 72%, #4C1D95 100%)
      `,
      accents: {
        primary: '#F472B6',
        primaryHover: '#EC4899',
        primaryActive: '#DB2777',
        secondary: '#C084FC',
        secondaryHover: '#A855F7',
        success: '#A3E635',
        successHover: '#84CC16',
        warning: '#FDE047',
        danger: '#FB7185',
        dangerHover: '#F43F5E',
        info: '#E879F9',
        infoHover: '#D946EF',
      },
      surfaces: {
        background: '#3B0764',
        backgroundSecondary: '#581C87',
        backgroundTertiary: '#701A75',
        card: '#581C87',
        input: '#6B21A8',
        text: '#FFF1F2',
        textSecondary: '#FBCFE8',
        textTertiary: '#F9A8D4',
        border: '#C026D3',
        borderSecondary: '#A21CAF',
        borderTertiary: '#E879F9',
      },
      shadowGlow: 'rgba(244, 114, 182, 0.35)',
      shadowSoft: 'rgba(126, 34, 206, 0.4)',
      overlay: 'rgba(59, 7, 100, 0.75)',
    },
  },
};

/**
 * Возвращает палитру детской темы по аудитории и режиму.
 * @param audience — мальчики или девочки
 * @param paletteVariant — светлая или тёмная основа
 */
export function getKidsThemePalette(audience: KidsAudienceVariant, paletteVariant: KidsPaletteVariant) {
  return kidsThemePalettes[audience][paletteVariant];
}

/** @deprecated Используйте {@link getKidsThemePalette}('boys' | 'girls', variant) */
export const kidsPageBackgrounds = {
  light: kidsThemePalettes.boys.light.pageBackground,
  dark: kidsThemePalettes.boys.dark.pageBackground,
} as const;
