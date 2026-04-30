import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioButtonGroup } from './RadioButtonGroup';
import { Size, IconSize } from '../../../types/sizes';
import {
  RadioButtonGroupOrientation,
  RadioButtonVariant,
  RadioButtonLabelPosition,
  TooltipPosition,
  type RadioButtonGroupOption,
} from '../../../types/ui';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'UI Kit/Inputs/RadioButtonGroup',
  component: RadioButtonGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: [RadioButtonGroupOrientation.HORIZONTAL, RadioButtonGroupOrientation.VERTICAL],
      description: 'Ориентация группы: horizontal или vertical',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить всю группу',
    },
    readOnly: {
      control: 'boolean',
      description: 'Только для чтения (вся группа)',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер радиокнопок в группе',
    },
    variant: {
      control: { type: 'select' },
      options: [RadioButtonVariant.FILLED, RadioButtonVariant.OUTLINE],
      description: 'Вариант радиокнопок в группе',
    },
    labelPosition: {
      control: { type: 'select' },
      options: [
        RadioButtonLabelPosition.RIGHT,
        RadioButtonLabelPosition.LEFT,
        RadioButtonLabelPosition.TOP,
        RadioButtonLabelPosition.BOTTOM,
        RadioButtonLabelPosition.NONE,
      ],
      description: 'Позиция лейбла для радиокнопок в группе',
    },
    error: {
      description:
        'Текст ошибки для всей группы или отдельных опций: одна строка либо массив строк по порядку опций',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'строка (общая ошибка) или массив строк (по опциям)',
        },
      },
    },
  },
};

export default meta;
type RadioButtonGroupStory = StoryObj<typeof RadioButtonGroup>;

// Базовые опции для примеров
const basicOptions: RadioButtonGroupOption[] = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' },
];

export const GroupDefault: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Выберите опцию"
      />
    );
  },
};

export const GroupHorizontal: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Горизонтальное расположение"
        orientation={RadioButtonGroupOrientation.HORIZONTAL}
      />
    );
  },
};

export const GroupVertical: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Вертикальное расположение"
        orientation={RadioButtonGroupOrientation.VERTICAL}
      />
    );
  },
};

export const GroupWithExtraText: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    const options: RadioButtonGroupOption[] = [
      { value: 'option1', label: 'Базовый план', extraText: 'Бесплатно навсегда' },
      { value: 'option2', label: 'Профессиональный план', extraText: '990₽/месяц' },
      { value: 'option3', label: 'Корпоративный план', extraText: 'По запросу' },
    ];

    return (
      <RadioButtonGroup
        options={options}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Выберите тарифный план"
        orientation={RadioButtonGroupOrientation.VERTICAL}
      />
    );
  },
};

export const GroupWithOnClick: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');
    const [clickedValue, setClickedValue] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleClick = (val: string, option: RadioButtonGroupOption) => {
      setClickedValue(val);
      console.log('Клик по опции:', val, option);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButtonGroup
          options={basicOptions}
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          label="Группа с обработчиком onClick"
        />
        {clickedValue && (
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <strong>Последний клик:</strong> {clickedValue}
          </div>
        )}
      </div>
    );
  },
};

export const GroupDisabled: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Отключенная группа"
        disabled={true}
      />
    );
  },
};

export const GroupReadOnly: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option2');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Группа только для чтения"
        readOnly={true}
      />
    );
  },
};

export const GroupWithVariants: RadioButtonGroupStory = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <RadioButtonGroup
          options={basicOptions}
          value={value1}
          onChange={e => setValue1(e.target.value)}
          label="Filled вариант (по умолчанию)"
          variant={RadioButtonVariant.FILLED}
        />
        <RadioButtonGroup
          options={basicOptions}
          value={value2}
          onChange={e => setValue2(e.target.value)}
          label="Outline вариант"
          variant={RadioButtonVariant.OUTLINE}
        />
      </div>
    );
  },
};

export const GroupWithSizes: RadioButtonGroupStory = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');
    const [value3, setValue3] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <RadioButtonGroup
          options={basicOptions}
          value={value1}
          onChange={e => setValue1(e.target.value)}
          label="Маленький размер"
          size={Size.SM}
        />
        <RadioButtonGroup
          options={basicOptions}
          value={value2}
          onChange={e => setValue2(e.target.value)}
          label="Средний размер (по умолчанию)"
          size={Size.MD}
        />
        <RadioButtonGroup
          options={basicOptions}
          value={value3}
          onChange={e => setValue3(e.target.value)}
          label="Большой размер"
          size={Size.LG}
        />
      </div>
    );
  },
};

