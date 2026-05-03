import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { CheckboxGroup as CheckboxGroupField } from './CheckboxGroup';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { DOC_CHECKBOX } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Checkbox> = {
  title: 'UI Kit/Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_CHECKBOX,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Отмечен ли чекбокс',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить чекбокс',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер чекбокса (SM=16px, MD=20px, LG=24px)',
    },
    label: {
      control: 'text',
      description: 'Подпись рядом с квадратом чекбокса',
    },
    fieldLabel: {
      control: 'text',
      description: 'Подпись над чекбоксом — как основной label у полей ввода',
    },
    additionalLabel: {
      control: 'text',
      description: 'Строка под fieldLabel — как additionalLabel у Input',
    },
    formRequired: {
      control: 'boolean',
      description: 'Обязательное поле: * у fieldLabel и required у input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Растянуть контейнер поля на всю доступную ширину',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения',
      table: {
        type: {
          summary:
            'обработчик change у input: (event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    error: {
      control: 'text',
      description: 'Текст ошибки под чекбоксом',
    },
    success: {
      control: 'boolean',
      description: 'Успех: строка «Успешно», как у Input',
    },
    helperText: {
      control: 'text',
      description: 'Подсказка; не показывается при error или success',
    },
    extraText: {
      control: 'text',
      description: 'Дополнительная строка под сообщениями, как у Input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Обёртка для историй: клики переключают состояние, в Actions остаётся лог через `args.onChange`. */
const renderInteractiveCheckbox = (initialChecked = false): Story['render'] => {
  return (args) => {
    const [checked, setChecked] = useState(initialChecked);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(event) => {
          args.onChange?.(event);
          setChecked(event.target.checked);
        }}
      />
    );
  };
};

// Базовый чекбокс
export const Default: Story = {
  args: {
    label: 'Принять условия',
  },
  render: renderInteractiveCheckbox(false),
};

// Отмеченный чекбокс (старт включён), дальнейшие клики работают
export const Checked: Story = {
  args: {
    checked: true,
    label: 'Принять условия',
  },
  render: renderInteractiveCheckbox(true),
};

// Отключенный чекбокс
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Принять условия',
  },
};

// Отключенный отмеченный чекбокс
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Принять условия',
  },
};

// Чекбокс без метки
export const WithoutLabel: Story = {
  args: {
    checked: false,
    'aria-label': 'Пример чекбокса без текстовой метки',
  },
  render: renderInteractiveCheckbox(false),
};

// Разные размеры
export const Sizes: Story = {
  render: () => {
    const [smallChecked, setSmallChecked] = useState(false);
    const [mediumChecked, setMediumChecked] = useState(true);
    const [largeChecked, setLargeChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          size={Size.SM}
          label="Маленький чекбокс (16px)"
          checked={smallChecked}
          onChange={(event) => setSmallChecked(event.target.checked)}
        />
        <Checkbox
          size={Size.MD}
          label="Средний чекбокс (20px)"
          checked={mediumChecked}
          onChange={(event) => setMediumChecked(event.target.checked)}
        />
        <Checkbox
          size={Size.LG}
          label="Большой чекбокс (24px)"
          checked={largeChecked}
          onChange={(event) => setLargeChecked(event.target.checked)}
        />
      </div>
    );
  },
};

// Интерактивный пример
export const Interactive: Story = {
  args: {
    label: 'Интерактивный чекбокс',
  },
  render: renderInteractiveCheckbox(false),
};

const checkboxGroupOptions = [
  { id: '1', label: 'Опция 1' },
  { id: '2', label: 'Опция 2' },
  { id: '3', label: 'Опция 3' },
  { id: '4', label: 'Опция 4' },
] as const;

/**
 * Группа связанных чекбоксов для сторибука.
 * @param flexDirection - направление раскладки: вертикаль (`column`) или горизонталь (`row`)
 */
