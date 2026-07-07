import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { fn } from '@storybook/test';
import { DateTimeInput, DateTimeInputRange } from './DateTimeInput';
import { Size } from '../../../../types/sizes';
import type { DateTimeRange, DateTimePickerDraftContext } from '../../../../types/ui';
import { DOC_DATE_TIME_INPUT } from '@/components/ui/storyDocs/uiKitDocs';
import {
  getStoryInfoBoxProps,
  inputFieldStoriesStyles,
  STORY_INFO_MUTED_CLASS_NAME,
} from '../../../../handlers/inputFieldStories.styles';
import { dateTimeInputStoriesStyles } from './DateTimeInput.stories.styles';
import {
  createDateTimeRangeEndPlusHoursModifier,
  formatDateTimePickerDraftForDisplay,
} from './DateTimeInputPickerDraft.stories.helpers';

const meta: Meta<typeof DateTimeInput> = {
  title: 'UI Kit/Inputs/DateTimeInput',
  component: DateTimeInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_DATE_TIME_INPUT,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description:
        'При `range: false` — строка даты и времени. При `range: true` — объект `{ start, end }`',
    },
    range: {
      control: 'boolean',
      description: 'Режим диапазона даты и времени',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Показывать секунды в блоке выбора времени',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
    },
    displayClearIcon: {
      control: 'boolean',
    },
    showDateRollers: {
      control: 'boolean',
    },
    onPickerChange: {
      action: 'pickerChange',
      description:
        'Изменения черновика в попапе до `onChange`. Второй аргумент — `DateTimePickerDraftContext`.',
      table: {
        type: {
          summary: '(draft: string | DateTimeRange, context: DateTimePickerDraftContext) => void',
        },
      },
    },
    modifyPickerValue: {
      description:
        'Модификатор черновика перед `onPickerChange`. Верните новое значение или `undefined`.',
      table: {
        type: {
          summary:
            '(draft: string | DateTimeRange, context: DateTimePickerDraftContext) => string | DateTimeRange | undefined',
        },
      },
    },
    deferPickerCommit: {
      control: { type: 'boolean' },
      description:
        'Отложить запись в поле до «Применить» / «OK». По умолчанию `true`, если задан `onPickerChange` или `modifyPickerValue`.',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Выберите дату и время',
    value: '06.07.2026 14:30',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Дата и время события',
    placeholder: 'Выберите дату и время',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('06.07.2026 09:00');

    return (
      <div style={dateTimeInputStoriesStyles.storyStack}>
        <DateTimeInput
          label="Контролируемое значение"
          value={value}
          onChange={(nextValue) => {
            if (typeof nextValue === 'string') {
              setValue(nextValue);
            }
          }}
        />
        <p style={dateTimeInputStoriesStyles.valuePreview}>Текущее значение: {value || '—'}</p>
      </div>
    );
  },
};

export const WithSeconds: Story = {
  args: {
    label: 'С секундами',
    showSeconds: true,
    format: 'DD.MM.YYYY HH:mm:ss',
    value: '06.07.2026 14:30:45',
  },
};

export const Range: Story = {
  args: {
    label: 'Диапазон даты и времени',
    range: true,
    value: {
      start: '01.07.2026 09:00',
      end: '06.07.2026 18:00',
    },
  },
};

