import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextArea } from './TextArea';
import { Form } from '../../Form';
import { Button } from '../../buttons/Button';
import { DOC_TEXTAREA } from '@/components/ui/storyDocs/uiKitDocs';
import { textAreaStoriesStyles } from './TextArea.stories.styles';

const meta: Meta<typeof TextArea> = {
  title: 'UI Kit/Inputs/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_TEXTAREA,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Form
        formId="story-textarea-form"
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault();
        }}
      >
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    label: { description: 'Подпись над полем (`ReactNode`)' },
    placeholder: { description: 'Текст плейсхолдера' },
    helperText: {
      description: 'Вспомогательный текст под полем (скрывается при статусах `error` и `success`)',
    },
    error: { description: 'Текст ошибки; также влияет на статус обводки' },
    success: { description: 'Успешное состояние (булево); показывает текст «Успешно»' },
    status: {
      control: { type: 'select' },
      options: [undefined, 'error', 'success', 'warning'],
      description:
        'Явный статус обводки: `error`, `success`, `warning` или не задан (имеет приоритет над выводом из пропов `error` / `success`)',
      table: {
        type: { summary: 'error, success, warning или не задан (undefined)' },
      },
    },
    required: { control: 'boolean', description: 'Обязательное поле (звёздочка у label)' },
    fullWidth: { control: 'boolean', description: 'Растянуть на ширину контейнера' },
    readOnly: { control: 'boolean', description: 'Только чтение (серый фон, без resize)' },
    disabled: { control: 'boolean', description: 'Отключено' },
    skeleton: { control: 'boolean', description: 'Скелетон вместо поля' },
    isLoading: {
      control: 'boolean',
      description: 'Показать индикатор загрузки в правой части поля',
    },
    displayClearIcon: {
      control: 'boolean',
      description: 'Показывать кнопку очистки значения (для непустого и доступного поля)',
    },
    onClearIconClick: {
      description: 'Колбэк при клике на кнопку очистки значения',
      table: { type: { summary: '() => void' } },
    },
    clearIconProps: {
      control: false,
      description: 'Частичные пропсы иконки очистки',
      table: { type: { summary: 'ClearIconProps' } },
    },
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
      description:
        'Тип подсказки: `tooltip` — Tooltip-обёртка вокруг поля; `hint` — отдельный компонент Hint под полем',
      table: {
        type: { summary: 'tooltip или hint' },
      },
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
    value: {
      description: 'Контролируемое значение (строка)',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description:
        'Обработчик ввода; аргумент — нативное событие `change` у `textarea` (текст в `event.target.value`)',
      table: {
        type: {
          summary:
            'обработчик change у textarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void',
        },
      },
    },
    onFocus: {
      description: 'Колбэк фокуса поля',
      table: {
        type: { summary: '(event: React.FocusEvent<HTMLTextAreaElement>) => void' },
      },
    },
    onBlur: {
      description: 'Колбэк потери фокуса поля',
      table: {
        type: { summary: '(event: React.FocusEvent<HTMLTextAreaElement>) => void' },
      },
    },
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
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
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
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
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

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState('Текст можно очистить кнопкой справа');
    return (
      <TextArea
        label="Очистка значения"
        value={value}
        displayClearIcon
        onChange={(event) => setValue(event.target.value)}
        onClearIconClick={() => setValue('')}
        rows={4}
      />
    );
  },
};

export const Loading: Story = {
  args: {
    label: 'Загрузка',
    placeholder: 'Данные подгружаются...',
    isLoading: true,
    rows: 4,
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
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
        />
        <Button type="submit" style={textAreaStoriesStyles.submitButton}>
          Отправить
        </Button>
      </>
    );
  },
};
