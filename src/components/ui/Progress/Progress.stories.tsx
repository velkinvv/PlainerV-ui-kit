import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Progress, useProgress, useStepper } from './';
import { Size } from '../../../types/sizes';
import type { ProgressStep } from '../../../types/ui';
import { DOC_PROGRESS } from '@/components/ui/storyDocs/uiKitDocs';
import { progressStoriesStyles } from './Progress.stories.styles';

const meta: Meta<typeof Progress> = {
  title: 'UI Kit/Data Display/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_PROGRESS,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    value: 64,
    variant: 'linear',
    showValueLabel: true,
    label: 'Выполнение задачи',
    onStatusChange: fn(),
    onComplete: fn(),
    onStepClick: fn(),
    onRetry: fn(),
    onPause: fn(),
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'linear',
        'circle',
        'circle-info',
        'stepper',
        'stepper-circle',
        'buffer',
        'segmented',
      ],
      description: 'Тип прогресс-бара',
      table: {
        type: {
          summary: 'linear, circle, circle-info, stepper, stepper-circle, buffer или segmented',
        },
      },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Текущее значение (0-100)',
      table: {
        type: { summary: 'number (доля заполнения при max по умолчанию 100)' },
      },
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Максимальное значение, используемое для расчёта процента',
      table: { type: { summary: 'number' } },
    },
    size: {
      control: { type: 'select' },
      options: [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Размер прогресс-бара (высота для линейного, диаметр для кругового)',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    thickness: {
      control: { type: 'number', min: 4, max: 20, step: 1 },
      description: 'Толщина штриха для кругового варианта',
    },
    circleSize: {
      control: { type: 'number', min: 80, max: 240, step: 10 },
      description: 'Диаметр кругового прогресса',
    },
    showValueLabel: {
      control: { type: 'boolean' },
      description: 'Отображать подпись со значением для линейного варианта',
    },
    label: {
      control: { type: 'text' },
      description: 'Подпись/название прогресс-бара',
    },
    trackColor: {
      control: { type: 'color' },
      description: 'Кастомный цвет трека',
    },
    progressColor: {
      control: { type: 'color' },
      description: 'Кастомный цвет прогресса',
    },
    info: {
      control: false,
      description: 'Блок дополнительной информации (используется в circle-info)',
    },
    showCheckmarkOnComplete: {
      control: { type: 'boolean' },
      description: 'Показывать галочку при завершении загрузки (100%) в круговом варианте',
    },
    status: {
      control: { type: 'select' },
      options: ['await', 'loading', 'success', 'error'],
      description:
        'Состояние прогресса; допустимые значения: `await` (ожидание), `loading` (загрузка), `success` (успех), `error` (ошибка)',
      table: {
        type: { summary: 'await, loading, success или error' },
      },
    },
    applyStatusColorsToText: {
      control: { type: 'boolean' },
      description:
        'Применять цвета статуса к тексту (тайтл и проценты). Если false, текст использует стандартные цвета из темы',
    },
    onStatusChange: {
      control: false,
      description: 'Колбек, вызываемый при изменении статуса',
      table: {
        type: {
          summary: '(status: await, loading, success или error) => void',
        },
      },
    },
    onComplete: {
      control: false,
      description: 'Колбек, вызываемый при достижении 100% прогресса',
      table: {
        type: { summary: '() => void' },
      },
    },
    indeterminate: {
      control: { type: 'boolean' },
      description:
        'Включить неопределенный режим прогресса (бесконечная анимация без конкретного значения)',
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Включить анимации для изменения значения и цвета',
    },
    animationDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Длительность анимации в миллисекундах',
    },
    customStatusIcon: {
      control: false,
      description: 'Кастомная иконка для статуса (вместо стандартной галочки при завершении)',
    },
    showStatusIcon: {
      control: { type: 'boolean' },
      description: 'Показывать иконку статуса',
    },
    statusLabels: {
      control: false,
      description: 'Кастомные тексты статусов',
    },
    estimatedTime: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Оставшееся время до завершения (в секундах)',
    },
    speed: {
      control: { type: 'text' },
      description: 'Скорость прогресса (например, "2.5 MB/s")',
    },
    trackClassName: {
      control: { type: 'text' },
      description: 'Класс для стилизации трека',
    },
    fillClassName: {
      control: { type: 'text' },
      description: 'Класс для стилизации заливки',
    },
    style: {
      control: false,
      description: 'Inline стили для корневого элемента',
    },
    onStepClick: {
      control: false,
      description: 'Колбек, вызываемый при клике на шаг в степпере',
      table: {
        type: { summary: '(stepIndex: number) => void' },
      },
    },
    showGradient: {
      control: { type: 'boolean' },
      description: 'Показывать градиент для прогресс-бара',
    },
    showPercentage: {
      control: { type: 'boolean' },
      description:
        'Показывать процент отдельно от значения (для более гибкого управления отображением)',
    },
    bufferValue: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Значение буфера для варианта buffer (0-100)',
    },
    onRetry: {
      control: false,
      description: 'Колбек для повтора при ошибке',
      table: {
        type: { summary: '() => void' },
      },
    },
    onPause: {
      control: false,
      description: 'Колбек для паузы/возобновления',
      table: {
        type: { summary: '() => void' },
      },
    },
    paused: {
      control: { type: 'boolean' },
      description: 'Состояние паузы',
    },
    segments: {
      control: false,
      description: 'Сегменты для варианта segmented. Массив объектов с value (0-100) и color',
    },
    showAllSteps: {
      control: { type: 'boolean' },
      description: 'Показывать все шаги одновременно в степпере (не только текущий и следующий)',
    },
    stepperOrientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Ориентация степпера: horizontal (по умолчанию) или vertical',
      table: {
        type: { summary: 'horizontal или vertical' },
      },
    },
    steps: {
      control: false,
      description: 'Массив шагов для варианта stepper',
    },
    activeStep: {
      control: { type: 'number', min: 0 },
      description: 'Индекс активного шага (начинается с 0)',
    },
    showNextStepInfo: {
      control: { type: 'boolean' },
      description: 'Показывать информацию о следующем шаге и текущей позиции',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  args: {
    variant: 'linear',
    value: 55,
    showValueLabel: true,
  },
  render: (args) => (
    <div style={progressStoriesStyles.paddedCard}>
      <Progress {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Линейный прогресс. Для светлого и тёмного фона используется один компонент — меняются цвет подложки и трека через пропы.',
      },
    },
  },
};

