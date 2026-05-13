import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Size } from '../../../types/sizes';
import { Button } from '../buttons/Button/Button';
import { DOC_POPOVER } from '@/components/ui/storyDocs/uiKitDocs';

import { Popover } from './Popover';
import { popoverStoriesStyles } from './Popover.stories.styles';

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
  render: (storyArgs) => (
    <Popover {...storyArgs} trigger={<Button variant="secondary">Открыть popover</Button>}>
      <div style={popoverStoriesStyles.maxWidth280}>
        Текст и действия внутри панели. Радиусы, отступы и тень совпадают с токенами выпадающего
        меню (<code>theme.dropdowns</code>).
      </div>
    </Popover>
  ),
};

export const VariantsAndSizes: Story = {
  render: () => (
    <div style={popoverStoriesStyles.variantsWrap}>
      {(['default', 'elevated', 'outlined'] as const).map((popoverVariant) => (
        <Popover
          key={popoverVariant}
          variant={popoverVariant}
          size={Size.MD}
          positioningMode="autoFit"
          contentAriaLabel={`Вариант ${popoverVariant}`}
          trigger={<Button variant="secondary">{popoverVariant}</Button>}
        >
          <div style={popoverStoriesStyles.width220}>Вариант панели: {popoverVariant}</div>
        </Popover>
      ))}
      {[Size.SM, Size.MD, Size.LG].map((popoverSize) => (
        <Popover
          key={popoverSize}
          size={popoverSize}
          variant="default"
          positioningMode="autoFit"
          contentAriaLabel={`Размер ${popoverSize}`}
          trigger={<Button variant="secondary">Size {popoverSize}</Button>}
        >
          <div>Размер {popoverSize}</div>
        </Popover>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={popoverStoriesStyles.controlledStack}>
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
          positioningMode="autoFit"
          contentAriaLabel="Контролируемая панель"
          trigger={<Button variant="secondary">Триггер (контролируемый)</Button>}
        >
          <div style={popoverStoriesStyles.width260}>
            Состояние снаружи: <strong>{isOpen ? 'открыто' : 'закрыто'}</strong>
          </div>
        </Popover>
        <Button
          variant="ghost"
          onClick={() => setIsOpen((previousOpenState) => !previousOpenState)}
        >
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
  render: (storyArgs) => (
    <Popover {...storyArgs} trigger={<Button variant="secondary">С прокруткой</Button>}>
      <ul style={popoverStoriesStyles.scrollableList}>
        {Array.from({ length: 20 }, (_unusedItem, lineNumber) => (
          <li key={lineNumber}>Строка {lineNumber + 1}</li>
        ))}
      </ul>
    </Popover>
  ),
};

export const InlineInCard: Story = {
  render: () => (
    <div style={popoverStoriesStyles.inlineCard}>
      <p style={popoverStoriesStyles.paragraphNoTopMargin}>
        Панель позиционируется относительно корня popover (relative).
      </p>
      <Popover
        inline
        positioningMode="autoFit"
        contentAriaLabel="Внутри карточки"
        trigger={<Button variant="secondary">Inline popover</Button>}
      >
        <div style={popoverStoriesStyles.width240}>
          Содержимое без портала в body — удобно в модалках и overflow-контейнерах.
        </div>
      </Popover>
    </div>
  ),
};
