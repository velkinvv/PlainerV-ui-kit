import type React from 'react';
import type { Size } from '@/types/sizes';

/**
 * Общие пропсы визуальных слотов Rating.
 * @property displayValue — отображаемое значение (с учётом hover)
 * @property hoverValue — текущий hover (для подсветки)
 * @property max — верх шкалы
 * @property precision — шаг
 * @property size — размер
 * @property readOnly — только отображение
 * @property disabled — блок
 * @property name — имя radio-группы
 * @property getLabelText — подпись шага
 * @property clearable — сброс повторным кликом
 * @property icon / emptyIcon — кастом icons
 * @property highlightSelectedOnly — faces
 * @property fillColor — цвет заливки
 * @property emptyColor — цвет пустого
 * @property onSelect — выбор значения
 * @property onHover — hover preview
 */
export type RatingVisualSlotProps = {
  displayValue: number | null;
  hoverValue: number | null;
  max: number;
  precision: number;
  size: Size;
  readOnly: boolean;
  disabled: boolean;
  name: string;
  getLabelText: (value: number) => string;
  clearable: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  highlightSelectedOnly: boolean;
  fillColor: string;
  emptyColor: string;
  onSelect: (value: number | null) => void;
  onHover: (value: number | null) => void;
};
