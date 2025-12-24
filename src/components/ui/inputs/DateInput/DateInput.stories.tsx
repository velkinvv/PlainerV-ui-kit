import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { fn } from '@storybook/test';
import { DateInput } from './DateInput';
import { Size, IconSize } from '../../../../types/sizes';
import type { DateTimeRange } from '../../../../types/ui';
import { Icon } from '../../Icon/Icon';

const meta: Meta<typeof DateInput> = {
  title: 'Components/Inputs/DateInput',
  component: DateInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение даты (для single mode) или диапазона (для range mode)',
    },
    label: {
      control: 'text',
      description: 'Текстовая метка',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить поле ввода',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер поля ввода',
    },
    range: {
      control: 'boolean',
      description: 'Режим работы: false = одиночная дата, true = диапазон',
    },
    showIcon: {
      control: 'boolean',
      description: 'Показывать ли иконку',
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Выравнивание текста',
    },
    clearIcon: {
      control: { type: 'boolean' },
      description: 'Показывать иконку очистки',
    },
    segmented: {
      control: { type: 'boolean' },
      description: 'Режим ввода: true = сегментированный, false = обычный input',
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
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Выберите дату',
    placeholder: 'Выберите дату',
  },
};

export const SingleMode: Story = {
  args: {
    range: false,
    label: 'Дата',
    placeholder: 'Выберите дату',
  },
};

export const RangeMode: Story = {
  args: {
    range: true,
    label: 'Диапазон дат',
    placeholder: 'Выберите диапазон дат',
  },
};

export const WithValue: Story = {
  args: {
    value: '2024-01-15',
    label: 'Дата',
  },
};

export const WithRangeValue: Story = {
  args: {
    range: true,
    value: { start: '2024-01-15', end: '2024-01-20' },
    label: 'Диапазон дат',
  },
};

export const Disabled: Story = {
  args: {
    value: '2024-01-15',
    label: 'Дата',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Дата',
    error: 'Пожалуйста, выберите корректную дату',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DateInput label="Маленький размер" size={Size.SM} placeholder="Выберите дату" />
      <DateInput label="Средний размер" size={Size.MD} placeholder="Выберите дату" />
      <DateInput label="Большой размер" size={Size.LG} placeholder="Выберите дату" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string | DateTimeRange) => {
      setValue(typeof newValue === 'string' ? newValue : '');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DateInput label="Дата" value={value} onChange={handleChange} placeholder="Выберите дату" />
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>Выбранная дата:</strong> {value || 'Не выбрано'}
        </div>
      </div>
    );
  },
};

export const RangeInteractive: Story = {
  render: () => {
    const [range, setRange] = useState<DateTimeRange>({ start: '', end: '' });

    const handleChange = (newValue: string | DateTimeRange) => {
      if (typeof newValue === 'object') {
        setRange(newValue);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DateInput
          range
          label="Диапазон дат"
          value={range}
          onChange={handleChange}
          placeholder="Выберите диапазон дат"
        />
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>Выбранный диапазон:</strong>
          <br />
          Начало: {range.start || 'Не выбрано'}
          <br />
          Конец: {range.end || 'Не выбрано'}
        </div>
      </div>
    );
  },
};

export const WithMinMaxDates: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2024-12-31');

    const handleChange = (newValue: string | DateTimeRange) => {
      setValue(typeof newValue === 'string' ? newValue : '');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DateInput
          label="Дата в 2024 году"
          value={value}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Выберите дату в 2024 году"
        />
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>Ограничения:</strong>
          <br />
          Минимальная дата: {minDate.toLocaleDateString('ru-RU')}
          <br />
          Максимальная дата: {maxDate.toLocaleDateString('ru-RU')}
        </div>
      </div>
    );
  },
};

export const WithoutIcon: Story = {
  args: {
    label: 'Дата',
    showIcon: false,
    placeholder: 'Выберите дату',
  },
};

export const ManualInput: Story = {
  args: {
    label: 'Дата с ручным вводом',
    placeholder: 'Введите дату (DD.MM.YYYY, DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD)',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Компонент поддерживает ручной ввод даты в различных форматах. Попробуйте ввести дату в поле и нажать Enter.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      startDate: '',
      endDate: '',
      eventDate: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.startDate) {
        newErrors.startDate = 'Пожалуйста, выберите дату начала';
      }
      if (!formData.endDate) {
        newErrors.endDate = 'Пожалуйста, выберите дату окончания';
      }
      if (!formData.eventDate) {
        newErrors.eventDate = 'Пожалуйста, выберите дату события';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Форма отправлена!');
      }
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '20px' }}>Форма планирования</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <DateInput
            label="Дата начала"
            value={formData.startDate}
            onChange={value => {
              setFormData(prev => ({ ...prev, startDate: value as string }));
              setErrors(prev => ({ ...prev, startDate: '' }));
            }}
            error={errors.startDate}
          />
          <DateInput
            label="Дата окончания"
            value={formData.endDate}
            onChange={value => {
              setFormData(prev => ({ ...prev, endDate: value as string }));
              setErrors(prev => ({ ...prev, endDate: '' }));
            }}
            error={errors.endDate}
          />
          <DateInput
            label="Дата события"
            value={formData.eventDate}
            onChange={value => {
              setFormData(prev => ({ ...prev, eventDate: value as string }));
              setErrors(prev => ({ ...prev, eventDate: '' }));
            }}
            error={errors.eventDate}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Отправить
          </button>
        </div>
      </div>
    );
  },
};

