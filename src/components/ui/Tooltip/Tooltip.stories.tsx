import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { ButtonVariant, TooltipPosition } from '../../../types/ui';
import { Button } from '../buttons/Button/Button';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import { DOC_TOOLTIP } from '@/components/ui/storyDocs/uiKitDocs';
import { tooltipStoriesStyles } from './Tooltip.stories.styles';

const meta: Meta<typeof Tooltip> = {
  title: 'UI Kit/Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: DOC_TOOLTIP,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Содержимое подсказки',
    },
    position: {
      control: { type: 'select' },
      options: Object.values(TooltipPosition),
      description: 'Позиция подсказки',
      table: {
        type: { summary: 'top, bottom, left, right (TooltipPosition)' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер подсказки',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Задержка показа подсказки (мс)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключить подсказку',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые истории
export const Default: Story = {
  args: {
    content: 'Это базовая подсказка',
    children: <Button>Наведи на меня</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Информационная иконка',
    children: <Icon name="IconExInfoSquare" size={IconSize.MD} />,
    position: TooltipPosition.TOP,
  },
};

// Истории по позициям
export const TopPosition: Story = {
  args: {
    content: 'Подсказка сверху',
    position: TooltipPosition.TOP,
    children: <Button variant={ButtonVariant.PRIMARY}>Сверху</Button>,
  },
};

export const BottomPosition: Story = {
  args: {
    content: 'Подсказка снизу',
    position: TooltipPosition.BOTTOM,
    children: <Button variant={ButtonVariant.SECONDARY}>Снизу</Button>,
  },
};

export const LeftPosition: Story = {
  args: {
    content: 'Подсказка слева',
    position: TooltipPosition.LEFT,
    children: <Button variant={ButtonVariant.OUTLINE}>Слева</Button>,
  },
};

export const RightPosition: Story = {
  args: {
    content: 'Подсказка справа',
    position: TooltipPosition.RIGHT,
    children: <Button variant={ButtonVariant.GHOST}>Справа</Button>,
  },
};

// Истории с задержкой
export const WithDelay: Story = {
  args: {
    content: 'Подсказка с задержкой 500мс',
    delay: 500,
    children: <Button variant={ButtonVariant.SUCCESS}>С задержкой</Button>,
  },
};

export const Instant: Story = {
  args: {
    content: 'Мгновенная подсказка',
    delay: 0,
    children: <Button variant={ButtonVariant.DANGER}>Мгновенно</Button>,
  },
};

// История с длинным текстом
export const LongContent: Story = {
  args: {
    content:
      'Это очень длинная подсказка с множеством текста, которая демонстрирует, как компонент обрабатывает длинный контент и переносит его на несколько строк',
    children: <Button variant={ButtonVariant.LINE}>Длинный текст</Button>,
  },
};

// История с HTML контентом
export const HtmlContent: Story = {
  args: {
    content: (
      <div>
        <strong>Жирный текст</strong>
        <br />
        <em>Курсив</em>
        <br />
        <span style={tooltipStoriesStyles.htmlAccentText}>Цветной текст</span>
      </div>
    ),
    children: <Button variant={ButtonVariant.PRIMARY}>HTML контент</Button>,
  },
};

// История с отключенной подсказкой
export const Disabled: Story = {
  args: {
    content: 'Эта подсказка отключена',
    disabled: true,
    children: <Button variant={ButtonVariant.SECONDARY}>Отключено</Button>,
  },
};

// Демонстрация всех позиций
export const AllPositions: Story = {
  render: () => (
    <div style={tooltipStoriesStyles.gridDemo}>
      <Tooltip content="Подсказка сверху" position={TooltipPosition.TOP}>
        <Button variant={ButtonVariant.PRIMARY}>TOP</Button>
      </Tooltip>

      <Tooltip content="Подсказка снизу" position={TooltipPosition.BOTTOM}>
        <Button variant={ButtonVariant.SECONDARY}>BOTTOM</Button>
      </Tooltip>

      <Tooltip content="Подсказка слева" position={TooltipPosition.LEFT}>
        <Button variant={ButtonVariant.OUTLINE}>LEFT</Button>
      </Tooltip>

      <Tooltip content="Подсказка справа" position={TooltipPosition.RIGHT}>
        <Button variant={ButtonVariant.GHOST}>RIGHT</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех доступных позиций подсказки',
      },
    },
  },
};

// Демонстрация с иконками
export const WithIcons: Story = {
  render: () => (
    <div style={tooltipStoriesStyles.rowDemo}>
      <Tooltip content="Информация">
        <Icon name="IconExInfoSquare" size={IconSize.MD} />
      </Tooltip>

      <Tooltip content="Предупреждение">
        <Icon name="IconPlainerWarning" size={IconSize.MD} />
      </Tooltip>

      <Tooltip content="Ошибка">
        <Icon name="IconPlainerClose" size={IconSize.MD} />
      </Tooltip>

      <Tooltip content="Успех">
        <Icon name="IconExCheck" size={IconSize.MD} />
      </Tooltip>

      <Tooltip content="Настройки">
        <Icon name="IconExSettings" size={IconSize.MD} />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Подсказки с различными иконками',
      },
    },
  },
};

// Демонстрация с разными задержками
export const DifferentDelays: Story = {
  render: () => (
    <div style={tooltipStoriesStyles.rowDemo}>
      <Tooltip content="Без задержки" delay={0}>
        <Button variant={ButtonVariant.PRIMARY}>0мс</Button>
      </Tooltip>

      <Tooltip content="Задержка 200мс" delay={200}>
        <Button variant={ButtonVariant.SECONDARY}>200мс</Button>
      </Tooltip>

      <Tooltip content="Задержка 500мс" delay={500}>
        <Button variant={ButtonVariant.OUTLINE}>500мс</Button>
      </Tooltip>

      <Tooltip content="Задержка 1000мс" delay={1000}>
        <Button variant={ButtonVariant.GHOST}>1000мс</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных задержек показа подсказки',
      },
    },
  },
};

// Демонстрация размеров
export const Sizes: Story = {
  render: () => (
    <div style={tooltipStoriesStyles.rowDemo}>
      <Tooltip content="Маленькая подсказка" size={Size.SM}>
        <Button variant={ButtonVariant.PRIMARY}>SM</Button>
      </Tooltip>

      <Tooltip content="Средняя подсказка" size={Size.MD}>
        <Button variant={ButtonVariant.SECONDARY}>MD</Button>
      </Tooltip>

      <Tooltip content="Большая подсказка" size={Size.LG}>
        <Button variant={ButtonVariant.OUTLINE}>LG</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных размеров подсказок',
      },
    },
  },
};

// Демонстрация стрелок
export const ArrowDemo: Story = {
  render: () => (
    <div style={tooltipStoriesStyles.arrowDemo}>
      <Tooltip content="Стрелка вниз" position={TooltipPosition.TOP}>
        <Button variant={ButtonVariant.PRIMARY}>Top</Button>
      </Tooltip>

      <Tooltip content="Стрелка вверх" position={TooltipPosition.BOTTOM}>
        <Button variant={ButtonVariant.SECONDARY}>Bottom</Button>
      </Tooltip>

      <Tooltip content="Стрелка вправо" position={TooltipPosition.LEFT}>
        <Button variant={ButtonVariant.OUTLINE}>Left</Button>
      </Tooltip>

      <Tooltip content="Стрелка влево" position={TooltipPosition.RIGHT}>
        <Button variant={ButtonVariant.GHOST}>Right</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация стрелок tooltip во всех направлениях',
      },
    },
  },
};

