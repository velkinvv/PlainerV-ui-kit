import { isInRange, isRangeEnd, isRangeStart } from '../../../handlers/dateHandlers';

/**
 * Чистые функции для построения сетки календаря и ограничений по диапазону дат.
 * Локализация подписей — через `Intl` в компоненте; здесь только расчёты на `Date`.
 */

/** Первый день месяца для переданной даты */
export const startOfMonth = (d: Date): Date => {
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

/** Сдвиг на N месяцев от переданной даты (день обрезается до 1-го) */
export const addMonths = (d: Date, delta: number): Date => {
  const y = d.getFullYear();
  const m = d.getMonth() + delta;
  return new Date(y, m, 1);
};

/**
 * Смещение от понедельника до первого дня месяца (0 = месяц начинается с пн).
 * @param firstOfMonth - Первое число месяца.
 * @param weekStartsOn - 0 — воскресенье, 1 — понедельник.
 */
export const getMonthStartOffset = (firstOfMonth: Date, weekStartsOn: 0 | 1): number => {
  const dow = firstOfMonth.getDay();
  if (weekStartsOn === 1) {
    return (dow + 6) % 7;
  }
  return dow;
};

export type CalendarCell = {
  /** Дата ячейки (всегда полноценный день) */
  date: Date;
  /** Принадлежит ли дата видимому месяцу */
  inCurrentMonth: boolean;
};

/**
 * Сетка 6×7 (42 ячейки) от первого видимого дня до последнего.
 * @param visibleMonth - Любая дата внутри отображаемого месяца.
 * @param weekStartsOn - Первый столбец: 0 — вс, 1 — пн.
 */
export const buildCalendarGrid = (visibleMonth: Date, weekStartsOn: 0 | 1): CalendarCell[] => {
  const first = startOfMonth(visibleMonth);
  const offset = getMonthStartOffset(first, weekStartsOn);
  const start = new Date(first);
  start.setDate(1 - offset);

  const cells: CalendarCell[] = [];
  const cur = new Date(start);
  const targetMonth = visibleMonth.getMonth();
  const targetYear = visibleMonth.getFullYear();

  for (let i = 0; i < 42; i += 1) {
    cells.push({
      date: new Date(cur),
      inCurrentMonth: cur.getMonth() === targetMonth && cur.getFullYear() === targetYear,
    });
    cur.setDate(cur.getDate() + 1);
  }
  return cells;
};

/**
 * Сравнение календарных дат (год-месяц-день), без учёта времени.
 */
export const isSameCalendarDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/** Флаги подсветки ячейки в режиме выбора диапазона */
export type CalendarRangeDayFlags = {
  /** День строго между началом и концом (не граница) */
  inRange: boolean;
  /** Совпадает с началом диапазона */
  rangeStart: boolean;
  /** Совпадает с концом диапазона или с датой предпросмотра при наведении */
  rangeEnd: boolean;
};

/**
 * Вычисляет подсветку дня для режима `range` (границы и «хвост» при hover).
 * @param dayOnly - Дата дня (без времени).
 * @param selectionMode - Режим выбора календаря.
 * @param rangeStart - Начало диапазона.
 * @param rangeEnd - Зафиксированный конец (если есть).
 * @param rangeHoverDate - Предпросмотр конца при наведении, пока конец не выбран.
 */
export const getRangeDayVisualFlags = (
  dayOnly: Date,
  selectionMode: 'single' | 'range',
  rangeStart: Date | null | undefined,
  rangeEnd: Date | null | undefined,
  rangeHoverDate: Date | null | undefined,
): CalendarRangeDayFlags => {
  if (selectionMode !== 'range' || !rangeStart) {
    return { inRange: false, rangeStart: false, rangeEnd: false };
  }
  const effectiveEnd = rangeEnd ?? rangeHoverDate ?? null;
  if (!effectiveEnd) {
    return {
      inRange: false,
      rangeStart: isRangeStart(dayOnly, rangeStart),
      rangeEnd: false,
    };
  }
  const atStart = isRangeStart(dayOnly, rangeStart);
  const atEnd = isRangeEnd(dayOnly, effectiveEnd);
  const inMid = isInRange(dayOnly, rangeStart, effectiveEnd) && !atStart && !atEnd;
  return { inRange: inMid, rangeStart: atStart, rangeEnd: atEnd };
};

/**
 * Ограничение «первого числа видимого месяца» границами min/max (по месяцам).
 * @param visible - Текущий видимый месяц (любой день).
 * @param minDate - Нижняя граница (опционально).
 * @param maxDate - Верхняя граница (опционально).
 */
export const clampVisibleMonthStart = (visible: Date, minDate?: Date, maxDate?: Date): Date => {
  let v = startOfMonth(visible);
  if (minDate) {
    const minM = startOfMonth(minDate);
    if (v.getTime() < minM.getTime()) {
      v = minM;
    }
  }
  if (maxDate) {
    const maxM = startOfMonth(maxDate);
    if (v.getTime() > maxM.getTime()) {
      v = maxM;
    }
  }
  return v;
};

/**
 * Дата вне диапазона [minDate, maxDate] по календарному дню.
 */
export const isDateOutsideMinMax = (d: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate) {
    const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (t.getTime() < min.getTime()) {
      return true;
    }
  }
  if (maxDate) {
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (t.getTime() > max.getTime()) {
      return true;
    }
  }
  return false;
};

