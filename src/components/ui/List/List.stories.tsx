import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List } from './List';
import { Size } from '../../../types/sizes';
import { DOC_LIST } from '@/components/ui/storyDocs/uiKitDocs';
import {
  ListStoriesCaption,
  ListStoriesColumns,
  ListStoriesSectionTitle,
  ListStoriesStack,
} from './List.stories.style';

const meta: Meta<typeof List> = {
  title: 'UI Kit/Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_LIST,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['ordered', 'unordered'],
      description: '`ol` или `ul`',
    },
    markerStyle: {
      control: { type: 'select' },
      options: ['numbers', 'lower-letters', 'upper-letters', 'bullet', 'virgule', 'icon'],
      description: 'Стиль маркера (зависит от variant)',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD],
    },
    gap: {
      description: 'Расстояние между пунктами (px или CSS)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unordered: Story = {
  args: {
    variant: 'unordered',
    markerStyle: 'bullet',
    children: (
      <>
        <List.Item>Первый пункт</List.Item>
        <List.Item>Второй пункт</List.Item>
        <List.Item>Третий пункт</List.Item>
      </>
    ),
  },
};

export const Ordered: Story = {
  args: {
    variant: 'ordered',
    markerStyle: 'numbers',
    children: (
      <>
        <List.Item>Шаг один</List.Item>
        <List.Item>Шаг два</List.Item>
        <List.Item>Шаг три</List.Item>
      </>
    ),
  },
};

export const LowerLetters: Story = {
  args: {
    variant: 'ordered',
    markerStyle: 'lower-letters',
    children: (
      <>
        <List.Item>Вариант а</List.Item>
        <List.Item>Вариант б</List.Item>
        <List.Item>Вариант в</List.Item>
      </>
    ),
  },
};

export const UpperLetters: Story = {
  args: {
    variant: 'ordered',
    markerStyle: 'upper-letters',
    children: (
      <>
        <List.Item>Вариант А</List.Item>
        <List.Item>Вариант Б</List.Item>
        <List.Item>Вариант В</List.Item>
      </>
    ),
  },
};

export const Virgule: Story = {
  args: {
    variant: 'unordered',
    markerStyle: 'virgule',
    children: (
      <>
        <List.Item>Тире вместо точки</List.Item>
        <List.Item>Ещё пункт</List.Item>
      </>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'unordered',
    markerStyle: 'icon',
    children: (
      <>
        <List.Item>
          <List.Icon name="IconExCheck" />
          Готово
        </List.Item>
        <List.Item>
          <List.Icon name="IconExInfoCircle" />
          Информация
        </List.Item>
        <List.Item>
          <List.Icon name="IconExClose" />
          Отклонено
        </List.Item>
      </>
    ),
  },
};

export const Nested: Story = {
  render: () => (
    <List variant="ordered" markerStyle="numbers">
      <List.Item>
        Раздел
        <List variant="ordered" markerStyle="numbers">
          <List.Item>Подпункт 1.1</List.Item>
          <List.Item>
            Подпункт 1.2
            <List variant="unordered" markerStyle="bullet">
              <List.Item>Деталь</List.Item>
              <List.Item>Ещё деталь</List.Item>
            </List>
          </List.Item>
        </List>
      </List.Item>
      <List.Item>Второй раздел</List.Item>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <ListStoriesColumns>
      <div>
        <ListStoriesCaption>SM</ListStoriesCaption>
        <List size={Size.SM} variant="unordered">
          <List.Item>Мелкий список</List.Item>
          <List.Item>Второй пункт</List.Item>
        </List>
      </div>
      <div>
        <ListStoriesCaption>MD</ListStoriesCaption>
        <List size={Size.MD} variant="unordered">
          <List.Item>Обычный список</List.Item>
          <List.Item>Второй пункт</List.Item>
        </List>
      </div>
    </ListStoriesColumns>
  ),
};

export const Showcase: Story = {
  render: () => (
    <ListStoriesStack>
      <section>
        <ListStoriesSectionTitle>Ordered</ListStoriesSectionTitle>
        <List variant="ordered" markerStyle="numbers" gap={12}>
          <List.Item>Numbers</List.Item>
          <List.Item>
            С вложением
            <List variant="ordered" markerStyle="lower-letters">
              <List.Item>Буквы</List.Item>
              <List.Item>Ещё</List.Item>
            </List>
          </List.Item>
        </List>
      </section>
      <section>
        <ListStoriesSectionTitle>Unordered</ListStoriesSectionTitle>
        <List variant="unordered" markerStyle="bullet">
          <List.Item>Bullet</List.Item>
          <List.Item>Пункт</List.Item>
        </List>
      </section>
      <section>
        <ListStoriesSectionTitle>Icons</ListStoriesSectionTitle>
        <List variant="unordered" markerStyle="icon">
          <List.Item>
            <List.Icon name="IconExCheck" />
            С иконкой
          </List.Item>
        </List>
      </section>
    </ListStoriesStack>
  ),
};
