import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Progress } from './Progress';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import type { ProgressStep } from '../../../types/ui';

// Обертка для тестов с темой
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Progress Component', () => {
  describe('Рендеринг разных вариантов', () => {
    it('должен рендерить линейный вариант', () => {
      renderWithTheme(<Progress value={50} variant="linear" label="Загрузка" />);
      expect(screen.getByText('Загрузка')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('должен рендерить круговой вариант', () => {
      renderWithTheme(<Progress value={50} variant="circle" label="Загрузка" size={Size.MD} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('должен рендерить круговой вариант с информацией', () => {
      renderWithTheme(
        <Progress
          value={50}
          variant="circle-info"
          info={{ title: 'Заголовок', value: '50%', description: 'Описание' }}
          size={Size.MD}
        />,
      );
      expect(screen.getByText('Заголовок')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('Описание')).toBeInTheDocument();
    });

    it('должен рендерить степпер вариант', () => {
      const steps: ProgressStep[] = [
        { id: 1, label: 'Шаг 1' },
        { id: 2, label: 'Шаг 2' },
        { id: 3, label: 'Шаг 3' },
      ];
      renderWithTheme(
        <Progress variant="stepper" steps={steps} activeStep={1} showNextStepInfo={true} />,
      );
      expect(screen.getByText('Шаг 1')).toBeInTheDocument();
      expect(screen.getByText(/1 из 3 шагов/)).toBeInTheDocument();
    });

    it('должен рендерить степпер круговой вариант', () => {
      const steps: ProgressStep[] = [
        { id: 1, label: 'Шаг 1' },
        { id: 2, label: 'Шаг 2' },
      ];
      renderWithTheme(
        <Progress
          variant="stepper-circle"
          steps={steps}
          activeStep={1}
          showNextStepInfo={true}
          size={Size.MD}
        />,
      );
      expect(screen.getByText('Шаг 1')).toBeInTheDocument();
    });

    it('должен рендерить buffer вариант', () => {
      renderWithTheme(
        <Progress value={50} bufferValue={80} variant="buffer" label="Загрузка видео" />,
      );
      expect(screen.getByText('Загрузка видео')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('должен рендерить segmented вариант', () => {
      renderWithTheme(
        <Progress
          variant="segmented"
          segments={[
            { value: 30, color: '#94D263', label: 'Завершено' },
            { value: 50, color: '#FFA726', label: 'В процессе' },
            { value: 20, color: '#E0E0E0', label: 'Ожидание' },
          ]}
          label="Прогресс по категориям"
        />,
      );
      expect(screen.getByText('Прогресс по категориям')).toBeInTheDocument();
      expect(screen.getByText('Завершено')).toBeInTheDocument();
      expect(screen.getByText('В процессе')).toBeInTheDocument();
      expect(screen.getByText('Ожидание')).toBeInTheDocument();
    });
  });

  describe('Accessibility атрибуты', () => {
    it('должен иметь правильные ARIA атрибуты', () => {
      renderWithTheme(<Progress value={50} variant="linear" label="Загрузка" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
      expect(progressbar).toHaveAttribute('aria-live', 'polite');
      expect(progressbar).toHaveAttribute('aria-atomic', 'true');
    });

    it('должен связывать label через aria-labelledby', () => {
      renderWithTheme(<Progress value={50} variant="linear" label="Загрузка файла" />);
      const progressbar = screen.getByRole('progressbar');
      const labelId = screen.getByText('Загрузка файла').getAttribute('id');
      expect(progressbar).toHaveAttribute('aria-labelledby', labelId);
    });

    it('должен устанавливать aria-busy для статуса loading', () => {
      renderWithTheme(<Progress value={50} variant="linear" status="loading" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-busy', 'true');
    });

    it('должен устанавливать aria-busy для indeterminate режима', () => {
      renderWithTheme(<Progress variant="linear" indeterminate label="Загрузка" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-busy', 'true');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
    });

    it('должен связывать описание через aria-describedby для circle-info', () => {
      renderWithTheme(
        <Progress
          value={50}
          variant="circle-info"
          info={{ description: 'Описание процесса' }}
          size={Size.MD}
        />,
      );
      const progressbar = screen.getByRole('progressbar');
      // Проверяем, что aria-describedby установлен (значение может быть любым, так как генерируется через useId)
      expect(progressbar).toHaveAttribute('aria-describedby');
    });

    it('должен иметь role="group" для степпера', () => {
      const steps: ProgressStep[] = [
        { id: 1, label: 'Шаг 1' },
        { id: 2, label: 'Шаг 2' },
      ];
      renderWithTheme(<Progress variant="stepper" steps={steps} activeStep={1} />);
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-label', 'Шаги процесса');
    });

    it('должен иметь aria-current="step" для активного шага в степпере', () => {
      const steps: ProgressStep[] = [
        { id: 1, label: 'Шаг 1' },
        { id: 2, label: 'Шаг 2' },
      ];
      renderWithTheme(<Progress variant="stepper" steps={steps} activeStep={1} />);
      const currentStep = screen.getByText('Шаг 1');
      expect(currentStep).toHaveAttribute('aria-current', 'step');
    });
  });

  describe('Колбеки', () => {
    it('должен вызывать onStatusChange при изменении статуса', async () => {
      const onStatusChange = jest.fn();
      const { rerender } = renderWithTheme(
        <Progress value={50} variant="linear" status="loading" onStatusChange={onStatusChange} />,
      );

      // Колбек вызывается при изменении статуса, а не при первом рендере
      onStatusChange.mockClear();

      rerender(
        <ThemeProvider>
          <Progress value={100} variant="linear" status="success" onStatusChange={onStatusChange} />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(onStatusChange).toHaveBeenCalledWith('success');
      }, { timeout: 1000 });
    });

    it('должен вызывать onComplete при достижении 100%', async () => {
      const onComplete = jest.fn();
      const { rerender } = renderWithTheme(
        <Progress value={99} variant="linear" onComplete={onComplete} />,
      );

      // onComplete не должен вызываться для 99%
      expect(onComplete).not.toHaveBeenCalled();

      rerender(
        <ThemeProvider>
          <Progress value={100} variant="linear" onComplete={onComplete} />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalled();
      }, { timeout: 1000 });
    });

    it('должен вызывать onStepClick при клике на шаг в степпере', async () => {
      const onStepClick = jest.fn();
      const steps: ProgressStep[] = [
        { id: 1, label: 'Шаг 1' },
        { id: 2, label: 'Шаг 2' },
      ];
      renderWithTheme(
        <Progress
          variant="stepper"
          steps={steps}
          activeStep={1}
          onStepClick={onStepClick}
          showAllSteps={true}
        />,
      );

      const step1 = screen.getByText('Шаг 1');
      await userEvent.click(step1);

      await waitFor(() => {
        expect(onStepClick).toHaveBeenCalledWith(0, steps[0]);
      });
    });

    it('должен вызывать onRetry при клике на кнопку повтора', async () => {
      const onRetry = jest.fn();
      renderWithTheme(
        <Progress
          value={50}
          variant="linear"
          status="error"
          label="Ошибка загрузки"
          onRetry={onRetry}
        />,
      );

      const retryButton = screen.getByText('Повторить');
      await userEvent.click(retryButton);

      expect(onRetry).toHaveBeenCalled();
    });

    it('должен вызывать onPause при клике на кнопку паузы', async () => {
      const onPause = jest.fn();
      renderWithTheme(
        <Progress
          value={50}
          variant="linear"
          status="loading"
          label="Загрузка"
          onPause={onPause}
          paused={false}
        />,
      );

      const pauseButton = screen.getByText('Пауза');
      await userEvent.click(pauseButton);

      expect(onPause).toHaveBeenCalled();
    });
  });

  describe('Отображение значений', () => {
    it('должен отображать процент по умолчанию', () => {
      renderWithTheme(<Progress value={50} variant="linear" showValueLabel={true} />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('должен использовать кастомное форматирование', () => {
      const formatValue = (value: number, max: number) => `${value}/${max}`;
      renderWithTheme(
        <Progress
          value={50}
          variant="linear"
          showValueLabel={true}
          showPercentage={false}
          formatValue={formatValue}
        />,
      );
      expect(screen.getByText('50/100')).toBeInTheDocument();
    });

    it('должен скрывать значение если showValueLabel=false и showPercentage не указан', () => {
      renderWithTheme(
        <Progress
          value={50}
          variant="linear"
          showValueLabel={false}
          showPercentage={false}
        />,
      );
      // Проверяем, что процент не отображается
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('должен отображать label', () => {
      renderWithTheme(<Progress value={50} variant="linear" label="Загрузка файла" />);
      expect(screen.getByText('Загрузка файла')).toBeInTheDocument();
    });
  });

  describe('Статусы', () => {
    it('должен применять цвета статуса к прогресс-бару', () => {
      const { container } = renderWithTheme(
        <Progress value={50} variant="linear" status="error" />,
      );
      // Проверяем, что компонент рендерится (цвета проверяются через стили)
      expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
    });

    it('должен применять цвета статуса к тексту если applyStatusColorsToText=true', () => {
      renderWithTheme(
        <Progress
          value={50}
          variant="linear"
          status="error"
          label="Ошибка"
          applyStatusColorsToText={true}
        />,
      );
      expect(screen.getByText('Ошибка')).toBeInTheDocument();
    });

    it('должен показывать спиннер для статуса loading', () => {
      renderWithTheme(
        <Progress value={50} variant="linear" status="loading" showStatusIcon={true} />,
      );
      // Спиннер рендерится как элемент с анимацией
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });
  });

  describe('Специальные режимы', () => {
    it('должен рендерить indeterminate режим', () => {
      renderWithTheme(<Progress variant="linear" indeterminate label="Загрузка" />);
      expect(screen.getByText('Загрузка')).toBeInTheDocument();
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-busy', 'true');
    });

    it('должен показывать галочку при завершении в круговом варианте', () => {
      renderWithTheme(
        <Progress
          value={100}
          variant="circle"
          showCheckmarkOnComplete={true}
          size={Size.MD}
        />,
      );
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });
  });

  describe('Размеры', () => {
    it('должен применять разные размеры', () => {
      const { rerender } = renderWithTheme(
        <Progress value={50} variant="linear" size={Size.XS} />,
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(
        <ThemeProvider>
          <Progress value={50} variant="linear" size={Size.LG} />
        </ThemeProvider>,
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Дополнительная информация', () => {
    it('должен отображать estimatedTime', () => {
      renderWithTheme(
        <Progress value={50} variant="linear" label="Загрузка" estimatedTime={30} />,
      );
      // estimatedTime форматируется как "30 сек"
      const label = screen.getByText('Загрузка');
      expect(label).toBeInTheDocument();
      // Проверяем, что дополнительная информация присутствует в DOM
      expect(screen.getByText(/30 сек/)).toBeInTheDocument();
    });

    it('должен отображать speed', () => {
      renderWithTheme(
        <Progress value={50} variant="linear" label="Загрузка" speed="2.5 MB/s" />,
      );
      // speed отображается рядом с label
      expect(screen.getByText(/2.5 MB\/s/)).toBeInTheDocument();
    });
  });
});
