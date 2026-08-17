import { createContext, useContext } from 'react';
import type { LayoutScrollMode, LayoutSidebarPlacement } from '../../../types/ui';

export type LayoutContextValue = {
  scrollMode: LayoutScrollMode;
  hasSidebar: boolean;
  registerSidebar: () => () => void;
  sidebarPlacement: LayoutSidebarPlacement;
  setSidebarPlacement: (placement: LayoutSidebarPlacement) => void;
  overlayActive: boolean;
  setOverlayActive: (active: boolean) => void;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

/**
 * Контекст каркаса. Слоты обязаны быть внутри Layout.
 */
export const useLayoutContext = (): LayoutContextValue => {
  const value = useContext(LayoutContext);
  if (value == null) {
    throw new Error('[Layout] Слоты Header, Sidebar, Content и Footer рендерятся внутри Layout.');
  }
  return value;
};

export const LayoutContextProvider = LayoutContext.Provider;
