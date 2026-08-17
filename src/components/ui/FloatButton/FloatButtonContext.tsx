import { createContext, useContext } from 'react';

export type FloatButtonGroupContextValue = {
  inGroup: boolean;
  isTrigger: boolean;
  isOpen: boolean;
  onActionActivate?: () => void;
};

const FloatButtonGroupContext = createContext<FloatButtonGroupContextValue | null>(null);

/**
 * Контекст группы FloatButton.
 */
export const useFloatButtonGroupContext = (): FloatButtonGroupContextValue | null =>
  useContext(FloatButtonGroupContext);

/**
 * Провайдер группы.
 * @param props.value - inGroup / isTrigger
 * @param props.children - Кнопки группы
 */
export const FloatButtonGroupProvider = FloatButtonGroupContext.Provider;
