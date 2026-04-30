import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TimeInput } from './TimeInput';
import { Size, IconSize } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';

const meta: Meta<typeof TimeInput> = {
  title: 'UI Kit/Inputs/TimeInput',
  component: TimeInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description:
        'При `range: false` — строка времени (например `14:30` или `14:30:00` с секундами). При `range: true` — объект `{ start: string; end: string }` в том же формате',
      table: {
        type: {
          summary: 'строка при `range: false`; объект `{ start, end }` при `range: true`',
        },
      },
    },
    onChange: {
      control: false,
      description:
        'Обработчик смены значения: при одиночном режиме получает строку; при `range: true` — объект `{ start, end }`',
      table: {
        type: {
          summary: '(значение: строка или `{ start, end }`) => void',
        },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер поля; значения: `XS`, `SM`, `MD`, `LG`, `XL`',
    },
    range: {
      control: { type: 'boolean' },
      description: 'Режим: `false` — одно время, `true` — диапазон (`start` / `end`)',
    },
    showSeconds: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    minuteStep: {
      control: { type: 'number', min: 1, max: 60 },
    },
    secondStep: {
      control: { type: 'number', min: 1, max: 60 },
    },
    disabledTimes: {
      control: { type: 'object' },
      description: 'Массив дизейбленных времен (например, ["15:30", "16:45"])',
    },
    disabledHours: {
      control: { type: 'object' },
      description: 'Массив дизейбленных часов (например, [0, 1, 2, 22, 23])',
    },
    disabledMinutes: {
      control: { type: 'object' },
      description: 'Массив дизейбленных минут (например, [0, 15, 30, 45])',
    },
    disabledSeconds: {
      control: { type: 'object' },
      description: 'Массив дизейбленных секунд (например, [0, 30])',
    },
    segmented: {
      control: { type: 'boolean' },
      description: 'Режим ввода: `true` — сегментированный ввод, `false` — обычный `input`',
    },
    displayClearIcon: {
      control: { type: 'boolean' },
      description: 'Показывать кнопку с крестиком очистки',
    },
    onClearIconClick: { action: 'clearIconClick', description: 'После сброса времени в компоненте' },
    clearIconProps: {
      control: 'object',
      description:
        'Частичные пропсы `Icon` для кнопки очистки при `displayClearIcon`. По умолчанию `IconPlainerClose`; мерж поверх вычисленного `size`.',
      table: {
        type: { summary: 'ClearIconProps' },
      },
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Выравнивание текста; значения: `left`, `center`, `right`',
    },
    displayCharacterCounter: {
      control: { type: 'boolean' },
      description: 'Показывать счетчик символов при наличии maxLength',
    },
    ignoreMaskCharacters: {
      control: { type: 'boolean' },
      description: 'Исключать символы маски из подсчета символов для maxLength',
    },
    characterCounterVisibilityThreshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description:
        'Коэффициент влияющий на появление счетчика (0-1): 0 - всегда видим, 1 - всегда невидим, 0.8 - видим при >80% заполнения',
    },
    additionalLabel: {
      control: { type: 'text' },
      description: 'Дополнительное имя поля формы',
    },
  },
  args: {
    clearIconProps: {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Выберите время',
    value: '14:30',
    onChange: value => console.log('Time changed:', value),
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Время начала',
    placeholder: 'Выберите время',
    onChange: value => console.log('Time changed:', value),
  },
};

export const WithValue: Story = {
  args: {
    value: '14:30:00',
    placeholder: 'Выберите время',
    onChange: value => console.log('Time changed:', value),
  },
};

export const Range: Story = {
  args: {
    range: true,
    placeholder: 'Выберите диапазон времени',
    onChange: value => console.log('Time range changed:', value),
  },
};

export const WithSeconds: Story = {
  args: {
    showSeconds: true,
    placeholder: 'Выберите время с секундами',
    onChange: value => console.log('Time changed:', value),
  },
};

export const CustomSteps: Story = {
  args: {
    minuteStep: 15,
    secondStep: 30,
    showSeconds: true,
    placeholder: 'Время с шагом 15 минут и 30 секунд',
    onChange: value => console.log('Time changed:', value),
  },
};

export const Small: Story = {
  args: {
    size: Size.SM,
    placeholder: 'Маленький размер',
    onChange: value => console.log('Time changed:', value),
  },
};

export const Large: Story = {
  args: {
    size: Size.LG,
    placeholder: 'Большой размер',
    onChange: value => console.log('Time changed:', value),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '14:30:00',
    placeholder: 'Отключенное поле',
    onChange: value => console.log('Time changed:', value),
  },
};

export const WithError: Story = {
  args: {
    error: 'Неверный формат времени',
    placeholder: 'Поле с ошибкой',
    onChange: value => console.log('Time changed:', value),
  },
};

export const WithoutIcon: Story = {
  args: {
    showIcon: false,
    placeholder: 'Без иконки',
    onChange: value => console.log('Time changed:', value),
  },
};

export const RangeWithValue: Story = {
  args: {
    range: true,
    value: {
      start: '09:00:00',
      end: '17:30:00',
    },
    placeholder: 'Диапазон времени',
    onChange: value => console.log('Time range changed:', value),
  },
};

