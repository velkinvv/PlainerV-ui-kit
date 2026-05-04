import { ThemeMode, type ThemeType } from '../types/theme';
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
  mode: ThemeMode.LIGHT,
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
  mode: ThemeMode.DARK,
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
