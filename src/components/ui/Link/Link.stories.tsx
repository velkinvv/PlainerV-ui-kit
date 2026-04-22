import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Link } from './Link';
import { LinkMode } from '../../../types/ui';
import { ButtonVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '`mode="text"` — стилизованный `<a>`; `mode="button"` — тот же `Button` с `href` (единые `variant`, `size`, иконки). Для `target="_blank"` подмешивается безопасный `rel`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: { description: 'URL назначения' },
    mode: {
      control: { type: 'select' },
      options: [LinkMode.TEXT, LinkMode.BUTTON],
      description: 'Текстовая ссылка или вид кнопки',
    },
    textVariant: {
      control: { type: 'select' },
      options: ['default', 'line', 'muted'],
      description: 'Только для `mode="text"`',
    },
    target: { description: 'Цель навигации' },
    children: { description: 'Содержимое ссылки' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextDefault: Story = {
  args: {
    href: 'https://example.com',
    children: 'Текстовая ссылка',
    mode: LinkMode.TEXT,
    textVariant: 'default',
  },
};

export const TextLine: Story = {
  args: {
    href: '#',
    children: 'Ссылка с подчёркиванием',
    mode: LinkMode.TEXT,
    textVariant: 'line',
  },
};

export const TextMuted: Story = {
  args: {
    href: '#',
    children: 'Вторичный текст',
    mode: LinkMode.TEXT,
    textVariant: 'muted',
  },
};

export const ButtonOutline: Story = {
  args: {
    href: 'https://example.com',
    mode: LinkMode.BUTTON,
    variant: ButtonVariant.OUTLINE,
    size: Size.MD,
    children: 'Как кнопка OUTLINE',
  },
};

export const ButtonPrimaryExternal: Story = {
  args: {
    href: 'https://example.com',
    mode: LinkMode.BUTTON,
    variant: ButtonVariant.PRIMARY,
    target: '_blank',
    children: 'Открыть в новой вкладке',
  },
};
