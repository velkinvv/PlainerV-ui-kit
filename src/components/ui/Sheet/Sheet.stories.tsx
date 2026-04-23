import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Sheet } from './Sheet';
import { Button } from '../buttons/Button';
import type { SheetPlacement } from '../../../types/ui';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Панель-лист как у `Drawer`, по умолчанию снизу (`placement="bottom"`), `safe-area-inset-bottom`, те же оверлей и фокус.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Сторона (по умолчанию bottom)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SheetDemo = ({ placement }: { placement: SheetPlacement }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <Button type="button" onClick={() => setOpen(true)}>
        Открыть sheet ({placement})
      </Button>
      <Sheet
        isOpen={open}
        onClose={() => setOpen(false)}
        placement={placement}
        title="Действия"
        overlayVariant="blur"
      >
        <p>Содержимое sheet.</p>
        <Button type="button" onClick={() => setOpen(false)}>
          Закрыть
        </Button>
      </Sheet>
    </div>
  );
};

export const BottomDefault: Story = {
  render: () => <SheetDemo placement="bottom" />,
};

export const Right: Story = {
  render: () => <SheetDemo placement="right" />,
};

export const Top: Story = {
  render: () => <SheetDemo placement="top" />,
};
