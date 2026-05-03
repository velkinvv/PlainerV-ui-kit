import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Size } from '../../../types/sizes';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Button } from '../buttons/Button/Button';
import { DOC_POPOVER } from '@/components/ui/storyDocs/uiKitDocs';

import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'UI Kit/Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_POPOVER,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    trigger: {
      control: false,
      description: 'Элемент-триггер: клик по обёртке переключает панель.',
    },
    children: {
      control: false,
      description: 'Содержимое панели (портал или inline).',
    },
    size: {
      options: [Size.SM, Size.MD, Size.LG],
      control: { type: 'inline-radio' },
      description: 'Размер из `theme.dropdowns.sizes` (padding, радиус, типографика).',
    },
    variant: {
      options: ['default', 'elevated', 'outlined'],
      control: { type: 'inline-radio' },
      description: 'Вариант из `theme.dropdowns.variants`.',
    },
    positioningMode: {
      options: ['default', 'autoFlip', 'autoFit'],
      control: { type: 'inline-radio' },
      description: 'Подгонка к краям вьюпорта и вертикальный flip.',
    },
    open: {
      control: false,
      description: 'Контролируемое открытие (в сторис с состоянием не передаётся по умолчанию).',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Смена открытия.',
    },
    portalContainer: { control: false },
    boundaryElement: { control: false },
    contentWidth: {
      control: 'text',
      description: 'Ширина панели (строка CSS или число px).',
    },
    contentMaxHeight: {
      control: 'text',
      description: 'Максимальная высота с прокруткой.',
    },
    contentAriaLabel: {
      control: 'text',
      description: '`aria-label` панели.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    size: Size.MD,
    variant: 'default',
    positioningMode: 'autoFit',
    contentAriaLabel: 'Дополнительная информация',
  },
  render: args => (
    <Popover
      {...args}
      trigger={<Button variant="secondary">Открыть popover</Button>}
    >
      <div style={{ maxWidth: 280 }}>
        Текст и действия внутри панели. Радиусы, отступы и тень совпадают с токенами выпадающего меню (
        <code>theme.dropdowns</code>).
      </div>
    </Popover>
  ),
};

export const VariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      {(['default', 'elevated', 'outlined'] as const).map(variant => (
        <Popover
          key={variant}
          variant={variant}
          size={Size.MD}
          positioningMode="autoFit"
          contentAriaLabel={`Вариант ${variant}`}
          trigger={<Button variant="secondary">{variant}</Button>}
        >
          <div style={{ width: 220 }}>Вариант панели: {variant}</div>
        </Popover>
      ))}
      {[Size.SM, Size.MD, Size.LG].map(size => (
        <Popover
          key={size}
          size={size}
          variant="default"
          positioningMode="autoFit"
          contentAriaLabel={`Размер ${size}`}
          trigger={<Button variant="secondary">Size {size}</Button>}
        >
          <div>Размер {size}</div>
        </Popover>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <Popover
          open={open}
          onOpenChange={setOpen}
          positioningMode="autoFit"
          contentAriaLabel="Контролируемая панель"
          trigger={<Button variant="secondary">Триггер (контролируемый)</Button>}
        >
          <div style={{ width: 260 }}>
            Состояние снаружи: <strong>{open ? 'открыто' : 'закрыто'}</strong>
          </div>
        </Popover>
        <Button variant="ghost" onClick={() => setOpen(value => !value)}>
          Переключить извне
        </Button>
      </div>
    );
  },
};

export const ScrollableContent: Story = {
  args: {
    contentWidth: 280,
    contentMaxHeight: 160,
    positioningMode: 'autoFit',
    contentAriaLabel: 'Длинный список',
  },
  render: args => (
    <Popover
      {...args}
      trigger={<Button variant="secondary">С прокруткой</Button>}
    >
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {Array.from({ length: 20 }, (_, index) => (
          <li key={index}>Строка {index + 1}</li>
        ))}
      </ul>
    </Popover>
  ),
};

export const InlineInCard: Story = {
  render: () => (
    <div
      style={{
        padding: 24,
        border: '1px dashed rgba(0,0,0,0.2)',
        borderRadius: 12,
        maxWidth: 400,
      }}
    >
      <p style={{ marginTop: 0 }}>Панель позиционируется относительно корня popover (relative).</p>
      <Popover
        inline
        positioningMode="autoFit"
        contentAriaLabel="Внутри карточки"
        trigger={<Button variant="secondary">Inline popover</Button>}
      >
        <div style={{ width: 240 }}>Содержимое без портала в body — удобно в модалках и overflow-контейнерах.</div>
      </Popover>
    </div>
  ),
};
