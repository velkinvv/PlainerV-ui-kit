import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { NumberInput } from './NumberInput';

/**
 * Рендер с темой для тестов.
 * @param component - Узел для монтирования.
 */
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('NumberInput', () => {
  it('оставляет только цифры при вводе', () => {
    const handleChange = jest.fn();
    renderWithProviders(<NumberInput label="Сумма" allowDecimal={false} onChange={handleChange} />);

    const input = screen.getByLabelText('Сумма');
    fireEvent.change(input, { target: { value: '12а3б', selectionStart: 6 } });

    expect(
      (handleChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLInputElement>)?.target?.value,
    ).toBe('123');
    expect(input).toHaveValue('123');
  });

  it('поддерживает десятичную точку при allowDecimal', () => {
    renderWithProviders(<NumberInput label="Цена" allowDecimal />);

    const input = screen.getByLabelText('Цена');
    fireEvent.change(input, { target: { value: '3.14x', selectionStart: 5 } });

    expect(input).toHaveValue('3.14');
  });

  it('при allowNegative сохраняет ведущий минус', () => {
    renderWithProviders(<NumberInput label="Баланс" allowDecimal={false} allowNegative />);

    const input = screen.getByLabelText('Баланс');
    fireEvent.change(input, { target: { value: '-42', selectionStart: 3 } });

    expect(input).toHaveValue('-42');
  });

  it('при blur ограничивает значение по min и max', () => {
    const handleChange = jest.fn();
    renderWithProviders(
      <NumberInput label="Количество" min={0} max={10} value="99" onChange={handleChange} />,
    );

    const input = screen.getByLabelText('Количество');
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1]?.[0] as
      | React.ChangeEvent<HTMLInputElement>
      | undefined;
    expect(lastCall?.target?.value).toBe('10');
  });
});
