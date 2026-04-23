import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { darkTheme } from '../../../themes/themes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Inputs/Calendar',
  component: Calendar,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4817-15976',
    },
    docs: {
      description: {
        component:
          'Календарь по макетам Figma: сетка 7×6, подписи дней недели (`weekStartsOn`), выбор дня, стрелки месяца, выпадающий список месяца/года на базе `Dropdown`. Опции: `showDateRollers` — роллеры день/месяц/год; `monthYearLayout="split"` — два триггера месяц и год. Ссылки: [месяц/год](https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4858-15297&t=cStO03cIis1M6Tar-4), [роллеры](https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4863-782&t=cStO03cIis1M6Tar-4), [триггеры](https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4858-15432&t=cStO03cIis1M6Tar-4).',
      },
    },
  },
  tags: ['autodocs'],
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