export const LinearWithLabel: Story = {
  args: {
    variant: 'linear',
    value: 72,
    label: 'Готовность дизайна',
    showValueLabel: true,
  },
  render: (args) => (
    <div style={progressStoriesStyles.paddedCard}>
      <Progress {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Тот же компонент, но с подписью. Для тёмного фона можно подобрать подходящий `trackColor`.',
      },
    },
  },
};

export const Circular: Story = {
  args: {
    variant: 'circle',
    value: 78,
    label: 'Спринт 12',
    size: Size.MD,
  },
};

export const CircularWithInfo: Story = {
  args: {
    variant: 'circle-info',
    value: 84,
    size: Size.MD,
    info: {
      title: 'OKR: Выручка',
      description: '8 из 10 инициатив завершено',
    },
  },
};

export const CircularWithCheckmark: Story = {
  args: {
    variant: 'circle',
    value: 100,
    size: Size.MD,
    label: 'Загрузка завершена',
    showCheckmarkOnComplete: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Круговой прогресс с галочкой при завершении. Когда прогресс достигает 100%, круг заполняется полностью и отображается зеленая галочка вместо процентов.',
      },
    },
  },
};

export const AwaitState: Story = {
  args: {
    variant: 'linear',
    value: 0,
    label: 'Ожидание загрузки',
    status: 'await',
  },
  parameters: {
    docs: {
      description: {
        story: 'Прогресс в состоянии ожидания. Используется серый цвет из темы.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'linear',
    value: 45,
    label: 'Ошибка загрузки',
    status: 'error',
    applyStatusColorsToText: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Прогресс в состоянии ошибки с применением цветов статуса к тексту. Прогресс-бар, тайтл и проценты отображаются красным цветом из темы.',
      },
    },
  },
};

export const ErrorStateWithoutTextColors: Story = {
  args: {
    variant: 'linear',
    value: 45,
    label: 'Ошибка загрузки',
    status: 'error',
    applyStatusColorsToText: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Прогресс в состоянии ошибки без применения цветов статуса к тексту. Только прогресс-бар красный, тайтл и проценты используют стандартные цвета.',
      },
    },
  },
};

export const ErrorStateCircular: Story = {
  args: {
    variant: 'circle',
    value: 60,
    label: 'Ошибка',
    size: Size.MD,
    status: 'error',
    applyStatusColorsToText: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Круговой прогресс в состоянии ошибки с применением цветов статуса к тексту. Круг и текст отображаются красным цветом из темы.',
      },
    },
  },
};

export const StepperLinear: Story = {
  args: {
    variant: 'stepper',
    steps: [
      { id: 1, label: 'Регистрация', description: 'Создание аккаунта' },
      { id: 2, label: 'Подтверждение', description: 'Подтверждение email' },
      { id: 3, label: 'Настройка', description: 'Настройка профиля' },
      { id: 4, label: 'Завершение', description: 'Готово!' },
    ],
    activeStep: 1,
    showNextStepInfo: true,
    size: Size.MD,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Линейный степпер делит прогресс на равные части по количеству шагов и заполняет их по мере перехода. Показывает текущий шаг и следующий шаг.',
      },
    },
  },
};

