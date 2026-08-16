import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Stepper } from './Stepper';
import type { StepperLinearStep } from '../../../types/ui';
import { DOC_STEPPER } from '@/components/ui/storyDocs/uiKitDocs';
import { stepperStoriesStyles } from './Stepper.stories.styles';

const linearSteps: StepperLinearStep[] = [
  { title: 'Наименование' },
  { title: 'Наименование' },
  { title: 'Наименование' },
];

const meta: Meta<typeof Stepper> = {
  title: 'UI Kit/Navigation/Stepper',
  component: Stepper,
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
    titleLayout: {
      description:
        'Только linear: nowrap | wrap | hidden | auto (default). auto: контейнер < 520px → hidden',
      control: { type: 'select' },
      options: ['auto', 'nowrap', 'wrap', 'hidden'],
      table: { type: { summary: 'nowrap | wrap | hidden | auto' } },
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
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    return (
      <div style={stepperStoriesStyles.interactiveContainer}>
        <Stepper
          variant="compact"
          appearance="dark"
          currentStep={currentStep}
          totalSteps={totalSteps}
          title={`Шаг ${currentStep} из ${totalSteps}`}
          subtitle={currentStep < totalSteps ? `Далее: шаг ${currentStep + 1}` : 'Завершение'}
          onBack={() => setCurrentStep((previousStepValue) => Math.max(1, previousStepValue - 1))}
        />
        <button
          type="button"
          onClick={() =>
            setCurrentStep((previousStepValue) => Math.min(totalSteps, previousStepValue + 1))
          }
        >
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

const registerLikeSteps: StepperLinearStep[] = [
  { title: 'Роль' },
  { title: 'Контакты' },
  { title: 'Реквизиты организации' },
  { title: 'Согласия' },
];

/** Узкий контейнер 360px, длинные RU title (auth-карточка) */
export const LinearNarrow360LongTitles: Story = {
  name: 'Linear / narrow 360px / 4 long RU titles',
  render: () => (
    <div style={stepperStoriesStyles.narrow360}>
      <Stepper
        variant="linear"
        fullWidth
        appearance="light"
        activeStepIndex={1}
        steps={registerLikeSteps}
        onBack={() => undefined}
      />
    </div>
  ),
};

/** Узкий контейнер 480px */
export const LinearNarrow480: Story = {
  name: 'Linear / narrow 480px / 4 long RU titles',
  render: () => (
    <div style={stepperStoriesStyles.narrow480}>
      <Stepper
        variant="linear"
        fullWidth
        appearance="light"
        activeStepIndex={1}
        steps={registerLikeSteps}
        onBack={() => undefined}
      />
    </div>
  ),
};

/** 320px: 3 и 5 шагов */
export const LinearNarrow320ThreeAndFive: Story = {
  name: 'Linear / narrow 320px / 3 and 5 steps',
  render: () => (
    <div style={stepperStoriesStyles.interactiveContainer}>
      <div style={stepperStoriesStyles.narrow320}>
        <Stepper
          variant="linear"
          fullWidth
          activeStepIndex={0}
          steps={registerLikeSteps.slice(0, 3)}
          onBack={() => undefined}
        />
      </div>
      <div style={stepperStoriesStyles.narrow320}>
        <Stepper
          variant="linear"
          fullWidth
          activeStepIndex={2}
          steps={[...registerLikeSteps, { title: 'Подтверждение' }]}
          onBack={() => undefined}
        />
      </div>
    </div>
  ),
};

/** Широкая панель — desktop без регрессии */
export const LinearWide960: Story = {
  name: 'Linear / wide 960px',
  render: () => (
    <div style={stepperStoriesStyles.wide960}>
      <Stepper
        variant="linear"
        fullWidth
        activeStepIndex={1}
        steps={registerLikeSteps}
        onBack={() => undefined}
      />
    </div>
  ),
};

/** Явный wrap в узком контейнере */
export const LinearTitleLayoutWrap: Story = {
  name: 'Linear / titleLayout=wrap / 360px',
  render: () => (
    <div style={stepperStoriesStyles.narrow360}>
      <Stepper
        variant="linear"
        fullWidth
        titleLayout="wrap"
        activeStepIndex={0}
        steps={registerLikeSteps}
        onBack={() => undefined}
      />
    </div>
  ),
};
