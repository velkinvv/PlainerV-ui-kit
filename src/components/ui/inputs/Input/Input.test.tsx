import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { Input } from './Input';
import { InputVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';

/**
 * Обертка с темой для тестов
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Input', () => {
  it('рендерится с label', () => {
    renderWithTheme(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('обрабатывает изменения значения', () => {
    const handleChange = jest.fn();
    renderWithTheme(<Input label="Email" onChange={handleChange} />);

    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('применяет handleInput к вводу (маска)', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <Input
        label="Код"
        onChange={onChange}
        handleInput={(v, pos) => ({
          value: v.replace(/\D/g, ''),
          cursorPosition: Math.min(pos, v.replace(/\D/g, '').length),
        })}
      />,
    );

    const input = screen.getByLabelText('Код');
    fireEvent.change(input, { target: { value: 'a1b2', selectionStart: 4 } });

    expect(onChange).toHaveBeenCalled();
    expect(
      (onChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLInputElement>)?.target?.value,
    ).toBe('12');
    expect(input).toHaveValue('12');
  });

  it('показывает ошибку', () => {
    renderWithTheme(<Input label="Email" error="Неверный email" />);

    expect(screen.getByText('Неверный email')).toBeInTheDocument();
  });

  it('показывает success сообщение', () => {
    renderWithTheme(<Input label="Email" success="Email валиден" />);

    expect(screen.getByText('Успешно')).toBeInTheDocument();
  });

  it('показывает helper text', () => {
    renderWithTheme(<Input label="Email" helperText="Введите ваш email" />);

    expect(screen.getByText('Введите ваш email')).toBeInTheDocument();
  });

  it('применяет placeholder', () => {
    renderWithTheme(<Input label="Email" placeholder="example@email.com" />);

    expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
  });

  it('применяет правильный variant', () => {
    const { container } = renderWithTheme(<Input label="Email" variant={InputVariant.DEFAULT} />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('применяет правильный size', () => {
    const { container } = renderWithTheme(<Input label="Email" size={Size.SM} />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('работает с disabled', () => {
    renderWithTheme(<Input label="Email" disabled />);

    const input = screen.getByLabelText('Email');
    expect(input).toBeDisabled();
  });

  it('работает с required', () => {
    renderWithTheme(<Input label="Email" required />);

    const input = screen.getByRole('textbox', { name: /Email/ });
    expect(input).toBeRequired();
  });
});
