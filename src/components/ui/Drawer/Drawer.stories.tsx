import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../buttons/Button';
import type { DrawerPlacement } from '../../../types/ui';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Выдвижная панель с оверлеем: портал в `body`, фокус-ловушка, Escape, варианты подложки как у `Modal` (`overlayVariant`).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Сторона появления панели',
    },
    isOpen: { description: 'Открыт ли drawer' },
    title: { description: 'Заголовок' },
    width: { description: 'Ширина панели (left/right): число = px или CSS-строка' },
    height: { description: 'Высота панели (top/bottom)' },
    overlayVariant: {
      control: { type: 'select' },
      options: ['default', 'blur', 'dark', 'frosted'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = ({ placement }: { placement: DrawerPlacement }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <Button type="button" onClick={() => setOpen(true)}>
        Открыть ({placement})
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        placement={placement}
        title="Заголовок"
        overlayVariant="blur"
      >
        <p>Содержимое drawer. Закрытие: крестик, клик по фону, Escape.</p>
        <Button type="button" onClick={() => setOpen(false)}>
          Закрыть изнутри
        </Button>
      </Drawer>
    </div>
  );
};

export const Right: Story = {
  render: () => <DrawerDemo placement="right" />,
};

export const Left: Story = {
  render: () => <DrawerDemo placement="left" />,
};

export const Bottom: Story = {
  render: () => <DrawerDemo placement="bottom" />,
};

export const Top: Story = {
  render: () => <DrawerDemo placement="top" />,
};