export const StepperWithoutInfo: Story = {
  args: {
    variant: 'stepper',
    steps: [
      { id: 1, label: 'Шаг 1' },
      { id: 2, label: 'Шаг 2' },
      { id: 3, label: 'Шаг 3' },
      { id: 4, label: 'Шаг 4' },
      { id: 5, label: 'Шаг 5' },
    ],
    activeStep: 2,
    showNextStepInfo: false,
    size: Size.MD,
  },
  parameters: {
    docs: {
      description: {
        story: 'Степпер без отображения информации о следующем шаге.',
      },
    },
  },
};

export const StepperAllSizes: Story = {
  render: () => {
    const steps = [
      { id: 1, label: 'Шаг 1' },
      { id: 2, label: 'Шаг 2' },
      { id: 3, label: 'Шаг 3' },
    ];
    return (
      <div style={progressStoriesStyles.sectionColumn24}>
        {Object.values(Size).map((size) => (
          <div key={size}>
            <p style={progressStoriesStyles.heading14}>Размер: {size}</p>
            <Progress variant="stepper" steps={steps} activeStep={1} size={size} />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Степпер во всех доступных размерах.',
      },
    },
  },
};

export const StepperCircular: Story = {
  args: {
    variant: 'stepper-circle',
    steps: [
      { id: 1, label: 'Регистрация', description: 'Создание аккаунта' },
      { id: 2, label: 'Подтверждение', description: 'Подтверждение email' },
      { id: 3, label: 'Настройка', description: 'Настройка профиля' },
      { id: 4, label: 'Завершение', description: 'Готово!' },
    ],
    activeStep: 1,
    showNextStepInfo: true,
    size: Size.MD,
    showValueLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Круговой степпер. Прогресс отображается в виде круга, показывает текущий шаг и следующий шаг.',
      },
    },
  },
};

export const StepperCircularAllSizes: Story = {
  render: () => {
    const steps = [
      { id: 1, label: 'Шаг 1' },
      { id: 2, label: 'Шаг 2' },
      { id: 3, label: 'Шаг 3' },
    ];
    return (
      <div style={progressStoriesStyles.sectionColumn24}>
        {Object.values(Size).map((size) => (
          <div key={size}>
            <p style={progressStoriesStyles.heading14}>Размер: {size}</p>
            <Progress variant="stepper-circle" steps={steps} activeStep={1} size={size} />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Круговой степпер во всех доступных размерах.',
      },
    },
  },
};

export const Indeterminate: Story = {
  args: {
    variant: 'linear',
    indeterminate: true,
    label: 'Загрузка...',
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Неопределенный режим прогресса. Используется когда точное значение прогресса неизвестно. Показывает бесконечную анимацию.',
      },
    },
  },
};

export const IndeterminateCircular: Story = {
  args: {
    variant: 'circle',
    indeterminate: true,
    label: 'Загрузка...',
    animated: true,
    size: Size.MD,
  },
  parameters: {
    docs: {
      description: {
        story: 'Неопределенный режим для кругового варианта.',
      },
    },
  },
};

export const OnComplete: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);

    React.useEffect(() => {
      if (value < 100) {
        const timer = setTimeout(() => setValue((prev) => prev + 10), 500);
        return () => clearTimeout(timer);
      }
    }, [value]);

    const handleComplete = fn(() => {
      setCompleted(true);
    });

    return (
      <div style={progressStoriesStyles.sectionColumn16}>
        <Progress
          value={value}
          label="Загрузка файла"
          onComplete={handleComplete}
          animated={true}
        />
        {completed && <p style={progressStoriesStyles.successText}>✓ Загрузка завершена!</p>}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования колбека `onComplete`. Колбек вызывается один раз при достижении 100% прогресса.',
      },
    },
  },
};

export const AnimatedProgress: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      if (value < 100) {
        const timer = setTimeout(() => setValue((prev) => prev + 5), 200);
        return () => clearTimeout(timer);
      }
    }, [value]);

    return (
      <div style={progressStoriesStyles.sectionColumn24}>
        <div>
          <p style={progressStoriesStyles.heading14}>
            С анимацией (по умолчанию)
          </p>
          <Progress value={value} label="С анимацией" animated={true} />
        </div>
        <div>
          <p style={progressStoriesStyles.heading14}>Без анимации</p>
          <Progress value={value} label="Без анимации" animated={false} />
        </div>
        <div>
          <p style={progressStoriesStyles.heading14}>
            Быстрая анимация (150ms)
          </p>
          <Progress
            value={value}
            label="Быстрая анимация"
            animated={true}
            animationDuration={150}
          />
        </div>
        <div>
          <p style={progressStoriesStyles.heading14}>
            Медленная анимация (1000ms)
          </p>
          <Progress
            value={value}
            label="Медленная анимация"
            animated={true}
            animationDuration={1000}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Примеры различных настроек анимации. Можно включать/отключать анимации и контролировать их скорость.',
      },
    },
  },
};