// Выравнивание текста
export const TextAlignLeft: Story = {
  args: {
    label: 'Выравнивание по левому краю',
    placeholder: 'Выберите дату',
    textAlign: 'left',
    value: '2024-01-15',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с выравниванием текста по левому краю (по умолчанию).',
      },
    },
  },
};

export const TextAlignCenter: Story = {
  args: {
    label: 'Выравнивание по центру',
    placeholder: 'Выберите дату',
    textAlign: 'center',
    value: '2024-01-15',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с выравниванием текста по центру.',
      },
    },
  },
};

export const TextAlignRight: Story = {
  args: {
    label: 'Выравнивание по правому краю',
    placeholder: 'Выберите дату',
    textAlign: 'right',
    value: '2024-01-15',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с выравниванием текста по правому краю.',
      },
    },
  },
};

export const TextAlignComparison: Story = {
  render: () => {
    const [leftDate, setLeftDate] = useState('2024-01-15');
    const [centerDate, setCenterDate] = useState('2024-01-15');
    const [rightDate, setRightDate] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="По левому краю (по умолчанию)"
          placeholder="Выберите дату"
          textAlign="left"
          value={leftDate}
          onChange={value => setLeftDate(value as string)}
        />

        <DateInput
          label="По центру"
          placeholder="Выберите дату"
          textAlign="center"
          value={centerDate}
          onChange={value => setCenterDate(value as string)}
        />

        <DateInput
          label="По правому краю"
          placeholder="Выберите дату"
          textAlign="right"
          value={rightDate}
          onChange={value => setRightDate(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Сравнение различных вариантов выравнивания текста в DateInput. Работает как для обычного, так и для сегментированного режима.',
      },
    },
  },
};

export const RangeTextAlignComparison: Story = {
  render: () => {
    const [leftRange, setLeftRange] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-31',
    });
    const [centerRange, setCenterRange] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-31',
    });
    const [rightRange, setRightRange] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-31',
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '600px',
        }}
      >
        <DateInput
          label="Range по левому краю"
          range={true}
          placeholder="Выберите диапазон дат"
          textAlign="left"
          value={leftRange}
          onChange={value => setLeftRange(value as DateTimeRange)}
        />

        <DateInput
          label="Range по центру"
          range={true}
          placeholder="Выберите диапазон дат"
          textAlign="center"
          value={centerRange}
          onChange={value => setCenterRange(value as DateTimeRange)}
        />

        <DateInput
          label="Range по правому краю"
          range={true}
          placeholder="Выберите диапазон дат"
          textAlign="right"
          value={rightRange}
          onChange={value => setRightRange(value as DateTimeRange)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Сравнение различных вариантов выравнивания текста в Range DateInput.',
      },
    },
  },
};

export const WithClearIcon: Story = {
  args: {
    label: 'С иконкой очистки',
    placeholder: 'Выберите дату',
    clearIcon: true,
    value: '2024-01-15',
    onChange: fn(),
    onClearIconClick: () => console.log('Clear icon clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с иконкой очистки, которая появляется при наличии значения.',
      },
    },
  },
};

// Stories для демонстрации функциональности отключения дат
export const WithDisabledDates: Story = {
  args: {
    label: 'С отключенными датами',
    placeholder: 'Выберите дату',
    disabledDates: [
      new Date(2024, 0, 15), // 15 января 2024
      new Date(2024, 0, 20), // 20 января 2024
      new Date(2024, 0, 25), // 25 января 2024
    ],
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с отключенными конкретными датами. Эти даты будут недоступны для выбора.',
      },
    },
  },
};

export const WithDisabledDays: Story = {
  args: {
    label: 'Без выходных',
    placeholder: 'Выберите рабочий день',
    disabledDays: [0, 6], // Отключаем воскресенье (0) и субботу (6)
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateInput с отключенными днями недели. В данном примере отключены выходные (воскресенье и суббота).',
      },
    },
  },
};

export const WithDisabledMonths: Story = {
  args: {
    label: 'Без зимних месяцев',
    placeholder: 'Выберите дату',
    disabledMonths: [11, 0, 1], // Отключаем декабрь (11), январь (0) и февраль (1)
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с отключенными месяцами. В данном примере отключены зимние месяцы.',
      },
    },
  },
};

export const WithDisabledYears: Story = {
  args: {
    label: 'Только текущий год',
    placeholder: 'Выберите дату',
    disabledYears: [2022, 2023, 2025, 2026], // Отключаем все годы кроме 2024
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с отключенными годами. В данном примере доступен только 2024 год.',
      },
    },
  },
};

