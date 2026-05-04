import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import type { BreadcrumbItem } from '../../../types/ui';
import { DOC_BREADCRUMB } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI Kit/Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_BREADCRUMB,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description:
        'Массив пунктов: label, опционально href, onClick, icon, current, ellipsis, crumbStyle и др.',
      control: false,
      table: {
        type: { summary: 'BreadcrumbItem[]' },
      },
    },
    separator: {
      description: 'Кастомный разделитель между пунктами',
      control: false,
      table: {
        type: { summary: 'ReactNode или строка (рендерится между пунктами)' },
      },
    },
    ariaLabel: {
      description: '`aria-label` у `nav`',
      table: { type: { summary: 'string' } },
    },
    size: {
      control: 'select',
      options: [Size.SM, Size.MD, Size.LG],
      table: {
        type: { summary: 'SM, MD или LG' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Главная', href: '/' },
  { id: 'cat', label: 'Каталог', href: '/catalog' },
  { id: 'cur', label: 'Текущая страница' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    size: Size.MD,
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    size: Size.SM,
  },
};

export const TextSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '/',
  },
};

export const WithOnClick: Story = {
  args: {
    items: [{ label: 'Раздел', onClick: () => undefined }, { label: 'Страница' }],
  },
};

export const ExternalBlank: Story = {
  args: {
    items: [
      { label: 'Сайт', href: 'https://example.com', target: '_blank' },
      { label: 'Документация' },
    ],
  },
};

/** Дом, главная, «…», раздел и текущая страница в капсуле */
export const RichBreadcrumbWithCapsule: Story = {
  render: () => (
    <Breadcrumb
      items={[
        {
          id: 'home',
          label: 'Главная',
          href: '/',
          icon: <Icon name="IconExHome" size={IconSize.SM} color="currentColor" aria-hidden />,
        },
        {
          id: 'more',
          label: '…',
          ellipsis: true,
          onClick: () => undefined,
          ellipsisAriaLabel: 'Показать скрытые разделы',
        },
        { id: 'news', label: 'Новости', href: '/news' },
        { id: 'article', label: 'Новость' },
      ]}
    />
  ),
};

