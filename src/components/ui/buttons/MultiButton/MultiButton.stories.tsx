import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { MultiButton } from './MultiButton';
import { Size } from '../../../../types/sizes';
import { DOC_MULTI_BUTTON } from '@/components/ui/storyDocs/uiKitDocs';
import {
  MultiButtonStoriesCaption,
  MultiButtonStoriesRow,
  MultiButtonStoriesSectionTitle,
  MultiButtonStoriesStack,
} from './MultiButton.stories.style';

const sampleItems = [
  { value: 'draft', label: 'Сохранить черновик' },
  { value: 'template', label: 'Сохранить как шаблон' },
  { value: 'export', label: 'Экспорт' },
];

const meta: Meta<typeof MultiButton> = {
  title: 'UI Kit/Buttons/MultiButton',
  component: MultiButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_MULTI_BUTTON,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Подпись основной кнопки',
      table: { type: { summary: 'ReactNode' } },
    },
    appearance: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
      description: 'Стиль пары кнопок',
      table: { type: { summary: 'MultiButtonAppearance' } },
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер main и шеврона',
      table: { type: { summary: 'Size.SM | Size.MD | Size.LG' } },
    },
    items: {
      control: false,
      description: 'Пункты меню (как у DropMenu / Dropdown)',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокирует main и меню',
    },
    disabledMainButton: {
      control: 'boolean',
      description: 'Блокирует только основную кнопку',
    },
    skeleton: {
      control: 'boolean',
      description: 'Скелетон пары кнопок',
    },
    isVisible: {
      description: 'Controlled видимость меню',
    },
    onMainButtonClick: { action: 'onMainButtonClick', description: 'Клик по main' },
    onSelectItem: { action: 'onSelectItem', description: 'Выбор пункта меню' },
    onVisibilityChange: { action: 'onVisibilityChange', description: 'Смена видимости меню' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Сохранить',
    items: sampleItems,
    appearance: 'primary',
    size: Size.MD,
    onMainButtonClick: fn(),
    onSelectItem: fn(),
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    appearance: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    appearance: 'outline',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisabledMainButton: Story = {
  args: {
    ...Default.args,
    disabledMainButton: true,
  },
};

export const Skeleton: Story = {
  args: {
    ...Default.args,
    skeleton: true,
  },
};

export const ControlledMenu: Story = {
  render: function ControlledMenuStory() {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MultiButtonStoriesStack>
        <MultiButtonStoriesCaption>
          Меню: {isVisible ? 'открыто' : 'закрыто'}
        </MultiButtonStoriesCaption>
        <MultiButton
          items={sampleItems}
          isVisible={isVisible}
          onVisibilityChange={setIsVisible}
          onMainButtonClick={fn()}
          onSelectItem={fn()}
        >
          Controlled
        </MultiButton>
      </MultiButtonStoriesStack>
    );
  },
};

export const Showcase: Story = {
  render: () => (
    <MultiButtonStoriesStack>
      <section>
        <MultiButtonStoriesSectionTitle>Appearance</MultiButtonStoriesSectionTitle>
        <MultiButtonStoriesRow>
          <MultiButton items={sampleItems} appearance="primary" onMainButtonClick={fn()} onSelectItem={fn()}>
            Primary
          </MultiButton>
          <MultiButton
            items={sampleItems}
            appearance="secondary"
            onMainButtonClick={fn()}
            onSelectItem={fn()}
          >
            Secondary
          </MultiButton>
          <MultiButton items={sampleItems} appearance="outline" onMainButtonClick={fn()} onSelectItem={fn()}>
            Outline
          </MultiButton>
        </MultiButtonStoriesRow>
      </section>
      <section>
        <MultiButtonStoriesSectionTitle>Sizes</MultiButtonStoriesSectionTitle>
        <MultiButtonStoriesRow>
          <MultiButton items={sampleItems} size={Size.SM} onMainButtonClick={fn()} onSelectItem={fn()}>
            SM
          </MultiButton>
          <MultiButton items={sampleItems} size={Size.MD} onMainButtonClick={fn()} onSelectItem={fn()}>
            MD
          </MultiButton>
          <MultiButton items={sampleItems} size={Size.LG} onMainButtonClick={fn()} onSelectItem={fn()}>
            LG
          </MultiButton>
        </MultiButtonStoriesRow>
      </section>
    </MultiButtonStoriesStack>
  ),
};
