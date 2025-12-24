import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { Button } from './Button';
import { ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';

/**
 * Обертка с темой для тестов
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Button', () => {
  it('рендерится с текстом', () => {
    renderWithTheme(<Button>Нажми меня</Button>);
    expect(screen.getByText('Нажми меня')).toBeInTheDocument();
  });

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Кнопка</Button>);

    fireEvent.click(screen.getByText('Кнопка'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick когда disabled', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Button onClick={handleClick} disabled>
        Кнопка
      </Button>
    );

    fireEvent.click(screen.getByText('Кнопка'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('показывает состояние loading', () => {
    renderWithTheme(<Button loading>Кнопка</Button>);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('применяет правильный variant', () => {
    const { container } = renderWithTheme(
      <Button variant={ButtonVariant.PRIMARY}>Кнопка</Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('применяет правильный size', () => {
    const { container } = renderWithTheme(
      <Button size={Size.SM}>Кнопка</Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('применяет fullWidth', () => {
    const { container } = renderWithTheme(
      <Button fullWidth>Кнопка</Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('рендерится с иконками', () => {
    const IconStart = () => <span data-testid="icon-start">Start</span>;
    const IconEnd = () => <span data-testid="icon-end">End</span>;
    renderWithTheme(
      <Button iconStart={<IconStart />} iconEnd={<IconEnd />}>
        Кнопка
      </Button>
    );

    expect(screen.getByTestId('icon-start')).toBeInTheDocument();
    expect(screen.getByTestId('icon-end')).toBeInTheDocument();
  });

  it('не кликается когда loading', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Button onClick={handleClick} loading>
        Кнопка
      </Button>
    );

    fireEvent.click(screen.getByText('Загрузка...').closest('button')!);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
