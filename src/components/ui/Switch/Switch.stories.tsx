import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch } from './Switch';
import { Size } from '../../../types/sizes';

const meta: Meta<typeof Switch> = {
  title: 'Components/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Переключатель в стиле макета Plainer: трек, бегунок, подпись слева/справа, `role="switch"`, состояние ошибки.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { description: 'Контролируемое состояние «вкл»' },
    defaultChecked: { description: 'Неконтролируемое начальное значение' },
    onChange: { description: 'Событие `ChangeEvent<HTMLInputElement>` (`target.checked`)' },
    label: { description: 'Подпись (`ReactNode`)' },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Расположение подписи относительно трека',
    },
    disabled: { control: 'boolean', description: 'Отключено' },
    size: {
      control: 'select',
      options: [Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Размер трека',
    },
    error: { description: 'Текст ошибки под переключателем' },
    fullWidth: { control: 'boolean', description: 'На всю ширину строки' },
    name: { description: 'Имя поля в форме' },
    id: { description: 'Явный id для связи с `label`' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Уведомления по email',
    name: 'email-notify',
  },
};

export const Checked: Story = {
  args: {
    label: 'Включено по умолчанию',
    defaultChecked: true,
    name: 'on-default',
  },
};

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Switch
        label={`Пуш-уведомления: ${on ? 'вкл' : 'выкл'}`}
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
        name="push"
      />
    );
  },
};

export const LabelRight: Story = {
  args: {
    label: 'Тёмная тема',
    labelPosition: 'right',
    defaultChecked: true,
    name: 'theme',
  },
};

export const DisabledOff: Story = {
  args: {
    label: 'Недоступно (выкл)',
    disabled: true,
    name: 'dis-off',
  },
};

export const DisabledOn: Story = {
  args: {
    label: 'Недоступно (вкл)',
    disabled: true,
    defaultChecked: true,
    name: 'dis-on',
  },
};

export const Small: Story = {
  args: {
    label: 'Размер SM',
    size: Size.SM,
    name: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Размер LG',
    size: Size.LG,
    name: 'lg',
  },
};

export const WithError: Story = {
  args: {
    label: 'Согласие с условиями',
    error: 'Необходимо включить переключатель',
    name: 'terms',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'На всю ширину контейнера',
    fullWidth: true,
    defaultChecked: true,
    name: 'fw',
  },
};
