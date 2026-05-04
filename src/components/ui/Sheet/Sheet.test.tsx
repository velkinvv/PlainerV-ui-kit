jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Sheet } from './Sheet';

/**
 * Рендер с темой.
 * @param ui - Элемент с `Sheet`.
 */
const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Sheet', () => {
  it('не показывает контент при isOpen=false', () => {
    renderWithTheme(
      <Sheet isOpen={false} onClose={jest.fn()}>
        <div>Скрыто</div>
      </Sheet>,
    );
    expect(screen.queryByText('Скрыто')).not.toBeInTheDocument();
  });

  it('показывает контент при isOpen=true', () => {
    renderWithTheme(
      <Sheet isOpen title="Лист" onClose={jest.fn()}>
        <div>Внутри</div>
      </Sheet>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Лист')).toBeInTheDocument();
    expect(screen.getByText('Внутри')).toBeInTheDocument();
  });

  it('вызывает onClose по кнопке закрытия', () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Sheet isOpen title="T" onClose={onClose}>
        <div />
      </Sheet>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalled();
  });
});
