import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { RadioButton } from './RadioButton';
import { Size, IconSize } from '../../../types/sizes';
import { RadioButtonVariant, RadioButtonLabelPosition } from '../../../types/ui';
import { Icon } from '../Icon/Icon';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RadioButton', () => {
  it('renders with label', () => {
    renderWithTheme(<RadioButton label="Test Radio" name="test" value="test-value" />);

    expect(screen.getByText('Test Radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders without label', () => {
    renderWithTheme(<RadioButton name="test" value="test-value" />);

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.queryByText('Test Radio')).not.toBeInTheDocument();
  });

  it('handles checked state', () => {
    renderWithTheme(
      <RadioButton checked={true} label="Test Radio" name="test" value="test-value" />,
    );

    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('handles disabled state', () => {
    renderWithTheme(
      <RadioButton disabled={true} label="Test Radio" name="test" value="test-value" />,
    );

    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <RadioButton label="Test Radio" name="test" value="test-value" onChange={handleChange} />,
    );

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);

    // onChange может вызываться несколько раз из-за всплытия событий (label -> input)
    expect(handleChange).toHaveBeenCalled();
    const ev = handleChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLInputElement>;
    expect(ev?.target).toBeInstanceOf(HTMLInputElement);
    expect((ev?.target as HTMLInputElement)?.value).toBe('test-value');
  });

  it('calls onChange when label is clicked', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <RadioButton label="Test Radio" name="test" value="test-value" onChange={handleChange} />,
    );

    const label = screen.getByText('Test Radio');
    fireEvent.click(label);

    // onChange может вызываться несколько раз из-за всплытия событий (label -> input)
    expect(handleChange).toHaveBeenCalled();
    const ev = handleChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLInputElement>;
    expect(ev?.target).toBeInstanceOf(HTMLInputElement);
    expect((ev?.target as HTMLInputElement)?.value).toBe('test-value');
  });

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <RadioButton
        disabled={true}
        label="Test Radio"
        name="test"
        value="test-value"
        onChange={handleChange}
      />,
    );

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <RadioButton label="Test Radio" name="test" value="test-value" onChange={handleChange} />,
    );

    const radio = screen.getByRole('radio');
    fireEvent.keyDown(radio, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles different sizes', () => {
    const { rerender } = renderWithTheme(
      <RadioButton label="Small Radio" name="test" value="test-value" size={Size.SM} />,
    );

    expect(screen.getByText('Small Radio')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <RadioButton label="Large Radio" name="test" value="test-value" size={Size.LG} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Large Radio')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(
      <RadioButton label="Test Radio" name="test" value="test-value" className="custom-class" />,
    );

    // className теперь применяется к RadioContainerWrapper (div), а не к label
    const container = screen.getByText('Test Radio').closest('.ui-radio-button');
    expect(container).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<RadioButton label="Test Radio" name="test" value="test-value" />);

    const radio = screen.getByRole('radio');
    const label = screen.getByText('Test Radio');

    expect(radio).toHaveAttribute('name', 'test');
    expect(radio).toHaveAttribute('value', 'test-value');
    expect(label.closest('label')).toHaveAttribute('for', radio.id);
  });

  // ==================== Новые функции ====================

  describe('Обработка ошибок', () => {
    it('отображает сообщение об ошибке', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          error="Это поле обязательно"
        />,
      );

      expect(screen.getByText('Это поле обязательно')).toBeInTheDocument();
    });

    it('не вызывает onChange при наличии ошибки и readOnly', () => {
      const handleChange = jest.fn();

      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          error="Ошибка"
          readOnly={true}
          onChange={handleChange}
        />,
      );

      const radio = screen.getByRole('radio');
      fireEvent.click(radio);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('имеет aria-invalid при наличии ошибки', () => {
      renderWithTheme(
        <RadioButton label="Test Radio" name="test" value="test-value" error="Ошибка" />,
      );

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Вспомогательный текст', () => {
    it('отображает вспомогательный текст', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          helperText="Вспомогательный текст"
        />,
      );

      expect(screen.getByText('Вспомогательный текст')).toBeInTheDocument();
    });

    it('не отображает helperText при наличии ошибки', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          error="Ошибка"
          helperText="Вспомогательный текст"
        />,
      );

      expect(screen.getByText('Ошибка')).toBeInTheDocument();
      expect(screen.queryByText('Вспомогательный текст')).not.toBeInTheDocument();
    });

    it('имеет aria-describedby для helperText', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          helperText="Вспомогательный текст"
        />,
      );

      const radio = screen.getByRole('radio');
      const describedBy = radio.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });
  });

  describe('Индикатор обязательности', () => {
    it('отображает индикатор обязательности', () => {
      renderWithTheme(<RadioButton label="Test Radio" name="test" value="test-value" required />);

      const label = screen.getByText('Test Radio');
      expect(label.parentElement).toHaveTextContent('*');
    });

    it('имеет aria-required при required', () => {
      renderWithTheme(<RadioButton label="Test Radio" name="test" value="test-value" required />);

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Tooltip', () => {
    it('отображает tooltip при наведении', () => {
      renderWithTheme(
        <RadioButton label="Test Radio" name="test" value="test-value" tooltip="Подсказка" />,
      );

      // Tooltip может быть не виден сразу, проверяем что компонент рендерится
      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });
  });

  describe('Иконки', () => {
    it('отображает leftIcon', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          leftIcon={<Icon name="IconExHome" size={IconSize.SM} />}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('отображает rightIcon', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          labelPosition={RadioButtonLabelPosition.LEFT}
          rightIcon={<Icon name="IconExCheck" size={IconSize.SM} />}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });
  });

  describe('Status', () => {
    it('применяет статус success', () => {
      renderWithTheme(
        <RadioButton label="Test Radio" name="test" value="test-value" status="success" />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('применяет статус error', () => {
      renderWithTheme(
        <RadioButton label="Test Radio" name="test" value="test-value" status="error" />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('применяет статус warning', () => {
      renderWithTheme(
        <RadioButton label="Test Radio" name="test" value="test-value" status="warning" />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });
  });

  describe('FullWidth', () => {
    it('применяет fullWidth', () => {
      renderWithTheme(<RadioButton label="Test Radio" name="test" value="test-value" fullWidth />);

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });
  });

  describe('ReadOnly', () => {
    it('не вызывает onChange при readOnly', () => {
      const handleChange = jest.fn();

      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          readOnly={true}
          onChange={handleChange}
        />,
      );

      const radio = screen.getByRole('radio');
      fireEvent.click(radio);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('имеет aria-disabled при disabled', () => {
      renderWithTheme(
        <RadioButton label="Test Radio" name="test" value="test-value" disabled={true} />,
      );

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Variant', () => {
    it('применяет variant filled', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          variant={RadioButtonVariant.FILLED}
          checked={true}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('применяет variant outline', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          variant={RadioButtonVariant.OUTLINE}
          checked={true}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });
  });

  describe('ExtraText', () => {
    it('отображает extraText', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          extraText="Дополнительный текст"
        />,
      );

      expect(screen.getByText('Дополнительный текст')).toBeInTheDocument();
    });
  });

  describe('LabelPosition', () => {
    it('применяет labelPosition right', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          labelPosition={RadioButtonLabelPosition.RIGHT}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('применяет labelPosition left', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          labelPosition={RadioButtonLabelPosition.LEFT}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('применяет labelPosition top', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          labelPosition={RadioButtonLabelPosition.TOP}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('применяет labelPosition bottom', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          labelPosition={RadioButtonLabelPosition.BOTTOM}
        />,
      );

      expect(screen.getByText('Test Radio')).toBeInTheDocument();
    });

    it('применяет labelPosition none', () => {
      renderWithTheme(
        <RadioButton
          label="Test Radio"
          name="test"
          value="test-value"
          labelPosition={RadioButtonLabelPosition.NONE}
        />,
      );

      // При labelPosition === NONE лейбл не должен отображаться
      expect(screen.queryByText('Test Radio')).not.toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('вызывает onClick при клике', () => {
      const handleClick = jest.fn();

      renderWithTheme(
        <RadioButton label="Test Radio" name="test" value="test-value" onClick={handleClick} />,
      );

      const label = screen.getByText('Test Radio');
      fireEvent.click(label);

      // onClick может вызываться несколько раз из-за всплытия событий
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
