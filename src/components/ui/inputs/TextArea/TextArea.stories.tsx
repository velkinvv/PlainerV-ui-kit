import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextArea } from './TextArea';
import { Form } from '../../Form';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Inputs/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Многострочное поле ввода с метками, состояниями, подсказкой (Tooltip или Hint), счётчиком символов при `maxLength`, блокировкой копирования/вставки и привязкой к `Form` через контекст.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Form
        formId="story-textarea-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    label: { description: 'Подпись над полем (`ReactNode`)' },
    placeholder: { description: 'Текст плейсхолдера' },
    helperText: { description: 'Вспомогательный текст под полем (скрывается при error/success)' },
    error: { description: 'Текст ошибки; также влияет на статус обводки' },
    success: { description: 'Успешное состояние (булево); показывает текст «Успешно»' },
    status: {
      control: { type: 'select' },
      options: [undefined, 'error', 'success', 'warning'],
      description: 'Явный статус обводки (имеет приоритет над выводом из error/success)',
    },
    required: { control: 'boolean', description: 'Обязательное поле (звёздочка у label)' },
    fullWidth: { control: 'boolean', description: 'Растянуть на ширину контейнера' },
    readOnly: { control: 'boolean', description: 'Только чтение (серый фон, без resize)' },
    disabled: { control: 'boolean', description: 'Отключено' },
    skeleton: { control: 'boolean', description: 'Скелетон вместо поля' },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Выравнивание текста внутри поля',
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: 'CSS resize у textarea',
    },
    rows: {
      control: { type: 'number', min: 2, max: 20, step: 1 },
      description: 'Число строк (HTML rows)',
    },
    disableCopying: {
      control: 'boolean',
      description: 'Запрет копирования и вставки (onCopy/onPaste preventDefault)',
    },
    tooltip: { description: 'Содержимое подсказки (`ReactNode`)' },
    tooltipType: {
      control: { type: 'radio' },
      options: ['tooltip', 'hint'],
      description: '`tooltip` — обёртка вокруг поля; `hint` — отдельный Hint под полем',
    },
    tooltipPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция Tooltip или Hint',
    },
    displayCharacterCounter: {
      control: 'boolean',
      description: 'Показывать счётчик; виден только если задан `maxLength` > 0',
    },
    characterCounterVisibilityThreshold: {
      control: { type: 'number', min: 0, max: 500, step: 1 },
      description:
        'Порог в символах: счётчик показывается при `текущая длина >= порог` (по умолчанию 0 — сразу при наличии maxLength)',
    },
    additionalLabel: { description: 'Дополнительная подпись под основным label' },
    extraText: { description: 'Дополнительный текст внизу блока' },
    maxLength: {
      control: { type: 'number', min: 0, max: 500, step: 1 },
      description: 'HTML maxLength; включает логику счётчика',
    },
    value: { description: 'Контролируемое значение (строка)' },
    onChange: { description: 'Обработчик изменения (`ChangeEvent<HTMLTextAreaElement>`)' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Базовое поле без label */
export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Комментарий',
    placeholder: 'Опишите задачу...',
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Описание',
    placeholder: 'Текст...',
    helperText: 'Не более 500 символов',
    rows: 3,
  },
};

export const WithError: Story = {
  args: {
    label: 'Заметка',
    placeholder: 'Введите заметку',
    error: 'Поле не может быть пустым',
    value: '',
    onChange: () => {
      /* демо */
    },
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Биография',
    placeholder: 'Расскажите о себе',
    value: 'Короткий текст сохранён.',
    success: true,
    onChange: () => {
      /* демо */
    },
  },
};

export const WithStatusWarning: Story = {
  args: {
    label: 'Черновик',
    placeholder: 'Текст черновика',
    status: 'warning',
    helperText: 'Изменения ещё не опубликованы',
  },
};

export const WithTooltip: Story = {
  args: {
    label: 'Сообщение',
    placeholder: 'Наведите на область поля — подсказка у обёртки',
    tooltip: 'Подсказка для всего блока ввода',
    tooltipType: 'tooltip',
    tooltipPosition: 'top',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Памятка',
    placeholder: 'Ввод...',
    tooltip: 'Краткая памятка под полем (режим hint)',
    tooltipType: 'hint',
    tooltipPosition: 'right',
  },
};

export const WithMaxLengthAndCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextArea
        label="Отзыв"
        placeholder="До 120 символов"
        maxLength={120}
        displayCharacterCounter
        characterCounterVisibilityThreshold={0}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
      />
    );
  },
};

/** Счётчик появляется только когда набрано не меньше порога символов */
export const CounterVisibilityThreshold: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextArea
        label="Лимит 100 символов"
        placeholder="Счётчик виден после 40 символов"
        maxLength={100}
        displayCharacterCounter
        characterCounterVisibilityThreshold={40}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
      />
    );
  },
};

export const DisableCopying: Story = {
  args: {
    label: 'Конфиденциально',
    placeholder: 'Копирование и вставка отключены',
    defaultValue: 'Секретный текст',
    disableCopying: true,
    rows: 3,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Только чтение',
    value: 'Текст нельзя изменить',
    readOnly: true,
    onChange: () => {
      /* демо */
    },
    rows: 3,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключено',
    placeholder: 'Недоступно',
    disabled: true,
    rows: 3,
  },
};

export const Skeleton: Story = {
  args: {
    label: 'Загрузка',
    skeleton: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'На всю ширину',
    fullWidth: true,
    placeholder: 'Растягивается по контейнеру',
    rows: 4,
  },
};

export const ResizeNone: Story = {
  args: {
    label: 'Без изменения размера',
    resize: 'none',
    placeholder: 'resize: none',
    rows: 4,
  },
};

/** Кнопка `submit` внутри того же `Form`, что задаёт декоратор — поле получает `form` из контекста */
export const InFormWithSubmit: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <>
        <TextArea
          label="Сообщение"
          name="message"
          required
          rows={4}
          placeholder="Введите сообщение и отправьте форму"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" style={{ marginTop: 12 }}>
          Отправить
        </button>
      </>
    );
  },
};