export const WithMultipleDisabledOptions: Story = {
  args: {
    label: 'Комплексные ограничения',
    placeholder: 'Выберите дату',
    disabledDates: [
      new Date(2024, 0, 1), // Новый год
      new Date(2024, 1, 14), // День святого Валентина
      new Date(2024, 2, 8), // Международный женский день
    ],
    disabledDays: [0], // Отключаем воскресенья
    disabledMonths: [11], // Отключаем декабрь
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput с комплексными ограничениями: отключенные даты, дни недели и месяцы.',
      },
    },
  },
};

// Новые stories для демонстрации сегментированного режима
export const SegmentedSingleMode: Story = {
  args: {
    segmented: true,
    range: false,
    label: 'Сегментированная дата',
    placeholder: 'Выберите дату',
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateInput в сегментированном режиме для выбора одной даты. Каждый сегмент (день, месяц, год) можно редактировать отдельно с помощью клавиатуры. Поддерживает ввод цифр с автоматическим переходом между сегментами.',
      },
    },
  },
};

export const SegmentedRangeMode: Story = {
  args: {
    segmented: true,
    range: true,
    label: 'Сегментированный диапазон дат',
    placeholder: 'Выберите диапазон дат',
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateInput в сегментированном режиме для выбора диапазона дат. Красивый горизонтальный layout с лейблами "От:" и "До:" для каждого времени. Поддерживает ввод с клавиатуры для каждого сегмента.',
      },
    },
  },
};

export const SegmentedWithValue: Story = {
  args: {
    segmented: true,
    range: false,
    value: '2024-12-25',
    label: 'Сегментированная дата с значением',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput в сегментированном режиме с предустановленным значением.',
      },
    },
  },
};

export const SegmentedWithRangeValue: Story = {
  args: {
    segmented: true,
    range: true,
    value: { start: '2024-01-15', end: '2024-01-20' },
    label: 'Сегментированный диапазон с значением',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput в сегментированном режиме с предустановленным диапазоном дат.',
      },
    },
  },
};

export const SegmentedDisabled: Story = {
  args: {
    segmented: true,
    range: false,
    disabled: true,
    value: '2024-12-25',
    label: 'Отключенный сегментированный DateInput',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput в сегментированном режиме в отключенном состоянии.',
      },
    },
  },
};

export const SegmentedWithDisabledDates: Story = {
  args: {
    segmented: true,
    range: false,
    label: 'Сегментированный с ограничениями',
    disabledDates: [
      new Date(2024, 11, 25), // 25 декабря
      new Date(2024, 11, 31), // 31 декабря
    ],
    disabledDays: [0, 6], // Воскресенье и суббота
    disabledMonths: [10], // Ноябрь
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput в сегментированном режиме с ограничениями на выбор дат.',
      },
    },
  },
};

export const InputModeComparison: Story = {
  args: {
    onChange: fn(),
  },
  render: () => {
    const [regularValue, setRegularValue] = useState('2024-12-25');
    const [segmentedValue, setSegmentedValue] = useState('2024-12-25');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3>Обычный режим</h3>
          <DateInput
            value={regularValue}
            onChange={value => setRegularValue(value as string)}
            label="Обычный DateInput"
            placeholder="Введите дату"
            segmented={false}
          />
        </div>
        <div>
          <h3>Сегментированный режим</h3>
          <DateInput
            value={segmentedValue}
            onChange={value => setSegmentedValue(value as string)}
            label="Сегментированный DateInput"
            placeholder="Выберите дату"
            segmented={true}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Сравнение обычного и сегментированного режимов DateInput.',
      },
    },
  },
};

export const KeyboardInputDemo: Story = {
  args: {
    segmented: true,
    range: false,
    label: 'Ввод с клавиатуры',
    placeholder: 'Кликните на сегмент и введите цифры',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация ввода даты с клавиатуры в сегментированном режиме. Кликните на любой сегмент (день, месяц, год) и введите цифры. Поддерживаются следующие клавиши:\n\n' +
          '• Цифры 0-9: ввод значений\n' +
          '• Backspace: удаление символа или переход к предыдущему сегменту\n' +
          '• Tab/Shift+Tab: переход между сегментами\n' +
          '• Стрелки вверх/вниз: изменение значения\n' +
          '• Enter: применение введенного значения\n' +
          '• Escape: отмена ввода',
      },
    },
  },
};

export const ImprovedRangeDemo: Story = {
  args: {
    segmented: true,
    range: true,
    label: 'Улучшенный диапазон дат',
    placeholder: 'Выберите диапазон дат',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация улучшенного range варианта DateInput. Теперь он выглядит как в TimeInput - с красивым горизонтальным layout, лейблами "От:" и "До:" и компактным дизайном. Поддерживает ввод с клавиатуры для каждого сегмента.',
      },
    },
  },
};

