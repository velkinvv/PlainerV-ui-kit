import { ThemeColorScheme, ThemeMode, ThemeVariant } from '../types/theme';
import {
  defineThemeCatalog,
  createThemeModeMap,
  createBuiltinThemeCatalog,
  ensureValidThemeMode,
  findThemeModeByColorScheme,
  getNextThemeMode,
  resolveThemeCatalog,
  resolveThemeCatalogItem,
} from './themeCatalogHandlers';

describe('themeCatalogHandlers', () => {
  it('defineThemeCatalog возвращает themeMode.ocean', () => {
    const appThemes = defineThemeCatalog([
      { id: 'light', label: 'Light', baseMode: ThemeColorScheme.LIGHT },
      {
        id: 'ocean',
        label: 'Ocean',
        baseMode: ThemeColorScheme.LIGHT,
        override: { colors: { primary: '#0284C7' } },
      },
    ] as const);

    expect(appThemes.themeMode.ocean).toBe('ocean');
    expect(appThemes.themeModes).toEqual(['light', 'ocean']);
  });

  it('createThemeModeMap строит объект имён', () => {
    const themeMode = createThemeModeMap(['a', 'b'] as const);
    expect(themeMode.a).toBe('a');
    expect(themeMode.b).toBe('b');
  });

  it('ThemeMode содержит light, dark и glass-варианты', () => {
    expect(ThemeMode.light).toBe('light');
    expect(ThemeMode.dark).toBe('dark');
    expect(ThemeMode.glassLight).toBe('glassLight');
    expect(ThemeMode.glassDark).toBe('glassDark');
    expect(ThemeMode.glass).toBe('glassLight');
  });

  it('createBuiltinThemeCatalog включает glassLight и glassDark с variant', () => {
    const catalog = createBuiltinThemeCatalog();
    const resolved = resolveThemeCatalog(catalog);
    const glassLightItem = resolved.find((item) => item.name === ThemeMode.glassLight);
    const glassDarkItem = resolved.find((item) => item.name === ThemeMode.glassDark);
    const lightItem = resolved.find((item) => item.name === ThemeMode.light);

    expect(lightItem?.variant).toBe(ThemeVariant.standard);
    expect(glassLightItem?.variant).toBe(ThemeVariant.glass);
    expect(glassLightItem?.theme.mode).toBe(ThemeColorScheme.LIGHT);
    expect(glassLightItem?.theme.surfaceMaterial?.backdropFilter).toContain('blur');
    expect(glassDarkItem?.variant).toBe(ThemeVariant.glass);
    expect(glassDarkItem?.theme.mode).toBe(ThemeColorScheme.DARK);
    expect(glassDarkItem?.theme.surfaceMaterial?.backdropFilter).toContain('blur');
  });

  it('createBuiltinThemeCatalog включает kidsBoys и kidsGirls с variant', () => {
    const catalog = createBuiltinThemeCatalog();
    const resolved = resolveThemeCatalog(catalog);
    const kidsBoysLightItem = resolved.find((item) => item.name === ThemeMode.kidsBoysLight);
    const kidsBoysDarkItem = resolved.find((item) => item.name === ThemeMode.kidsBoysDark);
    const kidsGirlsLightItem = resolved.find((item) => item.name === ThemeMode.kidsGirlsLight);
    const kidsGirlsDarkItem = resolved.find((item) => item.name === ThemeMode.kidsGirlsDark);

    expect(kidsBoysLightItem?.variant).toBe(ThemeVariant.kidsBoys);
    expect(kidsBoysLightItem?.theme.mode).toBe(ThemeColorScheme.LIGHT);
    expect(kidsBoysLightItem?.theme.pageBackground).toBeTruthy();
    expect(kidsBoysLightItem?.theme.colors.primary).toBe('#2563EB');
    expect(kidsBoysDarkItem?.variant).toBe(ThemeVariant.kidsBoys);
    expect(kidsBoysDarkItem?.theme.mode).toBe(ThemeColorScheme.DARK);
    expect(kidsBoysDarkItem?.theme.colors.primary).toBe('#22D3EE');
    expect(kidsGirlsLightItem?.variant).toBe(ThemeVariant.kidsGirls);
    expect(kidsGirlsLightItem?.theme.colors.primary).toBe('#EC4899');
    expect(kidsGirlsDarkItem?.variant).toBe(ThemeVariant.kidsGirls);
    expect(kidsGirlsDarkItem?.theme.colors.primary).toBe('#F472B6');
  });

  it('findThemeModeByColorScheme учитывает variant kidsBoys и kidsGirls', () => {
    const catalog = createBuiltinThemeCatalog();
    const resolved = resolveThemeCatalog(catalog);

    expect(findThemeModeByColorScheme(resolved, ThemeColorScheme.DARK, ThemeVariant.kidsBoys)).toBe(
      ThemeMode.kidsBoysDark,
    );
    expect(findThemeModeByColorScheme(resolved, ThemeColorScheme.LIGHT, ThemeVariant.kidsBoys)).toBe(
      ThemeMode.kidsBoysLight,
    );
    expect(findThemeModeByColorScheme(resolved, ThemeColorScheme.DARK, ThemeVariant.kidsGirls)).toBe(
      ThemeMode.kidsGirlsDark,
    );
    expect(findThemeModeByColorScheme(resolved, ThemeColorScheme.LIGHT, ThemeVariant.kidsGirls)).toBe(
      ThemeMode.kidsGirlsLight,
    );
    expect(findThemeModeByColorScheme(resolved, ThemeColorScheme.DARK, ThemeVariant.kids)).toBe(
      ThemeMode.kidsBoysDark,
    );
  });

  it('getNextThemeMode циклически перебирает имена', () => {
    const themeModes = ['a', 'b', 'c'] as const;
    expect(getNextThemeMode(themeModes, 'a')).toBe('b');
    expect(getNextThemeMode(themeModes, 'c')).toBe('a');
  });

  it('findThemeModeByColorScheme находит первую тему с палитрой', () => {
    const resolved = defineThemeCatalog([
      { id: 'light', baseMode: ThemeColorScheme.LIGHT },
      { id: 'dark', baseMode: ThemeColorScheme.DARK },
      { id: 'dim', baseMode: ThemeColorScheme.DARK },
    ] as const);

    const items = Object.entries(resolved.catalog).map(([name, def]) =>
      resolveThemeCatalogItem(name as 'light' | 'dark' | 'dim', def),
    );

    expect(findThemeModeByColorScheme(items, ThemeColorScheme.DARK)).toBe(ThemeMode.dark);
  });

  it('ensureValidThemeMode отклоняет неизвестное имя', () => {
    const themeModes = ['light', 'dark'] as const;
    expect(ensureValidThemeMode('unknown', themeModes, 'light')).toBe('light');
  });
});