// Примеры с дизейблом времени
export const DisabledSpecificTimes: Story = {
  args: {
    label: 'Дизейбл конкретных времен',
    placeholder: '15:30 и 16:45 недоступны',
    disabledTimes: ['15:30', '16:45'],
    onChange: value => console.log('Time changed:', value),
  },
};

export const DisabledHours: Story = {
  args: {
    label: 'Дизейбл ночных часов',
    placeholder: 'Часы 0-2 и 22-23 недоступны',
    disabledHours: [0, 1, 2, 22, 23],
    onChange: value => console.log('Time changed:', value),
  },
};

export const DisabledMinutes: Story = {
  args: {
    label: 'Только каждые 15 минут',
    placeholder: 'Доступны только 0, 15, 30, 45 минут',
    disabledMinutes: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52,
      53, 54, 55, 56, 57, 58, 59,
    ],
    onChange: value => console.log('Time changed:', value),
  },
};

export const DisabledSeconds: Story = {
  args: {
    label: 'Только каждые 30 секунд',
    placeholder: 'Доступны только 0 и 30 секунд',
    showSeconds: true,
    disabledSeconds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      51, 52, 53, 54, 55, 56, 57, 58, 59,
    ],
    onChange: value => console.log('Time changed:', value),
  },
};

export const WorkingHours: Story = {
  args: {
    label: 'Рабочие часы (9:00 - 18:00)',
    placeholder: 'Только рабочие часы',
    disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23],
    onChange: value => console.log('Time changed:', value),
  },
};

export const LunchBreakDisabled: Story = {
  args: {
    label: 'Обеденное время заблокировано',
    placeholder: '12:00-14:00 недоступны',
    disabledTimes: [
      '12:00',
      '12:15',
      '12:30',
      '12:45',
      '13:00',
      '13:15',
      '13:30',
      '13:45',
      '14:00',
    ],
    onChange: value => console.log('Time changed:', value),
  },
};

export const CombinedDisabled: Story = {
  args: {
    label: 'Комбинированные ограничения',
    placeholder: 'Ночные часы + обед + каждые 15 мин',
    disabledHours: [0, 1, 2, 22, 23],
    disabledTimes: ['12:00', '13:00', '14:00'],
    disabledMinutes: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52,
      53, 54, 55, 56, 57, 58, 59,
    ],
    onChange: value => console.log('Time changed:', value),
  },
};

export const RangeWithDisabled: Story = {
  args: {
    label: 'Range с ограничениями',
    range: true,
    placeholder: 'Диапазон с ограничениями',
    disabledHours: [0, 1, 2, 22, 23],
    disabledTimes: ['15:30', '16:45'],
    onChange: value => console.log('Time range changed:', value),
  },
};

export const RangeWithSecondsDisabled: Story = {
  args: {
    label: 'Range с секундами и ограничениями',
    range: true,
    showSeconds: true,
    placeholder: 'Диапазон с секундами и ограничениями',
    disabledHours: [0, 1, 2, 22, 23],
    disabledSeconds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      51, 52, 53, 54, 55, 56, 57, 58, 59,
    ],
    onChange: value => console.log('Time range changed:', value),
  },
};

// Примеры с иконкой очистки
export const WithClearIcon: Story = {
  args: {
    label: 'С иконкой очистки',
    placeholder: 'Выберите время',
    displayClearIcon: true,
    value: '14:30',
    onChange: value => console.log('Time changed:', value),
    onClearIconClick: () => console.log('Clear icon clicked'),
  },
};

export const RangeWithClearIcon: Story = {
  args: {
    label: 'Range с иконкой очистки',
    range: true,
    placeholder: 'Выберите диапазон времени',
    displayClearIcon: true,
    value: {
      start: '09:00',
      end: '17:30',
    },
    onChange: value => console.log('Time range changed:', value),
    onClearIconClick: () => console.log('Clear icon clicked'),
  },
};

export const WithClearIconAndSeconds: Story = {
  args: {
    label: 'С иконкой очистки и секундами',
    placeholder: 'Выберите время с секундами',
    showSeconds: true,
    displayClearIcon: true,
    value: '14:30:45',
    onChange: value => console.log('Time changed:', value),
    onClearIconClick: () => console.log('Clear icon clicked'),
  },
};

// Примеры с сегментированным вводом
export const SegmentedInput: Story = {
  args: {
    label: 'Сегментированный ввод времени',
    placeholder: 'Кликните по сегментам для редактирования',
    value: '14:30',
    onChange: value => console.log('Time changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Кликните по часам, минутам или секундам для их редактирования. Используйте стрелки вверх/вниз для изменения значений, Tab для перехода между сегментами.',
      },
    },
  },
};

export const SegmentedInputWithSeconds: Story = {
  args: {
    label: 'Сегментированный ввод с секундами',
    placeholder: 'Кликните по сегментам для редактирования',
    showSeconds: true,
    value: '14:30:45',
    onChange: value => console.log('Time changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Сегментированный ввод с поддержкой секунд. Используйте клавиатуру для навигации и изменения значений.',
      },
    },
  },
};