export const LoadingAnimation: Story = {
  args: {
    value: 50,
    variant: 'linear',
    status: 'loading',
    label: 'Загрузка данных',
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Анимация пульсации для статуса loading в линейном варианте. Прогресс-бар пульсирует, показывая активную загрузку.',
      },
    },
  },
};

export const LoadingAnimationCircular: Story = {
  args: {
    value: 50,
    variant: 'circle',
    status: 'loading',
    label: 'Загрузка',
    animated: true,
    size: Size.MD,
  },
  parameters: {
    docs: {
      description: {
        story: 'Анимация вращения для статуса loading в круговом варианте.',
      },
    },
  },
};

export const LoadingSpinner: Story = {
  render: () => {
    return (
      <div style={progressStoriesStyles.maxWidth500Column}>
        <div>
          <h3 style={progressStoriesStyles.heading14WithSpace}>
            Линейный вариант со спиннером
          </h3>
          <Progress
            value={65}
            variant="linear"
            status="loading"
            label="Загрузка файла"
            showStatusIcon={true}
            animated={true}
          />
          <p style={progressStoriesStyles.helperText}>
            Спиннер отображается справа от прогресс-бара при статусе loading
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading14WithSpace}>
            Круговой вариант со спиннером
          </h3>
          <Progress
            value={65}
            variant="circle"
            status="loading"
            label="Загрузка"
            showStatusIcon={true}
            animated={true}
            size={Size.MD}
          />
          <p style={progressStoriesStyles.helperText}>
            Спиннер отображается в центре круга при статусе loading (когда не показывается галочка и
            не indeterminate)
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading14WithSpace}>
            Спиннер скрыт (showStatusIcon=false)
          </h3>
          <Progress
            value={65}
            variant="linear"
            status="loading"
            label="Загрузка файла"
            showStatusIcon={false}
            animated={true}
          />
          <p style={progressStoriesStyles.helperText}>
            Спиннер можно скрыть, установив showStatusIcon в false
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Индикатор загрузки (spinner) отображается при статусе loading. В линейном варианте спиннер показывается справа от прогресс-бара, в круговом - в центре круга. Спиннер не отображается при indeterminate режиме или когда показывается галочка при завершении.',
      },
    },
  },
};

export const BestPractices: Story = {
  render: () => {
    return (
      <div style={progressStoriesStyles.maxWidth800Column}>
        <div>
          <h3 style={progressStoriesStyles.heading16}>1. Всегда используйте label для доступности</h3>
          <Progress value={45} variant="linear" label="Загрузка файла" />
          <p style={progressStoriesStyles.helperText}>
            Label помогает пользователям понять, что показывает прогресс-бар
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading16}>2. Используйте статусы для обратной связи</h3>
          <div style={progressStoriesStyles.sectionColumn12}>
            <Progress value={30} variant="linear" label="Ожидание" status="await" />
            <Progress value={60} variant="linear" label="Загрузка" status="loading" />
            <Progress value={100} variant="linear" label="Завершено" status="success" />
            <Progress value={50} variant="linear" label="Ошибка" status="error" />
          </div>
          <p style={progressStoriesStyles.helperText}>
            Статусы автоматически меняют цвет и помогают пользователю понять состояние процесса
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading16}>3. Используйте onStatusChange для отслеживания</h3>
          <Progress
            value={75}
            variant="linear"
            label="Синхронизация"
            status="loading"
            onStatusChange={fn((status: 'await' | 'loading' | 'success' | 'error') => {
              console.log('Статус изменился:', status);
            })}
          />
          <p style={progressStoriesStyles.helperText}>
            Колбек позволяет отслеживать изменения статуса и реагировать на них
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading16}>
            4. Используйте indeterminate для неизвестного прогресса
          </h3>
          <Progress variant="linear" label="Подключение..." indeterminate />
          <p style={progressStoriesStyles.helperText}>
            Когда точный прогресс неизвестен, используйте indeterminate режим
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading16}>5. Добавляйте дополнительную информацию</h3>
          <Progress
            value={65}
            variant="linear"
            label="Загрузка файла"
            estimatedTime={45}
            speed="2.5 MB/s"
          />
          <p style={progressStoriesStyles.helperText}>
            estimatedTime и speed помогают пользователю понять, сколько времени осталось
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading16}>
            6. Используйте степпер для многошаговых процессов
          </h3>
          <Progress
            variant="stepper"
            steps={[
              { id: 1, label: 'Загрузка', description: 'Загрузка файлов' },
              { id: 2, label: 'Обработка', description: 'Обработка данных' },
              { id: 3, label: 'Сохранение', description: 'Сохранение результатов' },
            ]}
            activeStep={1}
            showNextStepInfo={true}
          />
          <p style={progressStoriesStyles.helperText}>
            Степпер идеально подходит для процессов с несколькими этапами
          </p>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading16}>7. Используйте хуки для управления состоянием</h3>
          <p style={progressStoriesStyles.helperTextNoTopWithBottom}>
            Используйте useProgress или useStepper для упрощения управления состоянием:
          </p>
          <pre style={progressStoriesStyles.preCode}>
            {`const { value, increment, complete } = useProgress(0);
const { activeStep, nextStep } = useStepper(steps, 0);`}
          </pre>
        </div>

        <div>
          <h3 style={progressStoriesStyles.heading16}>8. Правильно выбирайте размер</h3>
          <div style={progressStoriesStyles.sectionColumn12}>
            <Progress value={50} variant="linear" size={Size.XS} label="XS" />
            <Progress value={50} variant="linear" size={Size.SM} label="SM" />
            <Progress value={50} variant="linear" size={Size.MD} label="MD" />
            <Progress value={50} variant="linear" size={Size.LG} label="LG" />
          </div>
          <p style={progressStoriesStyles.helperText}>
            Размер должен соответствовать контексту использования
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Рекомендации по использованию компонента Progress для создания лучшего пользовательского опыта.',
      },
    },
  },
};

