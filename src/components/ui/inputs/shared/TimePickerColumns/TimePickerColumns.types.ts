import type { Size } from '../../../../../types/sizes';

/**
 * Пропсы сетки выбора времени (часы / минуты / секунды).
 * Используется в `TimeInput` и `DateTimeInput`.
 */
export interface TimePickerColumnsProps {
  /** Текущее выбранное время */
  selectedTime: Date;
  /** Обработчик изменения времени после выбора часа, минуты или секунды */
  onTimePartChange: (nextTime: Date) => void;
  /** Размер элементов сетки */
  size?: Size;
  /** Показывать колонку секунд */
  showSeconds?: boolean;
  /** Шаг минут в колонке */
  minuteStep?: number;
  /** Шаг секунд в колонке */
  secondStep?: number;
  /** Список недоступных часов */
  disabledHours?: number[];
  /** Список недоступных минут */
  disabledMinutes?: number[];
  /** Список недоступных секунд */
  disabledSeconds?: number[];
  /** Список недоступных времён в формате `HH:mm` */
  disabledTimes?: string[];
  /** Формат для проверки disabledTimes */
  timeFormat?: string;
}