export const SegmentedTextAlignDemo: Story = {
  render: () => {
    const [leftDate, setLeftDate] = useState('2024-01-15');
    const [centerDate, setCenterDate] = useState('2024-01-15');
    const [rightDate, setRightDate] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          segmented={true}
          label="Сегментированный - по левому краю"
          placeholder="Выберите дату"
          textAlign="left"
          value={leftDate}
          onChange={value => setLeftDate(value as string)}
        />

        <DateInput
          segmented={true}
          label="Сегментированный - по центру"
          placeholder="Выберите дату"
          textAlign="center"
          value={centerDate}
          onChange={value => setCenterDate(value as string)}
        />

        <DateInput
          segmented={true}
          label="Сегментированный - по правому краю"
          placeholder="Выберите дату"
          textAlign="right"
          value={rightDate}
          onChange={value => setRightDate(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация выравнивания текста в сегментированном режиме DateInput. Теперь textAlign корректно работает для всех сегментов (день, месяц, год).',
      },
    },
  },
};

export const DateFormatDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');
    const [date4, setDate4] = useState('2024-01-15');
    const [date5, setDate5] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="DD.MM.YYYY (по умолчанию)"
          placeholder="Выберите дату"
          format="DD.MM.YYYY"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="MM/DD/YYYY (американский)"
          placeholder="Выберите дату"
          format="MM/DD/YYYY"
          value={date2}
          onChange={value => setDate2(value as string)}
        />

        <DateInput
          label="YYYY-MM-DD (ISO)"
          placeholder="Выберите дату"
          format="YYYY-MM-DD"
          value={date3}
          onChange={value => setDate3(value as string)}
        />

        <DateInput
          label="DD MMM YYYY (с месяцем)"
          placeholder="Выберите дату"
          format="DD MMM YYYY"
          value={date4}
          onChange={value => setDate4(value as string)}
        />

        <DateInput
          label="dddd, DD MMMM YYYY (полный)"
          placeholder="Выберите дату"
          format="dddd, DD MMMM YYYY"
          value={date5}
          onChange={value => setDate5(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных форматов отображения дат в DateInput. Поддерживаются все форматы dayjs: DD.MM.YYYY, MM/DD/YYYY, YYYY-MM-DD, DD MMM YYYY, dddd, DD MMMM YYYY и другие.',
      },
    },
  },
};

export const SegmentedDateFormatDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          segmented={true}
          label="Сегментированный DD.MM.YYYY"
          placeholder="Выберите дату"
          format="DD.MM.YYYY"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          segmented={true}
          label="Сегментированный MM/DD/YYYY"
          placeholder="Выберите дату"
          format="MM/DD/YYYY"
          value={date2}
          onChange={value => setDate2(value as string)}
        />

        <DateInput
          segmented={true}
          label="Сегментированный YYYY-MM-DD"
          placeholder="Выберите дату"
          format="YYYY-MM-DD"
          value={date3}
          onChange={value => setDate3(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных форматов отображения дат в сегментированном режиме DateInput. Формат влияет только на отображение в обычном режиме, в сегментированном режиме всегда показываются отдельные сегменты.',
      },
    },
  },
};

export const RangeDateFormatDemo: Story = {
  render: () => {
    const [range1, setRange1] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
    });
    const [range2, setRange2] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
    });
    const [range3, setRange3] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
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
        <DateInput
          range={true}
          label="Диапазон DD.MM.YYYY"
          placeholder="Выберите диапазон дат"
          format="DD.MM.YYYY"
          value={range1}
          onChange={value => setRange1(value as DateTimeRange)}
        />

        <DateInput
          range={true}
          label="Диапазон MM/DD/YYYY"
          placeholder="Выберите диапазон дат"
          format="MM/DD/YYYY"
          value={range2}
          onChange={value => setRange2(value as DateTimeRange)}
        />

        <DateInput
          range={true}
          label="Диапазон YYYY-MM-DD"
          placeholder="Выберите диапазон дат"
          format="YYYY-MM-DD"
          value={range3}
          onChange={value => setRange3(value as DateTimeRange)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных форматов отображения дат в range режиме DateInput. Формат применяется к обеим датам в диапазоне.',
      },
    },
  },
};

export const SimpleFormatTest: Story = {
  args: {
    label: 'Простой тест формата',
    placeholder: 'Выберите дату',
    format: 'MM/DD/YYYY',
    value: '2024-01-15',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Простой тест для проверки работы формата MM/DD/YYYY.',
      },
    },
  },
};

export const CustomIconDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');
    const [date4, setDate4] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Стандартная иконка календаря"
          placeholder="Выберите дату"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="Кастомная иконка (солнце)"
          placeholder="Выберите дату"
          icon={<Icon name="IconPlainerSun" size={IconSize.SM} />}
          value={date2}
          onChange={value => setDate2(value as string)}
        />

        <DateInput
          label="Кастомная иконка (луна)"
          placeholder="Выберите дату"
          icon={<Icon name="IconPlainerMoon" size={IconSize.SM} />}
          value={date3}
          onChange={value => setDate3(value as string)}
        />

        <DateInput
          label="Кастомная иконка (плюс)"
          placeholder="Выберите дату"
          icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          value={date4}
          onChange={value => setDate4(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация кастомных иконок в DateInput. Можно передать любую React иконку через проп icon.',
      },
    },
  },
};

