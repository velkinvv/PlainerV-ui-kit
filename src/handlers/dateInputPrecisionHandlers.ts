import dayjs from 'dayjs';
import { parseDate, toISODateString, formatDateForDisplay } from './dateHandlers';
import type { DateInputPrecision, WeekOfMonthMode } from '../types/ui';
import {
  formatWeekOfMonthForDisplay,
  formatWeekOfMonthValue,
  parseWeekOfMonthValue,
} from './dateInputWeekHandlers';

export type { DateInputPrecision, WeekOfMonthMode };
export type DateInputSegment = 'week' | 'day' | 'month' | 'year';

/** Параметры сериализации недели месяца */
export interface DatePrecisionWeekOptions {
  /** Нумерация недель: календарь или семёрки от 1-го */
  weekOfMonthMode?: WeekOfMonthMode;
  /** Начало календарной недели */
  weekStartsOn?: 0 | 1;
}

/** Параметры проверки, доступен ли месяц или год для выбора */
export interface DatePeriodDisabledOptions {
  /** Нижняя граница (день внутри периода не отключает весь период) */
  minDate?: Date;
  /** Верхняя граница */
  maxDate?: Date;
  /** Проверка представительной даты внутри периода (disabledMonths / disabledYears и т.п.) */
  isDateDisabled?: (date: Date) => boolean;
}

/** Параметры списка годов */
export interface BuildYearListOptions {
  /** Нижняя граница */
  minDate?: Date;
  /** Верхняя граница */
  maxDate?: Date;
  /** Сколько лет назад от центра, если нет minDate */
  yearsBefore?: number;
  /** Сколько лет вперёд от центра, если нет maxDate */
  yearsAfter?: number;
}

/**
 * Дата без времени (локальный календарный день).
 * @param date - Исходная дата
 */
const startOfCalendarDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Проверяет, что точность — не полный день.
 * @param precision - Точность DateInput
 */
export const isPeriodPrecision = (
  precision: DateInputPrecision,
): precision is Exclude<DateInputPrecision, 'day'> => {
  return precision !== 'day';
};

/**
 * Формат отображения в поле, если `format` не передан.
 * @param format - Явный формат dayjs или undefined
 * @param precision - Точность DateInput
 */
export const resolveDateInputFormat = (
  format: string | undefined,
  precision: DateInputPrecision,
): string => {
  if (format) {
    return format;
  }

  switch (precision) {
    case 'year':
      return 'YYYY';
    case 'month':
    case 'monthYear':
      return 'MM.YYYY';
    case 'week':
      return 'W.MM.YYYY';
    default:
      return 'DD.MM.YYYY';
  }
};

/**
 * Каноническая строка API по точности (`onChange` / `value`).
 * @param date - Дата пикера (день внутри выбранного периода)
 * @param precision - Точность DateInput
 * @param options - Режим недели месяца
 */
export const formatDateByPrecision = (
  date: Date | null,
  precision: DateInputPrecision,
  options: DatePrecisionWeekOptions = {},
): string => {
  if (!date) {
    return '';
  }

  const dayjsDate = dayjs(date);
  if (!dayjsDate.isValid()) {
    return '';
  }

  switch (precision) {
    case 'year':
      return dayjsDate.format('YYYY');
    case 'month':
    case 'monthYear':
      return dayjsDate.format('YYYY-MM');
    case 'week':
      return formatWeekOfMonthValue(date, options);
    default:
      return toISODateString(date);
  }
};

/**
 * Текст в поле по точности: для недели токен `W` — номер недели месяца, не ISO.
 * @param date - Дата пикера
 * @param format - Шаблон отображения
 * @param precision - Точность DateInput
 * @param options - Режим недели месяца
 */
export const formatPeriodForDisplay = (
  date: Date | null,
  format: string,
  precision: DateInputPrecision,
  options: DatePrecisionWeekOptions = {},
): string => {
  if (precision === 'week') {
    return formatWeekOfMonthForDisplay(date, format, options);
  }

  return formatDateForDisplay(date, format);
};

/**
 * Парсит value/ввод с учётом точности (неделя месяца не должна читаться как день).
 * @param input - Строка, timestamp или Date
 * @param precision - Точность DateInput
 * @param options - Режим недели месяца
 */