export const SegmentedRangeInput: Story = {
  args: {
    label: 'Сегментированный range ввод',
    range: true,
    placeholder: 'Выберите диапазон времени',
    value: {
      start: '09:00',
      end: '17:30',
    },
    onChange: value => console.log('Time range changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Range режим с сегментированным вводом. Переключайтесь между начальным и конечным временем для редактирования.',
      },
    },
  },
};

// Примеры с вводом с клавиатуры
export const KeyboardInput: Story = {
  args: {
    label: 'Ввод с клавиатуры',
    placeholder: 'Кликните на сегмент и введите цифры',
    value: '14:30',
    onChange: value => console.log('Time changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Кликните на любой сегмент времени и введите цифры с клавиатуры. Поддерживается ввод одной или двух цифр. После ввода двух цифр фокус автоматически переходит к следующему сегменту.',
      },
    },
  },
};

export const KeyboardInputWithSeconds: Story = {
  args: {
    label: 'Ввод с клавиатуры (с секундами)',
    placeholder: 'Кликните на сегмент и введите цифры',
    showSeconds: true,
    value: '14:30:45',
    onChange: value => console.log('Time changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ввод с клавиатуры с поддержкой секунд. Используйте стрелки для точной настройки, Tab для перехода между сегментами, Escape для выхода из режима редактирования.',
      },
    },
  },
};

export const KeyboardRangeInput: Story = {
  args: {
    label: 'Range ввод с клавиатуры',
    range: true,
    placeholder: 'Выберите диапазон времени',
    value: {
      start: '09:00',
      end: '17:30',
    },
    onChange: value => console.log('Time range changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Range режим с поддержкой ввода с клавиатуры. Кликните на любой сегмент времени (начального или конечного) и введите цифры.',
      },
    },
  },
};

// Выравнивание текста
export const TextAlignLeft: Story = {
  args: {
    label: 'Выравнивание по левому краю',
    placeholder: 'Выберите время',
    textAlign: 'left',
    value: '14:30',
    onChange: value => console.log('Time changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeInput с выравниванием текста по левому краю (по умолчанию).',
      },
    },
  },
};

export const TextAlignCenter: Story = {
  args: {
    label: 'Выравнивание по центру',
    placeholder: 'Выберите время',
    textAlign: 'center',
    value: '14:30',
    onChange: value => console.log('Time changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeInput с выравниванием текста по центру.',
      },
    },
  },
};

export const TextAlignRight: Story = {
  args: {
    label: 'Выравнивание по правому краю',
    placeholder: 'Выберите время',
    textAlign: 'right',
    value: '14:30',
    onChange: value => console.log('Time changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeInput с выравниванием текста по правому краю.',
      },
    },
  },
};

export const TextAlignComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '400px',
      }}
    >
      <TimeInput
        label="По левому краю (по умолчанию)"
        placeholder="Выберите время"
        textAlign="left"
        value="14:30"
        onChange={value => console.log('Left aligned time changed:', value)}
      />

      <TimeInput
        label="По центру"
        placeholder="Выберите время"
        textAlign="center"
        value="14:30"
        onChange={value => console.log('Center aligned time changed:', value)}
      />

      <TimeInput
        label="По правому краю"
        placeholder="Выберите время"
        textAlign="right"
        value="14:30"
        onChange={value => console.log('Right aligned time changed:', value)}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Сравнение различных вариантов выравнивания текста в TimeInput.',
      },
    },
  },
};

export const RangeTextAlignComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '600px',
      }}
    >
      <TimeInput
        label="Range по левому краю"
        range={true}
        placeholder="Выберите диапазон времени"
        textAlign="left"
        value={{
          start: '09:00',
          end: '17:30',
        }}
        onChange={value => console.log('Left aligned range changed:', value)}
      />

      <TimeInput
        label="Range по центру"
        range={true}
        placeholder="Выберите диапазон времени"
        textAlign="center"
        value={{
          start: '09:00',
          end: '17:30',
        }}
        onChange={value => console.log('Center aligned range changed:', value)}
      />

      <TimeInput
        label="Range по правому краю"
        range={true}
        placeholder="Выберите диапазон времени"
        textAlign="right"
        value={{
          start: '09:00',
          end: '17:30',
        }}
        onChange={value => console.log('Right aligned range changed:', value)}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Сравнение различных вариантов выравнивания текста в Range TimeInput.',
      },
    },
  },
};

// Stories для демонстрации режимов ввода
export const RegularInputMode: Story = {
  args: {
    label: 'Обычный ввод времени',
    placeholder: 'Введите время',
    segmented: false,
    onChange: value => console.log('Regular input changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeInput в режиме обычного ввода. Можно вводить время как обычный текст.',
      },
    },
  },
};

export const SegmentedInputMode: Story = {
  args: {
    label: 'Сегментированный ввод времени',
    segmented: true,
    onChange: value => console.log('Segmented input changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeInput в режиме сегментированного ввода. Время вводится по сегментам.',
      },
    },
  },
};

