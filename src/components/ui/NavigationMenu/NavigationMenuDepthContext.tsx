import React, { createContext, useContext } from 'react';

const NavigationMenuDepthContext = createContext<number>(0);

/**
 * Уровень вложенности пункта (0 — корень списка навигации).
 */
export function useNavigationMenuDepth(): number {
  return useContext(NavigationMenuDepthContext);
}

export interface NavigationMenuDepthProviderProps {
  /** Глубина для потомков */
  depth: number;
  children: React.ReactNode;
}

export const NavigationMenuDepthProvider: React.FC<NavigationMenuDepthProviderProps> = ({
  depth,
  children,
}) => (
  <NavigationMenuDepthContext.Provider value={depth}>{children}</NavigationMenuDepthContext.Provider>
);