export const parsePrecisionValue = (
  input: string | number | Date | null | undefined,
  precision: DateInputPrecision,
  options: DatePrecisionWeekOptions = {},
) => {
  if (precision === 'week') {
    return parseWeekOfMonthValue(input, options);
  }

  return parseDate(input);
};

/**
 * В формате месяц задан названием (`MMM` / `MMMM`), а не цифрами.
 * @param format - Шаблон dayjs
 */
export const doesFormatUseNamedMonth = (format: string): boolean => {
  return /M{3,4}/.test(format);
};

/**
 * Год для режима «только месяц»: из значения или из опорной даты.
 * @param selectedDate - Текущая выбранная дата
 * @param referenceDate - Опорная дата (обычно сегодня)
 */
export const getImplicitYearForMonthPrecision = (
  selectedDate: Date | null,
  referenceDate: Date = new Date(),
): number => {
  return selectedDate?.getFullYear() ?? referenceDate.getFullYear();
};

/**
 * Первое число месяца (локальное).
 * @param year - Год
 * @param monthIndex - Месяц 0–11
 */
export const createPeriodDate = (year: number, monthIndex = 0): Date => {
  return new Date(year, monthIndex, 1);
};

/**
 * Представительная дата внутри периода, попадающая в min/max.
 * @param periodStart - Начало периода
 * @param periodEnd - Конец периода
 * @param minDate - Нижняя граница
 * @param maxDate - Верхняя граница
 */
const clampDateIntoPeriod = (
  periodStart: Date,
  periodEnd: Date,
  minDate?: Date,
  maxDate?: Date,
): Date => {
  let representativeDate = periodStart;

  if (minDate) {
    const minDateStart = startOfCalendarDay(minDate);
    if (
      minDateStart.getTime() > representativeDate.getTime() &&
      minDateStart.getTime() <= periodEnd.getTime()
    ) {
      representativeDate = minDateStart;
    }
  }

  if (maxDate) {
    const maxDateStart = startOfCalendarDay(maxDate);
    if (representativeDate.getTime() > maxDateStart.getTime()) {
      representativeDate = maxDateStart;
    }
  }

  return representativeDate;
};

/**
 * Месяц недоступен, только если он целиком вне min/max или отключён через isDateDisabled.
 * @param year - Год месяца
 * @param monthIndex - Месяц 0–11
 * @param options - Границы и проверка даты
 */
export const isMonthPeriodDisabled = (
  year: number,
  monthIndex: number,
  options: DatePeriodDisabledOptions = {},
): boolean => {
  const monthStart = new Date(year, monthIndex, 1);
  const monthEnd = new Date(year, monthIndex + 1, 0);

  if (options.maxDate && monthStart.getTime() > startOfCalendarDay(options.maxDate).getTime()) {
    return true;
  }

  if (options.minDate && monthEnd.getTime() < startOfCalendarDay(options.minDate).getTime()) {
    return true;
  }

  if (!options.isDateDisabled) {
    return false;
  }

  const representativeDate = clampDateIntoPeriod(
    monthStart,
    monthEnd,
    options.minDate,
    options.maxDate,
  );

  return options.isDateDisabled(representativeDate);
};

/**
 * Год недоступен, только если он целиком вне min/max или отключён через isDateDisabled.
 * @param year - Год
 * @param options - Границы и проверка даты
 */
export const isYearPeriodDisabled = (
  year: number,
  options: DatePeriodDisabledOptions = {},
): boolean => {
  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31);

  if (options.maxDate && yearStart.getTime() > startOfCalendarDay(options.maxDate).getTime()) {
    return true;
  }

  if (options.minDate && yearEnd.getTime() < startOfCalendarDay(options.minDate).getTime()) {
    return true;
  }

  if (!options.isDateDisabled) {
    return false;
  }

  const representativeDate = clampDateIntoPeriod(
    yearStart,
    yearEnd,
    options.minDate,
    options.maxDate,
  );

  return options.isDateDisabled(representativeDate);
};

/**
 * Список годов для пикера.
 * @param centerYear - Год-центр, если нет min/max
 * @param options - Границы и запас лет
 */
