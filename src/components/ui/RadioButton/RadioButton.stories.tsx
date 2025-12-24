import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioButton } from './RadioButton';
import { Size, IconSize } from '../../../types/sizes';
import { TooltipPosition, RadioButtonLabelPosition } from '../../../types/ui';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Выбрана ли радио кнопка',
    },
    label: {
      control: 'text',
      description: 'Текстовая метка',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить радио кнопку',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер радио кнопки',
    },
    name: {
      control: 'text',
      description: 'Имя группы радио кнопок',
    },
    value: {
      control: 'text',
      description: 'Значение радио кнопки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Опция 1',
    name: 'options',
    value: 'option1',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Выбранная опция',
    name: 'options',
    value: 'option1',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Отключенная опция',
    name: 'options',
    value: 'option1',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Отключенная выбранная опция',
    name: 'options',
    value: 'option1',
  },
};

export const WithoutLabel: Story = {
  args: {
    name: 'options',
    value: 'option1',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RadioButton
        checked={true}
        label="Маленький размер"
        name="sizes"
        value="small"
        size={Size.SM}
      />
      <RadioButton
        checked={true}
        label="Средний размер"
        name="sizes"
        value="medium"
        size={Size.MD}
      />
      <RadioButton
        checked={true}
        label="Большой размер"
        name="sizes"
        value="large"
        size={Size.LG}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <RadioButton
          checked={selectedValue === 'option1'}
          onChange={handleChange}
          label="Опция 1"
          name="interactive"
          value="option1"
        />
        <RadioButton
          checked={selectedValue === 'option2'}
          onChange={handleChange}
          label="Опция 2"
          name="interactive"
          value="option2"
        />
        <RadioButton
          checked={selectedValue === 'option3'}
          onChange={handleChange}
          label="Опция 3"
          name="interactive"
          value="option3"
        />
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>Выбранная опция:</strong> {selectedValue}
        </div>
      </div>
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('light');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    const options = [
      { value: 'light', label: 'Светлая тема' },
      { value: 'dark', label: 'Темная тема' },
      { value: 'auto', label: 'Автоматически' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Выберите тему оформления:</h3>
        {options.map(option => (
          <RadioButton
            key={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            label={option.label}
            name="theme"
            value={option.value}
          />
        ))}
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>Выбранная тема:</strong> {selectedValue}
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    const hasError = selectedValue === '';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Выберите способ доставки:</h3>
        <RadioButton
          checked={selectedValue === 'courier'}
          onChange={handleChange}
          label="Курьерская доставка"
          name="delivery"
          value="courier"
        />
        <RadioButton
          checked={selectedValue === 'pickup'}
          onChange={handleChange}
          label="Самовывоз"
          name="delivery"
          value="pickup"
        />
        <RadioButton
          checked={selectedValue === 'post'}
          onChange={handleChange}
          label="Почта России"
          name="delivery"
          value="post"
        />
        {hasError && (
          <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '8px' }}>
            Пожалуйста, выберите способ доставки
          </div>
        )}
      </div>
    );
  },
};

// ==================== Новые функции ====================

export const WithErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButton
          checked={value === 'option1'}
          onChange={e => setValue(e.target.value)}
          label="Опция с ошибкой"
          name="error"
          value="option1"
          error="Это поле обязательно для заполнения"
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={e => setValue(e.target.value)}
          label="Опция без ошибки"
          name="error"
          value="option2"
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButton
          checked={value === 'option1'}
          onChange={e => setValue(e.target.value)}
          label="Опция с подсказкой"
          name="helper"
          value="option1"
          helperText="Это вспомогательный текст, который помогает пользователю понять выбор"
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={e => setValue(e.target.value)}
          label="Обычная опция"
          name="helper"
          value="option2"
        />
      </div>
    );
  },
};