export const SegmentedCustomIconDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          segmented={true}
          label="Сегментированный с иконкой солнца"
          placeholder="Выберите дату"
          icon={<Icon name="IconPlainerSun" size={IconSize.SM} />}
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          segmented={true}
          label="Сегментированный с иконкой луны"
          placeholder="Выберите дату"
          icon={<Icon name="IconPlainerMoon" size={IconSize.SM} />}
          value={date2}
          onChange={value => setDate2(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация кастомных иконок в сегментированном режиме DateInput.',
      },
    },
  },
};

export const RangeCustomIconDemo: Story = {
  render: () => {
    const [range1, setRange1] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
    });
    const [range2, setRange2] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
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
        <DateInput
          range={true}
          label="Диапазон с иконкой солнца"
          placeholder="Выберите диапазон дат"
          icon={<Icon name="IconPlainerSun" size={IconSize.SM} />}
          value={range1}
          onChange={value => setRange1(value as DateTimeRange)}
        />

        <DateInput
          range={true}
          label="Диапазон с иконкой луны"
          placeholder="Выберите диапазон дат"
          icon={<Icon name="IconPlainerMoon" size={IconSize.SM} />}
          value={range2}
          onChange={value => setRange2(value as DateTimeRange)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация кастомных иконок в range режиме DateInput.',
      },
    },
  },
};

export const BottomPanelDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="С информационной панелью"
          placeholder="Выберите дату"
          value={date1}
          onChange={value => setDate1(value as string)}
          renderBottomPanel={() => (
            <div style={{ fontSize: '12px', color: '#666' }}>
              💡 Выберите дату для планирования встречи
            </div>
          )}
        />

        <DateInput
          label="С кнопками действий"
          placeholder="Выберите дату"
          value={date2}
          onChange={value => setDate2(value as string)}
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
                onClick={() => setDate2('2024-01-01')}
              >
                Новый год
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
                onClick={() => setDate2('2024-12-25')}
              >
                Рождество
              </button>
            </div>
          )}
        />

        <DateInput
          label="С кастомным контентом"
          placeholder="Выберите дату"
          value={date3}
          onChange={value => setDate3(value as string)}
          renderBottomPanel={() => (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                📅 Календарь
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>Выберите дату для продолжения</div>
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
          'Демонстрация кастомных панелей внизу календаря DateInput. Можно добавить любую информацию, кнопки или другой контент.',
      },
    },
  },
};

export const RangeBottomPanelDemo: Story = {
  render: () => {
    const [range, setRange] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
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
        <DateInput
          range={true}
          label="Диапазон с информационной панелью"
          placeholder="Выберите диапазон дат"
          value={range}
          onChange={value => setRange(value as DateTimeRange)}
          renderBottomPanel={() => (
            <div style={{ fontSize: '12px', color: '#666' }}>
              📊 Выберите период для анализа данных
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
        story: 'Демонстрация кастомной панели внизу календаря в range режиме DateInput.',
      },
    },
  },
};

export const TopPanelDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="С информационной панелью сверху"
          placeholder="Выберите дату"
          value={date1}
          onChange={value => setDate1(value as string)}
          renderTopPanel={() => (
            <div style={{ fontSize: '12px', color: '#666' }}>
              📅 Выберите дату для планирования встречи
            </div>
          )}
        />

        <DateInput
          label="С кнопками быстрого выбора сверху"
          placeholder="Выберите дату"
          value={date2}
          onChange={value => setDate2(value as string)}
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
                onClick={() => setDate2('2024-01-01')}
              >
                Новый год
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
                onClick={() => setDate2('2024-12-25')}
              >
                Рождество
              </button>
            </div>
          )}
        />

        <DateInput
          label="С кастомным контентом сверху"
          placeholder="Выберите дату"
          value={date3}
          onChange={value => setDate3(value as string)}
          renderTopPanel={() => (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                📅 Календарь
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>Выберите дату для продолжения</div>
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
          'Демонстрация кастомных панелей вверху календаря DateInput. Можно добавить любую информацию, кнопки или другой контент.',
      },
    },
  },
};

export const TopAndBottomPanelsDemo: Story = {
  render: () => {
    const [date, setDate] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="С панелями сверху и снизу"
          placeholder="Выберите дату"
          value={date}
          onChange={value => setDate(value as string)}
          renderTopPanel={() => (
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              📅 Выберите дату для планирования
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
          'Демонстрация одновременного использования renderTopPanel и renderBottomPanel в DateInput.',
      },
    },
  },
};

