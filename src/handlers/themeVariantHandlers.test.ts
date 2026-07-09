import { ThemeColorScheme, ThemeMode, ThemeVariant } from '../types/theme';
import {
  COLOR_SCHEME_STORAGE_KEY,
  THEME_VARIANT_STORAGE_KEY,
  getAvailableThemeVariants,
  normalizeThemeVariant,
  parseThemeModeToAxes,
  readStoredThemeAxes,
  resolveBuiltinThemeMode,
  writeStoredThemeAxes,
} from './themeVariantHandlers';

describe('themeVariantHandlers', () => {
  it('resolveBuiltinThemeMode собирает id из варианта и палитры', () => {
    expect(resolveBuiltinThemeMode(ThemeVariant.standard, ThemeColorScheme.LIGHT)).toBe(ThemeMode.light);
    expect(resolveBuiltinThemeMode(ThemeVariant.standard, ThemeColorScheme.DARK)).toBe(ThemeMode.dark);
    expect(resolveBuiltinThemeMode(ThemeVariant.glass, ThemeColorScheme.LIGHT)).toBe(ThemeMode.glassLight);
    expect(resolveBuiltinThemeMode(ThemeVariant.glass, ThemeColorScheme.DARK)).toBe(ThemeMode.glassDark);
    expect(resolveBuiltinThemeMode(ThemeVariant.kidsBoys, ThemeColorScheme.LIGHT)).toBe(ThemeMode.kidsBoysLight);
    expect(resolveBuiltinThemeMode(ThemeVariant.kidsBoys, ThemeColorScheme.DARK)).toBe(ThemeMode.kidsBoysDark);
    expect(resolveBuiltinThemeMode(ThemeVariant.kidsGirls, ThemeColorScheme.LIGHT)).toBe(ThemeMode.kidsGirlsLight);
    expect(resolveBuiltinThemeMode(ThemeVariant.kidsGirls, ThemeColorScheme.DARK)).toBe(ThemeMode.kidsGirlsDark);
    expect(resolveBuiltinThemeMode(ThemeVariant.kids, ThemeColorScheme.LIGHT)).toBe(ThemeMode.kidsBoysLight);
    expect(resolveBuiltinThemeMode(ThemeVariant.kids, ThemeColorScheme.DARK)).toBe(ThemeMode.kidsBoysDark);
  });

  it('normalizeThemeVariant мигрирует legacy kids → kidsBoys', () => {
    expect(normalizeThemeVariant(ThemeVariant.kids)).toBe(ThemeVariant.kidsBoys);
    expect(normalizeThemeVariant('kids')).toBe(ThemeVariant.kidsBoys);
  });

  it('parseThemeModeToAxes разбирает встроенные id тем', () => {
    expect(parseThemeModeToAxes(ThemeMode.light)).toEqual({
      variant: ThemeVariant.standard,
      colorScheme: ThemeColorScheme.LIGHT,
    });
    expect(parseThemeModeToAxes(ThemeMode.glassDark)).toEqual({
      variant: ThemeVariant.glass,
      colorScheme: ThemeColorScheme.DARK,
    });
    expect(parseThemeModeToAxes(ThemeMode.kidsBoysLight)).toEqual({
      variant: ThemeVariant.kidsBoys,
      colorScheme: ThemeColorScheme.LIGHT,
    });
    expect(parseThemeModeToAxes(ThemeMode.kidsGirlsDark)).toEqual({
      variant: ThemeVariant.kidsGirls,
      colorScheme: ThemeColorScheme.DARK,
    });
    expect(parseThemeModeToAxes(ThemeMode.kidsLight)).toEqual({
      variant: ThemeVariant.kidsBoys,
      colorScheme: ThemeColorScheme.LIGHT,
    });
    expect(parseThemeModeToAxes('ocean', ThemeColorScheme.LIGHT)).toEqual({
      variant: undefined,
      colorScheme: ThemeColorScheme.LIGHT,
    });
  });

  it('getAvailableThemeVariants возвращает standard, glass, kidsBoys и kidsGirls из встроенного каталога', () => {
    const variants = getAvailableThemeVariants([
      ThemeMode.light,
      ThemeMode.dark,
      ThemeMode.glassLight,
      ThemeMode.glassDark,
      ThemeMode.kidsBoysLight,
      ThemeMode.kidsBoysDark,
      ThemeMode.kidsGirlsLight,
      ThemeMode.kidsGirlsDark,
    ]);

    expect(variants).toEqual([
      ThemeVariant.standard,
      ThemeVariant.glass,
      ThemeVariant.kidsBoys,
      ThemeVariant.kidsGirls,
    ]);
  });

  it('readStoredThemeAxes читает новые ключи localStorage', () => {
    const storage = {
      [THEME_VARIANT_STORAGE_KEY]: ThemeVariant.glass,
      [COLOR_SCHEME_STORAGE_KEY]: ThemeColorScheme.DARK,
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => storage[key as keyof typeof storage] ?? null,
        setItem: jest.fn(),
      },
      writable: true,
    });

    const axes = readStoredThemeAxes([ThemeMode.light, ThemeMode.dark, ThemeMode.glassLight, ThemeMode.glassDark]);

    expect(axes).toEqual({
      variant: ThemeVariant.glass,
      colorScheme: ThemeColorScheme.DARK,
      themeMode: ThemeMode.glassDark,
    });
  });

  it('writeStoredThemeAxes сохраняет оба ключа и legacy id', () => {
    const setItem = jest.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem,
      },
      writable: true,
    });

    writeStoredThemeAxes(
      ThemeVariant.standard,
      ThemeColorScheme.LIGHT,
      ThemeMode.light,
      'plainerv-theme-id',
    );

    expect(setItem).toHaveBeenCalledWith(THEME_VARIANT_STORAGE_KEY, ThemeVariant.standard);
    expect(setItem).toHaveBeenCalledWith(COLOR_SCHEME_STORAGE_KEY, ThemeColorScheme.LIGHT);
    expect(setItem).toHaveBeenCalledWith('plainerv-theme-id', ThemeMode.light);
  });
});
