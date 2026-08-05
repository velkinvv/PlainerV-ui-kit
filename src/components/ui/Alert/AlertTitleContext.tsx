import React, { createContext, useContext } from 'react';

/**
 * Контекст оформления заголовка внутри Alert.
 * @property titleColor - Цвет заголовка
 * @property fontSize - Размер шрифта
 */
export type AlertTitleContextValue = {
  titleColor: string;
  fontSize: string;
};

const AlertTitleContext = createContext<AlertTitleContextValue | null>(null);

/**
 * Хук контекста заголовка Alert.
 */
export const useAlertTitleContext = (): AlertTitleContextValue | null =>
  useContext(AlertTitleContext);

/**
 * Провайдер стилей заголовка.
 * @param props.value - Цвет и размер
 * @param props.children - Children Alert
 */
export const AlertTitleProvider = ({
  value,
  children,
}: {
  value: AlertTitleContextValue;
  children: React.ReactNode;
}) => <AlertTitleContext.Provider value={value}>{children}</AlertTitleContext.Provider>;