export const BufferVariant: Story = {
  args: {
    value: 60,
    bufferValue: 80,
    variant: 'buffer',
    label: 'Загрузка видео',
    size: Size.MD,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Вариант buffer показывает основной прогресс и буферный слой. Полезен для загрузки видео или потоковой передачи данных.',
      },
    },
  },
};

export const WithRetry: Story = {
  render: () => {
    const [value, setValue] = React.useState(45);
    const [status, setStatus] = React.useState<'await' | 'loading' | 'success' | 'error'>(
      'loading',
    );

    React.useEffect(() => {
      if (status === 'loading') {
        const timer = setInterval(() => {
          setValue((prev) => {
            if (prev >= 100) {
              setStatus('success');
              return 100;
            }
            // Случайная ошибка на 60%
            if (prev >= 60 && Math.random() > 0.7) {
              setStatus('error');
              return prev;
            }
            return prev + 2;
          });
        }, 200);

        return () => clearInterval(timer);
      }
    }, [status]);

    const handleRetry = fn(() => {
      setStatus('loading');
      setValue(45);
    });

    return (
      <div style={progressStoriesStyles.maxWidth400}>
        <Progress
          value={value}
          variant="linear"
          label="Загрузка файла"
          status={status}
          onRetry={handleRetry}
          applyStatusColorsToText={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример с кнопкой повтора при ошибке. При нажатии на "Повторить" прогресс возобновляется.',
      },
    },
  },
};

export const WithPause: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const [paused, setPaused] = React.useState(false);

    React.useEffect(() => {
      if (!paused) {
        const timer = setInterval(() => {
          setValue((prev) => Math.min(prev + 1, 100));
        }, 100);

        return () => clearInterval(timer);
      }
    }, [paused]);

    const handlePause = fn(() => {
      setPaused(!paused);
    });

    return (
      <div style={progressStoriesStyles.maxWidth400}>
        <Progress
          value={value}
          variant="linear"
          label="Загрузка файла"
          status="loading"
          onPause={handlePause}
          paused={paused}
          animated={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример с возможностью паузы и возобновления загрузки. При нажатии на кнопку прогресс приостанавливается или возобновляется.',
      },
    },
  },
};

export const StepperWithIcons: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
      {
        id: 1,
        label: 'Загрузка',
        description: 'Загрузка файлов',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
      },
      {
        id: 2,
        label: 'Обработка',
        description: 'Обработка данных',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
      {
        id: 3,
        label: 'Сохранение',
        description: 'Сохранение результатов',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        ),
      },
    ];

    return (
      <div style={progressStoriesStyles.sectionColumn16}>
        <Progress
          variant="stepper"
          steps={steps}
          activeStep={activeStep}
          showNextStepInfo={true}
          size={Size.MD}
        />
        <div style={progressStoriesStyles.rowGap8}>
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            Назад
          </button>
          <button
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={activeStep === steps.length}
          >
            Вперед
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример степпера с кастомными иконками для каждого шага.',
      },
    },
  },
};

