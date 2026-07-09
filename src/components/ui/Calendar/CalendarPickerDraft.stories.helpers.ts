import { toISODateString } from '../../../handlers/dateHandlers';
import type { DatePickerDraftContext, DateTimeRange } from '../../../types/ui';

/**
 * Модификатор черновика: конец диапазона = начало + указанное число дней.
 * @param dayOffset — смещение в днях от даты начала
 */
export function createCalendarRangeEndPlusDaysModifier(dayOffset: number) {
  return (
    draft: string | DateTimeRange,
    _context?: DatePickerDraftContext,
  ): DateTimeRange | undefined => {
    if (typeof draft !== 'object' || !draft.start) {
      return undefined;
    }

    const startDate = new Date(draft.start);
    if (Number.isNaN(startDate.getTime())) {
      return undefined;
    }

    const autoEndDate = new Date(startDate);
    autoEndDate.setDate(autoEndDate.getDate() + dayOffset);

    return {
      start: draft.start,
      end: toISODateString(autoEndDate),
    };
  };
}

/**
 * Форматирует черновик для отображения в сторис Calendar.
 * @param draft — значение из `onPickerChange`
 * @param range — режим диапазона
 */
export function formatCalendarPickerDraftForDisplay(
  draft: string | DateTimeRange,
  range: boolean,
): string {
  if (!range) {
    return typeof draft === 'string' && draft ? draft : '—';
  }

  if (typeof draft !== 'object') {
    return '—';
  }

  return `${draft.start || '—'} → ${draft.end || '—'}`;
}
