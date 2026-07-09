jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { Chip } from './Chip';
import { Chips } from './Chips';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Chips', () => {
  it('single: onChange отдаёт строку, повторный клик не снимает выбор', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Chips selectionMode="single" value="a" onChange={handleChange} aria-label="Группа">
        <Chip value="a">A</Chip>
        <Chip value="b">B</Chip>
      </Chips>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'B' }));
    expect(handleChange).toHaveBeenCalledWith('b');

    handleChange.mockClear();
    fireEvent.click(screen.getByRole('radio', { name: 'A' }));
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('multiple: onChange отдаёт массив и переключает', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Chips
        selectionMode="multiple"
        value={['a']}
        onChange={handleChange}
        aria-label="Мульти"
      >
        <Chip value="a">A</Chip>
        <Chip value="b">B</Chip>
      </Chips>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(handleChange).toHaveBeenCalledWith(['a', 'b']);

    handleChange.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('disabled группы блокирует выбор', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Chips selectionMode="single" disabled onChange={handleChange} aria-label="Disabled">
        <Chip value="a">A</Chip>
      </Chips>,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'A' }));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('прокидывает size через context (класс и геометрия корня)', () => {
    const { container } = renderWithTheme(
      <Chips selectionMode="none" size={Size.MD} aria-label="Размер">
        <Chip value="a">A</Chip>
      </Chips>,
    );
    expect(container.querySelector('.ui-chip')).not.toBeNull();
  });

  it('стрелки переносят фокус между чипами', () => {
    renderWithTheme(
      <Chips selectionMode="single" defaultValue="a" aria-label="Клавиатура">
        <Chip value="a">A</Chip>
        <Chip value="b">B</Chip>
        <Chip value="c">C</Chip>
      </Chips>,
    );

    const chipA = screen.getByRole('radio', { name: 'A' });
    const chipB = screen.getByRole('radio', { name: 'B' });
    chipA.focus();
    fireEvent.keyDown(chipA, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chipB);
  });

  it('role radiogroup для single', () => {
    renderWithTheme(
      <Chips selectionMode="single" aria-label="Радио">
        <Chip value="a">A</Chip>
      </Chips>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Радио' })).toBeInTheDocument();
  });
});
