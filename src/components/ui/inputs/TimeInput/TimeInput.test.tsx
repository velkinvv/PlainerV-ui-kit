import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeInput } from './TimeInput';
import { ThemeProvider } from '../../../../themes/ThemeProvider';

/**
 * Рендер с ThemeProvider приложения: Icon и др. используют `useTheme` из ThemeProvider.tsx.
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

/** Клик по кнопке иконки часов (первый button внутри поля). */
const clickClockIcon = (container: HTMLElement) => {
  const btn = container.querySelector('button');
  if (!btn) throw new Error('Не найдена кнопка иконки');
  fireEvent.click(btn);
};

/** Колонка «Часы» внутри переданного контейнера (попап или блок диапазона). */
const withinHoursColumn = (scope: HTMLElement) => {
  const label = within(scope).getByText('Часы');
  return within(label.nextElementSibling as HTMLElement);
};

/** Колонка «Минуты» внутри переданного контейнера. */
const withinMinutesColumn = (scope: HTMLElement) => {
  const label = within(scope).getByText('Минуты');
  return within(label.nextElementSibling as HTMLElement);
};

describe('TimeInput', () => {
  const defaultProps = {
    onChange: jest.fn(),
    /** Тесты написаны под обычный text input; в компоненте по умолчанию segmented=true */
    segmented: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithTheme(<TimeInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('после открытия по иконке в попапе есть кнопка Очистить', async () => {
    const { container } = renderWithTheme(<TimeInput {...defaultProps} />);
    clickClockIcon(container);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });
  });

  it('selects time correctly', async () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(<TimeInput {...defaultProps} onChange={onChange} />);
    clickClockIcon(container);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    const popup = screen.getByText('Очистить').closest('.time-picker-popup') as HTMLElement;
    fireEvent.click(withinHoursColumn(popup).getByRole('button', { name: '14' }));
    fireEvent.click(withinMinutesColumn(popup).getByRole('button', { name: '30' }));

    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(String(last)).toMatch(/^14:30/);
  });

  it('handles manual time input', async () => {
    const onChange = jest.fn();
    renderWithTheme(<TimeInput {...defaultProps} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15:45' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(String(last)).toMatch(/^15:45/);
  });

  it('handles range mode', async () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(
      <TimeInput {...defaultProps} range onChange={onChange} />,
    );
    clickClockIcon(container);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    const startRoot = screen.getByText('Начальное время').closest('div')?.parentElement
      ?.parentElement as HTMLElement;
    fireEvent.click(withinHoursColumn(startRoot).getByRole('button', { name: '09' }));
    fireEvent.click(withinMinutesColumn(startRoot).getByRole('button', { name: '00' }));

    const endRoot = screen.getByText('Конечное время').closest('div')?.parentElement
      ?.parentElement as HTMLElement;
    fireEvent.click(withinHoursColumn(endRoot).getByRole('button', { name: '17' }));
    fireEvent.click(withinMinutesColumn(endRoot).getByRole('button', { name: '30' }));

    fireEvent.click(screen.getByText('Применить'));

    await waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        start: expect.stringMatching(/^09:00/),
        end: expect.stringMatching(/^17:30/),
      }),
    );
  });

  it('handles manual range input', async () => {
    const onChange = jest.fn();
    renderWithTheme(<TimeInput {...defaultProps} range onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '09:00 — 17:30' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        start: expect.stringMatching(/^09:00/),
        end: expect.stringMatching(/^17:30/),
      }),
    );
  });

  it('clears value correctly', async () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(<TimeInput {...defaultProps} onChange={onChange} />);
    clickClockIcon(container);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    const clearButton = screen.getByText('Очистить');
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('shows seconds when showSeconds is true', async () => {
    const { container } = renderWithTheme(<TimeInput {...defaultProps} showSeconds />);
    clickClockIcon(container);
    await waitFor(() => {
      expect(screen.getByText('Секунды')).toBeInTheDocument();
    });
  });

  it('respects minuteStep', async () => {
    const { container } = renderWithTheme(<TimeInput {...defaultProps} minuteStep={15} />);
    clickClockIcon(container);
    await waitFor(() => {
      const popup = screen.getByText('Очистить').closest('.time-picker-popup') as HTMLElement;
      expect(withinHoursColumn(popup).getByRole('button', { name: '00' })).toBeInTheDocument();
      const minutes = withinMinutesColumn(popup);
      expect(minutes.getByRole('button', { name: '15' })).toBeInTheDocument();
      expect(minutes.getByRole('button', { name: '30' })).toBeInTheDocument();
      expect(minutes.getByRole('button', { name: '45' })).toBeInTheDocument();
    });
  });

  it('handles disabled state', () => {
    renderWithTheme(<TimeInput {...defaultProps} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('displays error message', () => {
    const errorMessage = 'Invalid time format';
    renderWithTheme(<TimeInput {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
