import { ThemeColorScheme, type ThemeType } from '../types/theme';
import { lightBoxShadow, lightBlur, lightColors } from './colors/light';
import { darkBoxShadow, darkBlur, darkColors } from './colors/dark';
import { fontFamily, fontWeights, fontSizes, lineHeights, typography } from './fonts';
import { lightButtonTheme, darkButtonTheme } from './buttons';
import { lightBadgeTheme, darkBadgeTheme } from './badges';
import { lightAccordionTheme, darkAccordionTheme } from './accordion';
import { lightAvatarTheme, darkAvatarTheme } from './avatar';
import { lightAvatarGroupTheme, darkAvatarGroupTheme } from './avatarGroup';
import { lightCardTheme, darkCardTheme } from './card';
import { lightTableTheme, darkTableTheme } from './table';
import { lightDropdownTheme, darkDropdownTheme } from './dropdown';
import { lightHintTheme, darkHintTheme } from './hint';
import { lightModalTheme, darkModalTheme } from './modal';
import { lightProgressTheme, darkProgressTheme } from './progress';
import { lightRadioButtonTheme, darkRadioButtonTheme } from './radioButton';
import { Size } from '../types/sizes';
import { mergeTheme } from './mergeTheme';
import { createGlassThemeOverride } from './glass/createGlassTheme';
import { createKidsThemeOverride } from './kids/createKidsTheme';

/**
 * Светлая тема
 * Определяет все стили для светлой темы приложения
 */
export const lightTheme: ThemeType = {
  borderRadius: Size.MD,
  colors: lightColors,
  media: {
    extraLarge: '@media (min-width: 1200px)',
    large: '@media (min-width: 992px)',
    medium: '@media (min-width: 768px)',
    small: '@media (min-width: 576px)',
  },
  sizes: {
    header: { height: 64 },
    container: { width: 1200 },
    footer: { height: 60 },
    modal: { width: 500 },
  },
  durations: {
    ms300: 300,
  },
  zIndex: {
    header: 1000,
    modal: 2000,
  },
  globalSize: Size.MD,
  mode: ThemeColorScheme.LIGHT,
  defaultInputSize: Size.SM,
  defaultButtonSize: Size.MD,
  boxShadow: lightBoxShadow,
  blur: lightBlur,
  buttons: lightButtonTheme,
  badges: lightBadgeTheme,
  accordions: lightAccordionTheme,
  avatars: lightAvatarTheme,
  avatarGroups: lightAvatarGroupTheme,
  cards: lightCardTheme,
  tables: lightTableTheme,
  dropdowns: lightDropdownTheme,
  hints: lightHintTheme,
  modals: lightModalTheme,
  progress: lightProgressTheme,
  radioButton: lightRadioButtonTheme,

  // Шрифты
  fonts: fontFamily,
  fontWeights,
  fontSizes,
  lineHeights,
  typography,
};

/**
 * Темная тема
 * Определяет все стили для темной темы приложения
 */
export const darkTheme: ThemeType = {
  borderRadius: Size.MD,
  colors: darkColors,
  media: {
    extraLarge: '@media (min-width: 1200px)',
    large: '@media (min-width: 992px)',
    medium: '@media (min-width: 768px)',
    small: '@media (min-width: 576px)',
  },
  sizes: {
    header: { height: 64 },
    container: { width: 1200 },
    footer: { height: 60 },
    modal: { width: 500 },
  },
  durations: {
    ms300: 300,
  },
  zIndex: {
    header: 1000,
    modal: 2000,
  },
  globalSize: Size.MD,
  mode: ThemeColorScheme.DARK,
  defaultInputSize: Size.SM,
  defaultButtonSize: Size.MD,
  boxShadow: darkBoxShadow,
  blur: darkBlur,
  buttons: darkButtonTheme,
  badges: darkBadgeTheme,
  accordions: darkAccordionTheme,
  avatars: darkAvatarTheme,
  avatarGroups: darkAvatarGroupTheme,
  cards: darkCardTheme,
  tables: darkTableTheme,
  dropdowns: darkDropdownTheme,
  hints: darkHintTheme,
  modals: darkModalTheme,
  progress: darkProgressTheme,
  radioButton: darkRadioButtonTheme,

  // Шрифты
  fonts: fontFamily,
  fontWeights,
  fontSizes,
  lineHeights,
  typography,
};

/** Glass на светлой палитре — vibrancy поверх mesh-gradient */
export const glassLightTheme = mergeTheme(lightTheme, createGlassThemeOverride('light'));

/** Glass на тёмной палитре — vibrancy поверх тёмного mesh-gradient */
export const glassDarkTheme = mergeTheme(darkTheme, createGlassThemeOverride('dark'));

/** Kids (мальчики) на светлой палитре — яркая детская тема 8–11 лет */
export const kidsBoysLightTheme = mergeTheme(
  lightTheme,
  createKidsThemeOverride('boys', 'light'),
);

/** Kids (мальчики) на тёмной палитре */
export const kidsBoysDarkTheme = mergeTheme(darkTheme, createKidsThemeOverride('boys', 'dark'));

/** Kids (девочки) на светлой палитре */
export const kidsGirlsLightTheme = mergeTheme(
  lightTheme,
  createKidsThemeOverride('girls', 'light'),
);

/** Kids (девочки) на тёмной палитре */
export const kidsGirlsDarkTheme = mergeTheme(
  darkTheme,
  createKidsThemeOverride('girls', 'dark'),
);

/** @deprecated Используйте {@link kidsBoysLightTheme} */
export const kidsLightTheme = kidsBoysLightTheme;

/** @deprecated Используйте {@link kidsBoysDarkTheme} */
export const kidsDarkTheme = kidsBoysDarkTheme;

/** @deprecated Используйте {@link glassLightTheme} */
export const glassTheme = glassLightTheme;
