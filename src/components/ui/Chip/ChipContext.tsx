import React, { createContext, useContext } from 'react';
import type { Size } from '../../../types/sizes';
import type { ChipAppearance, ChipsSelectionMode } from '../../../types/ui';

/**
 * Контекст группы `Chips`: дефолты и колбэки выбора для дочерних `Chip`.
 * @property selectionMode - Режим выбора группы
 * @property selectedValue - Текущее значение группы
 * @property disabled - Блокировка всей группы
 * @property size - Дефолтный размер чипов
 * @property appearance - Дефолтный вид чипов
 * @property onSelectChip - Выбор чипа по `value`
 * @property registerChipFocusElement - Регистрация фокусируемого корня чипа
 * @property unregisterChipFocusElement - Снятие регистрации
 * @property focusChipByOffset - Перенос фокуса стрелками
 */
export type ChipGroupContextValue = {
  selectionMode: ChipsSelectionMode;
  selectedValue: string | string[] | undefined;
  disabled: boolean;
  size?: Size;
  appearance?: ChipAppearance;
  /**
   * Выбор чипа внутри группы.
   * @param chipValue - Значение чипа
   */
  onSelectChip: (chipValue: string) => void;
  /**
   * Регистрирует элемент корня чипа для клавиатурной навигации.
   * @param chipValue - Значение чипа
   * @param element - DOM-элемент корня
   */
  registerChipFocusElement: (chipValue: string, element: HTMLElement | null) => void;
  /**
   * Убирает чип из списка фокусируемых.
   * @param chipValue - Значение чипа
   */
  unregisterChipFocusElement: (chipValue: string) => void;
  /**
   * Переносит фокус на соседний чип.
   * @param chipValue - Текущий чип
   * @param direction - `-1` влево, `1` вправо
   */
  focusChipByOffset: (chipValue: string, direction: -1 | 1) => void;
};

const ChipGroupContext = createContext<ChipGroupContextValue | null>(null);

/**
 * Хук доступа к контексту группы чипов (вне группы — `null`).
 */
export const useChipGroupContext = (): ChipGroupContextValue | null =>
  useContext(ChipGroupContext);

/**
 * Провайдер контекста группы.
 * @param props.value - Значение контекста
 * @param props.children - Дочерние элементы
 */
export const ChipGroupProvider = ({
  value,
  children,
}: {
  value: ChipGroupContextValue;
  children: React.ReactNode;
}) => <ChipGroupContext.Provider value={value}>{children}</ChipGroupContext.Provider>;
