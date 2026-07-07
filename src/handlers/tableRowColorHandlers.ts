import type { Colors } from '../types/theme';
import type {
  TableColorMap,
  TableColorResolver,
  TableColumnColorMap,
  TableRowColorMap,
} from '../types/ui';

export type {
  TableColorMap,
  TableColorResolver,
  TableColumnColorMap,
  TableColumnColorResolver,
  TableRowColorMap,
  TableRowColorResolver,
} from '../types/ui';

/**
 * Преобразует резолвер карты в CSS-цвет.
 * @param resolver — строка или `(colors) => string`
 * @param colors — палитра UI-kit из темы
 */
export function resolveTableColorResolver(resolver: TableColorResolver, colors: Colors): string {
  return typeof resolver === 'function' ? resolver(colors) : resolver;
}

/** @deprecated Используйте `resolveTableColorResolver` */
export const resolveTableRowColorResolver = resolveTableColorResolver;

/**
 * Нормализует ключ цвета из данных или описания колонки.
 * @param value — сырое значение ключа
 */
export function normalizeTableColorKey(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedKey = value.trim();
  return trimmedKey.length > 0 ? trimmedKey : undefined;
}

/** @deprecated Используйте `normalizeTableColorKey` */
export const normalizeTableRowColorKey = normalizeTableColorKey;

/**
 * Резолвит CSS-цвет по ключу и карте цветов таблицы.
 * @param colorKey — ключ из строки или колонки
 * @param colorMap — карта цветов из пропсов таблицы
 * @param colors — палитра UI-kit из темы
 */
export function resolveTableColorFromMap<ColorKey extends string>(
  colorKey: unknown,
  colorMap: TableColorMap<ColorKey> | undefined,
  colors: Colors,
): string | undefined {
  const normalizedKey = normalizeTableColorKey(colorKey);
  if (!normalizedKey || colorMap == null) {
    return undefined;
  }

  const resolver = colorMap[normalizedKey as ColorKey];
  if (resolver == null) {
    return undefined;
  }

  return resolveTableColorResolver(resolver, colors);
}

/** @deprecated Используйте `resolveTableColorFromMap` */
export const resolveTableRowColorFromMap = resolveTableColorFromMap;

export type ResolveTableBackgroundColorParams<ColorKey extends string = string> = {
  /** Уже резолвленный CSS-цвет (приоритетнее `colorKey`) */
  explicitColor?: string;
  /** Ключ из карты цветов */
  colorKey?: ColorKey;
  /** Карта цветов из пропсов `Table` / `DataGrid` */
  colorMap?: TableColorMap<ColorKey>;
  /** Палитра UI-kit из темы */
  colors: Colors;
};

/**
 * Резолвит CSS-фон: явный цвет или ключ + карта.
 * @param params — `explicitColor`, `colorKey`, `colorMap`, `colors`
 */
export function resolveTableBackgroundColor<ColorKey extends string = string>(
  params: ResolveTableBackgroundColorParams<ColorKey>,
): string | undefined {
  const explicitColor = params.explicitColor?.trim();
  if (explicitColor != null && explicitColor.length > 0) {
    return explicitColor;
  }

  return resolveTableColorFromMap(params.colorKey, params.colorMap, params.colors);
}

export type ResolveTableRowBackgroundColorParams<RowColorKey extends string = string> = {
  /** Уже резолвленный CSS-цвет (приоритетнее `rowColorKey`) */
  rowColor?: string;
  /** Ключ из `rowColorMap` родительской таблицы */
  rowColorKey?: RowColorKey;
  /** Карта цветов из пропсов `Table` / `DataGrid` */
  rowColorMap?: TableRowColorMap<RowColorKey>;
  /** Палитра UI-kit из темы */
  colors: Colors;
};

/**
 * Резолвит CSS-фон строки: явный `rowColor` или ключ + `rowColorMap`.
 * @param params — `rowColor`, `rowColorKey`, `rowColorMap`, `colors`
 */
export function resolveTableRowBackgroundColor<RowColorKey extends string = string>(
  params: ResolveTableRowBackgroundColorParams<RowColorKey>,
): string | undefined {
  return resolveTableBackgroundColor({
    explicitColor: params.rowColor,
    colorKey: params.rowColorKey,
    colorMap: params.rowColorMap,
    colors: params.colors,
  });
}

export type ResolveTableColumnBackgroundColorParams<ColumnColorKey extends string = string> = {
  /** Уже резолвленный CSS-цвет (приоритетнее `columnColorKey`) */
  columnColor?: string;
  /** Ключ из `columnColorMap` родительской таблицы */
  columnColorKey?: ColumnColorKey;
  /** Карта цветов из пропсов `Table` / `DataGrid` */
  columnColorMap?: TableColumnColorMap<ColumnColorKey>;
  /** Палитра UI-kit из темы */
  colors: Colors;
};

/**
 * Резолвит CSS-фон колонки/ячейки: явный `columnColor` или ключ + `columnColorMap`.
 * @param params — `columnColor`, `columnColorKey`, `columnColorMap`, `colors`
 */
export function resolveTableColumnBackgroundColor<ColumnColorKey extends string = string>(
  params: ResolveTableColumnBackgroundColorParams<ColumnColorKey>,
): string | undefined {
  return resolveTableBackgroundColor({
    explicitColor: params.columnColor,
    colorKey: params.columnColorKey,
    colorMap: params.columnColorMap,
    colors: params.colors,
  });
}
