/**
 * Расчёты для роллеров день / месяц / год (без React).
 */

export type DateRollerNumericItem = {
  /** Подпись в колонке */
  label: string;
  /** Числовое значение (день 1..31, месяц 0..11, год) */
  value: number;
};

/** Число дней в месяце (month — индекс 0..11 как в `Date`) */
export const getDaysInMonthCount = (year: number, monthIndex0: number): number => {
  return new Date(year, monthIndex0 + 1, 0).getDate();
};

/** Ограничивает день границами месяца */
export const clampDayForMonth = (year: number, monthIndex0: number, day: number): number => {
  const max = getDaysInMonthCount(year, monthIndex0);
  return Math.min(Math.max(1, Math.floor(day)), max);
};

/**
 * Собирает дату из частей и нормализует день под длину месяца.
 * @param year - Год.
 * @param monthIndex0 - Месяц 0..11.
 * @param day - Желаемый день месяца.
 */
export const composeNormalizedDate = (year: number, monthIndex0: number, day: number): Date => {
  const d = clampDayForMonth(year, monthIndex0, day);
  return new Date(year, monthIndex0, d);
};

/**
 * Обрезает календарную дату по min/max (сравнение по UTC-локальным полям дня).
 * @param date - Дата для обрезки.
 * @param minDate - Нижняя граница (опционально).
 * @param maxDate - Верхняя граница (опционально).
 */
export const clampDateToMinMaxCalendar = (date: Date, minDate?: Date, maxDate?: Date): Date => {
  let t = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  if (minDate) {
    const minT = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
    if (t < minT) {
      t = minT;
    }
  }
  if (maxDate) {
    const maxT = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
    if (t > maxT) {
      t = maxT;
    }
  }
  return new Date(t);
};

/**
 * Список дней для роллера текущего месяца/года.
 * @param year - Год.
 * @param monthIndex0 - Месяц 0..11.
 */
export const buildDayRollerItems = (year: number, monthIndex0: number): DateRollerNumericItem[] => {
  const n = getDaysInMonthCount(year, monthIndex0);
  const out: DateRollerNumericItem[] = [];
  for (let d = 1; d <= n; d += 1) {
    out.push({ label: String(d), value: d });
  }
  return out;
};

/**
 * 12 месяцев с подписями по локали.
 * @param locale - Локаль `Intl` (например `ru-RU`).
 */
export const buildMonthRollerItems = (locale: string): DateRollerNumericItem[] => {
  const fmt = new Intl.DateTimeFormat(locale, { month: 'long' });
  const out: DateRollerNumericItem[] = [];
  for (let m = 0; m < 12; m += 1) {
    out.push({
      label: fmt.format(new Date(2020, m, 1)),
      value: m,
    });
  }
  return out;
};

/**
 * Список лет в диапазоне min..max по году календаря.
 * @param minDate - Нижняя граница (опционально).
 * @param maxDate - Верхняя граница (опционально).
 * @param anchorYear - Якорный год, если границы не заданы (расширяем ±80 от него).
 */
export const buildYearRollerItems = (
  minDate?: Date,
  maxDate?: Date,
  anchorYear?: number,
): DateRollerNumericItem[] => {
  const anchor = anchorYear ?? new Date().getFullYear();
  const minY = minDate?.getFullYear() ?? anchor - 80;
  const maxY = maxDate?.getFullYear() ?? anchor + 20;
  const lo = Math.min(minY, maxY);
  const hi = Math.max(minY, maxY);
  const out: DateRollerNumericItem[] = [];
  for (let y = lo; y <= hi; y += 1) {
    out.push({ label: String(y), value: y });
  }
  return out;
};
