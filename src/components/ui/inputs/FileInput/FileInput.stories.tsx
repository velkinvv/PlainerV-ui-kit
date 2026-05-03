import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileInput } from './FileInput';
import { Form } from '../../Form';
import { Size } from '../../../../types/sizes';
import { DOC_FILE_INPUT } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof FileInput> = {
  title: 'UI Kit/Inputs/FileInput',
  component: FileInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_FILE_INPUT,
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
  args: {
    clearIconProps: {},
  },
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
      table: {
        type: { summary: '`error`, `success`, `warning` либо не задан' },
      },
    },
    fileName: { description: 'Контролируемая подпись выбранных файлов' },
    displayClearIcon: { control: 'boolean', description: 'Кнопка сброса выбора (крестик)' },
    onClearIconClick: { action: 'clearIconClick', description: 'После сброса `input` и внутренней подписи' },
    clearIconProps: {
      control: 'object',
      description:
        'Частичные пропсы `Icon` для крестиков сброса: плавающая кнопка при `displayClearIcon` и кнопка удаления в карточке (`fileLayout="file"`). По умолчанию `IconExClose`; мерж поверх `size` / `color`.',
      table: {
        type: { summary: 'ClearIconProps' },
      },
    },
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
    fileLayout: {
      control: { type: 'select' },
      options: ['field', 'dropzone', 'file', 'trigger'],
      description: 'Вариант разметки поля; допустимые значения: `field`, `dropzone`, `file`, `trigger`',
    },
    dropzoneText: { description: 'Текст в режиме dropzone' },
    fileCardLabel: { description: 'Подпись над именем в карточке' },
    uploadProgress: { control: { type: 'range', min: 0, max: 100 } },
    fileSizeLabel: { description: 'Подпись размера справа' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Вложение',
    name: 'file',
    helperText: 'PDF или изображение до 10 МБ',
    fileLayout: 'field',
  },
};

export const Dropzone: Story = {
  args: {
    label: 'Загрузка',
    name: 'drop',
    fileLayout: 'dropzone',
    dropzoneText: 'Перенесите для загрузки',
    helperText: 'Отпустите файл в зоне',
  },
};

export const FileCard: Story = {
  render: () => {
    const [name, setName] = useState('Название файла');
    const [progress, setProgress] = useState<number | undefined>(30);
    const [deletableName, setDeletableName] = useState('report.docx');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
        <FileInput
          label="Загрузка (прогресс)"
          name="f1"
          fileLayout="file"
          fileName={name}
          uploadProgress={progress}
          onChange={() => {
            setProgress(p => (p != null && p < 100 ? Math.min(100, (p ?? 0) + 25) : p));
          }}
          helperText="Клик по карточке — сменить файл"
        />
        <FileInput
          label="Готово (размер)"
          name="f2"
          fileLayout="file"
          fileName={name}
          fileSizeLabel="1 mb"
          onClearIconClick={() => setName('')}
          helperText="После загрузки — только размер"
        />
        <FileInput
          label="Удаление"
          name="f3"
          fileLayout="file"
          fileName={deletableName}
          onClearIconClick={() => setDeletableName('')}
          helperText="Крестик в карточке; при контроле `fileName` нужен `onClearIconClick`"
        />
      </div>
    );
  },
};

export const LegacyTrigger: Story = {
  args: {
    label: 'Прежний вид',
    name: 'legacy',
    fileLayout: 'trigger',
    buttonLabel: 'Выбрать файл',
    helperText: '`fileLayout="trigger"`',
  },
};

export const WithClear: Story = {
  render: () => {
    const [name, setName] = useState('');
    return (
      <FileInput
        label="Документ"
        name="doc"
        displayClearIcon
        fileName={name}
        placeholder="Файл не выбран"
        onChange={(e) => {
          const f = e.target?.files?.[0];
          setName(f?.name ?? '');
        }}
        onClearIconClick={() => setName('')}
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

