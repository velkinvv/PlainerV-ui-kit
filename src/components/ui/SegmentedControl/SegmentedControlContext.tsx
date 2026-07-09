import React, { createContext, useContext } from 'react';
import type { Size } from '../../../types/sizes';
import type {
  SegmentedControlAppearance,
  SegmentedControlSelectionMode,
} from '../../../types/ui';

/**
 * Контекст группы сегментов.
 * @property appearance - Вид группы
 * @property size - Размер
 * @property selectionMode - single / multiple
 * @property name - Имя native input
 * @property selectedValue - Текущее значение группы
 * @property isValueControlled - Управляется ли value снаружи
 * @property onSegmentChange - Смена сегмента
 */
export type SegmentedControlContextValue = {
  appearance: SegmentedControlAppearance;
  size: Size;
  selectionMode: SegmentedControlSelectionMode;
  name?: string;
  selectedValue: string | string[] | undefined;
  isValueControlled: boolean;
  /**
   * Обработчик смены сегмента.
   * @param segmentValue - Значение сегмента
   * @param nextChecked - Новое checked
   * @param event - Событие change
   */
  onSegmentChange: (
    segmentValue: string,
    nextChecked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

/**
 * Хук контекста сегментированного контрола.
 */
export const useSegmentedControlContext = (): SegmentedControlContextValue | null =>
  useContext(SegmentedControlContext);

/**
 * Провайдер контекста.
 * @param props.value - Значение контекста
 * @param props.children - Дочерние элементы
 */
export const SegmentedControlProvider = ({
  value,
  children,
}: {
  value: SegmentedControlContextValue;
  children: React.ReactNode;
}) => (
  <SegmentedControlContext.Provider value={value}>{children}</SegmentedControlContext.Provider>
);