const CheckboxGroupDemo = ({ flexDirection }: { flexDirection: 'column' | 'row' }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const isHorizontalLayout = flexDirection === 'row';

  const handleChange = (optionId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems((previous) => [...previous, optionId]);
    } else {
      setSelectedItems((previous) => previous.filter((item) => item !== optionId));
    }
  };

  const selectionSummaryLabel = `Выбрано: ${selectedItems.length} из ${checkboxGroupOptions.length}`;

  return (
    <CheckboxGroupField
      label="Выберите опции"
      additionalLabel="Стиль подписи как у текстовых полей (компонент CheckboxGroup)."
      helperText={`${selectionSummaryLabel}. Можно отметить несколько пунктов.`}
    >
      <div
        style={{
          display: 'flex',
          flexDirection,
          flexWrap: isHorizontalLayout ? 'wrap' : 'nowrap',
          gap: '12px',
          alignItems: isHorizontalLayout ? 'center' : 'stretch',
        }}
      >
        {checkboxGroupOptions.map((item) => (
          <Checkbox
            key={item.id}
            checked={selectedItems.includes(item.id)}
            onChange={(event) => handleChange(item.id, event.target.checked)}
            label={item.label}
          />
        ))}
      </div>
    </CheckboxGroupField>
  );
};

// Группа чекбоксов (вертикально)
export const CheckboxGroup: Story = {
  render: () => <CheckboxGroupDemo flexDirection="column" />,
};

// Группа чекбоксов (горизонтально)
export const CheckboxGroupHorizontal: Story = {
  render: () => <CheckboxGroupDemo flexDirection="row" />,
};

/** Одиночный чекбокс с заголовком поля в стиле Input */
export const WithFieldLabels: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        fieldLabel="Согласие на обработку данных"
        additionalLabel="По желанию — поясняющая строка под заголовком, как у Input."
        formRequired
        label="Даю согласие"
      />
    );
  },
};

export const WithErrorMessage: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        fieldLabel="Подписка на новости"
        label="Хочу получать рассылку"
        error={checked ? undefined : 'Нужно отметить галочку или снять блокировку согласия.'}
      />
    );
  },
};

export const WithSuccessState: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        fieldLabel="Email подтверждён"
        label="Использовать для входа"
        success={checked}
      />
    );
  },
};

export const WithHelperAndExtraText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        fieldLabel="Резервная копия"
        label="Включить автосохранение в облако"
        helperText="Файлы шифруются перед отправкой."
        extraText="Доступно на тарифах от «Про»."
      />
    );
  },
};

export const WithErrorAndExtraText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        fieldLabel="Условия оферты"
        label="Принимаю условия"
        formRequired
        error={checked ? undefined : 'Примите условия, чтобы продолжить.'}
        extraText="Текст оферты доступен по ссылке в подвале сайта."
      />
    );
  },
};

function CheckboxGroupFooterDemo() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['1']);

  const handleChange = (optionId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems((previous) => [...previous, optionId]);
    } else {
      setSelectedItems((previous) => previous.filter((item) => item !== optionId));
    }
  };

  const hasSelection = selectedItems.length > 0;

  return (
    <CheckboxGroupField
      label="Уведомления"
      additionalLabel="Выберите каналы — можно несколько."
      helperText={hasSelection ? 'Изменения сохраняются автоматически.' : undefined}
      error={hasSelection ? undefined : 'Отметьте хотя бы один канал.'}
      extraText="Push-уведомления можно отключить в настройках приложения."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {checkboxGroupOptions.map((item) => (
          <Checkbox
            key={item.id}
            checked={selectedItems.includes(item.id)}
            onChange={(event) => handleChange(item.id, event.target.checked)}
            label={item.label}
          />
        ))}
      </div>
    </CheckboxGroupField>
  );
}

export const CheckboxGroupWithErrorAndExtra: Story = {
  render: () => <CheckboxGroupFooterDemo />,
};

function CheckboxGroupSuccessDemo() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['2', '3']);

  const handleChange = (optionId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems((previous) => [...previous, optionId]);
    } else {
      setSelectedItems((previous) => previous.filter((item) => item !== optionId));
    }
  };

  return (
    <CheckboxGroupField
      label="Доступ к разделам"
      success
      extraText="Права обновятся в течение минуты после сохранения формы."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {checkboxGroupOptions.map((item) => (
          <Checkbox
            key={item.id}
            checked={selectedItems.includes(item.id)}
            onChange={(event) => handleChange(item.id, event.target.checked)}
            label={item.label}
          />
        ))}
      </div>
    </CheckboxGroupField>
  );
}

export const CheckboxGroupWithSuccessAndExtra: Story = {
  render: () => <CheckboxGroupSuccessDemo />,
};

