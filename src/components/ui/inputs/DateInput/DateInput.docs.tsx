import { DateInput } from './DateInput';
import { Size } from '../../../../types/sizes';
import { defineComponentDocs } from '../../../../docs/defineComponentDocs';

export default defineComponentDocs({
  meta: {
    name: 'DateInput',
    group: 'Inputs',
    platform: 'web',
    since: '0.3.4',
    status: 'beta',
    description: 'Поле выбора даты/диапазона с форматами precision и календарным popover.',
  },
  examples: [
    {
      id: 'single-date',
      title: 'Одиночная дата',
      description: 'Базовый сценарий выбора одной даты.',
      code: '<DateInput label="Дата" value="2026-08-15" onChange={() => undefined} />',
      render: () => (
        <DateInput label="Дата" value="2026-08-15" onChange={() => undefined} fullWidth />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
    {
      id: 'date-range',
      title: 'Диапазон дат',
      description: 'Range-режим с объектом start/end.',
      code: '<DateInput range value={{ start: "2026-08-10", end: "2026-08-15" }} onChange={() => undefined} />',
      render: () => (
        <DateInput
          range
          value={{ start: '2026-08-10', end: '2026-08-15' }}
          onChange={() => undefined}
          fullWidth
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
    {
      id: 'month-precision',
      title: 'Точность month',
      description: 'Режим выбора месяца с форматом YYYY-MM.',
      code: '<DateInput precision="month" value="2026-08" onChange={() => undefined} size={Size.MD} />',
      render: () => (
        <DateInput
          precision="month"
          value="2026-08"
          onChange={() => undefined}
          size={Size.MD}
          fullWidth
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['textbox', 'dialog'],
    keyboard: ['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Tab'],
  },
  related: [
    { name: 'Input', href: '/components/input' },
    { name: 'Calendar', href: '/components/calendar' },
  ],
});
