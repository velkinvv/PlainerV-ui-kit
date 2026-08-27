import { formatDateByPrecision, parsePrecisionValue } from './dateInputPrecisionHandlers';
import type {
  DateInputPrecision,
  DatePickerDraftContext,
  DatePickerDraftPhase,
  DateTimeRange,
  WeekOfMonthMode,
} from '../types/ui';

export type { DatePickerDraftContext, DatePickerDraftPhase };

/** Черновик дат внутри пикера (объекты Date) */
export interface DatePickerDraftDates {
  /** Одиночная дата */
  selectedDate: Date | null;
  /** Начало диапазона */
  rangeStart: Date | null;
  /** Конец диапазона */
  rangeEnd: Date | null;
}

/**
 * Преобразует черновик пикера в значение API (`onChange` / колбэки).
 * @param draftDates — даты черновика
 * @param range — режим диапазона
 * @param precision — точность значения (`day` по умолчанию)
 * @param weekOfMonthMode — нумерация недель при `precision="week"`
 */
export function buildDatePickerDraftValue(
  draftDates: DatePickerDraftDates,
  range: boolean,
  precision: DateInputPrecision = 'day',
  weekOfMonthMode: WeekOfMonthMode = 'calendar',
): string | DateTimeRange {
  const weekOptions = { weekOfMonthMode };

  if (!range) {
    return formatDateByPrecision(draftDates.selectedDate, precision, weekOptions);
  }

  return {
    start: formatDateByPrecision(draftDates.rangeStart, precision, weekOptions),
    end: formatDateByPrecision(draftDates.rangeEnd, precision, weekOptions),
  };
}

/**
 * Парсит значение черновика обратно в даты пикера.
 * @param draft — строка или диапазон в формате `onChange`
 * @param range — режим диапазона
 * @param options.precision — точность значения
 * @param options.weekOfMonthMode — нумерация недель
 */
export function parseDatePickerDraftValue(
  draft: string | DateTimeRange,
  range: boolean,
  options: { precision?: DateInputPrecision; weekOfMonthMode?: WeekOfMonthMode } = {},
): DatePickerDraftDates {
  const precision = options.precision ?? 'day';
  const weekOfMonthMode = options.weekOfMonthMode ?? 'calendar';

  if (!range) {
    if (typeof draft !== 'string') {
      return { selectedDate: null, rangeStart: null, rangeEnd: null };
    }

    const parsedResult = parsePrecisionValue(draft, precision, { weekOfMonthMode });
    return {
      selectedDate: parsedResult.isValid ? parsedResult.date : null,
      rangeStart: null,
      rangeEnd: null,
    };
  }

  if (typeof draft !== 'object') {
    return { selectedDate: null, rangeStart: null, rangeEnd: null };
  }

  const startResult = parsePrecisionValue(draft.start, precision, { weekOfMonthMode });
  const endResult = parsePrecisionValue(draft.end, precision, { weekOfMonthMode });

  return {
    selectedDate: null,
    rangeStart: startResult.isValid ? startResult.date : null,
    rangeEnd: endResult.isValid ? endResult.date : null,
  };
}

/**
 * Следующий черновик диапазона после клика по дню календаря.
 * @param clickedDate — выбранный день
 * @param currentRangeStart — текущее начало диапазона
 * @param currentRangeEnd — текущий конец диапазона
 */
export function computeRangeDatesAfterDayClick(
  clickedDate: Date,
  currentRangeStart: Date | null,
  currentRangeEnd: Date | null,
): DatePickerDraftDates {
  if (!currentRangeStart || (currentRangeStart && currentRangeEnd)) {
    return {
      selectedDate: null,
      rangeStart: clickedDate,
      rangeEnd: null,
    };
  }

  if (clickedDate < currentRangeStart) {
    return {
      selectedDate: null,
      rangeStart: clickedDate,
      rangeEnd: currentRangeStart,
    };
  }

  return {
    selectedDate: null,
    rangeStart: currentRangeStart,
    rangeEnd: clickedDate,
  };
}

/**
 * Параметры {@link resolveDatePickerDraft}.
 */
export interface ResolveDatePickerDraftOptions {
  /** Черновик до модификации */
  draftDates: DatePickerDraftDates;
  /** Режим диапазона */
  range: boolean;
  /** Формат поля */
  format: string;
  /** Точность значения API */
  precision?: DateInputPrecision;
  /** Нумерация недель при `precision="week"` */
  weekOfMonthMode?: WeekOfMonthMode;
  /** Фаза изменения */
  phase: DatePickerDraftPhase;
  /** Модификатор черновика; верните новое значение или `undefined`, чтобы оставить как есть */
  modifyPickerValue?: (
    draft: string | DateTimeRange,
    context: DatePickerDraftContext,
  ) => string | DateTimeRange | undefined;
  /** Уведомление о черновике без применения в `onChange` поля */
  onPickerChange?: (draft: string | DateTimeRange, context: DatePickerDraftContext) => void;
}

/**
 * Применяет модификатор и уведомляет `onPickerChange`; возвращает итоговые даты пикера.
 * @param options — черновик, колбэки и контекст
 */
export function resolveDatePickerDraft(
  options: ResolveDatePickerDraftOptions,
): DatePickerDraftDates {
  const context: DatePickerDraftContext = {
    phase: options.phase,
    range: options.range,
    format: options.format,
  };

  let draftValue = buildDatePickerDraftValue(
    options.draftDates,
    options.range,
    options.precision ?? 'day',
    options.weekOfMonthMode ?? 'calendar',
  );

  if (options.modifyPickerValue) {
    const modifiedDraft = options.modifyPickerValue(draftValue, context);
    if (modifiedDraft !== undefined) {
      draftValue = modifiedDraft;
    }
  }

  options.onPickerChange?.(draftValue, context);

  return parseDatePickerDraftValue(draftValue, options.range, {
    precision: options.precision,
    weekOfMonthMode: options.weekOfMonthMode,
  });
}

/**
 * Синхронизирует черновик пикера из контролируемого `value`.
 * @param value — значение поля
 * @param range — режим диапазона
 * @param options.precision — точность значения
 * @param options.weekOfMonthMode — нумерация недель
 */
export function datePickerDraftDatesFromValue(
  value: string | DateTimeRange | undefined,
  range: boolean,
  options: { precision?: DateInputPrecision; weekOfMonthMode?: WeekOfMonthMode } = {},
): DatePickerDraftDates {
  const precision = options.precision ?? 'day';
  const weekOfMonthMode = options.weekOfMonthMode ?? 'calendar';

  if (!range) {
    if (typeof value === 'string' && value) {
      const parsedResult = parsePrecisionValue(value, precision, { weekOfMonthMode });
      return {
        selectedDate: parsedResult.isValid ? parsedResult.date : null,
        rangeStart: null,
        rangeEnd: null,
      };
    }

    return { selectedDate: null, rangeStart: null, rangeEnd: null };
  }

  if (typeof value === 'object' && value) {
    const startResult = parsePrecisionValue(value.start, precision, { weekOfMonthMode });
    const endResult = parsePrecisionValue(value.end, precision, { weekOfMonthMode });

    return {
      selectedDate: null,
      rangeStart: startResult.isValid ? startResult.date : null,
      rangeEnd: endResult.isValid ? endResult.date : null,
    };
  }

  return { selectedDate: null, rangeStart: null, rangeEnd: null };
}