export const SegmentedVariant: Story = {
  args: {
    variant: 'segmented',
    label: 'Прогресс по категориям',
    segments: [
      { value: 30, color: progressStoriesStyles.segmentedSuccess, label: 'Завершено' },
      { value: 50, color: progressStoriesStyles.segmentedWarning, label: 'В процессе' },
      { value: 20, color: progressStoriesStyles.segmentedAwait, label: 'Ожидание' },
    ],
    size: Size.MD,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Сегментированный прогресс позволяет показать несколько категорий с разными цветами. Полезен для отображения распределения по категориям.',
      },
    },
  },
};

export const StepperAllSteps: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
      { id: 1, label: 'Регистрация', description: 'Создание аккаунта' },
      { id: 2, label: 'Подтверждение', description: 'Подтверждение email' },
      { id: 3, label: 'Настройка', description: 'Настройка профиля' },
      { id: 4, label: 'Завершение', description: 'Готово!' },
    ];

    return (
      <div style={progressStoriesStyles.maxWidth500Column16}>
        <Progress
          variant="stepper"
          steps={steps}
          activeStep={activeStep}
          showNextStepInfo={true}
          showAllSteps={true}
          size={Size.MD}
        />
        <div style={progressStoriesStyles.rowGap8}>
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            Назад
          </button>
          <button
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={activeStep === steps.length}
          >
            Вперед
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример степпера с отображением всех шагов одновременно. Каждый шаг показывает свой статус (завершен, активен, будущий).',
      },
    },
  },
};

export const VerticalStepper: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
      { id: 1, label: 'Регистрация', description: 'Создание аккаунта' },
      { id: 2, label: 'Подтверждение', description: 'Подтверждение email' },
      { id: 3, label: 'Настройка', description: 'Настройка профиля' },
      { id: 4, label: 'Завершение', description: 'Готово!' },
    ];

    return (
      <div style={progressStoriesStyles.maxWidth400Column16}>
        <Progress
          variant="stepper"
          steps={steps}
          activeStep={activeStep}
          showNextStepInfo={true}
          stepperOrientation="vertical"
          size={Size.MD}
        />
        <div style={progressStoriesStyles.rowGap8}>
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            Назад
          </button>
          <button
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={activeStep === steps.length}
          >
            Вперед
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример вертикального степпера. Шаги отображаются вертикально с соединительными линиями.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  args: {
    value: 65,
    label: 'Загрузка данных',
    info: {
      title: 'Загрузка файла',
      value: '65%',
      description: 'Осталось примерно 2 минуты',
    },
    variant: 'circle-info',
    showValueLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример компонента с улучшенной доступностью. Используются ARIA атрибуты для связи с лейблом и описанием.',
      },
    },
  },
};

export const CustomStatusIcon: Story = {
  args: {
    value: 100,
    variant: 'circle',
    showCheckmarkOnComplete: true,
    customStatusIcon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    size: Size.MD,
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования кастомной иконки вместо стандартной галочки.',
      },
    },
  },
};

export const CustomStatusLabels: Story = {
  args: {
    value: 75,
    variant: 'linear',
    status: 'loading',
    label: 'Загрузка файла',
    statusLabels: {
      loading: 'Загрузка...',
      success: 'Готово!',
      error: 'Ошибка загрузки',
      await: 'Ожидание начала',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования кастомных текстов для статусов.',
      },
    },
  },
};

