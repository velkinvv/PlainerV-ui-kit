import { toISODateString } from '../../../../handlers/dateHandlers';
import type { DatePickerDraftContext, DateTimeRange } from '../../../../types/ui';

/**
 * Модификатор черновика: конец диапазона = начало + указанное число дней.
 * @param dayOffset — смещение в днях от даты начала
 */
export function createRangeEndPlusDaysModifier(dayOffset: number) {
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
 * Форматирует черновик пикера для отображения в сторис.
 * @param draft — значение из `onPickerChange`
 * @param range — режим диапазона
 */
export function formatPickerDraftForDisplay(
  draft: string | DateTimeRange,
  range: boolean,
): string {
  if (!range) {
    return typeof draft === 'string' && draft ? draft : '—';
  }

  if (typeof draft !== 'object') {
    return '—';
  }

  const startLabel = draft.start || '—';
  const endLabel = draft.end || '—';

  return `${startLabel} → ${endLabel}`;
}