export const StatusDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');
    const [date4, setDate4] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Обычное состояние"
          placeholder="Выберите дату"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="Статус: error (цвет ошибки из темы)"
          placeholder="Выберите дату"
          status="error"
          value={date2}
          onChange={value => setDate2(value as string)}
        />

        <DateInput
          label="Статус: success (цвет успеха из темы)"
          placeholder="Выберите дату"
          status="success"
          value={date3}
          onChange={value => setDate3(value as string)}
        />

        <DateInput
          label="Статус: warning (оранжевый бордер)"
          placeholder="Выберите дату"
          status="warning"
          value={date4}
          onChange={value => setDate4(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация различных статусов DateInput. Статус влияет на цвет бордера: error - цвет ошибки из темы, success - цвет успеха из темы, warning - цвет предупреждения из темы.',
      },
    },
  },
};

export const SegmentedStatusDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          segmented={true}
          label="Сегментированный error"
          placeholder="Выберите дату"
          status="error"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          segmented={true}
          label="Сегментированный success"
          placeholder="Выберите дату"
          status="success"
          value={date2}
          onChange={value => setDate2(value as string)}
        />

        <DateInput
          segmented={true}
          label="Сегментированный warning"
          placeholder="Выберите дату"
          status="warning"
          value={date3}
          onChange={value => setDate3(value as string)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация статусов в сегментированном режиме DateInput.',
      },
    },
  },
};

export const RangeStatusDemo: Story = {
  render: () => {
    const [range1, setRange1] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
    });
    const [range2, setRange2] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
    });
    const [range3, setRange3] = useState<DateTimeRange>({
      start: '2024-01-01',
      end: '2024-01-15',
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
        <DateInput
          range={true}
          label="Диапазон error"
          placeholder="Выберите диапазон дат"
          status="error"
          value={range1}
          onChange={value => setRange1(value as DateTimeRange)}
        />

        <DateInput
          range={true}
          label="Диапазон success"
          placeholder="Выберите диапазон дат"
          status="success"
          value={range2}
          onChange={value => setRange2(value as DateTimeRange)}
        />

        <DateInput
          range={true}
          label="Диапазон warning"
          placeholder="Выберите диапазон дат"
          status="warning"
          value={range3}
          onChange={value => setRange3(value as DateTimeRange)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация статусов в range режиме DateInput.',
      },
    },
  },
};

export const LoadingDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, _setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading1(false);
        setDate1('2024-12-25');
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
        <DateInput
          label="Загрузка даты (3 сек)"
          placeholder="Выберите дату"
          isLoading={isLoading1}
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="Постоянная загрузка"
          placeholder="Выберите дату"
          isLoading={isLoading2}
          value={date2}
          onChange={value => setDate2(value as string)}
        />

        <DateInput
          label="Загрузка с кнопкой"
          placeholder="Выберите дату"
          isLoading={isLoading3}
          value={date3}
          onChange={value => setDate3(value as string)}
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
          'Демонстрация состояния загрузки в DateInput. При isLoading=true отображается спиннер вместо иконки календаря.',
      },
    },
  },
};

export const SkeletonDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('2024-01-15');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('2024-01-15');
    const [skeleton1, setSkeleton1] = useState(false);
    const [skeleton2, _setSkeleton2] = useState(true);
    const [skeleton3, setSkeleton3] = useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setSkeleton1(false);
        setDate1('2024-12-25');
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
        <DateInput
          label="Skeleton эффект (3 сек)"
          placeholder="Выберите дату"
          skeleton={skeleton1}
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="Постоянный skeleton"
          placeholder="Выберите дату"
          skeleton={skeleton2}
          value={date2}
          onChange={value => setDate2(value as string)}
        />

        <DateInput
          label="Skeleton с кнопкой"
          placeholder="Выберите дату"
          skeleton={skeleton3}
          value={date3}
          onChange={value => setDate3(value as string)}
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
          'Демонстрация skeleton эффекта в DateInput. При skeleton=true отображается анимированный placeholder, заменяющий весь компонент инпута. Полезно для отображения состояния загрузки.',
      },
    },
  },
};

export const TooltipDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('15.12.2023');
    const [date2, setDate2] = useState('15.12.2023');
    const [date3, setDate3] = useState('15.12.2023');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Обычный DateInput"
          placeholder="Без подсказки"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="DateInput с тултипом (сверху)"
          placeholder="Наведите курсор для показа тултипа"
          value={date2}
          onChange={value => setDate2(value as string)}
          tooltip="Это тултип с дополнительной информацией о выборе даты"
          tooltipType="tooltip"
          tooltipPosition="top"
        />

        <DateInput
          label="DateInput с хинтом (снизу)"
          placeholder="Наведите курсор для показа хинта"
          value={date3}
          onChange={value => setDate3(value as string)}
          tooltip="Это хинт с подробной информацией о формате даты и доступных действиях"
          tooltipType="hint"
          tooltipPosition="bottom"
        />

        <DateInput
          label="DateInput с тултипом (слева)"
          placeholder="Тултип слева"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          tooltip="Тултип слева от DateInput"
          tooltipType="tooltip"
          tooltipPosition="left"
        />

        <DateInput
          label="DateInput с хинтом (справа)"
          placeholder="Хинт справа"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          tooltip="Хинт справа от DateInput"
          tooltipType="hint"
          tooltipPosition="right"
        />

        <DateInput
          label="DateInput с тултипом и иконкой"
          placeholder="Тултип с иконкой"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          icon={<Icon name="IconPlainerSun" size={IconSize.SM} />}
          tooltip={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="IconPlainerSun" size={IconSize.XS} />
              <span>Тултип с иконкой для DateInput</span>
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
          'Демонстрация tooltip и hint для DateInput. Можно выбрать тип подсказки (tooltip/hint) и позицию (top/bottom/left/right).',
      },
    },
  },
};

