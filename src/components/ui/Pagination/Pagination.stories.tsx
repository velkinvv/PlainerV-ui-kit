import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { DOC_PAGINATION } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Pagination> = {
  title: 'UI Kit/Navigation/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_PAGINATION,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Всего страниц',
      table: { type: { summary: 'number (≥ 1)' } },
    },
    page: {
      control: { type: 'number', min: 1 },
      description: 'Текущая страница (контролируемый режим)',
      table: { type: { summary: 'number' } },
    },
    defaultPage: {
      description: 'Стартовая страница, если не задан контролируемый `page`',
      table: { type: { summary: 'number' } },
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Соседи вокруг текущей',
      table: { type: { summary: 'number (0–3)' } },
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Стрелки вперёд/назад',
      table: { type: { summary: 'boolean' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: '`compact` — только стрелки и текущая страница между ними',
      table: { type: { summary: `'default' | 'compact'` } },
    },
    size: {
      control: 'select',
      options: Object.values(Size),
      description: 'Размер компонента; значения из `Size` (например `SM`, `MD`, `LG`, `XL`)',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    ariaLabel: {
      description: 'Подпись `nav` для a11y',
      table: { type: { summary: 'string' } },
    },
    onPageChange: {
      action: 'pageChange',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
    defaultPage: 1,
    siblingCount: 1,
    showPrevNext: true,
    size: Size.MD,
  },
};

export const ManyPages: Story = {
  args: {
    totalPages: 42,
    defaultPage: 20,
    siblingCount: 1,
  },
};

export const NoArrows: Story = {
  args: {
    totalPages: 8,
    defaultPage: 3,
    showPrevNext: false,
  },
};

export const Small: Story = {
  args: {
    totalPages: 12,
    defaultPage: 6,
    size: Size.SM,
  },
};

/** Сокращённый вид: «назад», номер текущей страницы, «вперёд». */
export const Compact: Story = {
  args: {
    totalPages: 24,
    defaultPage: 5,
    variant: 'compact',
    siblingCount: 1,
  },
};

export const Disabled: Story = {
  args: {
    totalPages: 5,
    page: 2,
    disabled: true,
  },
};

const ControlledDemo = () => {
  const [page, setPage] = useState(4);
  return (
    <Card padding="lg">
      <Typography variant="body2" marginBottom="md">
        Контролируемый режим: страница {page}
      </Typography>
      <Pagination totalPages={15} page={page} onPageChange={setPage} siblingCount={1} />
    </Card>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

