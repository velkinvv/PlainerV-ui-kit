import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MultiInput } from './MultiInput';
import { Form } from '../../Form';
import { Size } from '../../../../types/sizes';
import { InputVariant } from '../../../../types/ui';
import { DOC_MULTI_INPUT } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof MultiInput> = {
  title: 'UI Kit/Inputs/MultiInput',
  component: MultiInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_MULTI_INPUT,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <Form formId={`story-multi-${context.id}`}>
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер поля (как у Input)',
    },
    variant: {
      control: { type: 'select' },
      options: [InputVariant.DEFAULT, InputVariant.CLEAR],
      description: 'Вид рамки поля',
    },
    commitWithComma: {
      description: 'Фиксировать токен по клавише `,`',
    },
    commitOnBlur: {
      description: 'Добавить черновик при blur',
    },
    duplicates: {
      control: { type: 'select' },
      options: ['allow', 'reject'],
      description: 'Разрешать или отклонять дубликаты',
    },
    maxItems: {
      description: 'Максимум токенов',
    },
    validateToken: {
      control: false,
      description: 'Предикат валидации токена перед добавлением',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiInput>;

export const Default: Story = {
  args: {
    label: 'Теги',
    placeholder: 'Введите и нажмите Enter',
    helperText: 'Enter или запятая — новый токен; вставка списка через запятые/переносы',
    displayClearIcon: true,
    defaultValue: ['первый', 'второй'],
  },
};

export const Controlled: Story = {
  render: function ControlledMultiInputStory() {
    const [tokens, setTokens] = useState<string[]>(['react', 'typescript']);
    return (
      <MultiInput
        label="Стек"
        value={tokens}
        onValuesChange={setTokens}
        displayClearIcon
        helperText={`Сейчас: ${tokens.join(', ') || 'пусто'}`}
      />
    );
  },
};

export const MaxThree: Story = {
  args: {
    label: 'До 3 значений',
    maxItems: 3,
    helperText: 'Четвёртое значение не добавится',
    displayClearIcon: true,
  },
};

export const EmailLikeValidation: Story = {
  args: {
    label: 'Email (простая проверка)',
    placeholder: 'user@host',
    validateToken: (token) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(token),
    helperText: 'Токен должен напоминать email',
    commitWithComma: false,
    displayClearIcon: true,
  },
};
