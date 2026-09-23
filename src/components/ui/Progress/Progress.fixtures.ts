import type { ProgressStep } from '../../../types/ui';

export const PROGRESS_STEPPER_SIMPLE_STEPS: ProgressStep[] = [
  { id: 1, label: 'Шаг 1' },
  { id: 2, label: 'Шаг 2' },
  { id: 3, label: 'Шаг 3' },
];

export const PROGRESS_STEPPER_FIVE_STEPS: ProgressStep[] = [
  { id: 1, label: 'Шаг 1' },
  { id: 2, label: 'Шаг 2' },
  { id: 3, label: 'Шаг 3' },
  { id: 4, label: 'Шаг 4' },
  { id: 5, label: 'Шаг 5' },
];

export const PROGRESS_STEPPER_ACCOUNT_STEPS: ProgressStep[] = [
  { id: 1, label: 'Регистрация', description: 'Создание аккаунта' },
  { id: 2, label: 'Подтверждение', description: 'Подтверждение email' },
  { id: 3, label: 'Настройка', description: 'Настройка профиля' },
  { id: 4, label: 'Завершение', description: 'Готово!' },
];

export const PROGRESS_STEPPER_PIPELINE_STEPS: ProgressStep[] = [
  { id: 1, label: 'Загрузка', description: 'Загрузка файлов' },
  { id: 2, label: 'Обработка', description: 'Обработка данных' },
  { id: 3, label: 'Сохранение', description: 'Сохранение результатов' },
];

export const PROGRESS_STEPPER_INTERACTIVE_STEPS: ProgressStep[] = [
  { id: 1, label: 'Начало', description: 'Первый шаг процесса' },
  { id: 2, label: 'Промежуточный', description: 'Второй шаг процесса' },
  { id: 3, label: 'Почти готово', description: 'Третий шаг процесса' },
  { id: 4, label: 'Завершение', description: 'Последний шаг' },
];

export const PROGRESS_SPEED_PRESETS = ['2.5 MB/s', '3.1 MB/s', '2.8 MB/s', '3.5 MB/s'];
