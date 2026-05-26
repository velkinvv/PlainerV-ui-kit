import type { ThemeType } from './theme';

/**
 * Рекурсивно делает все поля типа необязательными.
 * Используется для частичного переопределения темы.
 */
export type DeepPartial<T> = T extends (...argumentsList: unknown[]) => unknown
  ? T
  : T extends readonly (infer Item)[]
    ? readonly DeepPartial<Item>[]
    : T extends object
      ? { [Key in keyof T]?: DeepPartial<T[Key]> }
      : T;

/**
 * Частичное переопределение {@link ThemeType}.
 * Недостающие поля дополняются из базовой темы через {@link mergeTheme}.
 */
export type ThemeOverride = DeepPartial<ThemeType>;

/**
 * Переопределения для светлой и/или тёмной темы.
 */
export type ThemeOverridesByMode = {
  light?: ThemeOverride;
  dark?: ThemeOverride;
};

/**
 * Готовые темы по режимам (полностью смерженные или целиком кастомные).
 */
export type CustomThemesByMode = {
  light?: ThemeType;
  dark?: ThemeType;
};
