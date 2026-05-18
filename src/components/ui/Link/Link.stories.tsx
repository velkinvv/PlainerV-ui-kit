import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { LinkMode, ButtonVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DOC_LINK } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Link> = {
  title: 'UI Kit/Inputs/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_LINK,
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
      table: {
        type: { summary: '`text` или `button`' },
      },
    },
    textVariant: {
      control: { type: 'select' },
      options: ['default', 'line', 'muted'],
      description: 'Только при `mode="text"`; допустимые значения: `default`, `line`, `muted`',
    },
    target: { description: 'Цель навигации' },
    download: {
      description: 'Атрибут `download` у итогового `<a>`',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'имя файла (строка), `true` или `false`',
        },
      },
    },
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
