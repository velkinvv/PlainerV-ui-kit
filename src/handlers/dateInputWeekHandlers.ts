import { parseDate, type DateParseResult } from './dateHandlers';
import type { WeekOfMonthMode } from '../types/ui';

export type { WeekOfMonthMode };

/** Неделя внутри конкретного месяца */
export interface MonthWeekPeriod {
  /** Номер недели в месяце, с 1 */
  weekNumber: number;
  /** Первый день недели, принадлежащий месяцу */
  startDate: Date;
  /** Последний день недели, принадлежащий месяцу */
  endDate: Date;
}

/** Параметры расчёта недель месяца */
export interface GetMonthWeeksOptions {
  /** `calendar` — с понедельника; `chunks` — семёрки от 1-го */
  weekOfMonthMode?: WeekOfMonthMode;
  /** Начало календарной недели: 0 — воскресенье, 1 — понедельник */
  weekStartsOn?: 0 | 1;
}

/**
 * Календарный день без времени.
 * @param date - Исходная дата
 */
const startOfCalendarDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Понедельник (или воскресенье) недели, в которую попадает дата.
 * @param date - Любой день недели
 * @param weekStartsOn - 0 — воскресенье, 1 — понедельник
 */
export const startOfCalendarWeek = (date: Date, weekStartsOn: 0 | 1 = 1): Date => {
  const dayOfWeek = date.getDay();
  const offsetFromWeekStart =
    weekStartsOn === 1 ? (dayOfWeek === 0 ? 6 : dayOfWeek - 1) : dayOfWeek;

  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - offsetFromWeekStart);
};

/**
 * Сравнивает две даты как календарные дни.
 * @param leftDate - Первая дата
 * @param rightDate - Вторая дата
 */
const isSameOrBeforeDay = (leftDate: Date, rightDate: Date): boolean => {
  return startOfCalendarDay(leftDate).getTime() <= startOfCalendarDay(rightDate).getTime();
};

/**
 * Недели месяца: календарные с понедельника или фиксированные семёрки от 1-го.
 * @param year - Год
 * @param monthIndex - Месяц 0–11
 * @param options - Режим нумерации и начало недели
 */
export const getMonthWeeks = (
  year: number,
  monthIndex: number,
  options: GetMonthWeeksOptions = {},
): MonthWeekPeriod[] => {
  const weekOfMonthMode = options.weekOfMonthMode ?? 'calendar';
  const weekStartsOn = options.weekStartsOn ?? 1;
  const monthStart = new Date(year, monthIndex, 1);
  const monthEnd = new Date(year, monthIndex + 1, 0);

  if (weekOfMonthMode === 'chunks') {
    const weeks: MonthWeekPeriod[] = [];
    const daysInMonth = monthEnd.getDate();

    for (let weekNumber = 1; weekNumber <= 5; weekNumber += 1) {
      const chunkStartDay = (weekNumber - 1) * 7 + 1;
      if (chunkStartDay > daysInMonth) {
        break;
      }

      const chunkEndDay = Math.min(chunkStartDay + 6, daysInMonth);
      weeks.push({
        weekNumber,
        startDate: new Date(year, monthIndex, chunkStartDay),
        endDate: new Date(year, monthIndex, chunkEndDay),
      });
    }

    return weeks;
  }

  const weeks: MonthWeekPeriod[] = [];
  let cursor = startOfCalendarWeek(monthStart, weekStartsOn);
  let weekNumber = 1;

  while (isSameOrBeforeDay(cursor, monthEnd)) {
    const calendarWeekEnd = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 6);
    const clippedStart = isSameOrBeforeDay(cursor, monthStart) ? monthStart : cursor;
    const clippedEnd = isSameOrBeforeDay(monthEnd, calendarWeekEnd) ? monthEnd : calendarWeekEnd;

    if (isSameOrBeforeDay(clippedStart, clippedEnd)) {
      weeks.push({
        weekNumber,
        startDate: clippedStart,
        endDate: clippedEnd,
      });
      weekNumber += 1;
    }

    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7);
  }

  return weeks;
};

/**
 * Неделя месяца, в которую попадает дата.
 * @param date - Дата внутри месяца
 * @param options - Режим нумерации
 */
export const getWeekOfMonthFromDate = (
  date: Date,
  options: GetMonthWeeksOptions = {},
): MonthWeekPeriod | null => {
  const weeks = getMonthWeeks(date.getFullYear(), date.getMonth(), options);
  const dayTime = startOfCalendarDay(date).getTime();

  return (
    weeks.find(
      (week) =>
        dayTime >= startOfCalendarDay(week.startDate).getTime() &&
        dayTime <= startOfCalendarDay(week.endDate).getTime(),
    ) ?? null
  );
};

/**
 * Каноническая строка недели: `YYYY-MM-W2`.
 * @param date - Любой день выбранной недели
 * @param options - Режим нумерации
 */
export const formatWeekOfMonthValue = (
  date: Date | null,
  options: GetMonthWeeksOptions = {},
): string => {
  if (!date) {
    return '';
  }

  const week = getWeekOfMonthFromDate(date, options);
  if (!week) {
    return '';
  }

  const monthNumber = String(week.startDate.getMonth() + 1).padStart(2, '0');
  return `${week.startDate.getFullYear()}-${monthNumber}-W${week.weekNumber}`;
};

/**
 * Первое число недели месяца по номеру.
 * @param year - Год
 * @param monthIndex - Месяц 0–11
 * @param weekNumber - Номер недели с 1
 * @param options - Режим нумерации
 */
