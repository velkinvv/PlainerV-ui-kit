import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { Card } from '../Card';
import { Typography } from '../Typography';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4911-2616',
    },
    docs: {
      description: {
        component:
          'Пагинация по макету Figma: единая плашка со скруглением, номера без рамки, активная страница с заливкой primary и мягким свечением, стрелки внутри плашки.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: { control: { type: 'number', min: 1 }, description: 'Всего страниц' },
    page: { control: { type: 'number', min: 1 }, description: 'Текущая страница (контроль)' },
    defaultPage: { description: 'Стартовая страница без `page`' },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Соседи вокруг текущей',
    },
    showPrevNext: { control: 'boolean', description: 'Стрелки вперёд/назад' },
    size: { control: 'select', options: Object.values(Size), description: 'Размер' },
    disabled: { control: 'boolean' },
    ariaLabel: { description: 'Подпись `nav` для a11y' },
    onPageChange: { action: 'pageChange' },
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
