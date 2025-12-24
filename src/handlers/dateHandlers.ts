import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import localeData from 'dayjs/plugin/localeData.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import 'dayjs/locale/ru.js';

// Расширяем dayjs плагинами
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(isBetween);

// Устанавливаем русскую локаль
dayjs.locale('ru');

/**
 * Хендлеры для работы с датами
 */

export interface DateParseResult {
  date: Date | null;
  isValid: boolean;
  error?: string;
}

/**
 * Проверяет, является ли дата валидной
 */
export const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime()) && date.getFullYear() >= 1900 && date.getFullYear() <= 2100;
};

/**
 * Парсит дату из различных форматов
 * Поддерживаемые форматы:
 * - DD.MM.YYYY, DD-MM-YYYY, DD/MM/YYYY
 * - YYYY-MM-DD, YYYY.MM.DD, YYYY/MM/DD
 * - ISO строки (с временем и часовым поясом)
 * - Timestamp (число или строка)
 * - UTC строки
 * - Объект Date
 */
export const parseDate = (input: string | number | Date | null | undefined): DateParseResult => {
  // Обработка null/undefined
  if (input === null || input === undefined) {
    return { date: null, isValid: false, error: 'Пустое значение' };
  }

  // Если это уже Date объект
  if (input instanceof Date) {
    const dayjsDate = dayjs(input);
    return {
      date: dayjsDate.isValid() ? input : null,
      isValid: dayjsDate.isValid(),
      error: dayjsDate.isValid() ? undefined : 'Некорректная дата',
    };
  }

  // Если это число (timestamp)
  if (typeof input === 'number') {
    const dayjsDate = dayjs(input);
    return {
      date: dayjsDate.isValid() ? dayjsDate.toDate() : null,
      isValid: dayjsDate.isValid(),
      error: dayjsDate.isValid() ? undefined : 'Некорректный timestamp',
    };
  }

  // Если это строка
  if (typeof input === 'string') {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return { date: null, isValid: false, error: 'Пустая строка' };
    }

    // 1. Сначала парсим кастомные форматы дат
    const customDate = parseCustomDateFormats(trimmedInput);
    if (customDate && customDate.isValid()) {
      return {
        date: customDate.toDate(),
        isValid: true,
      };
    }

    // 2. Пробуем парсить как ISO строку (включая с временем и часовым поясом)
    let dayjsDate = dayjs(trimmedInput);
    if (dayjsDate.isValid()) {
      return {
        date: dayjsDate.toDate(),
        isValid: true,
      };
    }

    // 3. Пробуем парсить как timestamp (строка)
    const timestamp = parseInt(trimmedInput, 10);
    if (!isNaN(timestamp)) {
      dayjsDate = dayjs(timestamp);
      if (dayjsDate.isValid()) {
        return {
          date: dayjsDate.toDate(),
          isValid: true,
        };
      }
    }

    return {
      date: null,
      isValid: false,
      error: 'Неподдерживаемый формат даты',
    };
  }

  return {
    date: null,
    isValid: false,
    error: 'Неподдерживаемый тип данных',
  };
};

/**
 * Парсит кастомные форматы дат с помощью dayjs
 */
const parseCustomDateFormats = (input: string): dayjs.Dayjs | null => {
  // Поддерживаемые форматы (приоритет европейскому формату)
  const formats = [
    // Форматы с временем
    'DD.MM.YYYY HH:mm',
    'DD.MM.YYYY HH:mm:ss',
    'DD-MM-YYYY HH:mm',
    'DD-MM-YYYY HH:mm:ss',
    'DD/MM/YYYY HH:mm',
    'DD/MM/YYYY HH:mm:ss',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY.MM.DD HH:mm',
    'YYYY.MM.DD HH:mm:ss',
    'YYYY/MM/DD HH:mm',
    'YYYY/MM/DD HH:mm:ss',
    // Форматы только с датой
    'DD.MM.YYYY',
    'DD-MM-YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'YYYY.MM.DD',
    'YYYY/MM/DD',
  ];

  for (const format of formats) {
    const parsed = dayjs(input, format, true); // strict mode
    if (parsed.isValid()) {
      return parsed;
    }
  }

  return null;
};

