// UI Components
export * from './components/ui';

// Types
export * from './types/theme';
export * from './types/sizes';
export * from './types/ui';
export * from './types/icon';

// Hooks
export * from './hooks';

// Handlers
export * from './handlers';

// Themes
export { ThemeProvider, useTheme } from './themes/ThemeProvider';
export type { ThemeProviderProps, ThemeContextProps } from './themes/ThemeProvider';
export { lightTheme, darkTheme } from './themes/themes';
export { mergeTheme } from './themes/mergeTheme';
export { useMergeTheme } from './hooks/useMergeTheme';
export type { UseMergeThemeOptions } from './hooks/useMergeTheme';
export type {
  ThemeOverride,
  ThemeOverridesByMode,
  CustomThemesByMode,
  DeepPartial,
} from './types/themeOverride';
export type {
  ThemeCatalog,
  ThemeCatalogItemDefinition,
  ThemeCatalogMeta,
  ResolvedThemeCatalogItem,
  DefinedThemeCatalog,
} from './types/themeCatalog';
export { BUILTIN_THEME_ID_LIGHT, BUILTIN_THEME_ID_DARK } from './types/themeCatalog';
export {
  createThemeCatalog,
  defineThemeCatalog,
  createThemeModeMap,
  createBuiltinThemeCatalog,
  builtinThemeModeMap,
  resolveThemeCatalog,
  resolveThemeCatalogItem,
  DEFAULT_THEME_STORAGE_KEY,
} from './handlers/themeCatalogHandlers';
export { builtinThemeCatalog } from './themes/ThemeProvider';

// Variables
export * from './variables/cssVariables/css-variables';

// Styles
export { GlobalStyles } from './styles/GlobalStyles';
