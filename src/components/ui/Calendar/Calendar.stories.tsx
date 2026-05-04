import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { darkTheme } from '../../../themes/themes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { DOC_CALENDAR } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Calendar> = {
  title: 'UI Kit/Inputs/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_CALENDAR,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Выбранная дата в режиме `single`',
      table: {
        type: { summary: 'Date выбранного дня или null' },
      },
    },
    defaultValue: {
      description: 'Начальное значение в неконтролируемом режиме',
      table: {
        type: { summary: 'Date или null' },
      },
    },
    visibleMonth: {
      description: 'Контролируемый отображаемый месяц (начало месяца)',
      table: { type: { summary: 'Date' } },
    },
    defaultVisibleMonth: {
      description: 'Стартовый отображаемый месяц без `visibleMonth`',
      table: { type: { summary: 'Date' } },
    },
    rangeStart: {
      description: 'Начало выделенного диапазона при `selectionMode="range"`',
      table: { type: { summary: 'Date или null' } },
    },
    rangeEnd: {
      description: 'Конец диапазона',
      table: { type: { summary: 'Date или null' } },
    },
    rangeHoverDate: {
      description: 'Предпросмотр конца диапазона при наведении',
      table: { type: { summary: 'Date или null' } },
    },
    weekStartsOn: {
      description: 'С какого дня начинается неделя в шапке',
      table: { type: { summary: '0 (воскресенье) или 1 (понедельник)' } },
    },
    selectionMode: {
      description: 'Режим выбора дат',
      table: { type: { summary: '`single` или `range`' } },
    },
    monthYearLayout: {
      description: 'Разметка переключателя месяца и года',
      table: { type: { summary: '`combined` или `split`' } },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Растянуть календарь на всю ширину контейнера',
      table: { type: { summary: 'boolean' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 18));
    const [visibleMonth, setVisibleMonth] = useState(new Date(2025, 8, 1));
    return (
      <Calendar
        value={value}
        onChange={setValue}
        visibleMonth={visibleMonth}
        onVisibleMonthChange={setVisibleMonth}
        showTitle
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: new Date(2025, 8, 18),
    defaultVisibleMonth: new Date(2025, 8, 1),
    showTitle: true,
  },
};

export const FullWidth: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 18));
    return (
      <div
        style={{
          boxSizing: 'border-box',
          width: '100%',
          minHeight: '100vh',
          padding: 24,
        }}
      >
        <Calendar
          value={value}
          onChange={setValue}
          defaultVisibleMonth={new Date(2025, 8, 1)}
          fullWidth
          showTitle
        />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 18));
    return (
      <Calendar
        value={value}
        onChange={setValue}
        defaultVisibleMonth={new Date(2025, 8, 1)}
        minDate={new Date(2025, 7, 1)}
        maxDate={new Date(2025, 10, 30)}
        showTitle
      />
    );
  },
};

export const HeaderFull: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 15));
    return (
      <Calendar
        value={value}
        onChange={setValue}
        defaultVisibleMonth={new Date(2025, 8, 1)}
        headerMode="full"
        showTitle
      />
    );
  },
};

export const HeaderDayMonth: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 15));
    return (
      <Calendar
        value={value}
        onChange={setValue}
        defaultVisibleMonth={new Date(2025, 8, 1)}
        headerMode="dayMonth"
      />
    );
  },
};

export const NoMonthPicker: Story = {
  args: {
    defaultValue: new Date(2025, 8, 10),
    defaultVisibleMonth: new Date(2025, 8, 1),
    showMonthPicker: false,
  },
};

/** Роллеры день / месяц / год над сеткой */
export const WithDateRollers: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 18));
    const [visibleMonth, setVisibleMonth] = useState(new Date(2025, 8, 1));
    return (
      <Calendar
        value={value}
        onChange={setValue}
        visibleMonth={visibleMonth}
        onVisibleMonthChange={setVisibleMonth}
        showDateRollers
        showTitle
      />
    );
  },
};

/** Два триггера «месяц» и «год» */
export const MonthYearSplitHeader: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 18));
    const [visibleMonth, setVisibleMonth] = useState(new Date(2025, 8, 1));
    return (
      <Calendar
        value={value}
        onChange={setValue}
        visibleMonth={visibleMonth}
        onVisibleMonthChange={setVisibleMonth}
        monthYearLayout="split"
        showTitle
      />
    );
  },
};

/** Роллеры + раздельные триггеры */
export const RollersAndSplitHeader: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 18));
    const [visibleMonth, setVisibleMonth] = useState(new Date(2025, 8, 1));
    return (
      <Calendar
        value={value}
        onChange={setValue}
        visibleMonth={visibleMonth}
        onVisibleMonthChange={setVisibleMonth}
        showDateRollers
        monthYearLayout="split"
        showTitle
      />
    );
  },
};

/** Тёмная тема (только styled-тема на тёмном фоне) */
export const OnDarkSurface: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2025, 8, 18));
    return (
      <StyledThemeProvider theme={darkTheme}>
        <div style={{ background: '#1a1a1a', padding: 24, borderRadius: 12 }}>
          <Calendar value={value} onChange={setValue} defaultVisibleMonth={new Date(2025, 8, 1)} />
        </div>
      </StyledThemeProvider>
    );
  },
};

