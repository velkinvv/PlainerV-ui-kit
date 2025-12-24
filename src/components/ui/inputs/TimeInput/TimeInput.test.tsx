import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { TimeInput } from './TimeInput';
import { lightTheme } from '../../../../themes';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe('TimeInput', () => {
  const defaultProps = {
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithTheme(<TimeInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('opens time picker on focus', async () => {
    renderWithTheme(<TimeInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });
  });

  it('selects time correctly', async () => {
    const onChange = jest.fn();
    renderWithTheme(<TimeInput {...defaultProps} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    // Выбираем час 14
    const hour14 = screen.getByText('14');
    fireEvent.click(hour14);

    // Выбираем минуту 30
    const minute30 = screen.getByText('30');
    fireEvent.click(minute30);

    expect(onChange).toHaveBeenCalledWith('14:30:00');
  });

  it('handles manual time input', async () => {
    const onChange = jest.fn();
    renderWithTheme(<TimeInput {...defaultProps} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15:45' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('15:45:00');
  });

  it('handles range mode', async () => {
    const onChange = jest.fn();
    renderWithTheme(<TimeInput {...defaultProps} range onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    // Выбираем начало диапазона
    const hour9 = screen.getByText('09');
    fireEvent.click(hour9);
    const minute0 = screen.getByText('00');
    fireEvent.click(minute0);

    // Выбираем конец диапазона
    const hour17 = screen.getByText('17');
    fireEvent.click(hour17);
    const minute30 = screen.getByText('30');
    fireEvent.click(minute30);

    // Применяем диапазон
    const applyButton = screen.getByText('Применить');
    fireEvent.click(applyButton);

    expect(onChange).toHaveBeenCalledWith({
      start: '09:00:00',
      end: '17:30:00',
    });
  });

  it('handles manual range input', async () => {
    const onChange = jest.fn();
    renderWithTheme(<TimeInput {...defaultProps} range onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '09:00 — 17:30' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      start: '09:00:00',
      end: '17:30:00',
    });
  });

  it('clears value correctly', async () => {
    const onChange = jest.fn();
    renderWithTheme(<TimeInput {...defaultProps} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    const clearButton = screen.getByText('Очистить');
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
  });

  it('shows seconds when showSeconds is true', async () => {
    renderWithTheme(<TimeInput {...defaultProps} showSeconds />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('Секунды')).toBeInTheDocument();
    });
  });

  it('respects minuteStep', async () => {
    renderWithTheme(<TimeInput {...defaultProps} minuteStep={15} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('00')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument();
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

  it('closes on Escape key', async () => {
    renderWithTheme(<TimeInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByText('Очистить')).not.toBeInTheDocument();
  });
});