export const RegularRangeInputMode: Story = {
  args: {
    label: 'Обычный ввод диапазона времени',
    placeholder: 'HH:mm — HH:mm',
    range: true,
    segmented: false,
    onChange: value => console.log('Regular range input changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'TimeInput в режиме обычного ввода для диапазона времени. Можно вводить диапазон времени как текст.',
      },
    },
  },
};

export const SegmentedRangeInputMode: Story = {
  args: {
    label: 'Сегментированный ввод диапазона времени',
    range: true,
    segmented: true,
    onChange: value => console.log('Segmented range input changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeInput в режиме сегментированного ввода для диапазона времени.',
      },
    },
  },
};

export const InputModeComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '400px',
      }}
    >
      <TimeInput
        label="Обычный ввод"
        placeholder="Введите время"
        segmented={false}
        onChange={value => console.log('Regular:', value)}
      />

      <TimeInput
        label="Сегментированный ввод"
        segmented={true}
        onChange={value => console.log('Segmented:', value)}
      />

      <TimeInput
        label="Обычный ввод диапазона"
        placeholder="HH:mm — HH:mm"
        range={true}
        segmented={false}
        onChange={value => console.log('Regular range:', value)}
      />

      <TimeInput
        label="Сегментированный ввод диапазона"
        range={true}
        segmented={true}
        onChange={value => console.log('Segmented range:', value)}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Сравнение обычного и сегментированного режимов ввода времени.',
      },
    },
  },
};

export const TimeFormatDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');
    const [time4, setTime4] = React.useState('14:30');
    const [time5, setTime5] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="HH:mm (24-часовой формат)"
          placeholder="Выберите время"
          format="HH:mm"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="HH:mm:ss (с секундами)"
          placeholder="Выберите время"
          format="HH:mm:ss"
          showSeconds={true}
          value={time2}
          onChange={value => setTime2(value as string)}
        />

        <TimeInput
          label="h:mm A (12-часовой формат)"
          placeholder="Выберите время"
          format="h:mm A"
          value={time3}
          onChange={value => setTime3(value as string)}
        />

        <TimeInput
          label="h:mm:ss A (12-часовой с секундами)"
          placeholder="Выберите время"
          format="h:mm:ss A"
          showSeconds={true}
          value={time4}
          onChange={value => setTime4(value as string)}
        />

        <TimeInput
          label="HH:mm:ss (полный формат)"
          placeholder="Выберите время"
          format="HH:mm:ss"
          showSeconds={true}
          value={time5}
          onChange={value => setTime5(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных форматов отображения времени в TimeInput. Поддерживаются все форматы dayjs: HH:mm, HH:mm:ss, h:mm A, h:mm:ss A и другие.',
      },
    },
  },
};

export const SegmentedTimeFormatDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          segmented={true}
          label="Сегментированный HH:mm"
          placeholder="Выберите время"
          format="HH:mm"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          segmented={true}
          label="Сегментированный HH:mm:ss"
          placeholder="Выберите время"
          format="HH:mm:ss"
          showSeconds={true}
          value={time2}
          onChange={value => setTime2(value as string)}
        />

        <TimeInput
          segmented={true}
          label="Сегментированный h:mm A"
          placeholder="Выберите время"
          format="h:mm A"
          value={time3}
          onChange={value => setTime3(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных форматов отображения времени в сегментированном режиме TimeInput. Формат влияет только на отображение в обычном режиме, в сегментированном режиме всегда показываются отдельные сегменты.',
      },
    },
  },
};

export const RangeTimeFormatDemo: Story = {
  render: () => {
    const [range1, setRange1] = React.useState({
      start: '09:00',
      end: '17:00',
    });
    const [range2, setRange2] = React.useState({
      start: '09:00',
      end: '17:00',
    });
    const [range3, setRange3] = React.useState({
      start: '09:00',
      end: '17:00',
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          range={true}
          label="Диапазон HH:mm"
          placeholder="Выберите диапазон времени"
          format="HH:mm"
          value={range1}
          onChange={value => setRange1(value as any)}
        />

        <TimeInput
          range={true}
          label="Диапазон HH:mm:ss"
          placeholder="Выберите диапазон времени"
          format="HH:mm:ss"
          showSeconds={true}
          value={range2}
          onChange={value => setRange2(value as any)}
        />

        <TimeInput
          range={true}
          label="Диапазон h:mm A"
          placeholder="Выберите диапазон времени"
          format="h:mm A"
          value={range3}
          onChange={value => setRange3(value as any)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных форматов отображения времени в range режиме TimeInput. Формат применяется к обеим временам в диапазоне.',
      },
    },
  },
};

export const SimpleTimeFormatTest: Story = {
  args: {
    label: 'Простой тест формата',
    placeholder: 'Выберите время',
    format: 'h:mm A',
    value: '14:30',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Простой тест для проверки работы формата h:mm A (12-часовой формат).',
      },
    },
  },
};