export const WithEstimatedTime: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const [estimatedTime, setEstimatedTime] = React.useState(30);

    React.useEffect(() => {
      if (value < 100) {
        const timer = setTimeout(() => {
          setValue((prev) => prev + 5);
          setEstimatedTime((prev) => Math.max(0, prev - 1.5));
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [value]);

    return (
      <Progress
        value={value}
        label="Загрузка файла"
        estimatedTime={estimatedTime}
        animated={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример отображения оставшегося времени до завершения загрузки.',
      },
    },
  },
};

export const WithSpeed: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const [speed, setSpeed] = React.useState('2.5 MB/s');

    React.useEffect(() => {
      if (value < 100) {
        const timer = setTimeout(() => {
          setValue((prev) => prev + 2);
          // Имитация изменения скорости
          const speeds = ['2.5 MB/s', '3.1 MB/s', '2.8 MB/s', '3.5 MB/s'];
          setSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [value]);

    return <Progress value={value} label="Загрузка файла" speed={speed} animated={true} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример отображения скорости загрузки.',
      },
    },
  },
};

export const WithTimeAndSpeed: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const [estimatedTime, setEstimatedTime] = React.useState(25);
    const [speed, setSpeed] = React.useState('2.5 MB/s');

    React.useEffect(() => {
      if (value < 100) {
        const timer = setTimeout(() => {
          setValue((prev) => prev + 3);
          setEstimatedTime((prev) => Math.max(0, prev - 0.75));
          const speeds = ['2.5 MB/s', '3.1 MB/s', '2.8 MB/s', '3.5 MB/s'];
          setSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [value]);

    return (
      <Progress
        value={value}
        label="Загрузка файла"
        estimatedTime={estimatedTime}
        speed={speed}
        animated={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример отображения одновременно оставшегося времени и скорости загрузки.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    value: 65,
    variant: 'linear',
    label: 'Кастомная стилизация',
    trackClassName: 'custom-track',
    fillClassName: 'custom-fill',
    style: {
      ...progressStoriesStyles.customStylingRoot,
    },
  },
  render: (args) => {
    return (
      <div>
        <Progress {...args} />
        <style>
          {`
            .custom-track {
              border: 2px solid ${progressStoriesStyles.customTrackBorderColor};
            }
            .custom-fill {
              background: ${progressStoriesStyles.customFillGradient};
            }
          `}
        </style>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования кастомных классов и inline стилей для стилизации компонента.',
      },
    },
  },
};

export const StepperWithClickableSteps: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
      { id: 1, label: 'Начало', description: 'Первый шаг процесса' },
      { id: 2, label: 'Промежуточный', description: 'Второй шаг процесса' },
      { id: 3, label: 'Почти готово', description: 'Третий шаг процесса' },
      { id: 4, label: 'Завершение', description: 'Последний шаг' },
    ];

    const handleStepClick = fn((stepIndex: number, step: ProgressStep) => {
      console.log('Клик по шагу:', stepIndex, step);
      setActiveStep(stepIndex + 1);
    });

    return (
      <div style={progressStoriesStyles.sectionColumn16}>
        <Progress
          variant="stepper"
          steps={steps}
          activeStep={activeStep}
          showNextStepInfo={true}
          size={Size.MD}
          onStepClick={handleStepClick}
        />
        <div style={progressStoriesStyles.rowGap8}>
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            Назад
          </button>
          <button
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={activeStep === steps.length}
          >
            Вперед
          </button>
        </div>
        <p style={progressStoriesStyles.helperTextNoTop}>
          Кликните на название текущего шага, чтобы перейти к нему
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример степпера с кликабельными шагами. При клике на название текущего шага можно перейти к нему.',
      },
    },
  },
};

export const UseProgressHook: Story = {
  render: () => {
    const { value, isComplete, setProgress, increment, decrement, reset, complete } =
      useProgress(0);

    return (
      <div style={progressStoriesStyles.sectionColumn16}>
        <Progress value={value} label="Управление через хук" animated={true} />
        <div style={progressStoriesStyles.rowGap8Wrap}>
          <button onClick={() => increment(10)} disabled={isComplete}>
            +10%
          </button>
          <button onClick={() => increment(25)} disabled={isComplete}>
            +25%
          </button>
          <button onClick={() => decrement(10)} disabled={value === 0}>
            -10%
          </button>
          <button onClick={() => setProgress(50)}>50%</button>
          <button onClick={() => setProgress(75)}>75%</button>
          <button onClick={complete} disabled={isComplete}>
            Завершить
          </button>
          <button onClick={reset}>Сбросить</button>
        </div>
        <p style={progressStoriesStyles.helperTextNoTop}>
          Текущее значение: {value}% {isComplete && '✓ Завершено'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования хука `useProgress` для управления состоянием прогресса. Хук предоставляет методы для изменения значения, инкремента, декремента и сброса.',
      },
    },
  },
};

export const UseStepperHook: Story = {
  render: () => {
    const steps = [
      { id: 1, label: 'Регистрация', description: 'Создание аккаунта' },
      { id: 2, label: 'Подтверждение', description: 'Подтверждение email' },
      { id: 3, label: 'Настройка', description: 'Настройка профиля' },
      { id: 4, label: 'Завершение', description: 'Готово!' },
    ];

    const {
      activeStep,
      currentStep,
      nextStepData,
      progress,
      canGoNext,
      canGoPrevious,
      nextStep,
      previousStep,
      goToStep,
      reset,
      goToFirst,
      goToLast,
    } = useStepper(steps, 0);

    return (
      <div style={progressStoriesStyles.sectionColumn16}>
        <Progress
          variant="stepper"
          steps={steps}
          activeStep={activeStep}
          showNextStepInfo={true}
          size={Size.MD}
        />
        <div style={progressStoriesStyles.rowGap8Wrap}>
          <button onClick={previousStep} disabled={!canGoPrevious}>
            Назад
          </button>
          <button onClick={nextStep} disabled={!canGoNext}>
            Вперед
          </button>
          <button onClick={goToFirst}>В начало</button>
          <button onClick={goToLast}>В конец</button>
          <button onClick={() => goToStep(2)}>Шаг 2</button>
          <button onClick={reset}>Сбросить</button>
        </div>
        <div style={progressStoriesStyles.helperTextNoTop}>
          <p>Активный шаг: {activeStep}</p>
          <p>Прогресс: {Math.round(progress)}%</p>
          {currentStep && <p>Текущий: {currentStep.label}</p>}
          {nextStepData && <p>Следующий: {nextStepData.label}</p>}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования хука `useStepper` для управления состоянием степпера. Хук предоставляет методы для навигации по шагам и информацию о текущем состоянии.',
      },
    },
  },
};

