import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileInput } from './FileInput';
import { Form } from '../../Form';
import { Size } from '../../../../types/sizes';

const meta: Meta<typeof FileInput> = {
  title: 'Components/Inputs/FileInput',
  component: FileInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Выбор файла: скрытый `input[type=file]`, триггер (`label htmlFor`), подпись выбранных файлов, опциональная очистка, привязка к `Form` через `form` у нативного `input`.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Form
        formId="story-file-input-form"
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
    placeholder: { description: 'Текст, пока файлы не выбраны' },
    buttonLabel: { description: 'Текст на триггере открытия диалога выбора' },
    helperText: { description: 'Вспомогательный текст (скрывается при error/success)' },
    error: { description: 'Текст ошибки и статус обводки' },
    success: { control: 'boolean', description: 'Успешное состояние' },
    status: {
      control: { type: 'select' },
      options: [undefined, 'error', 'success', 'warning'],
      description: 'Явный статус обводки',
    },
    fileName: { description: 'Контролируемая подпись выбранных файлов' },
    showClearButton: { control: 'boolean', description: 'Кнопка сброса выбора' },
    accept: { description: 'HTML `accept`' },
    multiple: { control: 'boolean', description: 'Множественный выбор' },
    fullWidth: { control: 'boolean', description: 'На всю ширину контейнера' },
    disabled: { control: 'boolean', description: 'Отключено' },
    skeleton: { control: 'boolean', description: 'Скелетон' },
    isLoading: { control: 'boolean', description: 'Спиннер в строке' },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Размер как у `Input`',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Вложение',
    name: 'file',
    helperText: 'PDF или изображение до 10 МБ',
  },
};

export const WithClear: Story = {
  render: () => {
    const [name, setName] = useState('');
    return (
      <FileInput
        label="Документ"
        name="doc"
        showClearButton
        fileName={name}
        placeholder="Файл не выбран"
        onChange={(e) => {
          const f = e.target?.files?.[0];
          setName(f?.name ?? '');
        }}
        onClear={() => setName('')}
        helperText="После выбора доступна очистка"
      />
    );
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Фото',
    name: 'photo',
    error: 'Нужно выбрать файл',
    helperText: 'Не отображается при ошибке',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Файлы',
    name: 'files',
    multiple: true,
    accept: 'image/*',
    placeholder: 'Ни одного файла',
  },
};