export const CustomIconDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');
    const [time4, setTime4] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Стандартная иконка часов"
          placeholder="Выберите время"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="Кастомная иконка (солнце)"
          placeholder="Выберите время"
          icon={<Icon name="IconPlainerSun" size={IconSize.SM} />}
          value={time2}
          onChange={value => setTime2(value as string)}
        />

        <TimeInput
          label="Кастомная иконка (луна)"
          placeholder="Выберите время"
          icon={<Icon name="IconPlainerMoon" size={IconSize.SM} />}
          value={time3}
          onChange={value => setTime3(value as string)}
        />

        <TimeInput
          label="Кастомная иконка (плюс)"
          placeholder="Выберите время"
          icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          value={time4}
          onChange={value => setTime4(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация кастомных иконок в TimeInput. Можно передать любую React иконку через проп icon.',
      },
    },
  },
};

export const SegmentedCustomIconDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          segmented={true}
          label="Сегментированный с иконкой солнца"
          placeholder="Выберите время"
          icon={<Icon name="IconPlainerSun" size={IconSize.SM} />}
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          segmented={true}
          label="Сегментированный с иконкой луны"
          placeholder="Выберите время"
          icon={<Icon name="IconPlainerMoon" size={IconSize.SM} />}
          value={time2}
          onChange={value => setTime2(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация кастомных иконок в сегментированном режиме TimeInput.',
      },
    },
  },
};

export const RangeCustomIconDemo: Story = {
  render: () => {
    const [range1, setRange1] = React.useState({
      start: '09:00',
      end: '17:00',
    });
    const [range2, setRange2] = React.useState({
      start: '09:00',
      end: '17:00',
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          range={true}
          label="Диапазон с иконкой солнца"
          placeholder="Выберите диапазон времени"
          icon={<Icon name="IconPlainerSun" size={IconSize.SM} />}
          value={range1}
          onChange={value => setRange1(value as any)}
        />

        <TimeInput
          range={true}
          label="Диапазон с иконкой луны"
          placeholder="Выберите диапазон времени"
          icon={<Icon name="IconPlainerMoon" size={IconSize.SM} />}
          value={range2}
          onChange={value => setRange2(value as any)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация кастомных иконок в range режиме TimeInput.',
      },
    },
  },
};

export const BottomPanelDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="С информационной панелью"
          placeholder="Выберите время"
          value={time1}
          onChange={value => setTime1(value as string)}
          renderBottomPanel={() => (
            <div style={{ fontSize: '12px', color: '#666' }}>
              ⏰ Выберите время для планирования встречи
            </div>
          )}
        />

        <TimeInput
          label="С кнопками быстрого выбора"
          placeholder="Выберите время"
          value={time2}
          onChange={value => setTime2(value as string)}
          renderBottomPanel={() => (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => setTime2('09:00')}
              >
                9:00
              </button>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => setTime2('12:00')}
              >
                12:00
              </button>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => setTime2('18:00')}
              >
                18:00
              </button>
            </div>
          )}
        />

        <TimeInput
          label="С кастомным контентом"
          placeholder="Выберите время"
          value={time3}
          onChange={value => setTime3(value as string)}
          renderBottomPanel={() => (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                🕐 Время
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>Выберите время для продолжения</div>
            </div>
          )}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация кастомных панелей внизу пикера времени TimeInput. Можно добавить любую информацию, кнопки или другой контент.',
      },
    },
  },
};

export const RangeBottomPanelDemo: Story = {
  render: () => {
    const [range, setRange] = React.useState({
      start: '09:00',
      end: '17:00',
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          range={true}
          label="Диапазон с информационной панелью"
          placeholder="Выберите диапазон времени"
          value={range}
          onChange={value => setRange(value as any)}
          renderBottomPanel={() => (
            <div style={{ fontSize: '12px', color: '#666' }}>
              📊 Выберите рабочие часы для планирования
            </div>
          )}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация кастомной панели внизу пикера времени в range режиме TimeInput.',
      },
    },
  },
};

export const TopPanelDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="С информационной панелью сверху"
          placeholder="Выберите время"
          value={time1}
          onChange={value => setTime1(value as string)}
          renderTopPanel={() => (
            <div style={{ fontSize: '12px', color: '#666' }}>
              ⏰ Выберите время для планирования встречи
            </div>
          )}
        />

        <TimeInput
          label="С кнопками быстрого выбора сверху"
          placeholder="Выберите время"
          value={time2}
          onChange={value => setTime2(value as string)}
          renderTopPanel={() => (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => setTime2('09:00')}
              >
                9:00
              </button>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => setTime2('12:00')}
              >
                12:00
              </button>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => setTime2('18:00')}
              >
                18:00
              </button>
            </div>
          )}
        />

        <TimeInput
          label="С кастомным контентом сверху"
          placeholder="Выберите время"
          value={time3}
          onChange={value => setTime3(value as string)}
          renderTopPanel={() => (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                🕐 Время
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>Выберите время для продолжения</div>
            </div>
          )}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация кастомных панелей вверху пикера времени TimeInput. Можно добавить любую информацию, кнопки или другой контент.',
      },
    },
  },
};

export const TopAndBottomPanelsDemo: Story = {
  render: () => {
    const [time, setTime] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="С панелями сверху и снизу"
          placeholder="Выберите время"
          value={time}
          onChange={value => setTime(value as string)}
          renderTopPanel={() => (
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              ⏰ Выберите время для планирования
            </div>
          )}
          renderBottomPanel={() => (
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              💡 Подсказка: используйте стрелки для навигации
            </div>
          )}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация одновременного использования renderTopPanel и renderBottomPanel в TimeInput.',
      },
    },
  },
};

