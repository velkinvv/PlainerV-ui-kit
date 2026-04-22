jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Drawer } from './Drawer';

/**
 * Рендер с темой.
 * @param ui - Элемент с `Drawer`.
 */
const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Drawer', () => {
  it('не показывает контент при isOpen=false', () => {
    renderWithTheme(
      <Drawer isOpen={false} onClose={jest.fn()}>
        <div>Секрет</div>
      </Drawer>,
    );
    expect(screen.queryByText('Секрет')).not.toBeInTheDocument();
  });

  it('показывает контент и заголовок при isOpen=true', () => {
    renderWithTheme(
      <Drawer isOpen title="Меню" onClose={jest.fn()}>
        <div>Пункты</div>
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Меню')).toBeInTheDocument();
    expect(screen.getByText('Пункты')).toBeInTheDocument();
  });

  it('вызывает onClose по кнопке закрытия', () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Drawer isOpen title="T" onClose={onClose}>
        <div />
      </Drawer>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalled();
  });
});
