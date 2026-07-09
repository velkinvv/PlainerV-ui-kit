import React, { createContext, useContext } from 'react';
import type { Size } from '../../../types/sizes';
import type { ListMarkerStyle, ListVariant } from '../../../types/ui';

/**
 * Контекст списка для пунктов и иконок.
 * @property variant - ordered / unordered
 * @property markerStyle - Актуальный стиль маркера
 * @property size - Размер списка
 */
export type ListContextValue = {
  variant: ListVariant;
  markerStyle: ListMarkerStyle;
  size: Size;
};

const ListContext = createContext<ListContextValue | null>(null);

/**
 * Хук контекста списка (вне `List` — `null`).
 */
export const useListContext = (): ListContextValue | null => useContext(ListContext);

/**
 * Провайдер контекста списка.
 * @param props.value - Значение контекста
 * @param props.children - Дочерние элементы
 */
export const ListProvider = ({
  value,
  children,
}: {
  value: ListContextValue;
  children: React.ReactNode;
}) => <ListContext.Provider value={value}>{children}</ListContext.Provider>;