export const StatusDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');
    const [time4, setTime4] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Обычное состояние"
          placeholder="Выберите время"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="Статус: error (красный бордер)"
          placeholder="Выберите время"
          status="error"
          value={time2}
          onChange={value => setTime2(value as string)}
        />

        <TimeInput
          label="Статус: success (зеленый бордер)"
          placeholder="Выберите время"
          status="success"
          value={time3}
          onChange={value => setTime3(value as string)}
        />

        <TimeInput
          label="Статус: warning (оранжевый бордер)"
          placeholder="Выберите время"
          status="warning"
          value={time4}
          onChange={value => setTime4(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных статусов TimeInput. Статус влияет на цвет бордера: error - цвет ошибки из темы, success - цвет успеха из темы, warning - цвет предупреждения из темы.',
      },
    },
  },
};

export const SegmentedStatusDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          segmented={true}
          label="Сегментированный error"
          placeholder="Выберите время"
          status="error"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          segmented={true}
          label="Сегментированный success"
          placeholder="Выберите время"
          status="success"
          value={time2}
          onChange={value => setTime2(value as string)}
        />

        <TimeInput
          segmented={true}
          label="Сегментированный warning"
          placeholder="Выберите время"
          status="warning"
          value={time3}
          onChange={value => setTime3(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация статусов в сегментированном режиме TimeInput.',
      },
    },
  },
};

export const RangeStatusDemo: Story = {
  render: () => {
    const [range1, setRange1] = React.useState({
      start: '09:00',
      end: '17:00',
    });
    const [range2, setRange2] = React.useState({
      start: '09:00',
      end: '17:00',
    });
    const [range3, setRange3] = React.useState({
      start: '09:00',
      end: '17:00',
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          range={true}
          label="Диапазон error"
          placeholder="Выберите диапазон времени"
          status="error"
          value={range1}
          onChange={value => setRange1(value as any)}
        />

        <TimeInput
          range={true}
          label="Диапазон success"
          placeholder="Выберите диапазон времени"
          status="success"
          value={range2}
          onChange={value => setRange2(value as any)}
        />

        <TimeInput
          range={true}
          label="Диапазон warning"
          placeholder="Выберите диапазон времени"
          status="warning"
          value={range3}
          onChange={value => setRange3(value as any)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация статусов в range режиме TimeInput.',
      },
    },
  },
};

export const LoadingDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');
    const [isLoading1, setIsLoading1] = React.useState(false);
    const [isLoading2, _setIsLoading2] = React.useState(true);
    const [isLoading3, setIsLoading3] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading1(false);
        setTime1('18:00');
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Загрузка времени (3 сек)"
          placeholder="Выберите время"
          isLoading={isLoading1}
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="Постоянная загрузка"
          placeholder="Выберите время"
          isLoading={isLoading2}
          value={time2}
          onChange={value => setTime2(value as string)}
        />

        <TimeInput
          label="Загрузка с кнопкой"
          placeholder="Выберите время"
          isLoading={isLoading3}
          value={time3}
          onChange={value => setTime3(value as string)}
        />

        <button
          onClick={() => setIsLoading3(!isLoading3)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          {isLoading3 ? 'Остановить загрузку' : 'Начать загрузку'}
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация состояния загрузки в TimeInput. При isLoading=true отображается спиннер вместо иконки часов.',
      },
    },
  },
};

export const SkeletonDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('14:30');
    const [time2, setTime2] = React.useState('14:30');
    const [time3, setTime3] = React.useState('14:30');
    const [skeleton1, setSkeleton1] = React.useState(false);
    const [skeleton2, _setSkeleton2] = React.useState(true);
    const [skeleton3, setSkeleton3] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setSkeleton1(false);
        setTime1('18:00');
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Skeleton эффект (3 сек)"
          placeholder="Выберите время"
          skeleton={skeleton1}
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="Постоянный skeleton"
          placeholder="Выберите время"
          skeleton={skeleton2}
          value={time2}
          onChange={value => setTime2(value as string)}
        />

        <TimeInput
          label="Skeleton с кнопкой"
          placeholder="Выберите время"
          skeleton={skeleton3}
          value={time3}
          onChange={value => setTime3(value as string)}
        />

        <button
          onClick={() => setSkeleton3(!skeleton3)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          {skeleton3 ? 'Убрать skeleton' : 'Показать skeleton'}
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация skeleton эффекта в TimeInput. При skeleton=true отображается анимированный placeholder, заменяющий весь компонент инпута. Полезно для отображения состояния загрузки.',
      },
    },
  },
};