export const GroupWithLabelPositions: RadioButtonGroupStory = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');
    const [value3, setValue3] = useState('option1');

    const options: RadioButtonGroupOption[] = [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <RadioButtonGroup
          options={options}
          value={value1}
          onChange={e => setValue1(e.target.value)}
          label="Лейбл справа (по умолчанию)"
          labelPosition={RadioButtonLabelPosition.RIGHT}
        />
        <RadioButtonGroup
          options={options}
          value={value2}
          onChange={e => setValue2(e.target.value)}
          label="Лейбл слева"
          labelPosition={RadioButtonLabelPosition.LEFT}
        />
        <RadioButtonGroup
          options={options}
          value={value3}
          onChange={e => setValue3(e.target.value)}
          label="Лейбл сверху"
          labelPosition={RadioButtonLabelPosition.TOP}
          orientation={RadioButtonGroupOrientation.HORIZONTAL}
        />
      </div>
    );
  },
};

export const GroupComplex: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('plan1');

    const options: RadioButtonGroupOption[] = [
      {
        value: 'plan1',
        label: 'Базовый план',
        extraText: 'Идеально для начинающих',
        variant: RadioButtonVariant.FILLED,
      },
      {
        value: 'plan2',
        label: 'Профессиональный план',
        extraText: 'Для профессионалов и команд',
        variant: RadioButtonVariant.FILLED,
      },
      {
        value: 'plan3',
        label: 'Корпоративный план',
        extraText: 'Максимальные возможности',
        variant: RadioButtonVariant.FILLED,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButtonGroup
          options={options}
          value={value}
          onChange={e => setValue(e.target.value)}
          label="Выберите тарифный план"
          orientation={RadioButtonGroupOrientation.VERTICAL}
          size={Size.MD}
        />
        <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Выбранный план:</strong> {value}
        </div>
      </div>
    );
  },
};

// ==================== Новые функции для группы ====================

export const GroupWithError: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Выберите опцию (с ошибкой)"
        error="Пожалуйста, выберите одну из опций"
        required
      />
    );
  },
};

export const GroupWithHelperText: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Выберите опцию"
        helperText="Это вспомогательный текст, который помогает понять выбор"
      />
    );
  },
};

export const GroupWithRequired: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Обязательная группа"
        required
      />
    );
  },
};

export const GroupWithTooltip: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Группа с tooltip"
        tooltip="Это подсказка для всей группы радиокнопок"
        tooltipPosition={TooltipPosition.TOP}
      />
    );
  },
};

export const GroupWithFullWidth: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={{ width: '500px' }}>
        <RadioButtonGroup
          options={basicOptions}
          value={value}
          onChange={e => setValue(e.target.value)}
          label="Группа с fullWidth"
          fullWidth
        />
      </div>
    );
  },
};

export const GroupWithIndividualErrors: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Группа с индивидуальными ошибками"
        error={['Ошибка для опции 1', '', 'Ошибка для опции 3']}
      />
    );
  },
};

export const GroupComplexNew: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('plan1');

    const options: RadioButtonGroupOption[] = [
      {
        value: 'plan1',
        label: 'Базовый план',
        extraText: 'Бесплатно навсегда',
        leftIcon: <Icon name="IconExHome" size={IconSize.SM} />,
      },
      {
        value: 'plan2',
        label: 'Профессиональный план',
        extraText: '990₽/месяц',
        leftIcon: <Icon name="IconExStar" size={IconSize.SM} />,
      },
      {
        value: 'plan3',
        label: 'Корпоративный план',
        extraText: 'По запросу',
        leftIcon: <Icon name="IconExSettings" size={IconSize.SM} />,
      },
    ];

    return (
      <RadioButtonGroup
        options={options}
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Выберите тарифный план"
        helperText="Выберите подходящий для вас тарифный план"
        required
        tooltip="Тарифные планы различаются по функциональности и цене"
        tooltipPosition={TooltipPosition.TOP}
        orientation={RadioButtonGroupOrientation.VERTICAL}
        fullWidth
      />
    );
  },
};

