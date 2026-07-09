jest.unmock('styled-components');

import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { Pulse } from './Pulse';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Pulse', () => {
  it('рендерит точку с классом ui-pulse', () => {
    const { container } = renderWithTheme(<Pulse />);
    expect(container.querySelector('.ui-pulse')).not.toBeNull();
  });

  it('прокидывает status и size в data-атрибуты', () => {
    const { container } = renderWithTheme(<Pulse status="danger" size={Size.LG} />);
    const pulseElement = container.querySelector('.ui-pulse');
    expect(pulseElement).toHaveAttribute('data-status', 'danger');
    expect(pulseElement).toHaveAttribute('data-size', Size.LG);
  });

  it('по умолчанию aria-hidden', () => {
    const { container } = renderWithTheme(<Pulse />);
    expect(container.querySelector('.ui-pulse')).toHaveAttribute('aria-hidden', 'true');
  });

  it('позволяет переопределить aria-hidden', () => {
    const { container } = renderWithTheme(<Pulse aria-hidden={false} />);
    expect(container.querySelector('.ui-pulse')).toHaveAttribute('aria-hidden', 'false');
  });
});