export const TooltipDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('15:30');
    const [time2, setTime2] = React.useState('15:30');
    const [time3, setTime3] = React.useState('15:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Обычный TimeInput"
          placeholder="Без подсказки"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="TimeInput с тултипом (сверху)"
          placeholder="Наведите курсор для показа тултипа"
          value={time2}
          onChange={value => setTime2(value as string)}
          tooltip="Это тултип с дополнительной информацией о выборе времени"
          tooltipType="tooltip"
          tooltipPosition="top"
        />

        <TimeInput
          label="TimeInput с хинтом (снизу)"
          placeholder="Наведите курсор для показа хинта"
          value={time3}
          onChange={value => setTime3(value as string)}
          tooltip="Это хинт с подробной информацией о формате времени и доступных действиях"
          tooltipType="hint"
          tooltipPosition="bottom"
        />

        <TimeInput
          label="TimeInput с тултипом (слева)"
          placeholder="Тултип слева"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          tooltip="Тултип слева от TimeInput"
          tooltipType="tooltip"
          tooltipPosition="left"
        />

        <TimeInput
          label="TimeInput с хинтом (справа)"
          placeholder="Хинт справа"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          tooltip="Хинт справа от TimeInput"
          tooltipType="hint"
          tooltipPosition="right"
        />

        <TimeInput
          label="TimeInput с тултипом и иконкой"
          placeholder="Тултип с иконкой"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          icon={<Icon name="IconPlainerMoon" size={IconSize.SM} />}
          tooltip={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="IconPlainerMoon" size={IconSize.XS} />
              <span>Тултип с иконкой для TimeInput</span>
            </div>
          }
          tooltipType="tooltip"
          tooltipPosition="top"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация tooltip и hint для TimeInput. Можно выбрать тип подсказки (tooltip/hint) и позицию (top/bottom/left/right).',
      },
    },
  },
};

export const CharacterCounterDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('15:30');
    const [time2, setTime2] = React.useState('15:30');
    const [time3, setTime3] = React.useState('15:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Обычный TimeInput"
          placeholder="Без maxLength"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="TimeInput с счетчиком символов"
          placeholder="С maxLength и счетчиком"
          value={time2}
          onChange={value => setTime2(value as string)}
          maxLength={10}
          displayCharacterCounter={true}
        />

        <TimeInput
          label="TimeInput без счетчика символов"
          placeholder="С maxLength но без счетчика"
          value={time3}
          onChange={value => setTime3(value as string)}
          maxLength={8}
          displayCharacterCounter={false}
        />

        <TimeInput
          label="TimeInput с превышением лимита"
          placeholder="Попробуйте ввести больше 5 символов"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          maxLength={5}
          displayCharacterCounter={true}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация displayCharacterCounter для TimeInput. Позволяет отключать появление счетчика символов при задании maxLength.',
      },
    },
  },
};

export const ExtraTextDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('15:30');
    const [time2, setTime2] = React.useState('15:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Обычный TimeInput"
          placeholder="Без дополнительного текста"
          value={time1}
          onChange={value => setTime1(value as string)}
        />

        <TimeInput
          label="TimeInput с extraText"
          placeholder="С дополнительным текстом"
          value={time2}
          onChange={value => setTime2(value as string)}
          extraText="Это дополнительный текст для TimeInput, который отображается ниже компонента"
        />

        <TimeInput
          label="TimeInput с error и extraText"
          placeholder="С ошибкой и дополнительным текстом"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          error="Обязательное поле"
          extraText="Дополнительный текст отображается даже при наличии ошибки"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация extraText для TimeInput. Дополнительный текст отображается ниже компонента.',
      },
    },
  },
};

export const DisableCopyingDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('15:30');
    const [time2, setTime2] = React.useState('15:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Обычный TimeInput"
          placeholder="Можно выделять и копировать время"
          value={time1}
          onChange={value => setTime1(value as string)}
          helperText="Попробуйте выделить и скопировать время (Ctrl+C)"
        />

        <TimeInput
          label="Защищенный TimeInput"
          placeholder="Нельзя выделять и копировать время"
          value={time2}
          onChange={value => setTime2(value as string)}
          disableCopying={true}
          helperText="Попробуйте выделить и скопировать время - не получится!"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация disableCopying для TimeInput. Отключает возможность выделения и копирования значения поля.',
      },
    },
  },
};

export const HandleInputDemo: Story = {
  render: () => {
    const [time1, setTime1] = React.useState('');
    const [time2, setTime2] = React.useState('');

    // Маска для времени HH:MM
    const timeMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';

      if (digits.length > 0) {
        formatted = digits.slice(0, 2);
        if (digits.length > 2) {
          formatted += `:${digits.slice(2, 4)}`;
        }
      }

      // Умное позиционирование курсора
      let newCursorPosition = cursorPosition;

      // Если строка стала длиннее (добавили символ), ставим курсор в конец
      if (formatted.length > value.length) {
        newCursorPosition = formatted.length;
      } else if (formatted.length < value.length) {
        // Если строка стала короче (удалили символ), сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      } else {
        // Если длина не изменилась, сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      }

      return {
        value: formatted,
        cursorPosition: Math.min(newCursorPosition, formatted.length),
      };
    };

    // Маска для времени с автоматическим добавлением двоеточия
    const autoTimeMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';

      if (digits.length > 0) {
        formatted = digits.slice(0, 2);
        if (digits.length >= 2) {
          formatted += ':';
          if (digits.length > 2) {
            formatted += digits.slice(2, 4);
          }
        }
      }

      // Умное позиционирование курсора
      let newCursorPosition = cursorPosition;

      // Если строка стала длиннее (добавили символ), ставим курсор в конец
      if (formatted.length > value.length) {
        newCursorPosition = formatted.length;
      } else if (formatted.length < value.length) {
        // Если строка стала короче (удалили символ), сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      } else {
        // Если длина не изменилась, сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      }

      return {
        value: formatted,
        cursorPosition: Math.min(newCursorPosition, formatted.length),
      };
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Время с маской HH:MM"
          placeholder="ЧЧ:ММ"
          value={time1}
          onChange={value => setTime1(value as string)}
          handleInput={timeMask}
        />

        <TimeInput
          label="Время с автоматическим двоеточием"
          placeholder="ЧЧ:ММ"
          value={time2}
          onChange={value => setTime2(value as string)}
          handleInput={autoTimeMask}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация handleInput для TimeInput. Позволяет создавать маски ввода для времени с автоматическим форматированием.',
      },
    },
  },
};

