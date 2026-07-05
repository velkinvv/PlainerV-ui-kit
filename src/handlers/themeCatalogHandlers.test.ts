import { ThemeColorScheme, ThemeMode } from '../types/theme';
import {
  defineThemeCatalog,
  createThemeModeMap,
  ensureValidThemeMode,
  findThemeModeByColorScheme,
  getNextThemeMode,
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

  it('createBuiltinThemeCatalog включает glassLight и glassDark', () => {
    const { createBuiltinThemeCatalog, resolveThemeCatalog } = require('./themeCatalogHandlers');
    const catalog = createBuiltinThemeCatalog();
    const resolved = resolveThemeCatalog(catalog);
    const glassLightItem = resolved.find((item) => item.name === ThemeMode.glassLight);
    const glassDarkItem = resolved.find((item) => item.name === ThemeMode.glassDark);

    expect(glassLightItem?.theme.mode).toBe(ThemeColorScheme.LIGHT);
    expect(glassLightItem?.theme.surfaceMaterial?.backdropFilter).toContain('blur');
    expect(glassDarkItem?.theme.mode).toBe(ThemeColorScheme.DARK);
    expect(glassDarkItem?.theme.surfaceMaterial?.backdropFilter).toContain('blur');
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
