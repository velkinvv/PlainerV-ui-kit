import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { GridItem } from './GridItem';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Card } from '../Card/Card';

const meta: Meta<typeof GridItem> = {
  title: 'Components/Grid/GridItem',
  component: GridItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Компонент для управления расположением элементов внутри Grid. Позволяет задавать позицию, растяжение и выравнивание элементов в CSS Grid.',
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
  tags: ['autodocs'],
  argTypes: {
    column: {
      control: 'text',
      description: 'Позиция по колонке (число или строка)',
    },
    row: {
      control: 'text',
      description: 'Позиция по строке (число или строка)',
    },
    columnSpan: {
      control: 'text',
      description: 'Растяжение по колонкам (число или строка)',
    },
    rowSpan: {
      control: 'text',
      description: 'Растяжение по строкам (число или строка)',
    },
    justifySelf: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Выравнивание по горизонтали внутри ячейки',
    },
    alignSelf: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
      description: 'Выравнивание по вертикали внутри ячейки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые истории
export const Default: Story = {
  render: () => (
    <Grid columns={3} gap={16} height="200px">
      <GridItem>
        <Card>Обычный элемент</Card>
      </GridItem>
      <GridItem columnSpan={2}>
        <Card>Растянутый на 2 колонки</Card>
      </GridItem>
      <GridItem>
        <Card>Обычный элемент</Card>
      </GridItem>
      <GridItem>
        <Card>Обычный элемент</Card>
      </GridItem>
    </Grid>
  ),
};

export const WithSpans: Story = {
  render: () => (
    <Grid columns={4} rows={3} gap={16} height="300px">
      <GridItem columnSpan={2} rowSpan={2}>
        <Card style={{ height: '100%' }}>Большой элемент (2x2)</Card>
      </GridItem>
      <GridItem column={3} columnSpan={2}>
        <Card>Широкий элемент (2x1)</Card>
      </GridItem>
      <GridItem row={2} rowSpan={2}>
        <Card style={{ height: '100%' }}>Высокий элемент (1x2)</Card>
      </GridItem>
      <GridItem column={4} row={3}>
        <Card>Маленький элемент</Card>
      </GridItem>
    </Grid>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Grid columns={3} rows={3} gap={16} height="300px">
      <GridItem justifySelf="start" alignSelf="start">
        <Card>Верхний левый</Card>
      </GridItem>
      <GridItem justifySelf="center" alignSelf="center">
        <Card>Центр</Card>
      </GridItem>
      <GridItem justifySelf="end" alignSelf="end">
        <Card>Нижний правый</Card>
      </GridItem>
      <GridItem columnSpan={2} justifySelf="stretch" alignSelf="stretch">
        <Card style={{ height: '100%' }}>Растянутый</Card>
      </GridItem>
      <GridItem column={3} row={2} justifySelf="center" alignSelf="baseline">
        <Card>Baseline</Card>
      </GridItem>
    </Grid>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Grid columns={6} rows={4} gap={12} height="400px">
      {/* Заголовок */}
      <GridItem columnSpan={6}>
        <Card>Заголовок страницы</Card>
      </GridItem>

      {/* Боковая панель */}
      <GridItem rowSpan={3}>
        <Card style={{ height: '100%' }}>Боковая панель</Card>
      </GridItem>

      {/* Основной контент */}
      <GridItem column={2} columnSpan={3} rowSpan={2}>
        <Card style={{ height: '100%' }}>Основной контент</Card>
      </GridItem>

      {/* Виджет */}
      <GridItem column={5} row={2} rowSpan={2}>
        <Card style={{ height: '100%' }}>Виджет</Card>
      </GridItem>

      {/* Дополнительный контент */}
      <GridItem column={2} row={3} columnSpan={2}>
        <Card>Дополнительный контент</Card>
      </GridItem>

      {/* Футер */}
      <GridItem column={1} row={4} columnSpan={6}>
        <Card>Футер</Card>
      </GridItem>
    </Grid>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <Grid columns={4} gap={16} height="300px">
      <GridItem columnSpan={2}>
        <Card>Главная область</Card>
      </GridItem>
      <GridItem column={3} columnSpan={2}>
        <Card>Боковая область</Card>
      </GridItem>
      <GridItem row={2} columnSpan={4}>
        <Card>Нижняя область</Card>
      </GridItem>
    </Grid>
  ),
};

export const NestedGridItems: Story = {
  render: () => (
    <Grid columns={3} gap={20} height="400px">
      <GridItem columnSpan={2}>
        <Card>
          <h3>Основная область</h3>
          <Grid columns={2} gap={8} style={{ marginTop: '16px' }}>
            <GridItem>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                }}
              >
                Вложенный элемент 1
              </div>
            </GridItem>
            <GridItem>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                }}
              >
                Вложенный элемент 2
              </div>
            </GridItem>
            <GridItem columnSpan={2}>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                }}
              >
                Широкий вложенный элемент
              </div>
            </GridItem>
          </Grid>
        </Card>
      </GridItem>
      <GridItem rowSpan={2}>
        <Card style={{ height: '100%' }}>
          <h3>Боковая панель</h3>
          <Grid columns={1} gap={8} style={{ marginTop: '16px' }}>
            <GridItem>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '4px',
                }}
              >
                Пункт меню 1
              </div>
            </GridItem>
            <GridItem>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '4px',
                }}
              >
                Пункт меню 2
              </div>
            </GridItem>
          </Grid>
        </Card>
      </GridItem>
    </Grid>
  ),
};
