import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Select } from './Select';
import type { SelectOption } from '../../../../types/ui';
import { Form } from '../../Form';
import { Size } from '../../../../types/sizes';

const sampleOptions: SelectOption[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch', disabled: true },
];

const manyOptions: SelectOption[] = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nsk', label: 'Новосибирск' },
  { value: 'kzn', label: 'Казань' },
  { value: 'nn', label: 'Нижний Новгород' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'По умолчанию `mode="select"`: выпадающая панель как у `Dropdown` (поиск в шапке панели, мультивыбор), плюс скрытый нативный `select` для форм. `mode="native"` — только нативный список в оболочке поля.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Form
        formId="story-select-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['select', 'native'],
      description: '`select` — панель Dropdown + поиск; `native` — системный select',
    },
    label: { description: 'Подпись поля' },
    options: { description: 'Массив `{ value, label, disabled? }`' },
    placeholder: { description: 'Пустое состояние (триггер / первая опция в native single)' },
    value: { description: 'Контролируемое значение: строка или `string[]` при `multiple`' },
    defaultValue: { description: 'Неконтролируемое начальное значение' },
    onChange: {
      description: 'Событие от скрытого/нативного `select` (`ChangeEvent<HTMLSelectElement>`)',
    },
    onValueChange: { description: 'Удобный колбэк `(value: string | string[])` в `mode="select"`' },
    multiple: { control: 'boolean', description: 'Множественный выбор' },
    searchable: {
      control: 'boolean',
      description:
        'В `mode="select"`: поле поиска (по умолчанию `true`, передайте `false` чтобы отключить)',
    },
    searchPlaceholder: { description: 'Плейсхолдер поля поиска в панели' },
    error: { description: 'Текст ошибки' },
    success: { description: 'Успешное состояние' },
    status: {
      control: { type: 'select' },
      options: [undefined, 'error', 'success', 'warning'],
      description: 'Явный статус обводки',
    },
    helperText: { description: 'Текст под полем' },
    required: { control: 'boolean', description: 'Обязательное поле' },
    fullWidth: { control: 'boolean', description: 'На всю ширину' },
    readOnly: { control: 'boolean', description: 'Без открытия / disabled' },
    disabled: { control: 'boolean', description: 'Отключено' },
    skeleton: { control: 'boolean', description: 'Скелетон' },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Размер из дизайн-системы',
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Выравнивание текста на триггере',
    },
    isLoading: { control: 'boolean', description: 'Спиннер справа' },
    dropdownVariant: {
      control: 'radio',
      options: ['default', 'elevated', 'outlined'],
      description: 'Вариант оформления панели (`Dropdown`)',
    },
    menuMaxHeight: { description: 'Максимальная высота панели (px или строка)' },
    dropdownInline: { description: '`Dropdown.inline` (портал выключен)' },
    tooltip: { description: 'Подсказка' },
    tooltipType: { control: 'radio', options: ['tooltip', 'hint'] },
    tooltipPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    additionalLabel: { description: 'Доп. подпись' },
    extraText: { description: 'Доп. текст внизу' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Панель как Dropdown, поиск включён по умолчанию */
export const Default: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Выберите город',
    name: 'city',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Город',
    options: manyOptions,
    placeholder: 'Выберите…',
    name: 'city',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('moscow');
    return (
      <Select
        label="Город"
        name="city-controlled"
        options={manyOptions}
        value={value}
        onValueChange={(v) => setValue(String(v))}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/** Несколько значений; в триггере — «N выбрано» или одна подпись */
export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['ru', 'en']);
    return (
      <Select
        label="Языки"
        name="langs"
        multiple
        options={sampleOptions.filter((o) => !o.disabled)}
        value={value}
        onValueChange={(v) => setValue(v as string[])}
        placeholder="Выберите языки"
      />
    );
  },
};

/** Панель без поля поиска */
export const SearchDisabled: Story = {
  args: {
    label: 'Роль',
    searchable: false,
    options: [
      { value: 'admin', label: 'Администратор' },
      { value: 'user', label: 'Пользователь' },
    ],
    placeholder: 'Выберите роль',
    name: 'role',
  },
};

/** Системный select (без Dropdown) */
export const NativeMode: Story = {
  args: {
    mode: 'native',
    label: 'Статус (native)',
    options: [
      { value: 'a', label: 'Активен' },
      { value: 'b', label: 'Черновик' },
    ],
    placeholder: 'Выберите',
    name: 'status-native',
  },
};

export const WithError: Story = {
  args: {
    label: 'Роль',
    options: [
      { value: 'admin', label: 'Администратор' },
      { value: 'user', label: 'Пользователь' },
    ],
    placeholder: 'Выберите роль',
    error: 'Выберите значение из списка',
    name: 'role',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Статус',
    options: [
      { value: 'active', label: 'Активен' },
      { value: 'inactive', label: 'Неактивен' },
    ],
    value: 'active',
    success: true,
    name: 'status',
    onChange: () => {
      /* демо */
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Часовой пояс',
    options: [
      { value: 'msk', label: 'Москва (UTC+3)' },
      { value: 'ekb', label: 'Екатеринбург (UTC+5)' },
    ],
    helperText: 'Используется для отображения времени',
    name: 'tz',
  },
};

export const WithTooltip: Story = {
  args: {
    label: 'Тариф',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
    ],
    placeholder: 'Выберите тариф',
    tooltip: 'От тарифа зависит лимит запросов',
    tooltipType: 'tooltip',
    name: 'plan',
  },
};

export const Loading: Story = {
  args: {
    label: 'Загрузка списка',
    options: [{ value: 'x', label: 'Вариант' }],
    value: 'x',
    isLoading: true,
    name: 'loading',
  },
};

export const SkeletonStory: Story = {
  name: 'Skeleton',
  args: {
    label: 'Поле',
    skeleton: true,
    options: [],
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Ширина 100%',
    fullWidth: true,
    options: manyOptions,
    placeholder: 'Выберите',
    name: 'fw',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    size: Size.SM,
    options: sampleOptions,
    name: 'sm',
  },
};

export const InFormWithSubmit: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <>
        <Select
          label="Страна"
          name="country"
          required
          options={[
            { value: 'ru', label: 'Россия' },
            { value: 'kz', label: 'Казахстан' },
          ]}
          placeholder="Выберите страну"
          value={value}
          onValueChange={(v) => setValue(String(v))}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" style={{ marginTop: 12 }}>
          Отправить
        </button>
      </>
    );
  },
};
