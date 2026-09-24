import { Select } from './Select';
import { Size } from '../../../../types/sizes';
import { defineComponentDocs } from '../../../../docs/defineComponentDocs';

const languageOptions = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
];

export default defineComponentDocs({
  meta: {
    name: 'Select',
    group: 'Inputs',
    platform: 'web',
    since: '0.3.4',
    status: 'stable',
    description: 'Поле выбора в режимах select/searchSelect/native с поддержкой single/multiple.',
  },
  examples: [
    {
      id: 'single-default',
      title: 'Одиночный выбор',
      description: 'Базовый select с опциями и placeholder.',
      code: '<Select label="Язык" options={languageOptions} placeholder="Выберите язык" />',
      render: () => (
        <Select
          label="Язык"
          options={languageOptions}
          placeholder="Выберите язык"
          fullWidth
          size={Size.MD}
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
    {
      id: 'multiple',
      title: 'Множественный выбор',
      description: 'Multiple-режим с набором выбранных значений.',
      code: '<Select label="Языки" options={languageOptions} multiple defaultValue={["ru", "en"]} />',
      render: () => (
        <Select
          label="Языки"
          options={languageOptions}
          multiple
          defaultValue={['ru', 'en']}
          fullWidth
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
    {
      id: 'search-select',
      title: 'SearchSelect',
      description: 'Режим поиска в поле-триггере.',
      code: '<Select mode="searchSelect" label="Город" options={languageOptions} placeholder="Начните ввод" />',
      render: () => (
        <Select
          mode="searchSelect"
          label="Город"
          options={languageOptions}
          placeholder="Начните ввод"
          fullWidth
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
  ],
  variants: [
    {
      id: 'size-matrix',
      title: 'Размеры',
      columns: 2,
      items: [
        {
          id: 'sm',
          title: 'SM',
          code: '<Select size={Size.SM} options={languageOptions} placeholder="SM" />',
          render: () => <Select size={Size.SM} options={languageOptions} placeholder="SM" />,
        },
        {
          id: 'md',
          title: 'MD',
          code: '<Select size={Size.MD} options={languageOptions} placeholder="MD" />',
          render: () => <Select size={Size.MD} options={languageOptions} placeholder="MD" />,
        },
      ],
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['combobox', 'listbox'],
    keyboard: ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'],
  },
  related: [
    { name: 'Input', href: '/components/input' },
    { name: 'Dropdown', href: '/components/dropdown' },
  ],
});
