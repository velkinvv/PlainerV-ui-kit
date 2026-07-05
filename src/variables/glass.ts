import { glassBackdropFilters } from './blur';

/** Вариант glass-палитры: светлая или тёмная основа */
export type GlassPaletteVariant = keyof typeof glassBackdropFilters;

/**
 * Полупрозрачные поверхности и фон canvas для glass-тем.
 * Размытие берётся из {@link glassBackdropFilters} / {@link blurClasses}.
 */
export type GlassSurfacePalette = {
  pageBackground: string;
  surface: string;
  surfaceElevated: string;
  surfaceMuted: string;
  surfaceSubtle: string;
  border: string;
  borderSubtle: string;
  borderHairline: string;
  overlay: string;
};

/** Светлая glass-палитра (iOS / macOS light vibrancy) */
export const glassSurfacePaletteLight: GlassSurfacePalette = {
  pageBackground: `
    radial-gradient(ellipse 80% 60% at 10% 15%, rgba(147, 197, 253, 0.55) 0%, transparent 55%),
    radial-gradient(ellipse 70% 55% at 90% 10%, rgba(196, 181, 253, 0.45) 0%, transparent 50%),
    radial-gradient(ellipse 65% 50% at 75% 90%, rgba(251, 207, 232, 0.35) 0%, transparent 55%),
    radial-gradient(ellipse 60% 45% at 20% 85%, rgba(165, 243, 252, 0.3) 0%, transparent 50%),
    linear-gradient(165deg, #dbeafe 0%, #e9d5ff 38%, #fce7f3 72%, #cffafe 100%)
  `,
  surface: 'rgba(255, 255, 255, 0.52)',
  surfaceElevated: 'rgba(255, 255, 255, 0.68)',
  surfaceMuted: 'rgba(255, 255, 255, 0.38)',
  surfaceSubtle: 'rgba(255, 255, 255, 0.28)',
  border: 'rgba(255, 255, 255, 0.55)',
  borderSubtle: 'rgba(255, 255, 255, 0.35)',
  borderHairline: 'rgba(0, 0, 0, 0.06)',
  overlay: 'rgba(15, 23, 42, 0.22)',
};

/** Тёмная glass-палитра (iOS / macOS dark vibrancy) */
export const glassSurfacePaletteDark: GlassSurfacePalette = {
  pageBackground: `
    radial-gradient(ellipse 75% 55% at 15% 20%, rgba(59, 130, 246, 0.22) 0%, transparent 55%),
    radial-gradient(ellipse 70% 50% at 85% 15%, rgba(139, 92, 246, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse 60% 45% at 70% 85%, rgba(236, 72, 153, 0.12) 0%, transparent 55%),
    linear-gradient(165deg, #0f172a 0%, #1e1b4b 40%, #0c1222 75%, #111827 100%)
  `,
  surface: 'rgba(30, 30, 34, 0.62)',
  surfaceElevated: 'rgba(44, 44, 48, 0.72)',
  surfaceMuted: 'rgba(255, 255, 255, 0.08)',
  surfaceSubtle: 'rgba(255, 255, 255, 0.05)',
  border: 'rgba(255, 255, 255, 0.18)',
  borderSubtle: 'rgba(255, 255, 255, 0.12)',
  borderHairline: 'rgba(255, 255, 255, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.45)',
};

export const glassSurfacePalettes = {
  light: glassSurfacePaletteLight,
  dark: glassSurfacePaletteDark,
} as const satisfies Record<GlassPaletteVariant, GlassSurfacePalette>;

/**
 * Возвращает палитру полупрозрачных поверхностей для glass-темы.
 * @param paletteVariant — `light` или `dark` основа палитры
 */
export function getGlassSurfacePalette(paletteVariant: GlassPaletteVariant): GlassSurfacePalette {
  return glassSurfacePalettes[paletteVariant];
}

/**
 * Материал vibrancy для {@link ThemeType.surfaceMaterial}.
 * @param paletteVariant — `light` или `dark` основа палитры
 */
export function createGlassSurfaceMaterial(paletteVariant: GlassPaletteVariant) {
  const backdrop = glassBackdropFilters[paletteVariant].default;

  return {
    backdropFilter: backdrop,
    webkitBackdropFilter: backdrop,
    pageBackground: glassSurfacePalettes[paletteVariant].pageBackground,
  };
}
