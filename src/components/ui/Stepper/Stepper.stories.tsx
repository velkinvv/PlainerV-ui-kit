import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Stepper } from './Stepper';
import type { StepperLinearStep } from '../../../types/ui';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { DOC_STEPPER } from '@/components/ui/storyDocs/uiKitDocs';

const linearSteps: StepperLinearStep[] = [
  { title: 'Наименование' },
  { title: 'Наименование' },
  { title: 'Наименование' },
];

const meta: Meta<typeof Stepper> = {
  title: 'UI Kit/Navigation/Stepper',
  component: Stepper,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_STEPPER,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['compact', 'linear'],
      description:
        'compact — кольцо с «текущий/всего», заголовок и подзаголовок; linear — шаги с соединителями',
      table: {
        type: { summary: 'compact или linear' },
      },
    },
    appearance: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Принудительная светлая или тёмная панель (иначе из темы)',
      table: {
        type: { summary: 'light или dark' },
      },
    },
    fullWidth: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    backButtonLabel: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    onBack: {
      control: false,
      table: { type: { summary: '() => void (без колбэка кнопка «назад» скрыта)' } },
    },
    currentStep: {
      description: 'Только для variant=compact: текущий шаг, счёт с 1',
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    totalSteps: {
      description: 'Только для variant=compact: всего шагов',
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    title: {
      description: 'Только для variant=compact: основная строка',
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    subtitle: {
      description: 'Только для variant=compact: вторая строка',
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    steps: {
      description: 'Только для variant=linear: список шагов',
      control: false,
      table: {
        type: { summary: 'StepperLinearStep[] (title, опционально stepLabel)' },
      },
    },
    activeStepIndex: {
      description: 'Только для variant=linear: индекс активного шага с 0',
      control: 'number',
      table: { type: { summary: 'number' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

/** Компактный вариант, тёмная панель */
export const CompactDark: Story = {
  render: () => (
    <Stepper
      variant="compact"
      appearance="dark"
      currentStep={1}
      totalSteps={3}
      title="Активный шаг"
      subtitle="Следующий шаг"
      onBack={() => undefined}
    />
  ),
};

/** Компактный вариант, светлая панель */
export const CompactLight: Story = {
  render: () => (
    <Stepper
      variant="compact"
      appearance="light"
      currentStep={1}
      totalSteps={3}
      title="Активный шаг"
      subtitle="Следующий шаг"
      onBack={() => undefined}
    />
  ),
};

/** Без кнопки назад */
export const CompactWithoutBack: Story = {
  render: () => (
    <Stepper
      variant="compact"
      appearance="light"
      currentStep={2}
      totalSteps={5}
      title="Второй шаг"
      subtitle="Далее — проверка"
    />
  ),
};

/** Интерактив: шаги и кольцо */
export const CompactInteractive: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const total = 4;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <Stepper
          variant="compact"
          appearance="dark"
          currentStep={step}
          totalSteps={total}
          title={`Шаг ${step} из ${total}`}
          subtitle={step < total ? `Далее: шаг ${step + 1}` : 'Завершение'}
          onBack={() => setStep((s) => Math.max(1, s - 1))}
        />
        <button type="button" onClick={() => setStep((s) => Math.min(total, s + 1))}>
          Вперёд (демо)
        </button>
      </div>
    );
  },
};

/** Линейный вариант, активен первый шаг */
export const LinearFirstActive: Story = {
  render: () => (
    <Stepper
      variant="linear"
      appearance="light"
      steps={linearSteps}
      activeStepIndex={0}
      onBack={() => undefined}
      fullWidth
    />
  ),
};

/** Линейный вариант, тёмная панель, активен второй шаг */
export const LinearDarkMiddle: Story = {
  render: () => (
    <Stepper
      variant="linear"
      appearance="dark"
      steps={linearSteps}
      activeStepIndex={1}
      onBack={() => undefined}
      fullWidth
    />
  ),
};

/** Кастомные подписи шагов */
export const LinearCustomLabels: Story = {
  render: () => (
    <Stepper
      variant="linear"
      appearance="light"
      steps={[
        { stepLabel: 'Контакт', title: 'E-mail' },
        { stepLabel: 'Профиль', title: 'Имя и фото' },
        { stepLabel: 'Готово', title: 'Подтверждение' },
      ]}
      activeStepIndex={1}
      onBack={() => undefined}
      fullWidth
    />
  ),
};

