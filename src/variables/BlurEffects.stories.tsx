import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BlurEffects } from './BlurEffects';
import { blurClasses } from './blur';

const meta: Meta<typeof BlurEffects> = {
  title: 'Variables/Blur Effects',
  component: BlurEffects,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Эффекты размытия для создания глубины и фокуса в интерфейсе. Нажмите на эффект, чтобы скопировать CSS значение.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Название категории',
    },
    description: {
      control: { type: 'text' },
      description: 'Описание категории',
    },
    effects: {
      control: { type: 'object' },
      description: 'Массив эффектов размытия',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlurEffects>;

/**
 * Основные эффекты размытия
 */
export const BasicBlurEffects: Story = {
  args: {
    name: 'Basic Blur Effects',
    description: 'Основные эффекты размытия для создания глубины и фокуса в интерфейсе.',
    effects: [
      {
        name: 'None',
        value: blurClasses.none,
        description: 'Без размытия - для элементов, которые должны быть четкими',
      },
      {
        name: 'Small',
        value: blurClasses.sm,
        description: 'Маленькое размытие для тонких эффектов',
      },
      {
        name: 'Medium',
        value: blurClasses.md,
        description: 'Среднее размытие для стандартных эффектов',
      },
      {
        name: 'Large',
        value: blurClasses.lg,
        description: 'Большое размытие для выраженных эффектов',
      },
      {
        name: 'Extra Large',
        value: blurClasses.xl,
        description: 'Очень большое размытие для сильных эффектов',
      },
      {
        name: '2X Large',
        value: blurClasses['2xl'],
        description: 'Экстра большое размытие для максимальных эффектов',
      },
      {
        name: '3X Large',
        value: blurClasses['3xl'],
        description: 'Максимальное размытие для экстремальных эффектов',
      },
    ],
  },
};

/**
 * Специальные эффекты размытия
 */
export const SpecialBlurEffects: Story = {
  args: {
    name: 'Special Blur Effects',
    description: 'Специальные эффекты размытия для создания уникальных визуальных эффектов.',
    effects: [
      {
        name: 'Glass Effect',
        value: blurClasses.glass,
        description: 'Эффект стекла с размытием, насыщенностью и яркостью',
      },
      {
        name: 'Light Glass',
        value: blurClasses.glassLight,
        description: 'Легкий эффект стекла для тонких элементов',
      },
      {
        name: 'Strong Glass',
        value: blurClasses.glassStrong,
        description: 'Сильный эффект стекла для важных элементов',
      },
    ],
  },
};

/**
 * Комбинированные эффекты
 */
export const CombinedEffects: Story = {
  args: {
    name: 'Filter Effects',
    description: 'Эффекты фильтрации для размытия самого элемента (не фона).',
    effects: [
      {
        name: 'Filter Small',
        value: blurClasses.filterSm,
        description: 'Фильтр маленького размытия для элемента',
      },
      {
        name: 'Filter Medium',
        value: blurClasses.filterMd,
        description: 'Фильтр среднего размытия для элемента',
      },
      {
        name: 'Filter Large',
        value: blurClasses.filterLg,
        description: 'Фильтр большого размытия для элемента',
      },
    ],
  },
};

/**
 * Все эффекты размытия
 */
export const AllBlurEffects: Story = {
  render: () => (
    <div>
      <BlurEffects
        name="Basic Blur Effects"
        description="Основные эффекты размытия для создания глубины и фокуса в интерфейсе"
        effects={[
          {
            name: 'None',
            value: blurClasses.none,
            description: 'Без размытия - для элементов, которые должны быть четкими',
          },
          {
            name: 'Small',
            value: blurClasses.sm,
            description: 'Маленькое размытие для тонких эффектов',
          },
          {
            name: 'Medium',
            value: blurClasses.md,
            description: 'Среднее размытие для стандартных эффектов',
          },
          {
            name: 'Large',
            value: blurClasses.lg,
            description: 'Большое размытие для выраженных эффектов',
          },
          {
            name: 'Extra Large',
            value: blurClasses.xl,
            description: 'Очень большое размытие для сильных эффектов',
          },
          {
            name: '2X Large',
            value: blurClasses['2xl'],
            description: 'Экстра большое размытие для максимальных эффектов',
          },
          {
            name: '3X Large',
            value: blurClasses['3xl'],
            description: 'Максимальное размытие для экстремальных эффектов',
          },
        ]}
      />

      <BlurEffects
        name="Special Blur Effects"
        description="Специальные эффекты размытия для создания уникальных визуальных эффектов"
        effects={[
          {
            name: 'Glass Effect',
            value: blurClasses.glass,
            description: 'Эффект стекла с размытием, насыщенностью и яркостью',
          },
          {
            name: 'Light Glass',
            value: blurClasses.glassLight,
            description: 'Легкий эффект стекла для тонких элементов',
          },
          {
            name: 'Strong Glass',
            value: blurClasses.glassStrong,
            description: 'Сильный эффект стекла для важных элементов',
          },
        ]}
      />

      <BlurEffects
        name="Filter Effects"
        description="Эффекты фильтрации для размытия самого элемента (не фона)"
        effects={[
          {
            name: 'Filter Small',
            value: blurClasses.filterSm,
            description: 'Фильтр маленького размытия для элемента',
          },
          {
            name: 'Filter Medium',
            value: blurClasses.filterMd,
            description: 'Фильтр среднего размытия для элемента',
          },
          {
            name: 'Filter Large',
            value: blurClasses.filterLg,
            description: 'Фильтр большого размытия для элемента',
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные эффекты размытия в дизайн-системе.',
      },
    },
  },
};
