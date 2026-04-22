import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Size } from '../../../types/sizes';
import type { BreadcrumbItem } from '../../../types/ui';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Навигационная цепочка: `nav` + `ol`/`li`, разделитель, `aria-current="page"` у текущей страницы, `rel` для `target="_blank"`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: { description: 'Массив пунктов (`BreadcrumbItem[]`)' },
    separator: { description: 'Кастомный разделитель между пунктами' },
    ariaLabel: { description: '`aria-label` у `nav`' },
    size: { control: 'select', options: [Size.SM, Size.MD, Size.LG] },
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
    items: [
      { label: 'Раздел', onClick: () => undefined },
      { label: 'Страница' },
    ],
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
