jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { MultiButton } from './MultiButton';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const menuItems = [
  { value: 'a', label: 'Действие A' },
  { value: 'b', label: 'Действие B' },
];

describe('MultiButton', () => {
  it('рендерит подпись основной кнопки', () => {
    renderWithTheme(
      <MultiButton items={menuItems} onMainButtonClick={jest.fn()}>
        Сохранить
      </MultiButton>,
    );
    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInTheDocument();
  });

  it('вызывает onMainButtonClick без открытия меню', () => {
    const handleMain = jest.fn();
    renderWithTheme(
      <MultiButton items={menuItems} onMainButtonClick={handleMain}>
        Сохранить
      </MultiButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(handleMain).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Действие A')).not.toBeInTheDocument();
  });

  it('открывает меню по клику на шеврон', () => {
    renderWithTheme(
      <MultiButton items={menuItems} onSelectItem={jest.fn()}>
        Сохранить
      </MultiButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Открыть меню' }));
    expect(screen.getByText('Действие A')).toBeInTheDocument();
  });

  it('вызывает onSelectItem при выборе пункта', () => {
    const handleSelect = jest.fn();
    renderWithTheme(
      <MultiButton items={menuItems} onSelectItem={handleSelect}>
        Сохранить
      </MultiButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Открыть меню' }));
    fireEvent.click(screen.getByText('Действие A'));
    expect(handleSelect).toHaveBeenCalledWith('a', expect.any(Object));
  });

  it('disabled блокирует main и меню', () => {
    const handleMain = jest.fn();
    const handleSelect = jest.fn();
    renderWithTheme(
      <MultiButton
        items={menuItems}
        disabled
        onMainButtonClick={handleMain}
        onSelectItem={handleSelect}
      >
        Сохранить
      </MultiButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    fireEvent.click(screen.getByRole('button', { name: 'Открыть меню' }));
    expect(handleMain).not.toHaveBeenCalled();
    expect(screen.queryByText('Действие A')).not.toBeInTheDocument();
  });

  it('disabledMainButton блокирует только main', () => {
    const handleMain = jest.fn();
    renderWithTheme(
      <MultiButton
        items={menuItems}
        disabledMainButton
        onMainButtonClick={handleMain}
        onSelectItem={jest.fn()}
      >
        Сохранить
      </MultiButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(handleMain).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Открыть меню' }));
    expect(screen.getByText('Действие B')).toBeInTheDocument();
  });
});