export const getMonthWeekByNumber = (
  year: number,
  monthIndex: number,
  weekNumber: number,
  options: GetMonthWeeksOptions = {},
): MonthWeekPeriod | null => {
  return (
    getMonthWeeks(year, monthIndex, options).find((week) => week.weekNumber === weekNumber) ?? null
  );
};

/**
 * Разбирает `YYYY-MM-W2` или отображаемый `2.08.2026`.
 * @param value - Строка API или поля
 * @param options - Режим нумерации
 */
export const parseWeekOfMonthString = (
  value: string,
  options: GetMonthWeeksOptions = {},
): Date | null => {
  const trimmedValue = value.trim();
  const apiMatch = /^(\d{4})-(\d{2})-W(\d{1,2})$/i.exec(trimmedValue);

  if (apiMatch) {
    const year = Number(apiMatch[1]);
    const monthIndex = Number(apiMatch[2]) - 1;
    const weekNumber = Number(apiMatch[3]);
    return getMonthWeekByNumber(year, monthIndex, weekNumber, options)?.startDate ?? null;
  }

  const displayMatch = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/.exec(trimmedValue);
  if (displayMatch) {
    const weekNumber = Number(displayMatch[1]);
    const monthIndex = Number(displayMatch[2]) - 1;
    const year = Number(displayMatch[3]);

    if (weekNumber >= 1 && weekNumber <= 6 && monthIndex >= 0 && monthIndex <= 11) {
      const week = getMonthWeekByNumber(year, monthIndex, weekNumber, options);
      if (week) {
        return week.startDate;
      }
    }
  }

  return null;
};

/**
 * Парсит значение недели; иначе обычная дата, сведённая к началу своей недели месяца.
 * @param input - Строка, timestamp или Date
 * @param options - Режим нумерации
 */
export const parseWeekOfMonthValue = (
  input: string | number | Date | null | undefined,
  options: GetMonthWeeksOptions = {},
): DateParseResult => {
  if (typeof input === 'string') {
    const weekDate = parseWeekOfMonthString(input, options);
    if (weekDate) {
      return { date: weekDate, isValid: true };
    }
  }

  const parsedResult = parseDate(input);
  if (!parsedResult.isValid || !parsedResult.date) {
    return parsedResult;
  }

  const week = getWeekOfMonthFromDate(parsedResult.date, options);
  if (!week) {
    return { date: null, isValid: false, error: 'Некорректная неделя месяца' };
  }

  return { date: week.startDate, isValid: true };
};

/**
 * Подпись диапазона дней недели, например `1–3 авг`.
 * @param week - Неделя месяца
 * @param locale - Локаль Intl
 */
export const formatMonthWeekRangeLabel = (week: MonthWeekPeriod, locale = 'ru-RU'): string => {
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'short' });
  const startDay = week.startDate.getDate();
  const endDay = week.endDate.getDate();
  const monthLabel = monthFormatter.format(week.startDate).replace('.', '');

  if (startDay === endDay) {
    return `${startDay} ${monthLabel}`;
  }

  return `${startDay}–${endDay} ${monthLabel}`;
};

/**
 * Порядковый номер недели: `1-я`, `2-я`.
 * @param weekNumber - Номер с 1
 */
export const formatWeekOfMonthOrdinal = (weekNumber: number): string => {
  return `${weekNumber}-я`;
};

/**
 * Отображение недели в поле. Токен `Wo` — «2-я», `W` — номер.
 * @param date - День внутри недели
 * @param format - Шаблон (`W.MM.YYYY` по умолчанию)
 * @param options - Режим нумерации
 */
export const formatWeekOfMonthForDisplay = (
  date: Date | null,
  format = 'W.MM.YYYY',
  options: GetMonthWeeksOptions = {},
): string => {
  if (!date) {
    return '';
  }

  const week = getWeekOfMonthFromDate(date, options);
  if (!week) {
    return '';
  }

  const year = week.startDate.getFullYear();
  const monthIndex = week.startDate.getMonth();
  const monthPadded = String(monthIndex + 1).padStart(2, '0');
  const longMonth = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(week.startDate);
  const shortMonth = new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(week.startDate);

  return format
    .replace(/Wo/g, formatWeekOfMonthOrdinal(week.weekNumber))
    .replace(/W/g, String(week.weekNumber))
    .replace(/YYYY/g, String(year))
    .replace(/MMMM/g, longMonth)
    .replace(/MMM/g, shortMonth)
    .replace(/MM/g, monthPadded);
};

/**
 * Неделя недоступна, только если она целиком вне min/max.
 * @param week - Неделя месяца
 * @param options.minDate - Нижняя граница
 * @param options.maxDate - Верхняя граница
 * @param options.isDateDisabled - Проверка представительного дня
 */
export const isWeekPeriodDisabled = (
  week: MonthWeekPeriod,
  options: {
    minDate?: Date;
    maxDate?: Date;
    isDateDisabled?: (date: Date) => boolean;
  } = {},
): boolean => {
  if (options.maxDate && week.startDate.getTime() > startOfCalendarDay(options.maxDate).getTime()) {
    return true;
  }

  if (options.minDate && week.endDate.getTime() < startOfCalendarDay(options.minDate).getTime()) {
    return true;
  }

  if (!options.isDateDisabled) {
    return false;
  }

  let representativeDate = week.startDate;
  if (options.minDate) {
    const minDateStart = startOfCalendarDay(options.minDate);
    if (
      minDateStart.getTime() > representativeDate.getTime() &&
      minDateStart.getTime() <= week.endDate.getTime()
    ) {
      representativeDate = minDateStart;
    }
  }

  return options.isDateDisabled(representativeDate);
};
