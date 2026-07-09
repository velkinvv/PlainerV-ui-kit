import React, { useState } from 'react';
import { Form } from './Form';
import { Select } from './inputs/Select';
import { TextArea } from './inputs/TextArea';
import { DateInput } from './inputs/DateInput';
import { TimeInput } from './inputs/TimeInput';
import { DateTimeInput } from './inputs/DateTimeInput';
import type { SelectOption } from '../../types/ui';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

const selectOptions: SelectOption[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch', disabled: true },
];

/**
 * Select, TextArea, DateInput и TimeInput для Theme Showcase.
 */
export const ThemeShowcaseExtendedInputsBlock = () => {
  const [selectValue, setSelectValue] = useState<string | undefined>('ru');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [dateTimeValue, setDateTimeValue] = useState('');

  return (
    <Form
      formId="theme-showcase-extended-inputs"
      onSubmit={(submitEvent) => {
        submitEvent.preventDefault();
      }}
    >
      <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
        <Select
          label="Язык"
          options={selectOptions}
          value={selectValue}
          onValueChange={(nextValue) => {
            if (typeof nextValue === 'string') {
              setSelectValue(nextValue);
            }
          }}
          placeholder="Выберите язык"
        />
        <TextArea
          label="Комментарий"
          placeholder="Введите текст..."
          value={textAreaValue}
          onChange={(changeEvent) => setTextAreaValue(changeEvent.target.value)}
          rows={3}
        />
        <DateInput
          label="Дата"
          value={dateValue}
          onChange={(nextValue) => {
            if (typeof nextValue === 'string') {
              setDateValue(nextValue);
            }
          }}
        />
        <TimeInput
          label="Время"
          value={timeValue}
          onChange={(nextValue) => {
            if (typeof nextValue === 'string') {
              setTimeValue(nextValue);
            }
          }}
        />
        <DateTimeInput
          label="Дата и время"
          value={dateTimeValue}
          onChange={(nextValue) => {
            if (typeof nextValue === 'string') {
              setDateTimeValue(nextValue);
            }
          }}
        />
      </div>
    </Form>
  );
};
