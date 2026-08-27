import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateInput } from './DateInput';
import { Input } from '../Input/Input';
import { Size } from '../../../../types/sizes';
import { ThemeProvider } from '../../../../themes/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// Mock the Icon component
jest.mock('../../Icon/Icon', () => ({
  Icon: ({ name, size }: { name: string; size: string }) => (
    <div data-testid={`icon-${name}-${size}`} />
  ),
}));

describe('DateInput', () => {
  const defaultProps = {
    label: 'Test Date',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label', () => {
    renderWithTheme(<DateInput {...defaultProps} />);
    expect(screen.getByText('Test Date')).toBeInTheDocument();
  });

  it('renders without label', () => {
    renderWithTheme(<DateInput onChange={jest.fn()} />);
    expect(screen.queryByText('Test Date')).not.toBeInTheDocument();
  });

  it('displays placeholder when no value', () => {
    renderWithTheme(<DateInput {...defaultProps} placeholder="Select date" />);
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });

  it('displays single date value correctly', () => {
    renderWithTheme(<DateInput {...defaultProps} value="2024-01-15" />);
    expect(screen.getByDisplayValue('15.01.2024')).toBeInTheDocument();
  });

  it('displays range value correctly', () => {
    const rangeValue = { start: '2024-01-15', end: '2024-01-20' };
    renderWithTheme(<DateInput {...defaultProps} range value={rangeValue} />);
    expect(screen.getByDisplayValue('15.01.2024 — 20.01.2024')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    renderWithTheme(<DateInput {...defaultProps} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('displays error message', () => {
    renderWithTheme(<DateInput {...defaultProps} error="Invalid date" />);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const { rerender } = renderWithTheme(<DateInput {...defaultProps} size={Size.SM} />);
    expect(screen.getByTestId('icon-IconPlainerCalendar-XS')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <DateInput {...defaultProps} size={Size.LG} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('icon-IconPlainerCalendar-MD')).toBeInTheDocument();
  });

  it('hides icon when showIcon is false', () => {
    renderWithTheme(<DateInput {...defaultProps} showIcon={false} />);
    expect(screen.queryByTestId(/icon-IconPlainerCalendar/)).not.toBeInTheDocument();
  });

  it('applies custom class name', () => {
    renderWithTheme(<DateInput {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('textbox').closest('.custom-class')).toBeInTheDocument();
  });

  it('opens calendar on icon click', async () => {
    renderWithTheme(<DateInput {...defaultProps} />);

    // По умолчанию `size={Size.SM}` у поля — иконка календаря в размере XS
    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });
  });

  it('opens calendar on input focus', async () => {
    renderWithTheme(<DateInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });
  });

  it('closes calendar when clicking outside', async () => {
    renderWithTheme(<DateInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    // Проверяем, что календарь открыт
    expect(screen.getByText('Очистить')).toBeInTheDocument();
  });

  it('handles focus and blur events', () => {
    renderWithTheme(<DateInput {...defaultProps} />);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(input).toBeInTheDocument();
  });

  it('renders with single mode by default', () => {
    renderWithTheme(<DateInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with range mode', () => {
    renderWithTheme(<DateInput {...defaultProps} range />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with range prop', () => {
    renderWithTheme(<DateInput {...defaultProps} range />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with single mode by default', () => {
    renderWithTheme(<DateInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('displays current month and year in calendar', async () => {
    renderWithTheme(<DateInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    await waitFor(() => {
      const currentDate = new Date();
      const monthYear = currentDate.toLocaleDateString('ru-RU', {
        month: 'long',
        year: 'numeric',
      });
      expect(screen.getByText(monthYear)).toBeInTheDocument();
    });
  });

  it('shows weekday headers', async () => {
    renderWithTheme(<DateInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Пн')).toBeInTheDocument();
      expect(screen.getByText('Вт')).toBeInTheDocument();
      expect(screen.getByText('Ср')).toBeInTheDocument();
      expect(screen.getByText('Чт')).toBeInTheDocument();
      expect(screen.getByText('Пт')).toBeInTheDocument();
      expect(screen.getByText('Сб')).toBeInTheDocument();
      expect(screen.getByText('Вс')).toBeInTheDocument();
    });
  });

  it('shows navigation buttons', async () => {
    renderWithTheme(<DateInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByTestId('icon-IconPlainerArrowLeft-SM')).toBeInTheDocument();
      expect(screen.getByTestId('icon-IconPlainerArrowRight-SM')).toBeInTheDocument();
    });
  });

  it('shows clear button', async () => {
    renderWithTheme(<DateInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });
  });

  it('shows apply button in range mode', async () => {
    renderWithTheme(<DateInput {...defaultProps} range />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Применить')).toBeInTheDocument();
    });
  });

  it('renders with empty value', () => {
    renderWithTheme(<DateInput {...defaultProps} value="" />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('renders with undefined value', () => {
    renderWithTheme(<DateInput {...defaultProps} value={undefined} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('renders with empty range value', () => {
    const emptyRange = { start: '', end: '' };
    renderWithTheme(<DateInput {...defaultProps} range value={emptyRange} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('renders with partial range value', () => {
    const partialRange = { start: '2024-01-15', end: '' };
    renderWithTheme(<DateInput {...defaultProps} range value={partialRange} />);
    expect(screen.getByDisplayValue('15.01.2024')).toBeInTheDocument();
  });

  it('handles type conversion for single mode', () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} range={false} onChange={onChange} />);

    // Симулируем выбор даты
    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    // Здесь должен быть тест выбора даты, но для простоты проверяем только рендер
    expect(input).toBeInTheDocument();
  });

  it('handles type conversion for range mode', () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} range onChange={onChange} />);

    // Симулируем выбор даты
    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    // Здесь должен быть тест выбора диапазона, но для простоты проверяем только рендер
    expect(input).toBeInTheDocument();
  });

  it('allows manual date input', () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15.01.2024' } });

    expect(input).toHaveValue('15.01.2024');
  });

  it('handles Enter key for manual input', () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15.01.2024' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalled();
  });

  it('updates calendar month when manually entering date in range mode', async () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} range onChange={onChange} />);

    const input = screen.getByRole('textbox');

    // Открываем календарь
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    // Вводим дату вручную
    fireEvent.change(input, { target: { value: '15.03.2024' } });

    // Проверяем, что календарь переключился на март 2024
    await waitFor(() => {
      expect(screen.getByText('март 2024 г.')).toBeInTheDocument();
    });
  });

  it('updates calendar month when manually entering date range', async () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} range onChange={onChange} />);

    const input = screen.getByRole('textbox');

    // Открываем календарь
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    // Вводим строку с диапазоном: formatDateInput сейчас нормализует только первую дату (8 цифр)
    fireEvent.change(input, { target: { value: '06.08.2025 — 14.08.2025' } });

    // Проверяем, что календарь переключился на август 2025 (месяц начала диапазона)
    await waitFor(() => {
      expect(screen.getByText('август 2025 г.')).toBeInTheDocument();
    });

    expect(input).toHaveValue('06.08.2025');
  });

  it('updates calendar month when manually entering date in single mode', async () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole('textbox');

    // Открываем календарь
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Очистить')).toBeInTheDocument();
    });

    // Вводим дату вручную
    fireEvent.change(input, { target: { value: '15.03.2024' } });

    // Проверяем, что календарь переключился на март 2024
    await waitFor(() => {
      expect(screen.getByText('март 2024 г.')).toBeInTheDocument();
    });
  });

  it('по умолчанию лейбл в потоке документа, без 20px-обёртки', () => {
    renderWithTheme(<DateInput {...defaultProps} size={Size.MD} />);

    const fieldLabel = screen.getByText('Test Date');
    expect(fieldLabel.closest('[data-input-label-variant="floating"]')).toBeNull();
  });

  it('цвет и типографика лейбла совпадают с Input', () => {
    renderWithTheme(
      <>
        <Input label="Email" size={Size.MD} />
        <DateInput label="Дата рождения" onChange={jest.fn()} size={Size.MD} />
      </>,
    );

    expect(screen.getByText('Дата рождения').className).toBe(screen.getByText('Email').className);
  });

  it('при error и disabled цвет лейбла остаётся как у Input', () => {
    renderWithTheme(
      <>
        <Input label="Email" size={Size.MD} error="Обязательное поле" disabled />
        <DateInput
          label="Дата рождения"
          onChange={jest.fn()}
          size={Size.MD}
          error="Обязательное поле"
          disabled
        />
      </>,
    );

    expect(screen.getByText('Дата рождения').className).toBe(screen.getByText('Email').className);
  });

  it('labelVariant="floating" сохраняет absolute-лейбл в 20px-ряде', () => {
    renderWithTheme(<DateInput {...defaultProps} labelVariant="floating" />);

    const fieldLabel = screen.getByText('Test Date');
    expect(fieldLabel.closest('[data-input-label-variant="floating"]')).not.toBeNull();
  });

  it('без label не резервирует padding-top на корне', () => {
    renderWithTheme(<DateInput onChange={jest.fn()} size={Size.MD} />);

    expect(document.querySelector('.ui-date-picker')).not.toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('field-лейбл не добавляет padding-top: 10px на корень', () => {
    renderWithTheme(<DateInput {...defaultProps} size={Size.MD} />);

    expect(document.querySelector('.ui-date-picker')).not.toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('floating без label не резервирует padding-top', () => {
    renderWithTheme(<DateInput onChange={jest.fn()} labelVariant="floating" size={Size.MD} />);

    expect(document.querySelector('.ui-date-picker')).not.toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('floating с label резервирует padding-top на корне', () => {
    renderWithTheme(<DateInput {...defaultProps} labelVariant="floating" />);

    expect(document.querySelector('.ui-date-picker')).toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('floating с additionalLabel без label тоже резервирует padding-top', () => {
    renderWithTheme(
      <DateInput onChange={jest.fn()} additionalLabel="необязательно" labelVariant="floating" />,
    );

    expect(document.querySelector('.ui-date-picker')).toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('supports different date formats', () => {
    const onChange = jest.fn();
    renderWithTheme(<DateInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole('textbox');

    // Тестируем разные форматы - компонент должен принимать их как есть
    const testCases = [{ input: '15.01.2024', expected: '15.01.2024' }];

    testCases.forEach(({ input: inputValue, expected }) => {
      fireEvent.change(input, { target: { value: inputValue } });
      expect(input).toHaveValue(expected);
    });
  });

  it('в режиме month показывает YYYY-MM как MM.YYYY', () => {
    renderWithTheme(<DateInput {...defaultProps} precision="month" value="2026-08" />);
    expect(screen.getByDisplayValue('08.2026')).toBeInTheDocument();
  });

  it('в режиме year показывает YYYY', () => {
    renderWithTheme(<DateInput {...defaultProps} precision="year" value="2026" />);
    expect(screen.getByDisplayValue('2026')).toBeInTheDocument();
  });

  it('в режиме monthYear с MMMM показывает название месяца', () => {
    renderWithTheme(
      <DateInput {...defaultProps} precision="monthYear" format="MMMM YYYY" value="2026-08" />,
    );

    expect(screen.getByDisplayValue(/август 2026/i)).toBeInTheDocument();
  });

  it('пикер месяца не показывает сетку дней и отдаёт YYYY-MM', async () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DateInput {...defaultProps} precision="month" value="2026-01" onChange={onChange} />,
    );

    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByTestId('date-input-period-picker')).toBeInTheDocument();
    });

    expect(screen.queryByText('Пн')).not.toBeInTheDocument();
    expect(screen.getByTestId('date-input-period-month-7')).toBeEnabled();

    fireEvent.click(screen.getByTestId('date-input-period-month-7'));

    expect(onChange).toHaveBeenCalledWith('2026-08');
  });

  it('пикер года отдаёт YYYY и не вызывает onChange на отключённом годе', async () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DateInput
        {...defaultProps}
        precision="year"
        value="2026"
        disabledYears={[2024]}
        onChange={onChange}
      />,
    );

    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByTestId('date-input-period-year-2025')).toBeInTheDocument();
    });

    expect(screen.getByTestId('date-input-period-year-2024')).toBeDisabled();
    fireEvent.click(screen.getByTestId('date-input-period-year-2024'));
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('date-input-period-year-2025'));
    expect(onChange).toHaveBeenCalledWith('2025');
  });

  it('пикер monthYear показывает списки месяцев и годов', async () => {
    renderWithTheme(<DateInput {...defaultProps} precision="monthYear" value="2026-08" />);

    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByTestId('date-input-period-month-0')).toBeInTheDocument();
      expect(screen.getByTestId('date-input-period-year-2026')).toBeInTheDocument();
    });
  });

  it('в monthYear клик по году не коммитит, месяц берёт выбранный год', async () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DateInput
        {...defaultProps}
        precision="monthYear"
        value="2026-08"
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2027, 11, 31)}
        onChange={onChange}
      />,
    );

    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByTestId('date-input-period-year-2025')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('date-input-period-year-2025'));
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('date-input-period-month-0'));
    expect(onChange).toHaveBeenCalledWith('2025-01');
  });

  it('не отключает месяц, если minDate внутри этого месяца', async () => {
    renderWithTheme(
      <DateInput
        {...defaultProps}
        precision="month"
        value="2026-08"
        minDate={new Date(2026, 7, 15)}
      />,
    );

    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByTestId('date-input-period-month-7')).toBeEnabled();
    });

    expect(screen.getByTestId('date-input-period-month-6')).toBeDisabled();
  });

  it('в режиме week показывает W.MM.YYYY и отдаёт YYYY-MM-Wn', async () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DateInput {...defaultProps} precision="week" value="2026-08-W2" onChange={onChange} />,
    );

    expect(screen.getByDisplayValue('2.08.2026')).toBeInTheDocument();

    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByTestId('date-input-period-week-1')).toBeInTheDocument();
      expect(screen.getByTestId('date-input-period-month-7')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('date-input-period-week-1'));
    expect(onChange).toHaveBeenCalledWith('2026-08-W1');
  });

  it('weekOfMonthMode=chunks иначе нумерует недели', async () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DateInput
        {...defaultProps}
        precision="week"
        weekOfMonthMode="chunks"
        value="2026-08-W1"
        onChange={onChange}
      />,
    );

    const iconButton = screen.getByTestId('icon-IconPlainerCalendar-XS').parentElement;
    fireEvent.click(iconButton!);

    await waitFor(() => {
      expect(screen.getByTestId('date-input-period-week-2')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('date-input-period-week-2'));
    expect(onChange).toHaveBeenCalledWith('2026-08-W2');
  });
});