/** Конец диапазона = начало + 2 часа (черновик до «Применить») */
export const RangeWithModifyPickerValue: Story = {
  name: 'Picker Draft / Range + modifyPickerValue (+2 часа)',
  render: () => {
    const [appliedRange, setAppliedRange] = useState<DateTimeRange>({
      start: '01.07.2026 09:00',
      end: '06.07.2026 18:00',
    });
    const [pickerDraft, setPickerDraft] = useState<DateTimeRange>({ start: '', end: '' });
    const [lastContext, setLastContext] = useState<DateTimePickerDraftContext | null>(null);

    const handleChange = (newValue: string | DateTimeRange) => {
      if (typeof newValue === 'object') {
        setAppliedRange(newValue);
      }
    };

    const handlePickerChange = (
      draft: string | DateTimeRange,
      context: DateTimePickerDraftContext,
    ) => {
      if (typeof draft === 'object') {
        setPickerDraft(draft);
      }
      setLastContext(context);
    };

    return (
      <div style={dateTimeInputStoriesStyles.storyStack}>
        <DateTimeInput
          range
          label="Диапазон: конец = начало + 2 часа"
          value={appliedRange}
          onChange={handleChange}
          onPickerChange={handlePickerChange}
          modifyPickerValue={createDateTimeRangeEndPlusHoursModifier(2)}
          placeholder="Выберите начало диапазона"
        />
        <div {...getStoryInfoBoxProps(inputFieldStoriesStyles.infoBox)}>
          <strong>Применено (onChange):</strong>
          <br />
          {formatDateTimePickerDraftForDisplay(appliedRange, true)}
        </div>
        <div {...getStoryInfoBoxProps(inputFieldStoriesStyles.infoBox)}>
          <strong>Черновик (onPickerChange):</strong>
          <br />
          {formatDateTimePickerDraftForDisplay(pickerDraft, true)}
          {lastContext ? (
            <>
              <br />
              <span
                className={STORY_INFO_MUTED_CLASS_NAME}
                style={inputFieldStoriesStyles.smallNoteText}
              >
                phase: {lastContext.phase}, format: {lastContext.format}
              </span>
            </>
          ) : null}
        </div>
      </div>
    );
  },
};

/** Одиночное значение: наблюдение за черновиком через onPickerChange */
export const SinglePickerDraftOnPickerChange: Story = {
  name: 'Picker Draft / Single + onPickerChange',
  render: () => {
    const [appliedValue, setAppliedValue] = useState('');
    const [pickerDraft, setPickerDraft] = useState('');
    const [lastPhase, setLastPhase] = useState<string>('—');

    const handleChange = (newValue: string | DateTimeRange) => {
      if (typeof newValue === 'string') {
        setAppliedValue(newValue);
      }
    };

    const handlePickerChange = (
      draft: string | DateTimeRange,
      context: DateTimePickerDraftContext,
    ) => {
      setPickerDraft(typeof draft === 'string' ? draft : '');
      setLastPhase(context.phase);
    };

    return (
      <div style={dateTimeInputStoriesStyles.storyStack}>
        <DateTimeInput
          label="Дата и время с отложенным коммитом"
          value={appliedValue}
          onChange={handleChange}
          onPickerChange={handlePickerChange}
          placeholder="Откройте попап и нажмите OK"
        />
        <div {...getStoryInfoBoxProps(inputFieldStoriesStyles.infoBox)}>
          <strong>Применено (onChange):</strong> {appliedValue || '—'}
        </div>
        <div {...getStoryInfoBoxProps(inputFieldStoriesStyles.infoBox)}>
          <strong>Черновик (onPickerChange):</strong> {pickerDraft || '—'}
          <br />
          <span
            className={STORY_INFO_MUTED_CLASS_NAME}
            style={inputFieldStoriesStyles.smallNoteText}
          >
            Последняя phase: {lastPhase}
          </span>
        </div>
      </div>
    );
  },
};

export const RangeControlled: Story = {
  render: () => {
    const [rangeValue, setRangeValue] = useState<DateTimeRange>({
      start: '01.07.2026 09:00',
      end: '06.07.2026 18:00',
    });

    return (
      <div style={dateTimeInputStoriesStyles.storyStack}>
        <DateTimeInput
          label="Диапазон (контролируемый)"
          range
          value={rangeValue}
          onChange={(nextValue) => {
            if (typeof nextValue === 'object') {
              setRangeValue(nextValue);
            }
          }}
        />
        <p style={dateTimeInputStoriesStyles.valuePreview}>
          {rangeValue.start} — {rangeValue.end}
        </p>
      </div>
    );
  },
};

export const RangeAliasComponent: Story = {
  render: () => (
    <DateTimeInputRange
      label="DateTimeInputRange (алиас)"
      value={{ start: '10.07.2026 08:00', end: '10.07.2026 20:00' }}
      onChange={fn()}
    />
  ),
};

export const WithClearIcon: Story = {
  args: {
    label: 'С очисткой',
    displayClearIcon: true,
    value: '06.07.2026 12:00',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключено',
    disabled: true,
    value: '06.07.2026 12:00',
  },
};

export const WithError: Story = {
  args: {
    label: 'С ошибкой',
    error: 'Укажите корректную дату и время',
    value: '06.07.2026 12:00',
  },
};
