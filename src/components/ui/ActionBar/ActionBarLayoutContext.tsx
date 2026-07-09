import React, { createContext, useContext } from 'react';
import { ActionBarOrientation } from '../../../types/ui';

const ActionBarLayoutContext = createContext<ActionBarOrientation>(ActionBarOrientation.HORIZONTAL);

/**
 * Провайдер ориентации ActionBar.
 *
 * @param orientation — горизонтальная или вертикальная раскладка
 */
export const ActionBarLayoutProvider: React.FC<{
  orientation: ActionBarOrientation;
  children: React.ReactNode;
}> = ({ orientation, children }) => (
  <ActionBarLayoutContext.Provider value={orientation}>{children}</ActionBarLayoutContext.Provider>
);

/**
 * Текущая ориентация ActionBar.
 */
export function useActionBarOrientation(): ActionBarOrientation {
  return useContext(ActionBarLayoutContext);
}

/**
 * @deprecated Используйте {@link useActionBarOrientation}
 */
export function useActionBarLayoutMode(): 'horizontal' | 'vertical' {
  const orientation = useActionBarOrientation();
  return orientation === ActionBarOrientation.VERTICAL ? 'vertical' : 'horizontal';
}