export const buildYearList = (centerYear: number, options: BuildYearListOptions = {}): number[] => {
  const yearsBefore = options.yearsBefore ?? 80;
  const yearsAfter = options.yearsAfter ?? 20;
  const minYear = options.minDate?.getFullYear() ?? centerYear - yearsBefore;
  const maxYear = options.maxDate?.getFullYear() ?? centerYear + yearsAfter;
  const lowYear = Math.min(minYear, maxYear);
  const highYear = Math.max(minYear, maxYear);
  const years: number[] = [];

  for (let year = lowYear; year <= highYear; year += 1) {
    years.push(year);
  }

  return years;
};

/**
 * Названия месяцев в именительном падеже для пикера.
 * @param locale - Локаль Intl, например `ru-RU`
 */
export const getMonthPeriodLabels = (locale = 'ru-RU'): string[] => {
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });

  return Array.from({ length: 12 }, (_, monthIndex) =>
    monthFormatter.format(new Date(2000, monthIndex, 1)),
  );
};

/**
 * Разбирает ввод месяца: `08`, `8`, `август`, `авг`.
 * @param value - Строка сегмента или поля
 * @returns Индекс месяца 0–11 или null
 */
export const parseMonthInputValue = (value: string): number | null => {
  const trimmedValue = value.trim().toLowerCase().replace(/\./g, '');

  if (!trimmedValue) {
    return null;
  }

  if (/^\d{1,2}$/.test(trimmedValue)) {
    const monthNumber = Number.parseInt(trimmedValue, 10);
    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNumber - 1;
    }

    return null;
  }

  const months = dayjs.localeData().months();
  const monthsShort = dayjs.localeData().monthsShort();

  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    const fullName = String(months?.[monthIndex] ?? '')
      .toLowerCase()
      .replace(/\./g, '');
    const shortName = String(monthsShort?.[monthIndex] ?? '')
      .toLowerCase()
      .replace(/\./g, '');

    if (trimmedValue === fullName || trimmedValue === shortName) {
      return monthIndex;
    }

    if (fullName && (fullName.startsWith(trimmedValue) || trimmedValue.startsWith(fullName))) {
      return monthIndex;
    }
  }

  return null;
};

/**
 * Полная календарная дата с двумя разделителями (прежнее поведение поля).
 * @param value - Строка ввода
 */
export const isCompleteFullDateString = (value: string): boolean => {
  const trimmedValue = value.trim();

  if (trimmedValue.length < 10) {
    return false;
  }

  const hasDateSeparators = /[.\-/]/.test(trimmedValue);
  if (!hasDateSeparators) {
    return false;
  }

  const separatorCount = (trimmedValue.match(/[.\-/]/g) || []).length;
  if (separatorCount !== 2) {
    return false;
  }

  const digitCount = (trimmedValue.match(/\d/g) || []).length;
  if (digitCount < 8) {
    return false;
  }

  const parts = trimmedValue.split(/[.\-/]/);
  if (parts.length !== 3) {
    return false;
  }

  for (const part of parts) {
    if (!part.trim() || !/^\d+$/.test(part.trim())) {
      return false;
    }
  }

  const yearPart = parts[2]?.trim() ?? '';
  if (yearPart.length < 4) {
    return false;
  }

  return true;
};

/**
 * Проверяет, что строка состоит ровно из четырёх цифр.
 * @param value - Фрагмент строки
 */
const isFourDigitYear = (value: string): boolean => {
  if (value.length !== 4) {
    return false;
  }

  for (let digitIndex = 0; digitIndex < 4; digitIndex += 1) {
    const digitCharacter = value[digitIndex];
    if (!digitCharacter || digitCharacter < '0' || digitCharacter > '9') {
      return false;
    }
  }

  return true;
};

/**
 * Отделяет название месяца и год в конце строки без regex с backtracking.
 * Ожидает вид «август 2026»: год — последние 4 символа, перед ним пробел.
 * @param value - Строка поля
 */
const splitNamedMonthAndYear = (
  value: string,
): { monthPart: string; yearPart: string } | null => {
  if (value.length < 6) {
    return null;
  }

  const yearPart = value.slice(-4);
  if (!isFourDigitYear(yearPart)) {
    return null;
  }

  const beforeYear = value.slice(0, -4);
  const monthPart = beforeYear.trimEnd();
  if (!monthPart || monthPart.length === beforeYear.length) {
    return null;
  }

  return { monthPart, yearPart };
};