export const CharacterCounterDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('15.12.2023');
    const [date2, setDate2] = useState('15.12.2023');
    const [date3, setDate3] = useState('15.12.2023');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Обычный DateInput"
          placeholder="Без maxLength"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="DateInput с счетчиком символов"
          placeholder="С maxLength и счетчиком"
          value={date2}
          onChange={value => setDate2(value as string)}
          maxLength={20}
          displayCharacterCounter={true}
        />

        <DateInput
          label="DateInput без счетчика символов"
          placeholder="С maxLength но без счетчика"
          value={date3}
          onChange={value => setDate3(value as string)}
          maxLength={15}
          displayCharacterCounter={false}
        />

        <DateInput
          label="DateInput с превышением лимита"
          placeholder="Попробуйте ввести больше 10 символов"
          value=""
          onChange={() => {
            /* Пустая функция для демонстрации */
          }}
          maxLength={10}
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
          'Демонстрация displayCharacterCounter для DateInput. Позволяет отключать появление счетчика символов при задании maxLength.',
      },
    },
  },
};

export const InputBehaviorDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Исправленный DateInput"
          placeholder="Попробуйте ввести дату по частям"
          value={date1}
          onChange={value => setDate1(value as string)}
          helperText="Теперь можно вводить дату по частям без автоматического заполнения"
        />

        <DateInput
          label="DateInput с Backspace"
          placeholder="Попробуйте удалить символы Backspace"
          value={date2}
          onChange={value => setDate2(value as string)}
          helperText="Backspace и Delete теперь работают корректно"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Исправления:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>✅ Нет автоматического заполнения при вводе одного символа</li>
            <li>✅ Backspace и Delete работают корректно</li>
            <li>✅ Парсинг даты происходит только при вводе полной даты</li>
            <li>✅ Можно вводить дату по частям без помех</li>
            <li>✅ Можно вводить невалидные строки и редактировать их</li>
            <li>✅ Неполные даты (например &quot;10.12.&quot;) не парсятся автоматически</li>
            <li>✅ Автоматическое форматирование: &quot;10121985&quot; → &quot;10.12.1985&quot;</li>
            <li>✅ Парсинг только при полном годе: &quot;10.12.19&quot; не парсится</li>
          </ul>
          <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#666' }}>
            Попробуйте: ввести &quot;10121985&quot; (автоформатирование в &quot;10.12.1985&quot;),
            затем &quot;10.12.19&quot; (неполный год - не парсится), затем &quot;10.12.1985&quot;
            (полный год - парсится).
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация исправленного поведения DateInput. Теперь ввод даты работает более естественно - нет автоматического заполнения при вводе одного символа, Backspace и Delete работают корректно.',
      },
    },
  },
};

export const ExtraTextDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('15.12.2023');
    const [date2, setDate2] = useState('15.12.2023');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Обычный DateInput"
          placeholder="Без дополнительного текста"
          value={date1}
          onChange={value => setDate1(value as string)}
        />

        <DateInput
          label="DateInput с extraText"
          placeholder="С дополнительным текстом"
          value={date2}
          onChange={value => setDate2(value as string)}
          extraText="Это дополнительный текст для DateInput, который отображается ниже компонента"
        />

        <DateInput
          label="DateInput с error и extraText"
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
          'Демонстрация extraText для DateInput. Дополнительный текст отображается ниже компонента.',
      },
    },
  },
};

export const DisableCopyingDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('15.12.2023');
    const [date2, setDate2] = useState('15.12.2023');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Обычный DateInput"
          placeholder="Можно выделять и копировать дату"
          value={date1}
          onChange={value => setDate1(value as string)}
          helperText="Попробуйте выделить и скопировать дату (Ctrl+C)"
        />

        <DateInput
          label="Защищенный DateInput"
          placeholder="Нельзя выделять и копировать дату"
          value={date2}
          onChange={value => setDate2(value as string)}
          disableCopying={true}
          helperText="Попробуйте выделить и скопировать дату - не получится!"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация disableCopying для DateInput. Отключает возможность выделения и копирования значения поля.',
      },
    },
  },
};