export const WithTooltip: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButton
          checked={value === 'option1'}
          onChange={e => setValue(e.target.value)}
          label="Опция с tooltip (сверху)"
          name="tooltip"
          value="option1"
          tooltip="Это подсказка, которая появляется при наведении"
          tooltipPosition={TooltipPosition.TOP}
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={e => setValue(e.target.value)}
          label="Опция с tooltip (снизу)"
          name="tooltip"
          value="option2"
          tooltip="Подсказка снизу"
          tooltipPosition={TooltipPosition.BOTTOM}
        />
        <RadioButton
          checked={value === 'option3'}
          onChange={e => setValue(e.target.value)}
          label="Опция с tooltip (слева)"
          name="tooltip"
          value="option3"
          tooltip="Подсказка слева"
          tooltipPosition={TooltipPosition.LEFT}
        />
        <RadioButton
          checked={value === 'option4'}
          onChange={e => setValue(e.target.value)}
          label="Опция с tooltip (справа)"
          name="tooltip"
          value="option4"
          tooltip="Подсказка справа"
          tooltipPosition={TooltipPosition.RIGHT}
        />
      </div>
    );
  },
};

export const WithRequired: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButton
          checked={value === 'option1'}
          onChange={e => setValue(e.target.value)}
          label="Обязательная опция 1"
          name="required"
          value="option1"
          required
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={e => setValue(e.target.value)}
          label="Обязательная опция 2"
          name="required"
          value="option2"
          required
        />
        <RadioButton
          checked={value === 'option3'}
          onChange={e => setValue(e.target.value)}
          label="Необязательная опция"
          name="required"
          value="option3"
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButton
          checked={value === 'option1'}
          onChange={e => setValue(e.target.value)}
          label="Опция с иконкой слева"
          name="icons"
          value="option1"
          leftIcon={<Icon name="IconExHome" size={IconSize.SM} />}
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={e => setValue(e.target.value)}
          label="Опция с иконкой справа"
          name="icons"
          value="option2"
          rightIcon={<Icon name="IconExCheck" size={IconSize.SM} />}
          labelPosition={RadioButtonLabelPosition.LEFT}
        />
        <RadioButton
          checked={value === 'option3'}
          onChange={e => setValue(e.target.value)}
          label="Опция с обеими иконками"
          name="icons"
          value="option3"
          leftIcon={<Icon name="IconExStar" size={IconSize.SM} />}
          rightIcon={<Icon name="IconExHeart" size={IconSize.SM} />}
        />
      </div>
    );
  },
};

export const WithStatus: Story = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');
    const [value3, setValue3] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4>Success статус:</h4>
          <RadioButton
            checked={value1 === 'option1'}
            onChange={e => setValue1(e.target.value)}
            label="Опция со статусом success"
            name="status-success"
            value="option1"
            status="success"
          />
        </div>
        <div>
          <h4>Error статус:</h4>
          <RadioButton
            checked={value2 === 'option1'}
            onChange={e => setValue2(e.target.value)}
            label="Опция со статусом error"
            name="status-error"
            value="option1"
            status="error"
          />
        </div>
        <div>
          <h4>Warning статус:</h4>
          <RadioButton
            checked={value3 === 'option1'}
            onChange={e => setValue3(e.target.value)}
            label="Опция со статусом warning"
            name="status-warning"
            value="option1"
            status="warning"
          />
        </div>
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
        <RadioButton
          checked={value === 'option1'}
          onChange={e => setValue(e.target.value)}
          label="Опция с fullWidth"
          name="fullwidth"
          value="option1"
          fullWidth
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={e => setValue(e.target.value)}
          label="Обычная опция"
          name="fullwidth"
          value="option2"
        />
      </div>
    );
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [value, setValue] = useState('plan1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButton
          checked={value === 'plan1'}
          onChange={e => setValue(e.target.value)}
          label="Базовый план"
          name="complex"
          value="plan1"
          extraText="Бесплатно навсегда"
          helperText="Идеально для начинающих пользователей"
          leftIcon={<Icon name="IconExHome" size={IconSize.SM} />}
          required
          tooltip="Это базовый план с ограниченными возможностями"
        />
        <RadioButton
          checked={value === 'plan2'}
          onChange={e => setValue(e.target.value)}
          label="Профессиональный план"
          name="complex"
          value="plan2"
          extraText="990₽/месяц"
          helperText="Для профессионалов и команд"
          leftIcon={<Icon name="IconExStar" size={IconSize.SM} />}
          required
          status="success"
        />
        <RadioButton
          checked={value === 'plan3'}
          onChange={e => setValue(e.target.value)}
          label="Корпоративный план"
          name="complex"
          value="plan3"
          extraText="По запросу"
          error="Этот план временно недоступен"
          leftIcon={<Icon name="IconExSettings" size={IconSize.SM} />}
          required
          status="error"
        />
      </div>
    );
  },
};
