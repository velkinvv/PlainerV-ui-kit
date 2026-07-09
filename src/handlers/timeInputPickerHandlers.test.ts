import { createTime } from '../components/ui/inputs/TimeInput/handlers';
import {
  buildTimePickerDraftValue,
  parseTimePickerDraftValue,
  resolveTimePickerDraft,
} from './timeInputPickerHandlers';

describe('timeInputPickerHandlers', () => {
  it('modifyPickerValue может подменить конец диапазона (+2 часа)', () => {
    const startTime = createTime(9, 0, 0);
    const endTime = createTime(18, 0, 0);

    const resolvedTimes = resolveTimePickerDraft({
      draftTimes: {
        selectedTime: null,
        rangeStart: startTime,
        rangeEnd: endTime,
      },
      range: true,
      format: 'HH:mm',
      phase: 'pick',
      modifyPickerValue: (draft) => {
        if (typeof draft !== 'object' || !draft.start) {
          return draft;
        }

        const [hoursText, minutesText] = draft.start.split(':');
        const hours = Number(hoursText);
        const minutes = Number(minutesText);

        if (Number.isNaN(hours) || Number.isNaN(minutes)) {
          return draft;
        }

        const autoEndHours = (hours + 2) % 24;

        return {
          start: draft.start,
          end: `${String(autoEndHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
        };
      },
    });

    expect(resolvedTimes.rangeStart?.getHours()).toBe(9);
    expect(resolvedTimes.rangeEnd?.getHours()).toBe(11);
  });

  it('buildTimePickerDraftValue и parseTimePickerDraftValue симметричны для диапазона', () => {
    const draftTimes = {
      selectedTime: null,
      rangeStart: createTime(10, 15, 0),
      rangeEnd: createTime(12, 45, 0),
    };

    const draftValue = buildTimePickerDraftValue(draftTimes, true, 'HH:mm');
    const parsedTimes = parseTimePickerDraftValue(draftValue, true);

    expect(parsedTimes.rangeStart?.getHours()).toBe(10);
    expect(parsedTimes.rangeStart?.getMinutes()).toBe(15);
    expect(parsedTimes.rangeEnd?.getHours()).toBe(12);
    expect(parsedTimes.rangeEnd?.getMinutes()).toBe(45);
  });
});