export const HandleInputDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');

    // Маска для даты DD.MM.YYYY
    const dateMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';

      if (digits.length > 0) {
        formatted = digits.slice(0, 2);
        if (digits.length > 2) {
          formatted += `.${digits.slice(2, 4)}`;
          if (digits.length > 4) {
            formatted += `.${digits.slice(4, 8)}`;
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

    // Маска для даты с автоматическим добавлением разделителей
    const autoDateMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';

      if (digits.length > 0) {
        formatted = digits.slice(0, 2);
        if (digits.length >= 2) {
          formatted += '.';
          if (digits.length > 2) {
            formatted += digits.slice(2, 4);
            if (digits.length >= 4) {
              formatted += '.';
              if (digits.length > 4) {
                formatted += digits.slice(4, 8);
              }
            }
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
        <DateInput
          label="Дата с маской DD.MM.YYYY"
          placeholder="ДД.ММ.ГГГГ"
          value={date1}
          onChange={value => setDate1(value as string)}
          handleInput={dateMask}
        />

        <DateInput
          label="Дата с автоматическими разделителями"
          placeholder="ДД.ММ.ГГГГ"
          value={date2}
          onChange={value => setDate2(value as string)}
          handleInput={autoDateMask}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация handleInput для DateInput. Позволяет создавать маски ввода для дат с автоматическим форматированием.',
      },
    },
  },
};

export const IgnoreMaskCharactersDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('10.12.1985');
    const [date2, setDate2] = useState('10.12.1985');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Обычный счетчик символов"
          placeholder="Введите дату..."
          value={date1}
          onChange={value => setDate1(value as string)}
          maxLength={10}
          displayCharacterCounter={true}
          ignoreMaskCharacters={false}
          helperText="Считаются все символы включая разделители (10/10)"
        />

        <DateInput
          label="Счетчик без символов маски"
          placeholder="Введите дату..."
          value={date2}
          onChange={value => setDate2(value as string)}
          maxLength={8}
          displayCharacterCounter={true}
          ignoreMaskCharacters={true}
          helperText="Считаются только цифры, разделители игнорируются (8/8)"
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
              <strong>ignoreMaskCharacters=false:</strong> &quot;10.12.1985&quot; = 10 символов
            </li>
            <li>
              <strong>ignoreMaskCharacters=true:</strong> &quot;10.12.1985&quot; = 8 символов
              (10121985)
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
          'Демонстрация пропа ignoreMaskCharacters для DateInput. Позволяет исключать символы маски (разделители) из подсчета символов для maxLength.',
      },
    },
  },
};

export const CharacterCounterThresholdDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [date3, setDate3] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Всегда видимый счетчик (threshold=0)"
          placeholder="Введите дату..."
          value={date1}
          onChange={value => setDate1(value as string)}
          maxLength={10}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={0}
          helperText="Счетчик виден с первого символа"
        />

        <DateInput
          label="Счетчик при 80% заполнения (threshold=0.8)"
          placeholder="Введите дату..."
          value={date2}
          onChange={value => setDate2(value as string)}
          maxLength={10}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={0.8}
          helperText="Счетчик появится при вводе 8+ символов"
        />

        <DateInput
          label="Скрытый счетчик (threshold=1)"
          placeholder="Введите дату..."
          value={date3}
          onChange={value => setDate3(value as string)}
          maxLength={10}
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
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Пороги видимости для дат:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>threshold=0:</strong> Счетчик всегда видим
            </li>
            <li>
              <strong>threshold=0.5:</strong> Видим при заполнении 50% (5/10 символов)
            </li>
            <li>
              <strong>threshold=0.8:</strong> Видим при заполнении 80% (8/10 символов)
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
          'Демонстрация пропа characterCounterVisibilityThreshold для DateInput. Позволяет управлять видимостью счетчика символов в зависимости от заполненности поля.',
      },
    },
  },
};

export const AdditionalLabelDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [date3, setDate3] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <DateInput
          label="Дата рождения"
          additionalLabel="Укажите дату в формате ДД.ММ.ГГГГ"
          placeholder="Введите дату рождения..."
          value={date1}
          onChange={value => setDate1(value as string)}
          helperText="Используется для расчета возраста и персональных предложений"
        />

        <DateInput
          label="Дата начала отпуска"
          additionalLabel="Первый день отпускного периода"
          placeholder="Выберите дату..."
          value={date2}
          onChange={value => setDate2(value as string)}
          helperText="Отпуск должен начинаться не ранее чем через 2 недели"
        />

        <DateInput
          label="Срок действия документа"
          additionalLabel="Дата истечения срока действия"
          placeholder="Введите дату..."
          value={date3}
          onChange={value => setDate3(value as string)}
          helperText="Документ должен быть действителен на момент подачи заявления"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Дополнительные метки для дат:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>additionalLabel</strong> отображается справа и помогает уточнить формат ввода
              даты
            </li>
            <li>Предоставляет контекстную информацию о назначении поля</li>
            <li>Улучшает пользовательский опыт при работе с формами</li>
            <li>Снижает количество ошибок при заполнении</li>
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
          'Демонстрация пропа additionalLabel для DateInput. Позволяет добавить дополнительное описание поля даты под основным label.',
      },
    },
  },
};