/**
 * Форматирует дату в строку для отображения (только дата, без времени)
 */
export const formatDateForDisplay = (date: Date | null, format: string = 'DD.MM.YYYY'): string => {
  if (!date) {
    return '';
  }

  const dayjsDate = dayjs(date);
  if (!dayjsDate.isValid()) {
    return '';
  }

  return dayjsDate.format(format);
};

/**
 * Парсит диапазон дат из строки формата "DD.MM.YYYY — DD.MM.YYYY"
 */
export const parseDateRange = (input: string): { start: Date | null; end: Date | null } => {
  const rangeSeparator = '—';
  const parts = input.split(rangeSeparator);

  if (parts.length !== 2) {
    return { start: null, end: null };
  }

  const startResult = parseDate(parts[0].trim());
  const endResult = parseDate(parts[1].trim());

  return {
    start: startResult.isValid ? startResult.date : null,
    end: endResult.isValid ? endResult.date : null,
  };
};

/**
 * Преобразует дату в ISO строку (только дата, без времени)
 */
export const toISODateString = (date: Date | null): string => {
  if (!date) {
    return '';
  }

  const dayjsDate = dayjs(date);
  if (!dayjsDate.isValid()) {
    return '';
  }

  return dayjsDate.format('YYYY-MM-DD');
};

/**
 * Получает текущую дату без времени
 */
export const getCurrentDate = (): Date => {
  return dayjs().startOf('day').toDate();
};

/**
 * Проверяет, является ли дата сегодняшней
 */
export const isToday = (date: Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

/**
 * Получает количество дней в месяце для календаря
 */
export const getDaysInMonth = (date: Date): Date[] => {
  const dayjsDate = dayjs(date);
  const year = dayjsDate.year();
  const month = dayjsDate.month();

  // Получаем первый день месяца
  const firstDay = dayjs().year(year).month(month).startOf('month');

  // Получаем последний день месяца
  const lastDay = dayjs().year(year).month(month).endOf('month');

  // Получаем день недели первого дня (0 = воскресенье, 1 = понедельник)
  const firstDayOfWeek = firstDay.day();

  // Корректируем для начала недели с понедельника
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const days: Date[] = [];

  // Добавляем дни предыдущего месяца
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push(firstDay.subtract(i + 1, 'day').toDate());
  }

  // Добавляем дни текущего месяца
  for (let i = 0; i < lastDay.date(); i++) {
    days.push(firstDay.add(i, 'day').toDate());
  }

  // Добавляем дни следующего месяца для заполнения сетки
  const remainingDays = 42 - days.length; // 6 недель * 7 дней
  for (let i = 1; i <= remainingDays; i++) {
    days.push(lastDay.add(i, 'day').toDate());
  }

  return days;
};

/**
 * Получает название месяца и года для отображения
 */
export const getMonthYearDisplay = (date: Date): string => {
  return dayjs(date).format('MMMM YYYY г.');
};

/**
 * Получает короткие названия дней недели
 */
export const getWeekdayNames = (): string[] => {
  return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
};

/**
 * Проверяет, находится ли дата в диапазоне
 */
export const isInRange = (date: Date, start: Date, end: Date): boolean => {
  const dayjsDate = dayjs(date);
  const dayjsStart = dayjs(start);
  const dayjsEnd = dayjs(end);

  return dayjsDate.isBetween(dayjsStart, dayjsEnd, 'day', '[]'); // включая границы
};

/**
 * Проверяет, является ли дата началом диапазона
 */
export const isRangeStart = (date: Date, start: Date): boolean => {
  return dayjs(date).isSame(dayjs(start), 'day');
};

/**
 * Проверяет, является ли дата концом диапазона
 */
export const isRangeEnd = (date: Date, end: Date): boolean => {
  return dayjs(date).isSame(dayjs(end), 'day');
};

/**
 * Проверяет, является ли дата текущего месяца
 */
export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return dayjs(date).isSame(dayjs(currentDate), 'month');
};