/**
 * Строка достаточно полная, чтобы парсить значение по точности.
 * @param value - Текст поля
 * @param precision - Точность DateInput
 * @param format - Формат отображения
 */
export const isCompleteDateStringByPrecision = (
  value: string,
  precision: DateInputPrecision,
  format: string,
): boolean => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return false;
  }

  if (precision === 'day') {
    return isCompleteFullDateString(trimmedValue);
  }

  if (precision === 'year') {
    return isFourDigitYear(trimmedValue);
  }

  if (precision === 'week') {
    return (
      /^\d{4}-\d{2}-W\d{1,2}$/i.test(trimmedValue) ||
      /^\d[.\-/]\d{2}[.\-/]\d{4}$/.test(trimmedValue)
    );
  }

  if (/^\d{4}-\d{2}$/.test(trimmedValue)) {
    return true;
  }

  if (/^\d{1,2}[.\-/]\d{4}$/.test(trimmedValue)) {
    return true;
  }

  if (doesFormatUseNamedMonth(format) || /[а-яёa-z]/i.test(trimmedValue)) {
    const namedWithYear = splitNamedMonthAndYear(trimmedValue);
    if (namedWithYear?.monthPart && parseMonthInputValue(namedWithYear.monthPart) !== null) {
      return true;
    }

    if (precision === 'month' && parseMonthInputValue(trimmedValue) !== null) {
      return true;
    }
  }

  return false;
};

/**
 * Маска ручного ввода в зависимости от точности и формата.
 * @param value - Сырой ввод
 * @param precision - Точность DateInput
 * @param format - Формат отображения
 */
export const formatDateInputByPrecision = (
  value: string,
  precision: DateInputPrecision,
  format: string,
): string => {
  if (doesFormatUseNamedMonth(format)) {
    return value;
  }

  const digits = value.replace(/\D/g, '');

  if (precision === 'year') {
    return digits.slice(0, 4);
  }

  if (precision === 'week') {
    const limitedDigits = digits.slice(0, 7);
    if (!limitedDigits) {
      return '';
    }
    if (limitedDigits.length <= 1) {
      return limitedDigits;
    }
    if (limitedDigits.length <= 3) {
      return `${limitedDigits.slice(0, 1)}.${limitedDigits.slice(1)}`;
    }

    return `${limitedDigits.slice(0, 1)}.${limitedDigits.slice(1, 3)}.${limitedDigits.slice(3)}`;
  }

  if (precision === 'month' || precision === 'monthYear') {
    const limitedDigits = digits.slice(0, 6);
    if (!limitedDigits) {
      return '';
    }
    if (limitedDigits.length <= 2) {
      return limitedDigits;
    }

    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2)}`;
  }

  const limitedDigits = digits.slice(0, 8);
  if (!limitedDigits) {
    return '';
  }
  if (limitedDigits.length <= 2) {
    return limitedDigits;
  }
  if (limitedDigits.length <= 4) {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2)}`;
  }

  return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2, 4)}.${limitedDigits.slice(4)}`;
};

/**
 * Сегменты поля в сегментированном режиме.
 * @param precision - Точность DateInput
 */
export const getDateInputVisibleSegments = (precision: DateInputPrecision): DateInputSegment[] => {
  switch (precision) {
    case 'year':
      return ['year'];
    case 'month':
    case 'monthYear':
      return ['month', 'year'];
    case 'week':
      return ['week', 'month', 'year'];
    default:
      return ['day', 'month', 'year'];
  }
};

/**
 * Соседний сегмент в сегментированном поле с учётом точности.
 * @param currentSegment - Текущий сегмент
 * @param direction - Направление перехода
 * @param precision - Точность DateInput
 */
export const getNeighborDateSegment = (
  currentSegment: DateInputSegment,
  direction: 'previous' | 'next',
  precision: DateInputPrecision,
): DateInputSegment | null => {
  const visibleSegments = getDateInputVisibleSegments(precision);
  const currentIndex = visibleSegments.indexOf(currentSegment);
  if (currentIndex < 0) {
    return null;
  }

  const neighborIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  return visibleSegments[neighborIndex] ?? null;
};