/** Ключ месяца для значения в выпадающем списке */
export const monthYearKey = (d: Date): string => {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  return `${y}-${String(m).padStart(2, '0')}`;
};

/** Парсинг ключа `YYYY-MM` в дату первого числа */
export const parseMonthYearKey = (key: string): Date | null => {
  const m = /^(\d{4})-(\d{2})$/.exec(key);
  if (!m) {
    return null;
  }
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  if (mo < 0 || mo > 11 || Number.isNaN(y)) {
    return null;
  }
  return new Date(y, mo, 1);
};

export type MonthYearOption = {
  /** Значение для `Dropdown` (`YYYY-MM`) */
  value: string;
  /** Подпись пункта */
  label: string;
  /** Первое число месяца */
  monthStart: Date;
};

/**
 * Список месяцев вокруг центра для выпадающего списка.
 * @param centerMonth - Центр диапазона (первое число месяца).
 * @param before - Сколько месяцев назад включить.
 * @param after - Сколько месяцев вперёд включить.
 * @param locale - Локаль для `Intl` (например `ru-RU`).
 * @param minDate - Обрезка снизу.
 * @param maxDate - Обрезка сверху.
 */
/**
 * Короткие подписи дней недели в порядке столбцов сетки.
 * @param locale - Локаль `Intl`.
 * @param weekStartsOn - 0 — с воскресенья, 1 — с понедельника.
 */
export const getWeekdayLabels = (locale: string, weekStartsOn: 0 | 1): string[] => {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const anchor = weekStartsOn === 1 ? new Date(2024, 0, 1) : new Date(2024, 0, 7);
  const out: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(anchor);
    d.setDate(anchor.getDate() + i);
    out.push(fmt.format(d));
  }
  return out;
};

export const buildMonthYearOptions = (
  centerMonth: Date,
  before: number,
  after: number,
  locale: string,
  minDate?: Date,
  maxDate?: Date,
): MonthYearOption[] => {
  const center = startOfMonth(centerMonth);
  const start = addMonths(center, -before);
  const end = addMonths(center, after);
  let cur = startOfMonth(start);
  const endM = startOfMonth(end);

  const monthFmt = new Intl.DateTimeFormat(locale, { month: 'long' });
  const yearFmt = new Intl.DateTimeFormat(locale, { year: 'numeric' });
  const out: MonthYearOption[] = [];

  while (cur.getTime() <= endM.getTime()) {
    if (!isDateOutsideMinMax(cur, minDate, maxDate)) {
      const label = `${monthFmt.format(cur)} ${yearFmt.format(cur)}`;
      out.push({
        value: monthYearKey(cur),
        label,
        monthStart: new Date(cur),
      });
    }
    cur = addMonths(cur, 1);
  }
  return out;
};
