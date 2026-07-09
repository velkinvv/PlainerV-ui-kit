import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import { DOC_SEGMENTED_CONTROL } from '@/components/ui/storyDocs/uiKitDocs';
import {
  SegmentedControlStoriesCaption,
  SegmentedControlStoriesRow,
  SegmentedControlStoriesSectionTitle,
  SegmentedControlStoriesStack,
} from './SegmentedControl.stories.style';

const meta: Meta<typeof SegmentedControl> = {
  title: 'UI Kit/Buttons/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SEGMENTED_CONTROL,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Вид группы сегментов',
      table: { type: { summary: 'SegmentedControlAppearance' } },
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер сегментов',
      table: { type: { summary: 'Size.SM | Size.MD | Size.LG' } },
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: '`single` — radio; `multiple` — checkbox',
      table: { type: { summary: 'SegmentedControlSelectionMode' } },
    },
    value: {
      description: 'Controlled значение (`string` или `string[]`)',
    },
    defaultValue: {
      description: 'Uncontrolled начальное значение',
    },
    options: {
      control: false,
      description: 'Data-driven список сегментов',
      table: { type: { summary: 'SegmentedControlOption[]' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Растянуть на ширину родителя',
    },
    ariaLabel: {
      description: 'Подпись группы для a11y',
    },
    onChange: { action: 'onChange', description: 'Смена выбранного значения' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appearance: 'outline',
    size: Size.MD,
    defaultValue: 'list',
    ariaLabel: 'Вид',
    onChange: fn(),
    children: (
      <>
        <SegmentedControl.Item value="list">Список</SegmentedControl.Item>
        <SegmentedControl.Item value="grid">Сетка</SegmentedControl.Item>
        <SegmentedControl.Item value="table">Таблица</SegmentedControl.Item>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    appearance: 'filled',
  },
};

export const WithIcons: Story = {
  render: () => (
    <SegmentedControl defaultValue="list" ariaLabel="Вид с иконками">
      <SegmentedControl.Item
        value="list"
        leftIcon={<Icon name="IconExDocument" size={IconSize.SM} color="currentColor" />}
      >
        Список
      </SegmentedControl.Item>
      <SegmentedControl.Item
        value="grid"
        leftIcon={<Icon name="IconExCategory" size={IconSize.SM} color="currentColor" />}
      >
        Сетка
      </SegmentedControl.Item>
    </SegmentedControl>
  ),
};

export const Multiple: Story = {
  render: function MultipleStory() {
    const [value, setValue] = useState<string[]>(['a']);

    return (
      <SegmentedControlStoriesStack>
        <SegmentedControlStoriesCaption>
          Выбрано: {value.join(', ') || '—'}
        </SegmentedControlStoriesCaption>
        <SegmentedControl
          selectionMode="multiple"
          value={value}
          onChange={(nextValue) => setValue(nextValue as string[])}
          ariaLabel="Фильтры"
        >
          <SegmentedControl.Item value="a">A</SegmentedControl.Item>
          <SegmentedControl.Item value="b">B</SegmentedControl.Item>
          <SegmentedControl.Item value="c">C</SegmentedControl.Item>
        </SegmentedControl>
      </SegmentedControlStoriesStack>
    );
  },
};

export const OptionsApi: Story = {
  args: {
    ariaLabel: 'Опции',
    defaultValue: 'day',
    options: [
      { value: 'day', label: 'День' },
      { value: 'week', label: 'Неделя' },
      { value: 'month', label: 'Месяц', disabled: true },
    ],
    onChange: fn(),
  },
};

export const LoadingAndSquare: Story = {
  render: () => (
    <SegmentedControlStoriesRow>
      <SegmentedControl defaultValue="a" ariaLabel="С загрузкой">
        <SegmentedControl.Item value="a">Готово</SegmentedControl.Item>
        <SegmentedControl.Item value="b" loading>
          Загрузка
        </SegmentedControl.Item>
      </SegmentedControl>
      <SegmentedControl defaultValue="list" ariaLabel="Квадратные иконки">
        <SegmentedControl.Item
          value="list"
          displayAsSquare
          leftIcon={<Icon name="IconExDocument" size={IconSize.SM} color="currentColor" />}
          aria-label="Список"
        />
        <SegmentedControl.Item
          value="grid"
          displayAsSquare
          leftIcon={<Icon name="IconExCategory" size={IconSize.SM} color="currentColor" />}
          aria-label="Сетка"
        />
      </SegmentedControl>
    </SegmentedControlStoriesRow>
  ),
};

export const Showcase: Story = {
  render: () => (
    <SegmentedControlStoriesStack>
      <section>
        <SegmentedControlStoriesSectionTitle>Appearance</SegmentedControlStoriesSectionTitle>
        <SegmentedControlStoriesRow>
          <SegmentedControl appearance="outline" defaultValue="1" ariaLabel="Outline">
            <SegmentedControl.Item value="1">Outline</SegmentedControl.Item>
            <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
          </SegmentedControl>
          <SegmentedControl appearance="filled" defaultValue="1" ariaLabel="Filled">
            <SegmentedControl.Item value="1">Filled</SegmentedControl.Item>
            <SegmentedControl.Item value="2">Two</SegmentedControl.Item>
          </SegmentedControl>
        </SegmentedControlStoriesRow>
      </section>
      <section>
        <SegmentedControlStoriesSectionTitle>Sizes</SegmentedControlStoriesSectionTitle>
        <SegmentedControlStoriesRow>
          <SegmentedControl size={Size.SM} defaultValue="a" ariaLabel="SM">
            <SegmentedControl.Item value="a">SM</SegmentedControl.Item>
            <SegmentedControl.Item value="b">B</SegmentedControl.Item>
          </SegmentedControl>
          <SegmentedControl size={Size.MD} defaultValue="a" ariaLabel="MD">
            <SegmentedControl.Item value="a">MD</SegmentedControl.Item>
            <SegmentedControl.Item value="b">B</SegmentedControl.Item>
          </SegmentedControl>
          <SegmentedControl size={Size.LG} defaultValue="a" ariaLabel="LG">
            <SegmentedControl.Item value="a">LG</SegmentedControl.Item>
            <SegmentedControl.Item value="b">B</SegmentedControl.Item>
          </SegmentedControl>
        </SegmentedControlStoriesRow>
      </section>
    </SegmentedControlStoriesStack>
  ),
};
