import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Stepper } from './Stepper';
import type { StepperLinearStep } from '../../../types/ui';
import { ThemeProvider } from '../../../themes/ThemeProvider';

const linearSteps: StepperLinearStep[] = [
  { title: 'Наименование' },
  { title: 'Наименование' },
  { title: 'Наименование' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Components/Navigation/Stepper',
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4806-10699',
    },
    docs: {
      description: {
        component:
          'Навигация по шагам по макетам Figma ([compact](https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4806-10699&t=cStO03cIis1M6Tar-4), [linear](https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4809-2458&t=cStO03cIis1M6Tar-4)): **compact** — кольцо с «N/M», заголовок и подзаголовок; **linear** — цепочка шагов с соединителями. Внешний вид `light` / `dark` — проп `appearance` или `ThemeProvider`. Для прогресса внутри формы см. также `Progress` (`variant="stepper"`).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

/** Компактный вариант, тёмная «пилюля» */
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