export const StepperInteractive: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
      { id: 1, label: 'Начало', description: 'Первый шаг процесса' },
      { id: 2, label: 'Промежуточный', description: 'Второй шаг процесса' },
      { id: 3, label: 'Почти готово', description: 'Третий шаг процесса' },
      { id: 4, label: 'Завершение', description: 'Последний шаг' },
    ];

    return (
      <div style={progressStoriesStyles.sectionColumn16}>
        <Progress
          variant="stepper"
          steps={steps}
          activeStep={activeStep}
          showNextStepInfo={true}
          size={Size.MD}
        />
        <div style={progressStoriesStyles.rowGap8}>
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            Назад
          </button>
          <button
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={activeStep === steps.length}
          >
            Вперед
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный степпер с кнопками навигации между шагами.',
      },
    },
  },
};

export const WithGradient: Story = {
  args: {
    value: 75,
    variant: 'linear',
    label: 'Загрузка с градиентом',
    showGradient: true,
    animated: true,
    status: 'loading', // Добавляем статус loading для анимации shimmer
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример прогресс-бара с градиентной заливкой для более выразительного визуального эффекта. При статусе loading добавляется анимация shimmer.',
      },
    },
  },
};

export const ShowPercentage: Story = {
  args: {
    value: 65,
    variant: 'linear',
    label: 'Отдельное управление процентами',
    showPercentage: true,
    showValueLabel: false,
    formatValue: (value, max) => `Загружено ${value} из ${max} МБ`,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования `showPercentage` для отдельного управления отображением процентов и значения.',
      },
    },
  },
};

export const StatusChangeCallback: Story = {
  render: () => {
    const [status, setStatus] = React.useState<'await' | 'loading' | 'success' | 'error'>(
      'loading',
    );
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 5;
        });
      }, 200);

      return () => clearInterval(timer);
    }, []);

    const handleStatusChange = fn((newStatus: 'await' | 'loading' | 'success' | 'error') => {
      console.log(`Статус изменился: ${newStatus}`);
      setStatus(newStatus);
    });

    return (
      <div style={progressStoriesStyles.paddedCardNoPadding}>
        <Progress
          variant="linear"
          value={value}
          label="Загрузка файла"
          showValueLabel
          onStatusChange={handleStatusChange}
        />
        <div style={progressStoriesStyles.statusInfoText}>
          Текущий статус: <strong>{status}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { exclude: /.*/ },
    docs: {
      description: {
        story:
          'Пример с колбеком onStatusChange. Статус автоматически меняется с "loading" на "success" при достижении 100%. Колбек вызывается при каждом изменении статуса.',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    variant: 'linear',
    value: 55,
    label: 'Onboarding',
    trackColor: progressStoriesStyles.customTrackColor,
    progressColor: progressStoriesStyles.customProgressColor,
  },
};

export const DashboardExample: Story = {
  render: () => (
    <div style={progressStoriesStyles.dashboardGrid}>
      <div>
        <h4 style={progressStoriesStyles.h4Title}>Релиз мобильного приложения</h4>
        <Progress value={92} variant="linear" showValueLabel label="Этап тестирования" />
      </div>
      <div>
        <h4 style={progressStoriesStyles.h4Title}>Спринт разработчиков</h4>
        <Progress value={68} variant="circle" label="Sprint 23" circleSize={140} />
      </div>
      <div>
        <Progress
          value={75}
          variant="circle-info"
          circleSize={160}
          info={{
            title: 'Рост выручки',
            description: 'Цель: +15% MoM',
            value: '12.3%',
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { exclude: /.*/ },
    docs: {
      description: {
        story: 'Комбинация всех вариантов компонента прогресса на одной панели.',
      },
    },
  },
};

export const AnimatedLinear: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 8;
        });
      }, 400);

      return () => clearInterval(timer);
    }, []);

    return (
      <div style={progressStoriesStyles.maxWidth340}>
        <Progress value={progress} variant="linear" label="Синхронизация" showValueLabel />
      </div>
    );
  },
  parameters: {
    controls: { exclude: /.*/ },
  },
};

