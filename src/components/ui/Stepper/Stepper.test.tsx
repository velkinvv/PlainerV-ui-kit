/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Stepper } from './Stepper';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const longSteps = [
  { title: 'Роль' },
  { title: 'Контакты' },
  { title: 'Реквизиты организации' },
  { title: 'Согласия' },
];

describe('Stepper linear titleLayout', () => {
  it('при titleLayout=hidden оставляет accessible name шага в документе', () => {
    wrap(
      <Stepper
        variant="linear"
        fullWidth
        titleLayout="hidden"
        activeStepIndex={0}
        steps={longSteps}
        onBack={() => undefined}
      />,
    );
    expect(screen.getByText('Реквизиты организации')).toBeInTheDocument();
    expect(screen.getByLabelText('Назад')).toBeInTheDocument();
  });

  it('проставляет data-title-layout на корне', () => {
    wrap(
      <Stepper
        variant="linear"
        fullWidth
        titleLayout="wrap"
        activeStepIndex={0}
        steps={longSteps}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Шаги процесса' })).toHaveAttribute(
      'data-title-layout',
      'wrap',
    );
  });
});
