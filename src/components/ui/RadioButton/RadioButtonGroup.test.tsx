import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { RadioButtonGroup } from './RadioButtonGroup';
import { RadioButtonGroupOrientation, RadioButtonVariant } from '../../../types/ui';
import { Size, IconSize } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import type { RadioButtonGroupOption } from '../../../types/ui';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

const basicOptions: RadioButtonGroupOption[] = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' },
];

describe('RadioButtonGroup', () => {
  describe('Базовое использование', () => {
    it('рендерит группу радиокнопок', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Выберите опцию"
        />,
      );

      expect(screen.getByText('Выберите опцию')).toBeInTheDocument();
      expect(screen.getByText('Опция 1')).toBeInTheDocument();
      expect(screen.getByText('Опция 2')).toBeInTheDocument();
      expect(screen.getByText('Опция 3')).toBeInTheDocument();
    });

    it('рендерит группу без лейбла', () => {
      renderWithTheme(
        <RadioButtonGroup options={basicOptions} value="option1" onChange={() => {}} />,
      );

      expect(screen.queryByText('Выберите опцию')).not.toBeInTheDocument();
      expect(screen.getByText('Опция 1')).toBeInTheDocument();
    });

    it('выбирает правильную опцию по value', () => {
      renderWithTheme(
        <RadioButtonGroup options={basicOptions} value="option2" onChange={() => {}} />,
      );

      const radio1 = screen.getByRole('radio', { name: 'Опция 1' });
      const radio2 = screen.getByRole('radio', { name: 'Опция 2' });
      const radio3 = screen.getByRole('radio', { name: 'Опция 3' });

      expect(radio1).not.toBeChecked();
      expect(radio2).toBeChecked();
      expect(radio3).not.toBeChecked();
    });
  });

  describe('Обработка ошибок', () => {
    it('отображает общую ошибку группы', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value=""
          onChange={() => {}}
          label="Выберите опцию"
          error="Пожалуйста, выберите одну из опций"
        />,
      );

      expect(screen.getByText('Пожалуйста, выберите одну из опций')).toBeInTheDocument();
    });

    it('отображает индивидуальные ошибки для каждой опции', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value=""
          onChange={() => {}}
          label="Выберите опцию"
          error={['Ошибка для опции 1', '', 'Ошибка для опции 3']}
        />,
      );

      expect(screen.getByText('Ошибка для опции 1')).toBeInTheDocument();
      expect(screen.getByText('Ошибка для опции 3')).toBeInTheDocument();
    });

    it('не отображает helperText при наличии ошибки', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Выберите опцию"
          error="Ошибка"
          helperText="Вспомогательный текст"
        />,
      );

      expect(screen.getByText('Ошибка')).toBeInTheDocument();
      expect(screen.queryByText('Вспомогательный текст')).not.toBeInTheDocument();
    });
  });

  describe('Вспомогательный текст', () => {
    it('отображает вспомогательный текст', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Выберите опцию"
          helperText="Вспомогательный текст для группы"
        />,
      );

      expect(screen.getByText('Вспомогательный текст для группы')).toBeInTheDocument();
    });
  });

  describe('Индикатор обязательности', () => {
    it('отображает индикатор обязательности в лейбле группы', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Обязательная группа"
          required
        />,
      );

      const label = screen.getByText('Обязательная группа');
      expect(label.parentElement).toHaveTextContent('*');
    });

    it('имеет aria-required при required', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Группа"
          required
        />,
      );

      const group = screen.getByRole('radiogroup');
      expect(group).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Ориентация', () => {
    it('применяет горизонтальную ориентацию', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          orientation={RadioButtonGroupOrientation.HORIZONTAL}
        />,
      );

      expect(screen.getByText('Опция 1')).toBeInTheDocument();
    });

    it('применяет вертикальную ориентацию', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          orientation={RadioButtonGroupOrientation.VERTICAL}
        />,
      );

      expect(screen.getByText('Опция 1')).toBeInTheDocument();
    });
  });

  describe('Disabled и ReadOnly', () => {
    it('отключает всю группу при disabled', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          disabled={true}
        />,
      );

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });

    it('делает группу readOnly', () => {
      const handleChange = jest.fn();

      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={handleChange}
          readOnly={true}
        />,
      );

      const radio = screen.getByRole('radio', { name: 'Опция 2' });
      fireEvent.click(radio);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('имеет aria-disabled при disabled', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          disabled={true}
        />,
      );

      const group = screen.getByRole('radiogroup');
      expect(group).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('onChange и onClick', () => {
    it('вызывает onChange при изменении значения', () => {
      const handleChange = jest.fn();

      renderWithTheme(
        <RadioButtonGroup options={basicOptions} value="option1" onChange={handleChange} />,
      );

      const radio2 = screen.getByRole('radio', { name: 'Опция 2' });
      fireEvent.click(radio2);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('вызывает onClick при клике на опцию', () => {
      const handleClick = jest.fn();

      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          onClick={handleClick}
        />,
      );

      const label2 = screen.getByText('Опция 2');
      fireEvent.click(label2);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith('option2', basicOptions[1]);
    });
  });

  describe('Размеры и варианты', () => {
    it('применяет размер к радиокнопкам', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          size={Size.LG}
        />,
      );

      expect(screen.getByText('Опция 1')).toBeInTheDocument();
    });

    it('применяет вариант к радиокнопкам', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          variant={RadioButtonVariant.OUTLINE}
        />,
      );

      expect(screen.getByText('Опция 1')).toBeInTheDocument();
    });
  });

  describe('FullWidth', () => {
    it('применяет fullWidth', () => {
      renderWithTheme(
        <RadioButtonGroup options={basicOptions} value="option1" onChange={() => {}} fullWidth />,
      );

      expect(screen.getByText('Опция 1')).toBeInTheDocument();
    });
  });

  describe('Доступность', () => {
    it('имеет role="radiogroup"', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Группа"
        />,
      );

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('имеет aria-labelledby для связи с лейблом', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Группа"
        />,
      );

      const group = screen.getByRole('radiogroup');
      const labelledBy = group.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
    });

    it('имеет aria-describedby для связи с ошибками/подсказками', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          label="Группа"
          helperText="Вспомогательный текст"
        />,
      );

      const group = screen.getByRole('radiogroup');
      const describedBy = group.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });
  });

  describe('Сложные опции', () => {
    it('обрабатывает опции с extraText', () => {
      const optionsWithExtraText: RadioButtonGroupOption[] = [
        { value: 'plan1', label: 'Базовый план', extraText: 'Бесплатно' },
        { value: 'plan2', label: 'Профессиональный план', extraText: '990₽/месяц' },
      ];

      renderWithTheme(
        <RadioButtonGroup options={optionsWithExtraText} value="plan1" onChange={() => {}} />,
      );

      expect(screen.getByText('Базовый план')).toBeInTheDocument();
      expect(screen.getByText('Бесплатно')).toBeInTheDocument();
      expect(screen.getByText('Профессиональный план')).toBeInTheDocument();
      expect(screen.getByText('990₽/месяц')).toBeInTheDocument();
    });

    it('обрабатывает опции с иконками', () => {
      const optionsWithIcons: RadioButtonGroupOption[] = [
        {
          value: 'option1',
          label: 'Опция 1',
          leftIcon: <Icon name="IconExHome" size={IconSize.SM} />,
        },
        {
          value: 'option2',
          label: 'Опция 2',
          leftIcon: <Icon name="IconExStar" size={IconSize.SM} />,
        },
      ];

      renderWithTheme(
        <RadioButtonGroup options={optionsWithIcons} value="option1" onChange={() => {}} />,
      );

      expect(screen.getByText('Опция 1')).toBeInTheDocument();
      expect(screen.getByText('Опция 2')).toBeInTheDocument();
    });
  });

  describe('Генерация имени группы', () => {
    it('использует переданное имя', () => {
      renderWithTheme(
        <RadioButtonGroup
          options={basicOptions}
          value="option1"
          onChange={() => {}}
          name="custom-name"
        />,
      );

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('name', 'custom-name');
      });
    });

    it('генерирует уникальное имя, если не указано', () => {
      renderWithTheme(
        <RadioButtonGroup options={basicOptions} value="option1" onChange={() => {}} />,
      );

      const radios = screen.getAllByRole('radio');
      const name = radios[0].getAttribute('name');
      expect(name).toBeTruthy();
      expect(name).toContain('radio-group-');

      // Все радиокнопки должны иметь одно и то же имя
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('name', name);
      });
    });
  });
});
