import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { GridItem } from './GridItem';
import { GridMode } from '../../../types/ui';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Card } from '../Card/Card';
import { DOC_GRID } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Grid> = {
  title: 'UI Kit/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_GRID,
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
    mode: {
      control: { type: 'select' },
      options: [...Object.values(GridMode)],
      description: 'Режим отображения',
      table: {
        type: { summary: '`fullscreen` или `container`' },
      },
    },
    container: {
      control: { type: 'boolean' },
      description: 'Использовать режим контейнера',
    },
    columns: {
      control: 'object',
      description: 'Количество колонок (число, строка или объект с брейкпоинтами)',
      table: {
        type: { summary: 'число, CSS-строка или объект `GridBreakpoint`' },
      },
    },
    rows: {
      control: 'object',
      description: 'Количество строк (число, строка или объект с брейкпоинтами)',
      table: {
        type: { summary: 'число, CSS-строка или объект `GridBreakpoint`' },
      },
    },
    gap: {
      control: 'object',
      description: 'Отступы между элементами',
      table: {
        type: { summary: 'число, CSS-строка или объект `GridBreakpoint`' },
      },
    },
    rowGap: {
      control: 'object',
      description: 'Отступы между строками',
      table: {
        type: { summary: 'число, CSS-строка или объект `GridBreakpoint`' },
      },
    },
    columnGap: {
      control: 'object',
      description: 'Отступы между колонками',
      table: {
        type: { summary: 'число, CSS-строка или объект `GridBreakpoint`' },
      },
    },
    justifyContent: {
      control: { type: 'select' },
      options: [
        'start',
        'end',
        'center',
        'stretch',
        'space-around',
        'space-between',
        'space-evenly',
      ],
      description: 'Выравнивание по горизонтали',
    },
    alignItems: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
      description: 'Выравнивание по вертикали',
    },
    autoFit: {
      control: { type: 'boolean' },
      description: 'Автоматическое размещение с auto-fit',
    },
    autoFill: {
      control: { type: 'boolean' },
      description: 'Автоматическое размещение с auto-fill',
    },
    minColumnWidth: {
      control: 'text',
      description: 'Минимальная ширина колонки',
    },
    maxColumnWidth: {
      control: 'text',
      description: 'Максимальная ширина колонки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые истории
export const Default: Story = {
  args: {
    columns: 3,
    gap: 16,
    children: (
      <>
        <Card>Элемент 1</Card>
        <Card>Элемент 2</Card>
        <Card>Элемент 3</Card>
        <Card>Элемент 4</Card>
        <Card>Элемент 5</Card>
        <Card>Элемент 6</Card>
      </>
    ),
  },
};

export const Container: Story = {
  args: {
    mode: GridMode.CONTAINER,
    columns: 4,
    gap: 20,
    children: (
      <>
        <Card>Контейнер элемент 1</Card>
        <Card>Контейнер элемент 2</Card>
        <Card>Контейнер элемент 3</Card>
        <Card>Контейнер элемент 4</Card>
      </>
    ),
  },
};

export const Fullscreen: Story = {
  args: {
    mode: GridMode.FULLSCREEN,
    columns: 2,
    rows: 2,
    gap: 16,
    children: (
      <>
        <Card>Полноэкранный элемент 1</Card>
        <Card>Полноэкранный элемент 2</Card>
        <Card>Полноэкранный элемент 3</Card>
        <Card>Полноэкранный элемент 4</Card>
      </>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Адаптивные истории
export const Responsive: Story = {
  args: {
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 6,
    },
    gap: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
    children: (
      <>
        <Card>Адаптивный 1</Card>
        <Card>Адаптивный 2</Card>
        <Card>Адаптивный 3</Card>
        <Card>Адаптивный 4</Card>
        <Card>Адаптивный 5</Card>
        <Card>Адаптивный 6</Card>
        <Card>Адаптивный 7</Card>
        <Card>Адаптивный 8</Card>
      </>
    ),
  },
};

export const AutoFit: Story = {
  args: {
    autoFit: true,
    minColumnWidth: '200px',
    gap: 16,
    children: (
      <>
        <Card>Auto-fit элемент 1</Card>
        <Card>Auto-fit элемент 2</Card>
        <Card>Auto-fit элемент 3</Card>
        <Card>Auto-fit элемент 4</Card>
        <Card>Auto-fit элемент 5</Card>
        <Card>Auto-fit элемент 6</Card>
        <Card>Auto-fit элемент 7</Card>
        <Card>Auto-fit элемент 8</Card>
      </>
    ),
  },
};

export const AutoFill: Story = {
  args: {
    autoFill: true,
    minColumnWidth: '150px',
    gap: 12,
    children: (
      <>
        <Card>Auto-fill элемент 1</Card>
        <Card>Auto-fill элемент 2</Card>
        <Card>Auto-fill элемент 3</Card>
        <Card>Auto-fill элемент 4</Card>
        <Card>Auto-fill элемент 5</Card>
        <Card>Auto-fill элемент 6</Card>
      </>
    ),
  },
};

// Выравнивание
export const Alignment: Story = {
  args: {
    columns: 3,
    rows: 2,
    gap: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '300px',
    children: (
      <>
        <Card style={{ height: '100px' }}>Выровненный 1</Card>
        <Card style={{ height: '150px' }}>Выровненный 2</Card>
        <Card style={{ height: '80px' }}>Выровненный 3</Card>
        <Card style={{ height: '120px' }}>Выровненный 4</Card>
        <Card style={{ height: '90px' }}>Выровненный 5</Card>
        <Card style={{ height: '110px' }}>Выровненный 6</Card>
      </>
    ),
  },
};

// Вложенность
export const Nested: Story = {
  args: {
    columns: 2,
    gap: 20,
    children: (
      <>
        <Card>
          <h3>Внешний элемент 1</h3>
          <Grid columns={2} gap={8} style={{ marginTop: '16px' }}>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Вложенный 1-1
            </div>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Вложенный 1-2
            </div>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Вложенный 1-3
            </div>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Вложенный 1-4
            </div>
          </Grid>
        </Card>
        <Card>
          <h3>Внешний элемент 2</h3>
          <Grid columns={1} gap={8} style={{ marginTop: '16px' }}>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#e8f5e8',
                borderRadius: '4px',
              }}
            >
              Вложенный 2-1
            </div>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#e8f5e8',
                borderRadius: '4px',
              }}
            >
              Вложенный 2-2
            </div>
          </Grid>
        </Card>
      </>
    ),
  },
};

