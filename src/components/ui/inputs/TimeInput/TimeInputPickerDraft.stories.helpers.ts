import { createTime, toISOTimeString } from './handlers';
import type { TimePickerDraftContext, TimeRange } from '../../../../types/ui';

/**
 * Модификатор черновика: конец диапазона = начало + указанное число часов.
 * @param hourOffset — смещение в часах от времени начала
 */
export function createRangeEndPlusHoursModifier(hourOffset: number) {
  return (
    draft: string | TimeRange,
    _context?: TimePickerDraftContext,
  ): TimeRange | undefined => {
    if (typeof draft !== 'object' || !draft.start) {
      return undefined;
    }

    const startResult = draft.start.match(/^(\d{1,2}):(\d{2})/);
    if (!startResult) {
      return undefined;
    }

    const startHours = Number(startResult[1]);
    const startMinutes = Number(startResult[2]);

    if (Number.isNaN(startHours) || Number.isNaN(startMinutes)) {
      return undefined;
    }

    const autoEndTime = createTime((startHours + hourOffset) % 24, startMinutes, 0);

    return {
      start: draft.start,
      end: toISOTimeString(autoEndTime, 'HH:mm'),
    };
  };
}

/**
 * Форматирует черновик пикера для отображения в сторис.
 * @param draft — значение из `onPickerChange`
 * @param range — режим диапазона
 */
export function formatTimePickerDraftForDisplay(draft: string | TimeRange, range: boolean): string {
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
