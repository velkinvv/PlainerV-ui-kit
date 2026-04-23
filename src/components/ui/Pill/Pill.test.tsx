jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Pill } from './Pill';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Pill', () => {
  it('рендерит подпись', () => {
    renderWithTheme(<Pill>Pill</Pill>);
    expect(screen.getByRole('button', { name: /Pill/i })).toBeInTheDocument();
  });

  it('aria-pressed отражает selected', () => {
    renderWithTheme(<Pill selected>Pill</Pill>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('вызывает onClick', () => {
    const fn = jest.fn();
    renderWithTheme(
      <Pill onClick={fn}>
        A
      </Pill>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('disabled блокирует клик', () => {
    const fn = jest.fn();
    renderWithTheme(
      <Pill disabled onClick={fn}>
        X
      </Pill>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(fn).not.toHaveBeenCalled();
  });
});
