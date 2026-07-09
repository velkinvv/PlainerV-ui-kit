jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Button } from '../buttons/Button/Button';
import { DropMenu } from './DropMenu';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const menuItems = [
  { value: '1', label: 'Пункт 1' },
  { value: '2', label: 'Пункт 2' },
];

describe('DropMenu', () => {
  it('открывается по клику на дефолтную кнопку', () => {
    renderWithTheme(
      <DropMenu items={menuItems} buttonProps={{ children: 'Меню' }} onSelectItem={jest.fn()} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Меню/i }));
    expect(screen.getByText('Пункт 1')).toBeInTheDocument();
  });

  it('renderContentProp получает menuState и открывает меню', () => {
    renderWithTheme(
      <DropMenu
        items={menuItems}
        onSelectItem={jest.fn()}
        renderContentProp={({ buttonRef, menuState, handleClick, handleKeyDown, disabled }) => (
          <button
            ref={buttonRef as React.Ref<HTMLButtonElement>}
            type="button"
            disabled={disabled}
            aria-expanded={menuState}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            Кастом
          </button>
        )}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Кастом' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Пункт 1')).toBeInTheDocument();
  });

  it('вызывает onSelectItem при выборе пункта', () => {
    const handleSelectItem = jest.fn();
    renderWithTheme(
      <DropMenu
        items={menuItems}
        buttonProps={{ children: 'Меню' }}
        onSelectItem={handleSelectItem}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Меню/i }));
    fireEvent.click(screen.getByText('Пункт 1'));
    expect(handleSelectItem).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('controlled isVisible / onVisibilityChange', () => {
    const handleVisibilityChange = jest.fn();
    const { rerender } = renderWithTheme(
      <DropMenu
        items={menuItems}
        isVisible={false}
        onVisibilityChange={handleVisibilityChange}
        buttonProps={{ children: 'Меню' }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Меню/i }));
    expect(handleVisibilityChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Пункт 1')).not.toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <DropMenu
          items={menuItems}
          isVisible
          onVisibilityChange={handleVisibilityChange}
          buttonProps={{ children: 'Меню' }}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText('Пункт 1')).toBeInTheDocument();
  });

  it('trigger prop работает без renderContentProp', () => {
    renderWithTheme(
      <DropMenu
        items={menuItems}
        trigger={<Button>Триггер</Button>}
        onSelectItem={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByText('Триггер'));
    expect(screen.getByText('Пункт 2')).toBeInTheDocument();
  });

  it('selected используется как value', () => {
    renderWithTheme(
      <DropMenu
        items={menuItems}
        selected="2"
        defaultOpen
        buttonProps={{ children: 'Меню' }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(screen.getByText('Пункт 2')).toBeInTheDocument();
  });
});