export const IgnoreMaskCharactersDemo: Story = {
  render: () => {
    const [time1, setTime1] = useState('12:30:45');
    const [time2, setTime2] = useState('12:30:45');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Обычный счетчик символов"
          placeholder="Введите время..."
          value={time1}
          onChange={value => setTime1(value as string)}
          maxLength={8}
          displayCharacterCounter={true}
          ignoreMaskCharacters={false}
          helperText="Считаются все символы включая разделители (8/8)"
        />

        <TimeInput
          label="Счетчик без символов маски"
          placeholder="Введите время..."
          value={time2}
          onChange={value => setTime2(value as string)}
          maxLength={6}
          displayCharacterCounter={true}
          ignoreMaskCharacters={true}
          helperText="Считаются только цифры, разделители игнорируются (6/6)"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Сравнение:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>ignoreMaskCharacters=false:</strong> &quot;12:30:45&quot; = 8 символов
            </li>
            <li>
              <strong>ignoreMaskCharacters=true:</strong> &quot;12:30:45&quot; = 6 символов (123045)
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация пропа ignoreMaskCharacters для TimeInput. Позволяет исключать символы маски (двоеточия) из подсчета символов для maxLength.',
      },
    },
  },
};

export const CharacterCounterThresholdDemo: Story = {
  render: () => {
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [time3, setTime3] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Всегда видимый счетчик (threshold=0)"
          placeholder="Введите время..."
          value={time1}
          onChange={value => setTime1(value as string)}
          maxLength={8}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={0}
          helperText="Счетчик виден с первого символа"
        />

        <TimeInput
          label="Счетчик при 80% заполнения (threshold=0.8)"
          placeholder="Введите время..."
          value={time2}
          onChange={value => setTime2(value as string)}
          maxLength={8}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={0.8}
          helperText="Счетчик появится при вводе 7+ символов"
        />

        <TimeInput
          label="Скрытый счетчик (threshold=1)"
          placeholder="Введите время..."
          value={time3}
          onChange={value => setTime3(value as string)}
          maxLength={8}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={1}
          helperText="Счетчик никогда не показывается"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Пороги видимости для времени:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>threshold=0:</strong> Счетчик всегда видим
            </li>
            <li>
              <strong>threshold=0.5:</strong> Видим при заполнении 50% (4/8 символов)
            </li>
            <li>
              <strong>threshold=0.8:</strong> Видим при заполнении 80% (7/8 символов)
            </li>
            <li>
              <strong>threshold=1:</strong> Счетчик всегда скрыт
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация пропа characterCounterVisibilityThreshold для TimeInput. Позволяет управлять видимостью счетчика символов в зависимости от заполненности поля.',
      },
    },
  },
};

export const AdditionalLabelDemo: Story = {
  render: () => {
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [time3, setTime3] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <TimeInput
          label="Время начала работы"
          additionalLabel="Укажите время в формате ЧЧ:ММ"
          placeholder="Введите время..."
          value={time1}
          onChange={value => setTime1(value as string)}
          helperText="Рабочий день начинается в указанное время"
        />

        <TimeInput
          label="Время окончания приема"
          additionalLabel="Последний прием пациентов"
          placeholder="Выберите время..."
          value={time2}
          onChange={value => setTime2(value as string)}
          helperText="После этого времени новые записи не принимаются"
        />

        <TimeInput
          label="Время отправки уведомления"
          additionalLabel="Автоматическая отправка в указанное время"
          placeholder="Введите время..."
          value={time3}
          onChange={value => setTime3(value as string)}
          showSeconds={true}
          helperText="Уведомления отправляются ежедневно в указанное время"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Дополнительные метки для времени:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>additionalLabel</strong> отображается справа и помогает уточнить формат ввода
              времени
            </li>
            <li>Предоставляет контекстную информацию о назначении поля</li>
            <li>Улучшает понимание требований к вводу времени</li>
            <li>Снижает путаницу при работе с временными интервалами</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация пропа additionalLabel для TimeInput. Позволяет добавить дополнительное описание поля времени под основным label.',
      },
    },
  },
};

