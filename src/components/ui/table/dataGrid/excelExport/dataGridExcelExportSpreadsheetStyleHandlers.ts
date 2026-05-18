import type { DataGridExcelExportCellStyle, DataGridExcelExportCellValue } from '@/types/ui';

/** Нормализованный ключ стиля для дедупликации в книге */
type SpreadsheetStyleKey = string;

/**
 * Приводит CSS-цвет к формату `#RRGGBB` для SpreadsheetML.
 * @param color — `#rgb`, `#rrggbb`, `rgb()`, именованный цвет не поддерживается
 */
export function normalizeDataGridExcelExportColorForSpreadsheet(
  color: string | undefined,
): string | undefined {
  if (!color) {
    return undefined;
  }
  const trimmed = color.trim();
  if (trimmed === '') {
    return undefined;
  }

  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      const expanded = hex
        .split('')
        .map((char) => `${char}${char}`)
        .join('');
      return `#${expanded.toUpperCase()}`;
    }
    if (hex.length === 6) {
      return `#${hex.toUpperCase()}`;
    }
    if (hex.length === 8) {
      return `#${hex.slice(2).toUpperCase()}`;
    }
  }

  const rgbMatch = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(trimmed);
  if (rgbMatch) {
    const red = Number.parseInt(rgbMatch[1] ?? '0', 10);
    const green = Number.parseInt(rgbMatch[2] ?? '0', 10);
    const blue = Number.parseInt(rgbMatch[3] ?? '0', 10);
    const toHex = (channel: number) => channel.toString(16).padStart(2, '0');
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
  }

  return undefined;
}

function buildSpreadsheetStyleCacheKey(style: DataGridExcelExportCellStyle): SpreadsheetStyleKey {
  const textColor = normalizeDataGridExcelExportColorForSpreadsheet(style.textColor) ?? '';
  const backgroundColor =
    normalizeDataGridExcelExportColorForSpreadsheet(style.backgroundColor) ?? '';
  return `${textColor}|${backgroundColor}|${style.bold ? '1' : '0'}`;
}

function buildSpreadsheetStyleDefinitionXml(
  styleIdentifier: string,
  style: DataGridExcelExportCellStyle,
): string {
  const textColor = normalizeDataGridExcelExportColorForSpreadsheet(style.textColor);
  const backgroundColor = normalizeDataGridExcelExportColorForSpreadsheet(style.backgroundColor);
  const fontParts: string[] = [];
  if (style.bold) {
    fontParts.push(' ss:Bold="1"');
  }
  if (textColor) {
    fontParts.push(` ss:Color="${textColor}"`);
  }
  const fontXml = fontParts.length > 0 ? `<Font${fontParts.join('')}/>` : '';
  const interiorXml = backgroundColor
    ? `<Interior ss:Color="${backgroundColor}" ss:Pattern="Solid"/>`
    : '';

  if (!fontXml && !interiorXml) {
    return '';
  }

  return `<Style ss:ID="${styleIdentifier}">${fontXml}${interiorXml}</Style>`;
}

/**
 * Реестр уникальных стилей ячеек в одной книге Excel XML.
 */
export class DataGridExcelExportSpreadsheetStyleRegistry {
  private readonly styleIdentifierByKey = new Map<SpreadsheetStyleKey, string>();

  private readonly styleDefinitionXmlList: string[] = [];

  private nextStyleIndex = 1;

  /**
   * Возвращает `ss:StyleID` для стиля или `undefined`, если стиль пустой.
   * @param style — цвета и начертание ячейки
   */
  registerStyle(style: DataGridExcelExportCellStyle | undefined): string | undefined {
    if (!style) {
      return undefined;
    }
    const hasContent = Boolean(style.textColor ?? style.backgroundColor ?? style.bold);
    if (!hasContent) {
      return undefined;
    }

    const cacheKey = buildSpreadsheetStyleCacheKey(style);
    const existingIdentifier = this.styleIdentifierByKey.get(cacheKey);
    if (existingIdentifier) {
      return existingIdentifier;
    }

    const styleIdentifier = `ExportCell_${this.nextStyleIndex}`;
    this.nextStyleIndex += 1;
    const definitionXml = buildSpreadsheetStyleDefinitionXml(styleIdentifier, style);
    if (definitionXml === '') {
      return undefined;
    }

    this.styleIdentifierByKey.set(cacheKey, styleIdentifier);
    this.styleDefinitionXmlList.push(definitionXml);
    return styleIdentifier;
  }

  /** XML всех зарегистрированных стилей (без заголовка) */
  getRegisteredStylesXml(): string {
    return this.styleDefinitionXmlList.join('\n  ');
  }
}

/**
 * Пустой ли стиль (нет визуальных атрибутов).
 * @param style — стиль ячейки
 */
export function isEmptyDataGridExcelExportCellStyle(
  style: DataGridExcelExportCellStyle | undefined,
): boolean {
  if (!style) {
    return true;
  }
  return !style.textColor && !style.backgroundColor && !style.bold;
}

/**
 * Объединяет базовый стиль и переопределения (второй аргумент приоритетнее).
 * @param baseStyle — базовый стиль
 * @param overrideStyle — переопределение
 */
export function mergeDataGridExcelExportCellStyles(
  baseStyle: DataGridExcelExportCellStyle | undefined,
  overrideStyle: DataGridExcelExportCellStyle | undefined,
): DataGridExcelExportCellStyle | undefined {
  if (
    isEmptyDataGridExcelExportCellStyle(baseStyle) &&
    isEmptyDataGridExcelExportCellStyle(overrideStyle)
  ) {
    return undefined;
  }
  return {
    ...baseStyle,
    ...overrideStyle,
  };
}

/**
 * XML-атрибут `ss:StyleID` для ячейки.
 * @param styleIdentifier — идентификатор из реестра
 */
export function buildSpreadsheetCellStyleAttribute(styleIdentifier: string | undefined): string {
  return styleIdentifier ? ` ss:StyleID="${styleIdentifier}"` : '';
}

/**
 * Собирает ячейку `<Cell>` с данными и стилем.
 * @param cell — текст и стиль
 * @param styleIdentifier — id стиля в реестре
 * @param escapeText — экранирование текста для XML
 */
export function buildSpreadsheetDataCellXml(
  cell: DataGridExcelExportCellValue,
  styleIdentifier: string | undefined,
  escapeText: (text: string) => string,
): string {
  const cellText = cell.text ?? '';
  const isNumber =
    cellText !== '' && !Number.isNaN(Number(cellText)) && /^-?\d+(\.\d+)?$/.test(cellText.trim());
  const dataType = isNumber ? 'Number' : 'String';
  const styleAttribute = buildSpreadsheetCellStyleAttribute(styleIdentifier);
  return `<Cell${styleAttribute}><Data ss:Type="${dataType}">${escapeText(cellText)}</Data></Cell>`;
}