// Строки
export const WithRows: Story = {
  args: {
    columns: 3,
    rows: 3,
    gap: 16,
    height: '400px',
    children: (
      <>
        <GridItem columnSpan={2}>
          <Card>Растянутый на 2 колонки</Card>
        </GridItem>
        <GridItem>
          <Card>Обычный элемент</Card>
        </GridItem>
        <GridItem>
          <Card>Обычный элемент</Card>
        </GridItem>
        <GridItem rowSpan={2}>
          <Card style={{ height: '100%' }}>Растянутый на 2 строки</Card>
        </GridItem>
        <GridItem>
          <Card>Обычный элемент</Card>
        </GridItem>
        <GridItem>
          <Card>Обычный элемент</Card>
        </GridItem>
        <GridItem>
          <Card>Обычный элемент</Card>
        </GridItem>
        <GridItem>
          <Card>Обычный элемент</Card>
        </GridItem>
      </>
    ),
  },
};

// Максимальная ширина колонок
export const MaxColumnWidth: Story = {
  args: {
    maxColumnWidth: '300px',
    gap: 16,
    children: (
      <>
        <Card>Ограниченная ширина 1</Card>
        <Card>Ограниченная ширина 2</Card>
        <Card>Ограниченная ширина 3</Card>
        <Card>Ограниченная ширина 4</Card>
        <Card>Ограниченная ширина 5</Card>
        <Card>Ограниченная ширина 6</Card>
      </>
    ),
  },
};

// Демонстрация всех возможностей
export const AllFeatures: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Демонстрация всех возможностей Grid</h2>

      <h3>1. Базовый Grid</h3>
      <Grid columns={3} gap={16} style={{ marginBottom: '40px' }}>
        <Card>Базовый 1</Card>
        <Card>Базовый 2</Card>
        <Card>Базовый 3</Card>
      </Grid>

      <h3>2. Адаптивный Grid</h3>
      <Grid
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        gap={{ xs: 8, sm: 12, md: 16, lg: 20 }}
        style={{ marginBottom: '40px' }}
      >
        <Card>Адаптивный 1</Card>
        <Card>Адаптивный 2</Card>
        <Card>Адаптивный 3</Card>
        <Card>Адаптивный 4</Card>
      </Grid>

      <h3>3. Auto-fit Grid</h3>
      <Grid autoFit minColumnWidth="200px" gap={16} style={{ marginBottom: '40px' }}>
        <Card>Auto-fit 1</Card>
        <Card>Auto-fit 2</Card>
        <Card>Auto-fit 3</Card>
        <Card>Auto-fit 4</Card>
      </Grid>

      <h3>4. Grid с выравниванием</h3>
      <Grid
        columns={3}
        rows={2}
        gap={16}
        justifyContent="space-between"
        alignItems="center"
        height="200px"
        style={{ marginBottom: '40px' }}
      >
        <GridItem height="80px">
          <Card style={{ height: '100%' }}>Выровненный 1</Card>
        </GridItem>
        <GridItem height="120px">
          <Card style={{ height: '100%' }}>Выровненный 2</Card>
        </GridItem>
        <GridItem height="100px">
          <Card style={{ height: '100%' }}>Выровненный 3</Card>
        </GridItem>
        <GridItem height="90px">
          <Card style={{ height: '100%' }}>Выровненный 4</Card>
        </GridItem>
        <GridItem height="110px">
          <Card style={{ height: '100%' }}>Выровненный 5</Card>
        </GridItem>
        <GridItem height="70px">
          <Card style={{ height: '100%' }}>Выровненный 6</Card>
        </GridItem>
      </Grid>

      <h3>5. Вложенный Grid</h3>
      <Grid columns={2} gap={20} style={{ marginBottom: '40px' }}>
        <Card>
          <h4>Внешний элемент</h4>
          <Grid columns={2} gap={8} style={{ marginTop: '16px' }}>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Вложенный 1
            </div>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Вложенный 2
            </div>
          </Grid>
        </Card>
        <Card>
          <h4>Другой внешний элемент</h4>
          <Grid columns={1} gap={8} style={{ marginTop: '16px' }}>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#e8f5e8',
                borderRadius: '4px',
              }}
            >
              Вложенный 3
            </div>
            <div
              style={{
                padding: '8px',
                backgroundColor: '#e8f5e8',
                borderRadius: '4px',
              }}
            >
              Вложенный 4
            </div>
          </Grid>
        </Card>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех основных возможностей Grid компонента',
      },
    },
  },
};

