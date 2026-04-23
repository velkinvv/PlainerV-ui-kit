import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import type { BreadcrumbItem } from '../../../types/ui';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4882-9860',
    },
    docs: {
      description: {
        component:
          'Макет Figma: шеврон между пунктами, иконка слева, капсула у текущей страницы, сегмент «…» (`ellipsis`), `aria-current`, `rel` для `target="_blank"`.',
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

/** Как в макете: дом + Главная, …, Новости, текущая «Новость» в капсуле */
export const FigmaLayout: Story = {
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
